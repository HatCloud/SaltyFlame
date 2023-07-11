// 生成一个随机的骰子面数
import {Character, Dice, Weapon} from '../../data/Character'

// 生成一个随机的骰子面数
const randomDice = (): Dice => {
  const possibleValues: Dice[] = [4, 6, 8, 10, 12, 20]
  return possibleValues[Math.floor(Math.random() * possibleValues.length)]
}

// 生成一个随机的 weapon 对象
const randomWeapon = (): Weapon => ({
  name: `Weapon ${Math.floor(Math.random() * 100) + 1}`,
  diceCount: Math.ceil(Math.random() * 3),
  dice: randomDice(),
  range: Math.floor(Math.random() * 500),
  ammoCapacity: Math.floor(Math.random() * 25),
  malfunctions: Math.floor(Math.random() * 10),
  notes: `Notes ${Math.floor(Math.random() * 100) + 1}`,
})

// 生成一个假的 character 对象
const generateCharacter = (): Character => ({
  name: 'Jeff',
  occupation: '私家侦探',
  age: Math.floor(Math.random() * 99) + 1,
  sex: Math.random() < 0.5 ? 'M' : 'F',
  birthplace: `Birthplace ${Math.floor(Math.random() * 100) + 1}`,
  residence: `Residence ${Math.floor(Math.random() * 100) + 1}`,
  hitPoints: {
    current: Math.floor(Math.random() * 20),
    max: Math.floor(Math.random() * 20),
    isDying: Math.random() < 0.5,
    isMajorWound: Math.random() < 0.5,
  },
  sanity: {
    starting: Math.floor(Math.random() * 99) + 1,
    current: Math.floor(Math.random() * 99) + 1,
    max: Math.floor(Math.random() * 99) + 1,
    isIndefinitelyInsane: Math.random() < 0.5,
    isTemporarilyInsane: Math.random() < 0.5,
  },
  magicPoints: {
    current: Math.floor(Math.random() * 99) + 1,
    max: Math.floor(Math.random() * 99) + 1,
  },
  luck: Math.floor(Math.random() * 99) + 1,
  characteristics: {
    str: Math.floor(Math.random() * 99) + 1,
    con: Math.floor(Math.random() * 99) + 1,
    dex: Math.floor(Math.random() * 99) + 1,
    app: Math.floor(Math.random() * 99) + 1,
    edu: Math.floor(Math.random() * 99) + 1,
    pow: Math.floor(Math.random() * 99) + 1,
    siz: Math.floor(Math.random() * 99) + 1,
    int: Math.floor(Math.random() * 99) + 1,
  },
  personalData: {
    damageBonus: Math.floor(Math.random() * 10),
    build: Math.floor(Math.random() * 99) + 1,
    dodge: Math.floor(Math.random() * 99) + 1,
    occupationSkills: {
      Skill1: Math.floor(Math.random() * 99) + 1,
      Skill2: Math.floor(Math.random() * 99) + 1,
    },
    personalInterests: {
      Interest1: Math.floor(Math.random() * 99) + 1,
      Interest2: Math.floor(Math.random() * 99) + 1,
    },
  },
  skills: {
    Skill1: Math.floor(Math.random() * 99) + 1,
    Skill2: Math.floor(Math.random() * 99) + 1,
  },
  weapons: [randomWeapon(), randomWeapon()],
})

export default generateCharacter
