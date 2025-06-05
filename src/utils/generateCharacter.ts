import { Character } from '../interface/Character'
import {
  CoreCharacteristicEnum,
  RollEnum,
  SkillEnum,
  CoreCharacteristicKey,
  SkillKey,
  CheckObjectDefaultValues,
  CheckObjectKey, // Keep this for CheckObjectDefaultValues, but prefer specific enums elsewhere
} from '../constant/enums'

// Helper type for the input characteristics
type InputCharacteristics = {
  [key in CoreCharacteristicKey]: number
}

// Define lists of keys for easier checking
const coreCharacteristicKeyValues: CoreCharacteristicEnum[] = [
  CoreCharacteristicEnum.STR,
  CoreCharacteristicEnum.CON,
  CoreCharacteristicEnum.SIZ,
  CoreCharacteristicEnum.DEX,
  CoreCharacteristicEnum.APP,
  CoreCharacteristicEnum.INT,
  CoreCharacteristicEnum.POW,
  CoreCharacteristicEnum.EDU,
]

const rollKeyValues: RollEnum[] = [RollEnum.LUCK, RollEnum.SANITY, RollEnum.MOV]

const generateCharacter = (
  initialCharacteristics: InputCharacteristics,
): Character => {
  const characteristics = { ...initialCharacteristics }

  // Calculate derived stats
  const hpMax = Math.ceil(
    (characteristics[CoreCharacteristicEnum.CON] +
      characteristics[CoreCharacteristicEnum.SIZ]) /
      10,
  )
  const startingSanity = characteristics[CoreCharacteristicEnum.POW]
  const mpMax = Math.floor(characteristics[CoreCharacteristicEnum.POW] / 5)

  // Calculate Damage Bonus and Build
  let damageBonus = 0
  let build = 0
  const strPlusSiz =
    characteristics[CoreCharacteristicEnum.STR] +
    characteristics[CoreCharacteristicEnum.SIZ]

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
    damageBonus = 1 // Corresponds to +1D4 in rules, using average-ish for simplicity
    build = 1
  } else if (strPlusSiz <= 204) {
    damageBonus = 2 // Corresponds to +1D6
    build = 2
  } else if (strPlusSiz <= 284) {
    damageBonus = 3 // Corresponds to +2D6
    build = 3
  } else if (strPlusSiz <= 364) {
    damageBonus = 4 // Corresponds to +3D6
    build = 4
  } else if (strPlusSiz <= 444) {
    damageBonus = 5 // Corresponds to +4D6
    build = 5
  } else {
    // For strPlusSiz > 444, it's +5D6, +1D6 for every 80 points over 444
    // Simplified for now
    damageBonus = 6
    build = 6
  }

  // Initialize skills based on default values
  const newSkills: Partial<Record<SkillKey, number>> = {}

  // Iterate over the keys of CheckObjectDefaultValues to find skills
  for (const key in CheckObjectDefaultValues) {
    const currentKey = key as CheckObjectKey // Cast to CheckObjectKey (union type)

    // Check if this key is a skill (i.e., not a core characteristic or a roll key)
    // We need to ensure currentKey is compared against the values of the enums
    if (
      !coreCharacteristicKeyValues.some(val => val === currentKey) &&
      !rollKeyValues.some(val => val === currentKey)
    ) {
      // At this point, currentKey should be a SkillEnum member if logic is correct
      // However, CheckObjectDefaultValues is indexed by CheckObjectKey (the union type)
      // and SkillKey is a type alias for SkillEnum members.
      // We need to ensure that currentKey is indeed a valid SkillKey before using it as such.
      // A simple way is to check if it exists in SkillEnum.
      // This check might be redundant if CheckObjectDefaultValues is perfectly structured,
      // but adds safety.
      let isSkill = false
      for (const sk in SkillEnum) {
        if (SkillEnum[sk as keyof typeof SkillEnum] === currentKey) {
          isSkill = true
          break
        }
      }

      if (isSkill) {
        const skillKey = currentKey as SkillKey // Safe to cast now
        const defaultValue = CheckObjectDefaultValues[skillKey] // This should be valid

        if (defaultValue !== undefined) {
          if (typeof defaultValue === 'number') {
            newSkills[skillKey] = defaultValue
          } else if (typeof defaultValue === 'string') {
            if (defaultValue === 'DEX/2') {
              newSkills[skillKey] = Math.floor(
                characteristics[CoreCharacteristicEnum.DEX] / 2,
              )
            } else if (defaultValue === 'EDU') {
              newSkills[skillKey] = characteristics[CoreCharacteristicEnum.EDU]
            } else {
              console.warn(
                `Unhandled string default for skill ${skillKey}: ${defaultValue}`,
              )
              newSkills[skillKey] = 0 // Or some other fallback
            }
          }
        }
      }
    }
  }
  // Ensure specific skills like Cthulhu Mythos always start at 0 if not otherwise set
  if (newSkills[SkillEnum.CTHULHU_MYTHOS] === undefined) {
    newSkills[SkillEnum.CTHULHU_MYTHOS] = 0
  }

  // Determine Movement Rate (MOV)
  // Standard CoC 7e rules for MOV:
  // If DEX < SIZ and STR < SIZ: MOV = 7
  // If STR >= SIZ or DEX >= SIZ (but not both): MOV = 8
  // If STR >= SIZ and DEX >= SIZ: MOV = 9
  // Humans with STR, DEX, or SIZ of 100+ or 10- may have MOV adjusted.
  let movementRate = 8 // Default MOV
  if (
    characteristics[CoreCharacteristicEnum.DEX] <
      characteristics[CoreCharacteristicEnum.SIZ] &&
    characteristics[CoreCharacteristicEnum.STR] <
      characteristics[CoreCharacteristicEnum.SIZ]
  ) {
    movementRate = 7
  } else if (
    characteristics[CoreCharacteristicEnum.STR] >=
      characteristics[CoreCharacteristicEnum.SIZ] &&
    characteristics[CoreCharacteristicEnum.DEX] >=
      characteristics[CoreCharacteristicEnum.SIZ]
  ) {
    movementRate = 9
  }

  return {
    name: 'Unknown', // Generic name
    occupation: 'Unknown', // Occupation is not determined by this function anymore
    age: 0, // Generic age
    sex: 'Unknown', // Generic sex
    birthplace: 'Unknown',
    residence: 'Unknown',
    hitPoints: {
      current: hpMax,
      max: hpMax,
      isDying: false,
      isMajorWound: false,
    },
    sanity: {
      starting: startingSanity,
      current: startingSanity,
      max: 99 - (newSkills[SkillEnum.CTHULHU_MYTHOS] || 0), // Max sanity adjusted by Cthulhu Mythos
      isIndefinitelyInsane: false,
      isTemporarilyInsane: false,
    },
    magicPoints: {
      current: mpMax,
      max: mpMax,
    },
    luck: characteristics[CoreCharacteristicEnum.POW], // Initial luck often based on POW or rolled (e.g. 3d6*5)
    // For simplicity, using POW as a placeholder.
    characteristics: characteristics,
    personalData: {
      damageBonus: damageBonus,
      build: build,
      movementRate: movementRate,
    },
    skills: newSkills,
    inventory: [],
    markedSkills: [],
  }
}

export default generateCharacter
