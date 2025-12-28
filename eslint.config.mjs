import eslint from '@eslint/js';
import next from '@next/eslint-plugin-next';
import typescriptParser from '@typescript-eslint/parser';

import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import relay from 'eslint-plugin-relay';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores([
    'node_modules',
    '**/.next/*',
    '**/*.config.js',
    '**/*.config.mjs',
    '**/*.d.ts',
  ]),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  next.configs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  relay.configs['ts-strict'],
  importPlugin.flatConfigs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021, // Equivalent to `ecmaVersion: 2021` in old configs
      sourceType: 'module', // For ES modules
      globals: { browser: true, node: true },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        requireConfigFile: false,
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.json'],
      },
    },
    settings: {
      'import/resolver': {
        typescript: { project: './packages/shell/tsconfig.json' },
      },
      react: { version: 'detect' },
    },
    plugins: {
      relay,
      'no-relative-import-paths': noRelativeImportPaths,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'arrow-body-style': 'error',
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/newline-after-import': 'error',
      'no-relative-import-paths/no-relative-import-paths': 'error',
      'no-trailing-spaces': 'error',
      'object-shorthand': 'error',
      'one-var-declaration-per-line': 'error',
      'playwright/no-force-option': 'off',
      'prefer-const': [
        'error',
        { destructuring: 'all', ignoreReadBeforeAssign: true },
      ],
      'prefer-destructuring': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never', propElementValues: 'always' },
      ],
      'react/jsx-sort-props': 'error',
      'react/jsx-uses-react': 'off', // Not needed with React 17+
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // We use TypeScript's types for props instead
      'react-hooks/exhaustive-deps': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `react` related packages come first.
            ['^react', '^next'],
            // External packages.
            ['^@'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.*.(s?css)$'],
          ],
        },
      ],
      'unused-imports/no-unused-imports': 'error',
    },
  },
]);
