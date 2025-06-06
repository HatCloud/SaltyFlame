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
- **AsyncStorage**: [https://react-native-async-storage.github.io/async-storage/](https://react-native-async-storage.github.io/async-storage/) - React Native 的异步、持久化键值存储系统。用于持久化部分应用状态。
  _注：状态管理目前通过 React 内置 Hooks (`useReducer`) 实现，遵循类似 Redux 的模式，但未直接引入 `react-redux` 或 `redux-saga` 库。_

## 国际化 (i18n)

项目采用自定义的 React Hook (`useI18n`) 来实现国际化功能，支持中文和英文。

- **`src/i18n/useI18n.ts`**: 定义了 `useI18n` hook。该 hook 从全局应用状态 (`state.language`) 获取当前选择的语言（'cn' 或 'en'）。它提供一个 `t(path: string)` 函数，用于根据传入的点分隔路径（如 `common.goBack`）从语言资源中查找并返回对应的翻译文本。如果找不到翻译，会输出警告并返回原始路径。
- **`src/i18n/resources.ts`**: 包含一个 `translations` 对象，该对象按语言代码（`cn`, `en`）组织嵌套的翻译字符串。例如，`translations.cn.common.goBack` 对应中文的“返回上级”。该文件还导出了 `I18nResources` 类型，它基于 `translations.cn` 的结构生成，用于在代码中提供翻译键的类型提示和检查。
- **`src/i18n/types.ts`**: 定义了 `LanguageCode` 类型（`'cn' | 'en'`）和 `I18nContextType` 接口，后者描述了 `useI18n` hook 返回的对象结构（包含 `t` 函数和当前 `lang`）。

`useI18n` hook 目前在以下UI组件中使用以提供本地化文本：

- `src/ui/components/CheckOption.tsx`
- `src/ui/components/CheckResult.tsx`
- `src/ui/components/StoryCard.tsx`
- `src/ui/components/CharacterBottomSheet.tsx`

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
- **移除控制台输出**: 使用 `babel-plugin-transform-remove-console` 在生产构建中移除 `console.log` 调用 (保留 `console.error` 和 `console.warn`)。

## 编码风格

- UI 组件的颜色和字体应优先使用项目主题文件 `src/theme/palette.ts` (颜色) 和 `src/theme/typeface.ts` (字体、字号、字重) 中定义的值。
  - 如果现有主题无法满足需求，应优先考虑扩展主题文件，而不是在组件中硬编码样式值。
- 参考项目根目录下的 `.clinerules/coding-style.md` 文件。
