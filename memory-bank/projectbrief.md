# 项目简报

## 项目核心目标

开发一个移动应用，让用户可以单人体验《克苏鲁的呼唤》跑团的趣味性。

## Memory Bank 语言

中文

## 项目范围

- 基于剧本《Alone Against the Flames: A Solo Adventure for the Call of Cthulhu 7th Ed. Quick-Start》。
- 提供中文和英文两种语言支持。
- 核心玩法围绕剧情卡片展开。
- 实现角色创建、属性判定（投骰子）、结局总结等功能。
- 最终输出为 Android 和 iOS 平台的 App。

## 主要任务 (参考 README Plan)

- [x] 初始化 memory bank
- [x] 升级旧架构到最新架构 (React Native, TypeScript, ESLint, Prettier 等核心依赖)
- [~] 将 pdf 格式两个语言（中文和英文）的剧本转化为 json 数据格式
  - [x] 定义剧本数据的核心TypeScript接口 (`Scene.ts`, `enums.ts`, `Character.ts`)
  - [x] 更新应用状态管理接口 (`MyAppState.ts`) 以包含新的游戏状态（如 `language`, `currentCheckAttempt`）和扩展的Action类型
  - [x] 重构核心状态管理器 (`reducer.ts`) 以支持新的数据结构和多阶段检定流程框架
  - [x] 更新核心UI组件 (`StoryCard.tsx`) 以适配新数据结构并展示多阶段检定流程
  - [~] 填充中文剧本数据 (`SceneData_CN.ts`) (已填充部分样本数据)
  - [ ] 填充英文剧本数据 (`SceneData_EN.ts`)
- [~] 基于现有代码先实现游戏主体部分
  - [x] 初步实现多阶段检定流程的UI展示和状态管理框架
  - [ ] 完善 `reducer.ts` 中的检定逻辑（使用真实角色数据、完整实现COC规则、奖励/惩罚骰）
  - [ ] 完善 `reducer.ts` 中的效果应用逻辑（如解析骰子字符串 "1D3"、处理所有 `EffectType`）
  - [ ] 在 `StoryCard.tsx` 中实现选项的条件显示逻辑 (`option.condition`)
  - [ ] 角色的人物卡先用 Fake 数据 (当前仍使用 `FakerCharacter()`)
  - [ ] 先不实现剧情卡片底部选项的具体判断，让玩家自己先选 (部分选项的条件判断已在数据结构中预留，但未在UI实现)
- [ ] 实现全局级别的投骰子能力 (目前检定逻辑中的掷骰为占位符)
- [ ] 基于投骰子能力，实现 Call of Cthulhu 7th Ed. 规则中定义的相关判定能力，并接入到游戏中 (当前检定逻辑为简化版)
- [ ] 根据剧情开头的交互来生成真正的角色数据，提供相应的界面支持。
  - 用户随时可以在底部查看自己的重要属性
  - 点击底部后会弹出显示用户角色详细数据的浮动卡片
