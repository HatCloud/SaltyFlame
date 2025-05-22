import { Character, Dice, Weapon } from '../interface/Character'
import { allOccupationTemplates, OccupationTemplate } from '../data/occupations' // Import occupation templates
import { CheckObjectKey } from '../interface/enums' // For skill keys
import { rollDie } from './utils' // Import rollDie

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
const generateCharacter = (): Character => {
  // Select a random occupation template
  const randomTemplateIndex = Math.floor(
    Math.random() * allOccupationTemplates.length,
  )
  const selectedOccupationTemplate: OccupationTemplate =
    allOccupationTemplates[randomTemplateIndex]

  const newSkills: { [name: string]: number } = {}
  const occupationSkillsData: { [name: string]: number } = {}
  const personalInterestsData: { [name: string]: number } = {}

  // Assign occupational skills
  selectedOccupationTemplate.occupationalSkills.forEach(skillKey => {
    const skillName = CheckObjectKey[skillKey] // Get string name from enum key
    let skillValue =
      selectedOccupationTemplate.occupationalSkillTargets[skillKey] || 0
    skillValue = Math.min(skillValue, 75) // Cap at 75
    newSkills[skillName] = skillValue
    occupationSkillsData[skillName] = skillValue
  })

  // Assign interest skills
  // For FakerCharacter, let's assign a base random value then add 20, capped at 75
  // A more robust implementation would derive base from characteristics if needed.
  selectedOccupationTemplate.interestSkills.forEach(skillKey => {
    const skillName = CheckObjectKey[skillKey]
    const baseValue = Math.floor(Math.random() * 30) + 5 // Random base (5-34)
    const skillValue = Math.min(baseValue + 20, 75) // Add 20, cap at 75

    // Ensure interest skill doesn't overwrite a potentially higher occupational skill
    if (!newSkills[skillName] || newSkills[skillName] < skillValue) {
      newSkills[skillName] = skillValue
    }
    personalInterestsData[skillName] = skillValue // Store with the final value
  })

  // Add some other common skills with very basic random values if not already set
  const commonSkills = [
    CheckObjectKey.DODGE, // Dodge base is DEX/2, but here just random
    CheckObjectKey.LISTEN,
    CheckObjectKey.SPOT_HIDDEN, // Already an occupational skill for Doctor, might be for others
  ]
  commonSkills.forEach(skillKey => {
    const skillName = CheckObjectKey[skillKey]
    if (!newSkills[skillName]) {
      newSkills[skillName] = Math.floor(Math.random() * 25) + 10 // Random (10-34)
    }
  })
  // Ensure Dodge is present, as it's often calculated from DEX.
  // For Faker, if not set by occupation/interest, give a base.
  // personalData.dodge will be set later based on characteristics.
  // This will be overridden by DEX/2 calculation later if not set by occupation/interest.
  if (!newSkills[CheckObjectKey[CheckObjectKey.DODGE]]) {
    newSkills[CheckObjectKey[CheckObjectKey.DODGE]] =
      Math.floor(Math.random() * 20) + 15 // e.g. 15-34
  }

  const characteristics = {
    str: (rollDie(6) + rollDie(6) + rollDie(6)) * 5,
    con: (rollDie(6) + rollDie(6) + rollDie(6)) * 5,
    dex: (rollDie(6) + rollDie(6) + rollDie(6)) * 5,
    app: (rollDie(6) + rollDie(6) + rollDie(6)) * 5,
    edu: (rollDie(6) + rollDie(6) + rollDie(6) + 3) * 5,
    pow: (rollDie(6) + rollDie(6) + rollDie(6)) * 5,
    siz: (rollDie(6) + rollDie(6) + 6) * 5,
    int: (rollDie(6) + rollDie(6) + 6) * 5,
  }

  // Calculate derived stats
  const hpMax = Math.ceil((characteristics.con + characteristics.siz) / 10)
  const startingSanity = characteristics.pow // In 7e, Sanity = POW. Max is 99 - Cthulhu Mythos.
  const mpMax = Math.floor(characteristics.pow / 5)
  const dodgeBase = Math.floor(characteristics.dex / 2)

  // Update Dodge skill if not set by occupation/interest to a higher value
  const dodgeSkillName = CheckObjectKey[CheckObjectKey.DODGE]
  if (!newSkills[dodgeSkillName] || newSkills[dodgeSkillName] < dodgeBase) {
    newSkills[dodgeSkillName] = dodgeBase
  }

  // Calculate Damage Bonus and Build
  let damageBonus = 0
  let build = 0
  const strPlusSiz = characteristics.str + characteristics.siz

  if (strPlusSiz <= 64) {
    damageBonus = -2
    build = -2
  } else if (strPlusSiz <= 84) {
    damageBonus = -1
    build = -1
  } else if (strPlusSiz <= 124) {
    damageBonus = 0
    build = 0
  } else if (strPlusSiz <= 164) {
    damageBonus = 2 // Approx avg of 1d4
    build = 1
  } else if (strPlusSiz <= 204) {
    damageBonus = 3 // Approx avg of 1d6
    build = 2
  } else if (strPlusSiz <= 284) {
    // For 2d6 (avg 7), let's use a number. For simplicity, let's say 4 for now.
    // A more accurate system might store "2D6" as string if Effect system could parse it for damage.
    damageBonus = 4
    build = 3
  } // Can extend further if needed

  return {
    name: 'Jeff', // Still using a fixed name for simplicity in Faker
    occupation: selectedOccupationTemplate.name_cn, // Use selected occupation
    age: Math.floor(Math.random() * 40) + 20, // Age 20-59
    sex: Math.random() < 0.5 ? 'M' : 'F',
    birthplace: `Birthplace ${Math.floor(Math.random() * 100) + 1}`,
    residence: `Residence ${Math.floor(Math.random() * 100) + 1}`,
    hitPoints: {
      current: hpMax,
      max: hpMax,
      isDying: false,
      isMajorWound: false,
    },
    sanity: {
      starting: startingSanity,
      current: startingSanity,
      max: 99, // Max sanity is 99 minus Cthulhu Mythos skill points
      isIndefinitelyInsane: false,
      isTemporarilyInsane: false,
    },
    magicPoints: {
      current: mpMax,
      max: mpMax,
    },
    luck: Math.floor(Math.random() * 70) + 30, // Luck 30-99
    characteristics: characteristics, // Use the calculated characteristics
    personalData: {
      damageBonus: damageBonus,
      build: build,
      dodge: newSkills[dodgeSkillName], // Use the final dodge value from skills
      occupationSkills: occupationSkillsData,
      personalInterests: personalInterestsData,
    },
    skills: newSkills,
    inventory: [], // Keep random inventory for now
    markedSkills: [],
  } // This closing brace was misplaced, it should be after the return statement's object.
}

export default generateCharacter
