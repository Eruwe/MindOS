import type { User } from '@supabase/supabase-js';

export const useCurrentUser = () => {
  const supabase = useSupabaseClient();
  const user = useState<User | null>('current_user', () => null);
  const initialized = useState('current_user_initialized', () => false);

  const userId = computed(() => user.value?.id ?? null);

  const refreshUser = async () => {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
    user.value = authUser;
  };

  if (import.meta.client && !initialized.value) {
    initialized.value = true;

    refreshUser();

    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null;
    });
  }

  return {
    user,
    userId,
    refreshUser,
  };
};
