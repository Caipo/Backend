import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      quotes: [
        'error',
        'double',
        {
          avoidEscape: true,
          allowTemplateLiterals: false,
        },
      ],
    },
    settings: {},
  },
  {
    ignores: ['.eslintrc.config.mjs'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
  },
];
