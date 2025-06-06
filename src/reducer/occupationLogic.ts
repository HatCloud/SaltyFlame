import { Language } from '../interface/MyAppState'
import { Character } from '../interface/Character'
import {
  SkillKey,
  CheckObjectDefaultValues,
  CoreCharacteristicEnum,
  SkillEnum,
} from '../constant/enums'
import { occupationTemplates, OccupationKey } from '../data/occupations'

export function applyOccupationToCharacter(
  characterToUpdate: Character | null,
  occupationKey: OccupationKey,
  language: Language,
): Character | null {
  if (!characterToUpdate) {
    console.warn(
      'applyOccupationToCharacter: characterData is null. Cannot apply occupation.',
    )
    return null
  }

  const template = occupationTemplates[occupationKey]
  if (!template) {
    console.warn(`Occupation template not found for key: ${occupationKey}`)
    return characterToUpdate // Return original character if template not found
  }

  // Prepare the updated skills
  const newSkills = { ...(characterToUpdate.skills || {}) }

  // Apply +20 to interest skills, capped at 75
  if (template.interestSkills) {
    ;(template.interestSkills as SkillKey[]).forEach((skillKey: SkillKey) => {
      const currentSkillValue = newSkills?.[skillKey]
      let baseValue = 0

      if (typeof currentSkillValue === 'number') {
        baseValue = currentSkillValue
      } else {
        const defaultSkillInfo = CheckObjectDefaultValues[skillKey]
        if (typeof defaultSkillInfo === 'number') {
          baseValue = defaultSkillInfo
        } else if (typeof defaultSkillInfo === 'string') {
          if (
            defaultSkillInfo === 'DEX/2' &&
            characterToUpdate.characteristics[CoreCharacteristicEnum.DEX]
          ) {
            baseValue = Math.floor(
              characterToUpdate.characteristics[CoreCharacteristicEnum.DEX] / 2,
            )
          } else if (
            defaultSkillInfo === 'EDU' &&
            characterToUpdate.characteristics[CoreCharacteristicEnum.EDU]
          ) {
            baseValue =
              characterToUpdate.characteristics[CoreCharacteristicEnum.EDU]
          } else {
            console.warn(
              `Unhandled string base for ${skillKey}: ${defaultSkillInfo}`,
            )
            baseValue = 0
          }
        } else {
          baseValue = 0 // Default to 0 if no base value found
        }
      }
      newSkills[skillKey] = Math.min(baseValue + 20, 75)
    })
  }

  // Generate random credit rating
  const [minCr, maxCr] = template.creditRatingRange
  const randomCreditRating =
    Math.floor(Math.random() * (maxCr - minCr + 1)) + minCr
  newSkills[SkillEnum.CREDIT_RATING] = randomCreditRating

  // Update characterData with example prefill data and other occupation data
  const updatedCharacterData: Character = {
    ...characterToUpdate,
    name:
      language === 'cn'
        ? template.exampleCharacterName_cn || characterToUpdate.name
        : template.exampleCharacterName_en || characterToUpdate.name,
    sex: template.exampleCharacterSex || characterToUpdate.sex,
    age: template.exampleCharacterAge || characterToUpdate.age,
    birthplace:
      language === 'cn'
        ? template.exampleCharacterBirthplace_cn || characterToUpdate.birthplace
        : template.exampleCharacterBirthplace_en ||
          characterToUpdate.birthplace,
    residence:
      language === 'cn'
        ? template.exampleCharacterResidence_cn || characterToUpdate.residence
        : template.exampleCharacterResidence_en || characterToUpdate.residence,
    occupation: language === 'cn' ? template.name_cn : template.name_en,
    background:
      language === 'cn' ? template.background_cn : template.background_en,
    skills: newSkills,
  }
  return updatedCharacterData
}
