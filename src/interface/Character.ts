import { Dice } from './Dice'
import { CoreCharacteristicKey, SkillKey } from '../constant/enums'

/**
 * character in call of cthulhu
 */
export interface Character {
  name: string
  occupation: string //职业
  age: number
  sex: string
  birthplace: string // 出生地
  residence: string // 住所
  hitPoints: {
    current: number
    max: number
    isDying: boolean // 濒死
    isMajorWound: boolean // 重伤昏迷
  }
  sanity: {
    starting: number // Initial Sanity = POW
    current: number
    max: number // Max Sanity = 99 - Cthulhu Mythos skill
    isIndefinitelyInsane: boolean // 永久性疯狂
    isTemporarilyInsane: boolean // 暂时性疯狂
  }
  magicPoints: {
    current: number
    max: number // Max MP = POW / 5
  }
  luck: number // Initial Luck = 3D6 * 5 or 2D6+6 * 5
  // Core characteristics
  characteristics: {
    [key in CoreCharacteristicKey]: number
  }
  // Derived statistics from characteristics
  personalData: {
    damageBonus: number // 伤害加值 (Calculated from STR + SIZ)
    build: number // 体格 (Calculated from STR + SIZ)
    // Dodge is a skill, its base value is DEX/2, should be in skills.
    // If this 'dodge' is meant to be the final calculated value after points are spent,
    // it might be redundant if skills object holds the final skill values.
    // For now, keeping it as is, but flagging for review.
    // dodge: number // 闪避
    movementRate: number // MOV, calculated or set
  }
  // Final skill values after points allocation
  skills: Partial<Record<SkillKey, number>> // Using Partial as not all skills might have points or be known
  inventory: (string | Weapon)[] // Inventory can hold item names or Weapon objects
  markedSkills: SkillKey[] // Tracks skills successfully used, using SkillKey for type safety
  background?: CharacterBackground // From OccupationTemplate
}

/**
 * weapon in call of cthulhu
 */
export interface Weapon {
  name: string
  diceCount: number
  dice: Dice
  range?: number // 武器的射程范围，单位是英寸
  ammoCapacity?: number // 弹药容量，只适用于需要弹药的武器，如步枪或手枪。
  malfunctions?: number // 武器故障率，该值越高，武器的故障几率就越大。
  notes?: string
}

/**
 * Defines the structure for pre-filled background information for an occupation.
 * These details should be themed for a 1920s setting.
 */
export interface CharacterBackground {
  description: string // 形象描述: e.g., "总是穿着略显磨损但质地优良的粗花呢夹克，戴着一副夹鼻眼镜，眼神锐利。"
  ideologyBeliefs: string // 思想与信念: e.g., "坚信历史中隐藏着不为人知的真相，对神秘主义抱有谨慎的好奇。"
  significantPeople: string // 重要之人: e.g., "一位年迈的大学导师，偶尔会提供些稀奇古怪的委托。"
  meaningfulLocations: string // 意义非凡之地: e.g., "城中那家尘封已久的古籍书店的后室，或是某个偏远乡村的古老遗迹。"
  treasuredPossessions: string // 宝贵之物: e.g., "一本家传的旅行日记，记录着奇异的见闻，或是一件来源神秘的小古董。"
  traits: string // 特质: e.g., "博学但有时略显固执，对细节有着惊人的记忆力。"
  keyConnection?: string // (可选) 用于游戏机制的关键背景连接点，例如指向 'significantPeople'。
  injuriesScars?: string // (可选) 伤口与疤痕: e.g., "在一次考古挖掘中手腕上留下的一道模糊疤痕。"
  phobiasManias?: string // (可选) 恐惧症与躁狂症: e.g., "对密闭空间有轻微的幽闭恐惧，或是对特定类型的古物有收集癖。"
  mythosTomesSpellsArcaneObjects?: string // (可选) 神话典籍、法术&魔法物品的传闻或知识片段。
  encountersWithStrangeEntities?: string // (可选) 第三类接触的模糊记忆或间接证据。
}
