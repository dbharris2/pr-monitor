module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:react-hooks/recommended',
    'plugin:relay/recommended',
  ],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-empty-function': 'error',
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
      },
    },
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'react',
    'relay',
    'simple-import-sort',
    'unused-imports',
  ],
  rules: {
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'react/jsx-sort-props': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages `react` related packages come first.
          ['^react', '^next'],
          // External packages.
          ['^@'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.*.(s?css)$'],
        ],
      },
    ],
    'unused-imports/no-unused-imports': 'error',
  },
};
