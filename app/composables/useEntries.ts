import type { PostgrestError } from '@supabase/supabase-js';
import type { Entry } from '../types/entry';
import type { Database, TablesInsert } from '../types/database.types';

export const useEntries = () => {
  const supabase = useSupabaseClient<Database>();

  const entries = ref<Entry[]>([]);
  const loading = ref(false);
  const error = ref<PostgrestError | null>(null);

  const fetchEntries = async () => {
    loading.value = true;
    error.value = null;

    const { data, error: fetchError } = await supabase
      .from('entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      error.value = fetchError;
      loading.value = false;
      return;
    }

    entries.value = data ?? [];
    loading.value = false;
  };

  const createEntry = async (rawText: string, userId: string) => {
    loading.value = true;
    error.value = null;

    const payload: TablesInsert<'entries'> = {
      user_id: userId,
      raw_text: rawText,
    };

    const { data, error: insertError } = await supabase
      .from('entries')
      .insert(payload)
      .select()
      .single();

    if (insertError) {
      error.value = insertError;
      loading.value = false;
      return null;
    }

    if (data) {
      entries.value = [data, ...entries.value];
    }

    loading.value = false;
    return data;
  };

  return {
    entries,
    loading,
    error,
    fetchEntries,
    createEntry,
  };
};
