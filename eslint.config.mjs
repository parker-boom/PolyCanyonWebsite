import globals from 'globals';
import js from '@eslint/js';
import react from 'eslint-plugin-react';

export default [
  { ignores: ['build/**', 'archive/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node }, parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { react },
    settings: { react: { version: 'detect' } },
    rules: { ...react.configs.recommended.rules, 'react/prop-types': 'off', 'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }] },
  },
];
