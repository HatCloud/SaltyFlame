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
- [x] **国际化 (i18n) 功能初步实现**:
  - 添加了 `src/i18n/` 目录及相关文件 (`useI18n.ts`, `resources.ts`, `types.ts`)。
  - `useI18n` hook 已在多个UI组件中用于文本本地化。
- [x] **UI改进**:
  - 为 `src/ui/components/OptionButton.tsx` 和 `src/ui/components/CheckResult.tsx` 中的 `resolveButton` 添加了按下效果。
- [x] **选项条件显示**:
  - 在 `StoryCard.tsx` 中实现了基于 `option.condition` 的选项显示逻辑，并根据用户反馈进行了改进：
    - 如果选项有条件且条件满足，会在选项文本前显示条件的描述。
    - 不满足条件的选项会显示为灰色且不可点击。
    - 支持 `CHARACTERISTIC_COMPARE` 条件类型。
    - 为 `HAS_ITEM`, `HAS_NOT_ITEM`, `FLAG_SET`, `FLAG_NOT_SET` 添加了初步支持（依赖 `gameFlags`）和本地化描述文本。
  - `OptionButton.tsx` 和 `CheckOption.tsx` 已更新以支持 `disabled` 和 `conditionDescription` props。
  - `i18n` 相关文件 (`resources.ts`, `useI18n.ts`, `types.ts`) 已更新以支持带插值的条件描述文本。
  - 在 `MyAppState.ts` 中添加了 `gameFlags` 状态。
  - 更新了 `reducer.ts` 以处理 `SET_FLAG` 和 `CLEAR_FLAG` 效果，修改 `gameFlags`。
- [x] **检定UI改进 (显示角色检定值)**:
  - 在 `src/utils/skillUtils.ts` 中添加了 `getCheckValue` 工具函数，用于根据 `CheckObjectKey` 从角色数据中获取对应的属性或技能值。该函数能正确处理常规属性、技能以及特殊的 `LUCK` 和 `SANITY` 值。
  - 澄清了 `src/interface/Scene.ts` 中 `CheckDrivenOption` 内的 `check` 属性类型为 `CheckPayload`，而实际的检定目标键 (`CheckObjectKey`) 位于 `CheckPayload.details.subObject`。基于此理解修正了相关组件的代码。
  - 更新了 `src/ui/components/OptionButton.tsx`，为其增加了 `checkValueDescription` prop，允许在其主文本上方显示一行额外的描述信息，用于展示角色当前的检定相关数值。
  - 在 `src/i18n/resources.ts` 的 `check` 分类下添加了新的翻译键 `yourValueIs` (例如，中文：“你的 {skillName} 为 {value}”，英文：“Your {skillName} is {value}”)，用于格式化角色检定值的显示。
  - 重构了 `src/ui/components/CheckOption.tsx`：
    - 利用 `getCheckValue` 函数和新增的 `yourValueIs` i18n 键，在检定选项按钮的上方（通过传递 `checkValueDescription` 给 `OptionButton`）显示当前角色进行该项检定所依据的属性或技能的点数（例如“你的侦查为 50”）。
    - 解决了在实现过程中遇到的多个 TypeScript 类型推断问题，确保了对 `option.check.details.subObject` 的正确访问。
  - 修改了 `src/ui/components/CheckResult.tsx`：
    - 同样利用 `getCheckValue` 和 `yourValueIs` i18n 键，在显示检定掷骰结果的同时，补充显示角色进行该项检定时所依据的属性/技能的点数。
    - 修正了该组件样式中对一个不存在的 `padding.Tiny` 的引用，将其更改为 `padding.Mini`。
- [x] **UI改进 (StoryCard 段落间距)**:
  - 修改了 `src/ui/components/StoryCard.tsx`：
    - 将 `currentScene.story` 按换行符分割，为每个段落渲染单独的 `<Text>` 组件。
    - 应用 `styles.storyCardContentText` 样式，并确保其 `marginBottom` 为 `padding.Normal` 以实现段落间距。
    - (已移除) 根据用户反馈，取消了中文段落首行缩进的逻辑。

## 未完成功能 (来自 projectbrief.md)

- [x] 中文剧本数据（至场景270）已转换为模块化TS格式
- [ ] 英文剧本数据转换 (推迟)
- [ ] 基于现有代码先实现游戏主体部分
  - 角色的人物卡先用 Fake 数据
  - [~] 先不实现剧情卡片底部选项的具体判断，让玩家自己先选 (条件显示已部分实现)
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
- **2025-05-22 (续)**:
  - 引入并初步实现了国际化 (i18n) 功能，支持中英文切换。
  - `useI18n` hook 已集成到主要UI组件中。
  - 为 `OptionButton` 和 `CheckResult` 中的 `resolveButton` 组件添加了视觉上的按下反馈效果。
- **2025-05-22 (更晚)**:
  - 在 `StoryCard.tsx` 中实现了选项的条件显示逻辑，基于 `option.condition`，并根据反馈进行了改进（显示条件文本、禁用不满足条件的选项）。
  - 支持 `CHARACTERISTIC_COMPARE` 条件，并为物品和游戏标记条件添加了框架和本地化描述。
  - `OptionButton.tsx` 和 `CheckOption.tsx` 更新以支持新功能。
  - `i18n` 系统更新以支持插值。
  - 在 `MyAppState` 中添加了 `gameFlags` 状态，并在 `reducer` 中实现了对 `SET_FLAG` 和 `CLEAR_FLAG` 效果的处理。
- **2025-05-22 (更更晚)**:
  - 在 `CheckOption.tsx` 和 `CheckResult.tsx` 组件中实现了显示与检定相关的角色属性/技能点数的功能。
  - 添加了 `getCheckValue` 工具函数到 `skillUtils.ts`。
  - 更新了 `OptionButton.tsx` 以支持显示额外的检定值描述。
  - 添加了新的 i18n 键 `check.yourValueIs`。
  - 修正了 `CheckOption.tsx` 中因类型推断错误导致的系列问题，最终明确了 `option.check` (类型 `CheckPayload`) 到 `option.check.details.subObject` (类型 `CheckObjectKey`) 的正确访问路径。
  - 修正了 `CheckResult.tsx` 中样式对 `padding.Tiny` 的错误引用。
  - 修正了 `src/i18n/resources.ts` 中 `check.yourValueIs` 翻译键的占位符格式，从单花括号 (`{key}`) 改为双花括号 (`{{key}}`)，以匹配 `src/i18n/useI18n.ts` 中 `t` 函数的插值逻辑，解决了插值未生效的问题。
- **2025-05-22 (更更更晚)**:
  - 在 `src/ui/components/StoryCard.tsx` 中为剧情文本实现了段落间距（通过分割故事文本并应用 `marginBottom: padding.Normal` 样式）。根据用户反馈，移除了先前添加的中文首行缩进逻辑。
