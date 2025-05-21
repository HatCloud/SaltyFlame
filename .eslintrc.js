export default {
  root: true,
  ignorePatterns: [
    'babel.config.js',
    'metro.config.js',
    'react-native.config.js',
    '.prettierrc.js',
  ], // Added common JS config files
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@react-native',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: false,
        tabWidth: 2,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
  },
}
