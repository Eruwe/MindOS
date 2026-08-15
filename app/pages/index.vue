<template>
  <div class="app-layout">
    <!-- Левая панель — ввод -->
    <main class="input-panel">
      <h1 class="title">MindOS</h1>
      <p class="subtitle">Наговори или напиши всё, что у тебя в голове</p>

      <textarea
        v-model="rawText"
        class="thought-input"
        placeholder="Я хочу в будущем..."
      ></textarea>

      <button class="structure-btn" :disabled="loading" @click="structureThoughts">
        {{ loading ? 'Сохранение...' : 'Структурировать' }}
      </button>
    </main>

    <!-- Правая панель — список записей -->
    <aside class="result-panel">
      <div class="entries-panel">
        <h2 class="entries-title">Твои мысли</h2>

        <p v-if="error" class="entries-error">Не удалось загрузить записи</p>
        <p v-else-if="loading && entries.length === 0" class="placeholder-text">Загрузка...</p>
        <p v-else-if="entries.length === 0" class="placeholder-text">
          Здесь появятся сохранённые мысли
        </p>

        <ul v-else class="entries-list">
          <li v-for="entry in entries" :key="entry.id" class="entry-card">
            <p class="entry-text">{{ entry.raw_text }}</p>
            <time v-if="entry.created_at" class="entry-date" :datetime="entry.created_at">
              {{ formatDate(entry.created_at) }}
            </time>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
const { user } = useCurrentUser();
const { entries, loading, error, fetchEntries, createEntry } = useEntries();

const rawText = ref('');

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

const structureThoughts = async () => {
  if (!user.value) {
    console.error('Пользователь не авторизован');
    return;
  }

  const entry = await createEntry(rawText.value, user.value.id);

  if (entry) {
    rawText.value = '';
  }
};

onMounted(() => {
  if (user.value) {
    fetchEntries();
  }
});

watch(user, (currentUser) => {
  if (currentUser) {
    fetchEntries();
  } else {
    entries.value = [];
  }
});
</script>

<style>
/* ===== Layout ===== */
.app-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

/* ===== Input Panel ===== */
.input-panel {
  display: flex;
  flex-direction: column;
  padding: var(--space-2xl);
  background: var(--color-bg);
  border-right: 1px solid var(--color-border);
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--space-sm);
}

.subtitle {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xl);
}

.thought-input {
  flex: 1;
  padding: var(--space-lg);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.6;
  resize: none;
  transition: border-color var(--transition);

  &::placeholder {
    color: var(--color-text-secondary);
    opacity: 0.6;
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
}

/* ===== Button ===== */
.structure-btn {
  margin-top: var(--space-lg);
  padding: var(--space-md) var(--space-xl);
  background: var(--color-primary);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition:
    background var(--transition),
    transform var(--transition);

  &:hover:not(:disabled) {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

/* ===== Result Panel ===== */
.result-panel {
  padding: var(--space-2xl);
  background: var(--color-surface);
  overflow-y: auto;
}

.entries-panel {
  max-width: 36rem;
  margin: 0 auto;
}

.entries-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-lg);
}

.entries-error {
  color: #dc2626;
  font-size: 0.95rem;
}

.placeholder-text {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  text-align: center;
  padding-top: var(--space-2xl);
}

.entries-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.entry-card {
  padding: var(--space-lg);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.entry-text {
  color: var(--color-text);
  line-height: 1.6;
  white-space: pre-wrap;
  margin-bottom: var(--space-sm);
}

.entry-date {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}
</style>
