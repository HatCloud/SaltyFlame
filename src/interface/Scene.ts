import {
  CheckObjectKey,
  CheckDifficulty,
  ConditionType,
  EffectType,
} from '../constant/enums'
import { Weapon } from '../interface/Character' // Import Weapon type

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
  item?: string | Weapon // For ADD_ITEM, REMOVE_ITEM: the item name or Weapon object
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

// 选项：点击后触发自定义导航
export interface CustomNavigationOption {
  type: 'custom_navigation'
  text: string // 按钮上显示的文本
  condition?: Condition // 选项的显示条件 (可选)
  navigationTarget: 'AttributeAllocationScreen' // 标识导航目标屏幕的键
  onCompleteNavigateToSceneId: string // 导航到的屏幕完成后，应跳转到的场景ID
  attributeValuesToAssign?: number[] // (可选) 需要在目标屏幕上分配的属性数值列表
  effects?: Effect[] // 点击选项后、导航前应用的效果 (可选)
}

// 玩家可交互的选项是以上三者的联合类型
export type SceneInteractOption =
  | CheckDrivenOption
  | GotoDrivenOption
  | CustomNavigationOption

// 场景定义
export interface Scene {
  id: string
  story: string
  image?: string // 场景图片 (可选)
  options?: SceneInteractOption[] // 场景的所有交互都通过选项进行
  isEndScene?: boolean // 标记此场景是否为故事线结局
  info?: string // 场景的额外信息 (可选)
}

// 游戏中所有场景数据的结构
export interface SceneData {
  [sceneId: string]: Scene
}
