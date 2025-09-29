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

  // 遍历 newSkills 中的技能，如果这个值存在于 template 的 occupationalSkillTargets 中，
  Object.keys(newSkills).forEach(skillKey => {
    if (skillKey in template.occupationalSkillTargets) {
      const targetValue =
        template.occupationalSkillTargets[skillKey as SkillKey]
      if (typeof targetValue === 'number') {
        // 直接设置为目标值，且不超过 75
        newSkills[skillKey as SkillKey] = Math.min(targetValue, 75)
      }
    }
  })

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

  newSkills[SkillEnum.CREDIT_RATING] = template.creditRating

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
