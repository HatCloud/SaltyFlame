module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        '@react-native-community',
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
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
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
