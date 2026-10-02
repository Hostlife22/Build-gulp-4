import js from '@eslint/js';
import ts from 'typescript-eslint';
import hooks from 'eslint-plugin-react-hooks';
import imports from 'eslint-plugin-import';
import globals from 'globals';

export default ts.config(
  {
    ignores: [
      'dist/**',
      'gulp-starter-basic/**',
      'gulp-starter-es6/**',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { 'react-hooks': hooks, import: imports },
    rules: {
      ...hooks.configs.recommended.rules,
      'import/first': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
);
