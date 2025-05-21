import {
  CheckObjectKey,
  CheckDifficulty,
  ConditionType,
  EffectType,
} from './enums'

// 基础检定定义
export interface Check {
  object: 'skill' | 'characteristic' | 'luck'
  subObject: CheckObjectKey // 例如 CheckObjectKey.MEDICINE, CheckObjectKey.STRENGTH
  difficulty?: CheckDifficulty
  // bonusDice?: number; // 未来可扩展奖励骰
  // penaltyDice?: number; // 未来可扩展惩罚骰
}

// 效果定义 (根据项目实际情况可能更复杂)
export interface Effect {
  type: EffectType // 例如 EffectType.GAIN_ITEM, EffectType.LOSE_HP
  target?: string // 例如 物品名称, 或 'hp', 'san'
  value?: string | number // 例如 '1D3', 1, '克苏鲁的护符'
  gameFlag?: string // 用于设置/取消游戏标记
  flagValue?: boolean // 游戏标记的值
}

// 条件定义 (根据项目实际情况可能更复杂)
export interface Condition {
  type: ConditionType // 例如 ConditionType.HAS_ITEM, ConditionType.GAME_FLAG_SET
  item?: string // 需要检查的物品名称
  gameFlag?: string // 需要检查的游戏标记
  expectedValue?: boolean // 游戏标记的期望值
  // Fields for characteristic comparison
  characteristic?: CheckObjectKey // The characteristic to compare (e.g., SIZ, STR)
  comparisonValue?: number // The value to compare against
  comparisonOperator?: 'gt' | 'lt' | 'eq' | 'gte' | 'lte' // Comparison operator
}

// 通用的“检定核心负载”接口
// 这个接口描述了“进行一次检定，并根据结果决定后续”的完整信息包
export interface CheckPayload {
  details: Check // 具体检定什么
  onSuccessSceneId: string // 成功后跳转到哪个场景
  onFailureSceneId: string // 失败后跳转到哪个场景
  successText?: string // 检定成功后，在当前卡片上显示的提示文本 (可选)
  failureText?: string // 检定失败后，在当前卡片上显示的提示文本 (可选)
  onSuccessEffects?: Effect[] // 检定成功后应用的效果 (可选)
  onFailureEffects?: Effect[] // 检定失败后应用的效果 (可选)
}

// 选项：点击后执行检定
interface CheckDrivenOption {
  text: string
  type: 'check' // 用于类型守卫的辨别字段
  condition?: Condition
  check: CheckPayload // 直接使用通用的 CheckPayload
  effects?: Effect[] // 点击选项后、检定执行前应用的效果 (可选)
}

// 选项：点击后直接跳转
interface GotoDrivenOption {
  text: string
  type: 'goto' // 用于类型守卫的辨别字段
  condition?: Condition
  goto: string
  effects?: Effect[] // 点击选项后、跳转前应用的效果 (可选)
}

// 玩家可交互的选项是以上两者的联合类型
export type SceneInteractOption = CheckDrivenOption | GotoDrivenOption

// 场景定义
export interface Scene {
  id: string
  story: string
  image?: string // 场景图片 (可选)
  options?: SceneInteractOption[] // 场景的所有交互都通过选项进行
  isEndScene?: boolean // 标记此场景是否为故事线结局
  // 其他场景特定属性可在此添加
}

// 游戏中所有场景数据的结构
export interface SceneData {
  [sceneId: string]: Scene
}

// 此接口先前用于场景级检定或辅助检定场景。
// 根据新的设计 (CheckPayload 和 CheckDrivenOption)，它很可能是多余的。
// 暂时注释掉以供迁移时参考，之后可以删除。
/*
export interface SceneCheckOptionDetails {
  check: Check;
  onSuccessSceneId: string;
  onFailureSceneId: string;
  successText?: string;
  failureText?: string;
  // 需要考虑效果是否曾是此接口一部分，并映射到 onSuccessEffects/onFailureEffects
}
*/
