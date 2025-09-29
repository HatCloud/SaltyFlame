# 综述

一个能单人体验《克苏鲁的呼唤》跑团部分趣味的游戏 App。

剧本基于[《Alone Against the Flames: A Solo Adventure for the Call of Cthulhu 7th Ed. Quick-Start》](https://www.chaosium.com/content/FreePDFs/CoC/Adventures/CHA23145%20-%20Alone%20Against%20the%20Flames.pdf)。提供中文和英文两种语言。

游戏的核心是剧情卡片，这个卡片包含如下要素

1. 左上角显示代表剧情编号的数字
2. 顶部显示剧情片段的描述文本
3. 底部显示有三种可能性
   1. 按编号直接跳转到另一种卡片
   2. 一个或复数个选项，每个选项引导跳转到另一张卡片或者
   3. 这是一张结局卡片，底部显示 END 标志

游玩流程简略如下：

1. 主界面，用户点击开始游玩，进行步骤 2
2. 展示前言界面，简单介绍故事背景，如故事发生的时间和同时代的一些背景，具体参考 Call of Cthulhu 7th Ed. 规则，用户点击下一步进行步骤 3
3. 用户查看剧情卡片，进行步骤 4
4. 根据剧情卡片上底部的引导分两种可能：
   a.如果不是结局卡片 -> 跳转到下一张卡片（回到步骤 3）
   b.如果是结局卡片 -> 进行步骤 5
5. 进入结局总结页面，显示用户游玩过程的一些总结，如是血量值，理智值等情况。用户可以选择是否分享
6. 回到主界面

# Plan

- [x] 初始化 memory bank
- [x] 升级旧架构到最新架构
- [x] 将 pdf 格式两个语言（中文和英文）的剧本转化为 json 数据格式
- [x] 基于现有代码先实现游戏主体部分

  - 角色的人物卡先用 Fake 数据
  - 先不实现剧情卡片底部选项的具体判断，让玩家自己先选

- [x] 实现全局级别的投骰子能力
- [x] 基于投骰子能力，实现 Call of Cthulhu 7th Ed. 规则中定义的相关判定能力，并接入到游戏中
- [x] 根据剧情开头的交互来生成真正的角色数据，提供相应的界面支持。
  - 用户随时可以在底部查看自己的重要属性
  - 点击底部后会弹出显示用户角色详细数据的浮动卡片
- [ ] 实现很多卡片具体的游戏机制
- [ ] 实现背包系统
- [ ] 实现主菜单，音乐，音效等
- [ ] 开启 TestFlight 进行内测

# 技术架构

- 主体架构：React Native
- 最终输出：Android 和 iOS 的手机 App
- 使用 yarn 管理 node 包
- 使用 Cline Memory Bank 来提升 AI 辅助工具的代码交付可靠性

## 核心库

如果使用了没有列在核心库中的库需要征得同意，并添加到文档中。

- [typescript](https://www.typescriptlang.org/) 强类型 JS
- [react-native](https://reactnative.dev/) 框架
- [react-navigation](https://reactnavigation.org/) 导航
- [react-native-screens](react-native-screens) react-navigation 外挂插件，能将非原生的导航容器转成原生的
- [react-redux](https://react-redux.js.org/) 应用状态树管理
- [redux-saga](https://redux-saga.js.org) 应用副作用管理，和 Redux 配套使用
- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) 动画库

## 源代码目录结构

- `android` 安卓原生代码
- `ios` iOS 原生代码
- `src` JS 源代码
  - `App.tsx` 应用主界面
  - `hook.ts` 通用的 react-hook
  - `reducer.ts` 应用 redux 状态树定义，以及一些通用的 redux 状态容器定义
  - `ui` 界面相关代码
    - `components` 可复用的组件
    - `screens` 页面
  - `interface` 数据类型和解析器定义
  - `images` 图片、Icon 资源
  - `themes` 通用样式、颜色定义，包括日间和夜间两套
  - `constant` 一些定义的常量
  - `data` 职业模版数据和剧本文本
  - `i18n` 本地化相关类和资源
  - `utils` 工具类
- `index.js` 入口文件
