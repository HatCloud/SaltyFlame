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
    occupationSkills: {
      [name: string]: number // These are points to be distributed, not final skill values
    }
    personalInterests: {
      [name: string]: number // These are points to be distributed, not final skill values
    }
  }
  // Final skill values after points allocation
  skills: Partial<Record<SkillKey, number>> // Using Partial as not all skills might have points or be known
  inventory: (string | Weapon)[] // Inventory can hold item names or Weapon objects
  markedSkills: SkillKey[] // Tracks skills successfully used, using SkillKey for type safety
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
