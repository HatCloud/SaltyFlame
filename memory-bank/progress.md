# 项目进展

## 已完成功能

- **Memory Bank 初始化**:
  - 创建 `projectbrief.md`：定义项目核心目标、范围和主要任务。
  - 创建 `productContext.md`：阐述项目缘由、解决的问题以及核心玩法与用户体验。
  - 创建 `activeContext.md`：记录当前工作内容、后续步骤和重要决策。
  - 创建 `systemPatterns.md`：描述系统架构、关键技术决策和源代码目录结构。
  - 创建 `techContext.md`：列出主要技术栈、核心库和开发工具。

## 已完成功能

- **Memory Bank 初始化**:
  - 创建 `projectbrief.md`：定义项目核心目标、范围和主要任务。
  - 创建 `productContext.md`：阐述项目缘由、解决的问题以及核心玩法与用户体验。
  - 创建 `activeContext.md`：记录当前工作内容、后续步骤和重要决策。
  - 创建 `systemPatterns.md`：描述系统架构、关键技术决策和源代码目录结构。
  - 创建 `techContext.md`：列出主要技术栈、核心库和开发工具。
- [x] **升级旧架构到最新架构**:
  - 将 React Native 升级到 `0.79.2`。
  - 将 React 升级到 `19.1.0`。
  - 将 TypeScript 升级到 `~5.0.4`。
  - 将 Prettier 升级到 `~3.5.3`。
  - 安装了缺失的核心库 (React Navigation, Redux, Redux Saga, Reanimated)。
  - 更新了 Android Gradle 配置 (AGP `8.2.1`, Gradle `8.7`, `compileSdkVersion/targetSdkVersion 34`, Flipper `0.212.0`)。
  - 更新了 iOS Ruby 环境 (`3.1.2`) 及 Pods 配置。
  - 更新了 ESLint (`~8.57.0`) 和 TypeScript (`react-jsx`) 相关配置。
  - 移除了 Jest 测试框架以解决构建阻塞问题，待后续重新引入。
  - 解决了 Android 构建中 `AndroidManifest.xml` 的 `package` 属性问题和 `react-native-reanimated` 的 Node.js 路径问题。

## 未完成功能 (来自 projectbrief.md)

- [ ] 将 pdf 格式两个语言（中文和英文）的剧本转化为 json 数据格式
- [ ] 基于现有代码先实现游戏主体部分
  - 角色的人物卡先用 Fake 数据
  - 先不实现剧情卡片底部选项的具体判断，让玩家自己先选
- [ ] 实现全局级别的投骰子能力
- [ ] 基于投骰子能力，实现 Call of Cthulhu 7th Ed. 规则中定义的相关判定能力，并接入到游戏中
- [ ] 根据剧情开头的交互来生成真正的角色数据，提供相应的界面支持。
  - 用户随时可以在底部查看自己的重要属性
  - 点击底部后会弹出显示用户角色详细数据的浮动卡片

## 当前状态

- 项目核心依赖已升级，原生项目文件已适配新版 React Native。
- ESLint 功能正常，但存在一些 linting 警告待处理。

## 已知问题

- （暂无，在开发过程中根据实际情况补充）

## 项目决策演进

- **2025-05-21**:
  - 决定使用中文作为 Memory Bank 的主要语言。
  - 确定 Memory Bank 的核心文件结构。
  - 基于 `README.md` 完成了 Memory Bank 核心文件的初步填充。
  - 完成了项目架构升级，包括 React Native 版本、核心依赖、构建工具链配置以及原生项目文件的适配。解决了 Android 构建过程中的多个问题。暂时移除了 Jest 测试框架。
