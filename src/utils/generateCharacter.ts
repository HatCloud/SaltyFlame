import { Character } from '../interface/Character'
import {
  CheckObjectKey,
  CoreCharacteristicKey,
  SkillKey,
  CheckObjectDefaultValues,
} from '../constant/enums'

// Helper type for the input characteristics
type InputCharacteristics = {
  [key in CoreCharacteristicKey]: number
}

const generateCharacter = (
  initialCharacteristics: InputCharacteristics,
): Character => {
  const characteristics = { ...initialCharacteristics }

  // Calculate derived stats
  const hpMax = Math.ceil(
    (characteristics[CheckObjectKey.CON] +
      characteristics[CheckObjectKey.SIZ]) /
      10,
  )
  const startingSanity = characteristics[CheckObjectKey.POW]
  const mpMax = Math.floor(characteristics[CheckObjectKey.POW] / 5)

  // Calculate Damage Bonus and Build
  let damageBonus = 0
  let build = 0
  const strPlusSiz =
    characteristics[CheckObjectKey.STR] + characteristics[CheckObjectKey.SIZ]

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

  // Iterate over all possible SkillKeys to ensure all skills are considered
  for (const key in CheckObjectKey) {
    if (Object.prototype.hasOwnProperty.call(CheckObjectKey, key)) {
      const skillEnumKey = key as keyof typeof CheckObjectKey
      const skillKey = CheckObjectKey[skillEnumKey] as SkillKey // Cast to SkillKey

      // Check if this key is actually a skill by seeing if it's in SkillKey type definition
      // This is a bit of a workaround because we don't have a direct list of SkillKey values from the type
      // A safer way would be to have an array of SkillKey values.
      // For now, we assume any key in CheckObjectDefaultValues that isn't a CoreCharacteristicKey or RollKey is a skill.

      const defaultValue = CheckObjectDefaultValues[skillKey]

      if (defaultValue !== undefined) {
        if (typeof defaultValue === 'number') {
          newSkills[skillKey] = defaultValue
        } else if (typeof defaultValue === 'string') {
          if (defaultValue === 'DEX/2') {
            newSkills[skillKey] = Math.floor(
              characteristics[CheckObjectKey.DEX] / 2,
            )
          } else if (defaultValue === 'EDU') {
            newSkills[skillKey] = characteristics[CheckObjectKey.EDU]
          } else {
            // For other string-based defaults not yet handled (e.g. "STR+DEX"), default to 0 or a base
            console.warn(
              `Unhandled string default for skill ${skillKey}: ${defaultValue}`,
            )
            newSkills[skillKey] = 0 // Or some other fallback
          }
        }
      } else {
        // If a skill is not in CheckObjectDefaultValues, it might default to 0 or a very low base.
        // For now, let's assume 0 if not specified.
        // This part depends on how SkillKey is defined and if all its members are in CheckObjectDefaultValues
      }
    }
  }
  // Ensure specific skills like Cthulhu Mythos always start at 0 if not otherwise set
  if (newSkills[CheckObjectKey.CTHULHU_MYTHOS] === undefined) {
    newSkills[CheckObjectKey.CTHULHU_MYTHOS] = 0
  }

  // Determine Movement Rate (MOV)
  // Standard CoC 7e rules for MOV:
  // If DEX < SIZ and STR < SIZ: MOV = 7
  // If STR >= SIZ or DEX >= SIZ (but not both): MOV = 8
  // If STR >= SIZ and DEX >= SIZ: MOV = 9
  // Humans with STR, DEX, or SIZ of 100+ or 10- may have MOV adjusted.
  let movementRate = 8 // Default MOV
  if (
    characteristics[CheckObjectKey.DEX] < characteristics[CheckObjectKey.SIZ] &&
    characteristics[CheckObjectKey.STR] < characteristics[CheckObjectKey.SIZ]
  ) {
    movementRate = 7
  } else if (
    characteristics[CheckObjectKey.STR] >=
      characteristics[CheckObjectKey.SIZ] &&
    characteristics[CheckObjectKey.DEX] >= characteristics[CheckObjectKey.SIZ]
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
      max: 99 - (newSkills[CheckObjectKey.CTHULHU_MYTHOS] || 0), // Max sanity adjusted by Cthulhu Mythos
      isIndefinitelyInsane: false,
      isTemporarilyInsane: false,
    },
    magicPoints: {
      current: mpMax,
      max: mpMax,
    },
    luck: characteristics[CheckObjectKey.POW], // Initial luck often based on POW or rolled (e.g. 3d6*5)
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
