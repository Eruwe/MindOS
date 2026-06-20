<template>
  <div class="app-layout">
    <!-- Левая панель — ввод -->
    <main class="input-panel">
      <h1 class="title">MindOS</h1>
      <p class="subtitle">Наговори или напиши всё, что у тебя в голове</p>
      
      <textarea 
        class="thought-input"
        placeholder="Я хочу в будущем..."
        v-model="rawText"
      ></textarea>
      
      <button class="structure-btn" @click="structureThoughts">
        Структурировать
      </button>
    </main>

    <!-- Правая панель — результат -->
    <aside class="result-panel">
      <p class="placeholder-text">Здесь появится структура твоих мыслей</p>
    </aside>
  </div>
</template>

<script setup lang="ts">
const rawText = ref('')

const structureThoughts = () => {
  // Пока заглушка — позже отправим в Gemini
  console.log('Структурируем:', rawText.value)
}
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
  transition: background var(--transition), transform var(--transition);

  &:hover {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

/* ===== Result Panel ===== */
.result-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl);
  background: var(--color-surface);
}

.placeholder-text {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  text-align: center;
}
</style>