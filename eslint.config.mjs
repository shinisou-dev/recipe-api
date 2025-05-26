import eslint from '@eslint/js';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import tseslint from 'typescript-eslint';

export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, {
  plugins: {
    'no-relative-import-paths': noRelativeImportPaths
  },
  rules: {
    quotes: ['error', 'single'],
    'no-relative-import-paths/no-relative-import-paths': ['error', { allowSameFolder: true }]
  }
});
