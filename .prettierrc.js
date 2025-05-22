// Prettier 配置：控制代码格式化行为
module.exports = {
  arrowParens: 'avoid', // 箭头函数参数只有一个时省略括号
  bracketSameLine: false, // JSX 的 > 不放在同一行（React 推荐）
  bracketSpacing: true, // 对象大括号内加空格 { foo: bar }
  singleQuote: true, // 使用单引号
  trailingComma: 'all', // 尾随逗号都加
  printWidth: 80, // 每行最大宽度 80
  semi: false, // 不使用分号
  jsxSingleQuote: false, // JSX 中使用双引号（如 <Text name="foo" />）
}
