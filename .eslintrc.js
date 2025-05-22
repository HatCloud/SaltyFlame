// ESLint 配置文件：用于检查代码质量、统一风格
module.exports = {
  root: true, // 表示这是根配置文件，不继承外层
  ignorePatterns: [
    'babel.config.js',
    'metro.config.js',
    'react-native.config.js',
    '.prettierrc.js',
  ],
  parser: '@typescript-eslint/parser', // 使用 TypeScript 解析器
  parserOptions: {
    ecmaVersion: 2020, // 支持 ES2020 语法（如可选链）
    sourceType: 'module', // 支持 import/export
    project: './tsconfig.json', // 用于类型相关规则的项目路径
  },
  extends: [
    'eslint:recommended', // 启用 ESLint 默认推荐规则
    'plugin:@typescript-eslint/recommended', // 启用 TS 推荐规则
    '@react-native', // React Native 官方风格规则
    'prettier', // 禁用 ESLint 中与 Prettier 冲突的格式规则
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // Prettier 报错会被当作 ESLint 报错处理（不符合格式直接红线提示）
    'prettier/prettier': [
      'error',
      {
        semi: false, // 禁用分号
        tabWidth: 2, // 缩进为 2 空格
        singleQuote: true, // 使用单引号
        trailingComma: 'all', // 尾随逗号都加
        bracketSpacing: true, // 对象大括号内加空格
        printWidth: 80, // 每行最大字符数
      },
    ],

    // 函数必须写返回类型（开发早期建议关掉）
    '@typescript-eslint/explicit-function-return-type': 'off',

    // 避免滥用 any，发警告即可
    '@typescript-eslint/no-explicit-any': 'warn',

    // 未使用的变量检查，忽略参数
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],

    // React JSX 中强制使用单引号：建议保留 false（默认双引号更兼容）
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
}
