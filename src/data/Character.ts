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
    starting: number
    current: number
    max: number
    isIndefinitelyInsane: boolean // 永久性疯狂
    isTemporarilyInsane: boolean // 暂时性疯狂
  }
  magicPoints: {
    current: number
    max: number
  }
  luck: number
  characteristics: {
    str: number
    con: number
    dex: number
    app: number
    edu: number
    pow: number
    siz: number
    int: number
  }
  personalData: {
    damageBonus: number // 伤害加值
    build: number // 体格
    dodge: number // 闪避
    occupationSkills: {
      [name: string]: number
    }
    personalInterests: {
      [name: string]: number
    }
  }
  skills: {
    [name: string]: number
  }
  weapons: Weapon[]
}

export type Dice = 4 | 6 | 8 | 10 | 12 | 20

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
