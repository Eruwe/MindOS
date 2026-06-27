import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default withNuxt(
  {
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'vue/multi-word-component-names': 'off',
    },
  },
  eslintConfigPrettier,
);
