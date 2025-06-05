# 当前工作内容

## 近期变更

- **架构升级完成**:
  - 将 React Native 升级到 `0.79.2`，React 升级到 `19.1.0`，并更新了 TypeScript, Prettier 等核心开发依赖。
  - 安装了 React Navigation, Redux, Redux Saga, Reanimated 等项目所需库。
  - 更新了 Android Gradle 配置 (AGP `8.2.1`, Gradle `8.7`, SDK 版本等) 和 iOS Ruby 环境 (`3.1.2`) 及 Pods。
  - 调整了 ESLint 和 TypeScript 配置以适应新版本。
  - 为解决构建阻塞，暂时移除了 Jest 测试框架。
  - 解决了 Android 构建过程中的 `AndroidManifest.xml` `package` 属性问题和 `react-native-reanimated` 的 Node.js 路径问题。
- 初始化 Memory Bank 核心文件 (`projectbrief.md`, `productContext.md`, `systemPatterns.md`, `techContext.md`, `progress.md`)。
- **剧本数据结构定义与核心交互逻辑初步实现**:
  - 在 `src/interface/` 目录下定义了核心数据结构：
    - `enums.ts`: 定义了如 `CheckObjectKey` (检定对象键，如技能、属性), `EffectType` (效果类型), `ConditionType` (条件类型), `CheckDifficulty` (检定难度) 等枚举。
    - `Scene.ts`: 定义了 `Scene`, `SceneInteractOption`, `Check`, `Effect`, `SimpleOption`, `SceneCheckOptionDetails`, `SceneData` 等接口，用于描述游戏场景、选项、检定、效果等。
    - `MyAppState.ts`: 更新了应用状态 `MyAppState`，加入了 `language` 和 `currentCheckAttempt` (用于存储检定过程中的中间状态，如掷骰值、结果、待处理的后续选项)。`AppAction` 联合类型也已扩展，加入了处理检定流程和语言设置的新 Action 类型 (`PERFORM_SCENE_CHECK`, `PERFORM_OPTION_CHECK`, `RESOLVE_CHECK_OUTCOME`, `CLEAR_CHECK_ATTEMPT`, `SET_LANGUAGE`, `APPLY_EFFECT`)。
  - 重构了 `src/reducer.ts`：
    - 支持了新的多阶段检定流程：检定执行后先更新 `currentCheckAttempt` 状态，待用户确认后再进行场景跳转和效果应用。
    - 为新的 Action 类型添加了处理逻辑框架。检定和效果应用的具体实现（如访问真实角色数据、解析骰子字符串）尚有待完善的占位符。
    - `CHANGE_SCENE` 和 `GO_BACK` action 现在会清除 `currentCheckAttempt`。
  - 更新了 `src/ui/components/StoryCard.tsx`:
    - 适配了新的场景数据结构 (`Scene`, `SceneInteractOption`)。
    - 根据 `state.currentCheckAttempt` 的状态，实现了多阶段检定流程的UI展示：显示检定提示、执行检定、显示检定结果、显示检定后的唯一后续选项。
    - 从 `state.language` 读取语言设置，用于本地化文本。
  - 修复了 ESLint 报告的 `any` 类型警告和部分组件的 TypeScript 编译错误。
- **中文剧本数据转换与模块化存储完成**:
  - 将中文PDF剧本（至场景270）转换为结构化的TypeScript数据。
  - 场景数据存储在 `src/data/ts_cn/` 目录下的多个模块化文件中 (例如 `scenes_001-020.ts`, `scenes_021-040.ts`, 等)。
  - 创建了 `src/data/loadInitialSceneData.ts` 脚本，用于导入并合并所有模块化的中文场景数据。
  - `src/interface/MyAppState.ts` 中的 `initialState` 已更新，通过调用 `loadAllCnSceneData()` 来加载场景数据。
  - 旧的单一数据文件 `src/data/SceneData_CN.ts` 已被删除。
  - `src/data/loadInitialSceneData.ts` 文件中的占位符和临时注释已清理完毕。
- **国际化 (i18n) 功能初步实现**:
  - 在 `src/i18n/` 目录下添加了 `useI18n.ts` (自定义hook), `resources.ts` (翻译资源), 和 `types.ts` (相关类型定义)。
  - `useI18n` hook 从应用状态读取语言设置，并提供 `t` 函数用于文本翻译。
  - 已在 `CheckOption.tsx`, `CheckResult.tsx`, `StoryCard.tsx`, 和 `CharacterBottomSheet.tsx` 组件中使用 `useI18n` 实现文本本地化。
- **UI改进**:
  - 为 `src/ui/components/OptionButton.tsx` 和 `src/ui/components/CheckResult.tsx` 中的 `resolveButton` 添加了按下效果，通过在按下时改变背景颜色和不透明度来提升用户交互反馈。
- **检定UI改进 (显示角色检定值)**:
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
  - 修正了 `src/i18n/resources.ts` 中 `check.yourValueIs` 翻译键的占位符格式，从单花括号 (`{key}`) 改为双花括号 (`{{key}}`)，以匹配 `src/i18n/useI18n.ts` 中 `t` 函数的插值逻辑，解决了插值未生效的问题。
- **UI改进 (StoryCard 段落间距)**:
  - 修改了 `src/ui/components/StoryCard.tsx`：
    - 将 `currentScene.story` 按换行符分割，为每个段落渲染单独的 `<Text>` 组件。
    - 应用 `styles.storyCardContentText` 样式，并确保其 `marginBottom` 为 `padding.Normal` 以实现段落间距。
    - (已移除) 根据用户反馈，取消了中文段落首行缩进的逻辑。
- **应用状态持久化**:
  - 安装了 `@react-native-async-storage/async-storage` 库。
  - 修改了 `src/reducer.ts`：
    - 添加了 `saveStateToStorage` 辅助函数，用于将指定字段 (`currentSceneKey`, `history`, `characterData`, `language`, `gameFlags`) 保存到 AsyncStorage。
    - 在处理会改变这些持久化字段的 action (如 `CHANGE_SCENE`, `GO_BACK`, `SET_LANGUAGE`, `APPLY_EFFECT`, `RESOLVE_CHECK_OUTCOME`, `STORE_CHARACTER`) 后调用 `saveStateToStorage`。
    - 添加了 `HYDRATE_STATE` action 类型及其处理逻辑，用于在应用启动时用 AsyncStorage 中的数据覆盖初始状态。
  - 修改了 `src/interface/MyAppState.ts`：
    - 定义了 `HydrateStateAction` 接口。
    - 将 `HydrateStateAction` 添加到 `AppAction` 联合类型中。
  - 修改了 `src/App.tsx`：
    - 添加了 `useEffect` hook，在应用首次加载时从 AsyncStorage 读取持久化的状态。
    - 如果读取成功，则 dispatch `HYDRATE_STATE` action 来更新应用状态。
- **职业选择功能初步实现**:
  - **接口更新**:
    - `src/interface/Character.ts`: 用户指示保持现有字段。职业信息将存储在现有的 `occupation: string` 和 `background: CharacterBackground` (object type) 字段中。
    - `src/interface/Scene.ts`: 为 `GotoDrivenOption` 添加了 `applyOccupation?: OccupationKey` 字段。
    - `src/data/occupations/index.ts`: 明确导出了 `OccupationKey` 类型，并修正了 `BackgroundTemplate` 的重导出路径。
    - `src/interface/MyAppState.ts`: 定义了 `ApplyChosenOccupationAction` action 类型。
  - **场景数据更新**:
    - `src/data/ts_cn/scenes_061-080.ts`: 更新了场景 71 中的职业选择选项，添加了 `applyOccupation` 字段。
  - **状态管理与逻辑实现**:
    - `src/reducer.ts`: 更新了 `APPLY_CHOSEN_OCCUPATION` action 的处理逻辑：
      - 使用正确的导入路径 `../data/occupations` 和 `../constant/enums`。
      - 移除了未使用的 `generateCharacter` 导入。
      - 当应用职业模板时，仅更新 `characterData` 中已存在的 `occupation` (string) 和 `background` (CharacterBackground object) 字段。
      - **新增**: 为职业模板中定义的 `interestSkills`（兴趣技能）实现逻辑：在其当前值或基础值（来自 `CheckObjectDefaultValues`，并处理如DEX/2, EDU等派生情况）的基础上增加20点，结果上限为75。此更新会修改 `characterData.skills`。
      - 明确了 `skillKey` 在遍历兴趣技能时的类型为 `CheckObjectKey`。
    - `src/ui/components/StoryCard.tsx`: 修改了 `handleInteractOptionPress` 方法，在处理 `goto` 类型的选项时，如果选项包含 `applyOccupation` 字段，则会 dispatch `APPLY_CHOSEN_OCCUPATION` action。
- **为职业模板添加示例角色预设信息**:
  - `src/interface/OccupationTemplate.ts`: 为 `OccupationTemplate` 接口添加了新的可选字段，用于存储示例角色的姓名（中英文）、性别、年龄、出生地（中英文）和居住地（中英文）。接口中的 `background` 字段已重命名为 `background_cn`，并添加了新的 `background_en` 字段（两者类型均为 `CharacterBackground`）。同时，移除了 `skillPointsFormula` 字段。
  - `src/data/occupations/*.ts`: 更新了所有职业模板文件 (`antiquarian.ts`, `doctor.ts`, `journalist.ts`, `privateInvestigator.ts`, `professor.ts`)：
    - 将原 `background` 字段重命名为 `background_cn`。
    - 添加了新的 `background_en` 字段，并为其所有子属性填充了英文翻译内容。
    - 移除了 `skillPointsFormula` 字段。
    - （这些文件之前已更新过，添加了示例角色预设字段并填充了数据）。
  - `src/ui/components/CharacterModal.tsx`: （此项修正已在先前步骤完成）修正了一个TypeScript错误，将对 `characterData.personalData.dodge` 的访问更改为从 `characterData.skills[CheckObjectKey.DODGE]` 获取闪避值。
  - `src/reducer.ts`: 进一步更新了 `APPLY_CHOSEN_OCCUPATION` action 的处理逻辑：
    - 根据当前语言从职业模板的示例预设数据中，为 `characterData` 的 `name`, `sex`, `age`, `birthplace`, `residence` 字段赋值（如果模板中有提供）。
    - 根据职业模板的 `creditRatingRange` 为角色随机生成一个信用评级值，并更新到 `characterData.skills.CREDIT_RATING`。
    - 保留了根据语言选择 `background_cn` 或 `template.background_en` 的逻辑。
- **角色信息弹窗增强**:
  - `src/ui/components/CharacterModal.tsx`: 修改了角色信息弹窗中背景信息的显示方式，使其标签居上，内容居左下方显示，以适应较长的文本。同时修正了因此引入的样式问题（将 `typeface.Weight.SemiBold` 改为 `Medium`，`padding.Tiny` 改为 `Mini`）。
  - `src/i18n/resources.ts`: 为角色背景信息的各个字段（如描述、思想信念等）添加了对应的中英文i18n翻译键。

## 后续步骤

1.  **完善核心游戏逻辑**:
    - 在 `src/reducer.ts` 中，完整实现 `executeCheckLogic`（包括从 `characterData` 获取真实的技能/属性值、处理奖励/惩罚骰）和 `applySingleEffect`（包括解析如 "1D3" 的字符串值、处理所有 `EffectType`，管理物品和游戏标记）。**更新**: `applySingleEffect` 已更新以处理 `SET_FLAG` 和 `CLEAR_FLAG` 效果，修改 `state.gameFlags`。
    - 在 `StoryCard.tsx` 中，实现选项的条件显示逻辑 (`option.condition`)。**已完成并改进**:
      - `StoryCard.tsx` 现在会根据 `option.condition` 来决定是否显示选项。
      - 如果选项有条件且条件满足，会在选项文本前显示条件的描述（例如“体型判定：大于40”）。
      - 不满足条件的选项会显示为灰色且不可点击，而不是消失。
      - `OptionButton.tsx` 和 `CheckOption.tsx` 已更新以支持 `disabled` 和 `conditionDescription` props。
      - `i18n` 相关文件 (`resources.ts`, `useI18n.ts`, `types.ts`) 已更新以支持带插值的条件描述文本。
      - `MyAppState` 已添加 `gameFlags` 属性。
2.  **剧本数据转换**:
    - 英文剧本数据转换 (推迟)。
3.  **角色创建流程实现**: 实现角色创建相关场景（如属性分配、职业选择、技能点分配）与 `characterData` 状态的实际交互逻辑。
4.  **测试与迭代**: 对已实现的功能进行测试，并根据测试反馈进行调整和优化。

## 当前决策与考量

- **Memory Bank 语言**：已确定为中文。
- **信息来源**：主要参考 `README.md` 初始化 Memory Bank 的核心文件，并通过实际操作完成了架构升级。剧本数据结构和交互流程根据用户反馈进行了迭代。
- **开发环境**：Android 构建环境已基本调通，iOS 环境在 Ruby 和 Pods 配置更新后也应准备就绪。
- **检定流程**: 采纳了用户反馈，实现了多阶段检定流程：先执行检定并显示结果，再由用户点击确认后续操作，而不是检定后自动跳转。这对状态管理 (`currentCheckAttempt`) 和UI组件 (`StoryCard.tsx`) 均有较大影响。
- **数据结构迭代**: `Scene.ts` 和 `MyAppState.ts` 中的数据结构经过了讨论和调整，以更好地支持游戏逻辑和检定流程。
- **数据存储策略**：
  - 中文场景数据已从单一大型文件迁移到 `src/data/ts_cn/` 目录下的多个模块化TS文件，并通过 `loadInitialSceneData.ts` 统一加载。此策略已成功实施。
  - 应用的关键状态字段现在会通过 AsyncStorage 持久化到本地，并在应用启动时加载。

## 重要模式与偏好

- **文档驱动**：Memory Bank 是项目的核心信息库，所有重要决策和变更都应在此记录。
- **结构化文档**：遵循 Memory Bank 的文件结构和层级关系。

## 学习与项目洞察

- 架构升级为项目后续开发提供了更现代和稳定的基础。
- 暂时移除测试框架是为了优先保证项目可构建和核心功能开发，测试框架可在后续迭代中重新引入和配置。
- **数据转换是核心**: 将PDF剧本准确、完整地转换为结构化的TypeScript数据是实现游戏内容和逻辑的基础。这是一个细致且工作量较大的任务。中文数据（至场景270）的转换已完成。
- **模块化数据管理**: 将场景数据拆分为多个小文件，更易于维护、版本控制和潜在的协作。
- **交互流程驱动状态设计**: 用户期望的检定交互流程直接影响了 `MyAppState` 中 `currentCheckAttempt` 状态的设计，以及 `reducer` 中相关action的处理方式。
- **逐步完善**: 对于复杂功能如检定逻辑和效果应用，采用先搭建框架，然后逐步填充和完善具体实现的策略。
- **i18n集成**: 引入国际化支持，使得应用能够方便地支持多种语言，提升了用户体验的灵活性。
