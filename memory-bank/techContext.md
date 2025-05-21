# 技术背景

## 主要技术栈

- **核心框架**: React Native
- **编程语言**: TypeScript
- **包管理器**: Yarn

## 核心库 (来自 README.md)

- **TypeScript**: [https://www.typescriptlang.org/](https://www.typescriptlang.org/) - 强类型 JavaScript 超集。
- **React Native**: [https://reactnative.dev/](https://reactnative.dev/) - 用于构建原生应用的 JavaScript 框架。
- **React Navigation**: [https://reactnavigation.org/](https://reactnavigation.org/) - 应用导航解决方案。
- **React Native Screens**: [https://github.com/software-mansion/react-native-screens](https://github.com/software-mansion/react-native-screens) - React Navigation 的插件，用于将导航容器转换为原生视图，提升性能。
- **React Native Reanimated**: [https://github.com/software-mansion/react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) - 用于创建流畅动画的库。
  _注：状态管理目前通过 React 内置 Hooks (`useReducer`) 实现，遵循类似 Redux 的模式，但未直接引入 `react-redux` 或 `redux-saga` 库。_

## 开发环境设置

（这部分内容将在后续开发过程中，根据实际环境配置进行补充。例如：Node.js 版本、Yarn 版本、React Native CLI 版本、Android Studio/Xcode 配置等。）

## 技术约束

- **遵循核心库列表**：如需使用未在核心库列表中列出的库，需要事先征得同意并更新此文档。
- **跨平台兼容性**：代码实现需要考虑 Android 和 iOS 两个平台的兼容性。

## 依赖项

（这部分内容将根据 `package.json` 和实际项目依赖进行详细记录。）

## 工具使用模式

- **版本控制**: Git ( предполагается, будет уточнено )
- **代码格式化**: Prettier (根据 `.prettierrc.js` 文件推断)
- **代码检查**: ESLint (根据 `.eslintrc.js` 文件推断)
- **构建与调试**: React Native CLI, Android Studio, Xcode

## 编码风格

参考项目根目录下的 `.clinerules/coding-style.md` 文件。
