# 项目进展

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
- [x] **剧本数据结构定义与核心交互逻辑初步实现**:
  - 在 `src/interface/` 目录下定义了详细的游戏场景、选项、检定、效果等数据接口 (`Scene.ts`, `enums.ts`)。
  - 更新了应用状态 `MyAppState.ts`，加入了 `language` 和 `currentCheckAttempt` (用于处理多阶段检定流程)。
  - 扩展了 `AppAction` 联合类型，增加了处理检定、效果及语言设置的新 Action。
  - 重构了 `src/reducer.ts`，初步支持了多阶段检定流程（检定执行 -> 显示结果 -> 用户确认后跳转/应用效果），并为新 Action 添加了处理框架。部分检定及效果应用逻辑仍为占位符。
  - 更新了UI组件 `src/ui/components/StoryCard.tsx`，以适配新的数据结构，并能根据 `currentCheckAttempt` 状态展示检定提示、检定结果和后续操作。
  - 修复了相关代码文件的 ESLint 警告和 TypeScript 编译错误。
- [x] **中文剧本数据转换与模块化存储**:
  - 将中文PDF剧本（至场景270）转换为结构化的TypeScript数据。
  - 场景数据存储在 `src/data/ts_cn/` 目录下的多个模块化文件中。
  - 创建了 `src/data/loadInitialSceneData.ts` 脚本，用于导入并合并所有模块化的中文场景数据，并清除了其中的占位符。
  - `src/interface/MyAppState.ts` 中的 `initialState` 已更新，通过调用 `loadAllCnSceneData()` 来加载场景数据。
  - 旧的单一数据文件 `src/data/SceneData_CN.ts` 已被删除。

## 未完成功能 (来自 projectbrief.md)

- [x] 中文剧本数据（至场景270）已转换为模块化TS格式
- [ ] 英文剧本数据转换 (推迟)
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
- 剧本的核心数据结构已定义完毕。
- 中文场景数据（至场景270）的结构化和模块化加载已完成。
- 核心UI组件 (`StoryCard.tsx`) 和状态管理器 (`reducer.ts`) 已初步重构，以支持用户反馈的多阶段检定流程框架。
- `reducer.ts` 中的具体检定逻辑（如根据角色属性掷骰）和效果应用逻辑（如解析"1D3"伤害）尚待完整实现。

## 已知问题

- （暂无，在开发过程中根据实际情况补充）

## 项目决策演进

- **2025-05-21**:
  - 决定使用中文作为 Memory Bank 的主要语言。
  - 确定 Memory Bank 的核心文件结构。
  - 基于 `README.md` 完成了 Memory Bank 核心文件的初步填充。
  - 完成了项目架构升级，包括 React Native 版本、核心依赖、构建工具链配置以及原生项目文件的适配。解决了 Android 构建过程中的多个问题。暂时移除了 Jest 测试框架。
- **2025-05-21 (续)**:
  - 详细定义了游戏场景 (`Scene.ts`)、枚举 (`enums.ts`) 和应用状态 (`MyAppState.ts`) 的数据结构。
  - 根据用户反馈，确定并实现了多阶段检定流程：1. 显示检定需求 -> 2. 用户触发检定 -> 3. 显示检定结果（点数、成功/失败） -> 4. 用户点击唯一后续选项以继续。
  - 重构了 `reducer.ts` 以支持此多阶段检定流程，引入 `currentCheckAttempt` 状态来管理检定中间过程。
  - 更新了 `StoryCard.tsx` UI组件以适配新的数据结构和检定流程的显示逻辑。
- **2025-05-22**:
  - 完成了中文剧本数据（至场景270）从PDF到模块化TypeScript文件的转换。
  - 实施了新的数据存储策略：场景数据存储于 `src/data/ts_cn/` 目录下的多个文件中，并通过 `src/data/loadInitialSceneData.ts` 统一加载。
  - 清理了 `src/data/loadInitialSceneData.ts` 中的加载占位符。
  - 决定将英文剧本数据的转换工作推迟。
