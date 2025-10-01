import { Effect } from '../interface/Scene'
import { Character } from '../interface/Character'
import { EffectType, CheckObjectNames, CheckObjectKey } from '../constant/enums'
import { GameFlag } from '../constant/GameFlags'

export interface EffectDescription {
  title: string
  description: string
}

// Translation function type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TranslateFn = (key: string, params?: Record<string, any>) => string

// Helper function to get skill display name
function getSkillDisplayName(skillKey: string, language: 'cn' | 'en'): string {
  const skillInfo = CheckObjectNames[skillKey as CheckObjectKey]
  return skillInfo ? skillInfo[language] : skillKey
}

export function getEffectDescription(
  effectInfo: {
    effect: Effect
    character: Character
    diceRollResult: number | null
  },
  t: TranslateFn,
): EffectDescription | null {
  const { effect, character, diceRollResult } = effectInfo

  switch (effect.type) {
    case EffectType.CHANGE_HP: {
      const value =
        typeof effect.value === 'number' ? effect.value : diceRollResult || 0
      const title = t('effect.hpChange')

      let description = ''
      if (value > 0) {
        description = t('effect.recovered', { value }) + '\n'
      } else if (value < 0) {
        description = t('effect.lost', { value: -value }) + '\n'
      }

      description += t('effect.currentHp', {
        current: character.hitPoints.current,
        max: character.hitPoints.max,
      })

      if (character.hitPoints.isDying) {
        description += '\n' + t('effect.dying')
      } else if (character.hitPoints.isMajorWound) {
        description += '\n' + t('effect.majorWound')
      }

      return { title, description }
    }

    case EffectType.CHANGE_SANITY: {
      const value =
        typeof effect.value === 'number' ? effect.value : diceRollResult || 0
      const title = t('effect.sanityChange')

      let description = ''
      if (value > 0) {
        description = t('effect.sanityRecovered', { value }) + '\n'
      } else if (value < 0) {
        description = t('effect.sanityLost', { value: -value }) + '\n'
      }

      description += t('effect.currentSanity', {
        current: character.sanity.current,
        max: character.sanity.max,
      })

      return { title, description }
    }

    case EffectType.CHANGE_SKILL: {
      const title = t('effect.skillChange')

      if (!effect.target || effect.value === undefined) {
        return {
          title,
          description: t('effect.incompleteInfo'),
        }
      }

      const value = typeof effect.value === 'number' ? effect.value : 0
      // Get the language from the translation function by checking a known key
      const language = t('common.goBack') === '返回上级' ? 'cn' : 'en'
      const skillName = getSkillDisplayName(effect.target, language)
      const currentSkillValue =
        character.skills[effect.target as keyof typeof character.skills] || 0

      const description =
        value > 0
          ? t('effect.skillIncreased', { skill: skillName, value })
          : t('effect.skillDecreased', { skill: skillName, value: -value })

      const fullDescription =
        description +
        '\n' +
        t('effect.currentSkillValue', { value: currentSkillValue })

      return { title, description: fullDescription }
    }

    case EffectType.ADD_ITEM: {
      const title = t('effect.itemAcquired')

      if (!effect.item) {
        return {
          title,
          description: t('effect.incompleteInfo'),
        }
      }

      const itemName =
        typeof effect.item === 'string' ? effect.item : effect.item.name
      const description = t('effect.acquiredItem', { item: itemName })

      return { title, description }
    }

    case EffectType.REMOVE_ITEM: {
      const title = t('effect.itemLost')

      if (!effect.item) {
        return {
          title,
          description: t('effect.incompleteInfo'),
        }
      }

      const itemName =
        typeof effect.item === 'string' ? effect.item : effect.item.name
      const description = t('effect.lostItem', { item: itemName })

      return { title, description }
    }

    case EffectType.MARK_SKILL_SUCCESS: {
      const title = t('effect.skillGrowth')

      if (!effect.target) {
        return {
          title,
          description: t('effect.incompleteInfo'),
        }
      }

      // Get the language from the translation function by checking a known key
      const language = t('common.goBack') === '返回上级' ? 'cn' : 'en'
      const skillName = getSkillDisplayName(effect.target, language)
      const description = t('effect.skillMarked', { skill: skillName })

      return { title, description }
    }

    case EffectType.SET_FLAG: {
      switch (effect.gameFlag) {
        case GameFlag.PENALTY_DICE_TODAY: {
          return {
            title: t('effect.penaltyDiceTodayTitle'),
            description: t('effect.penaltyDiceTodayDesc'),
          }
        }
        default:
          return null
      }
    }
    case EffectType.CLEAR_FLAG: {
      return null
    }

    default: {
      return null
    }
  }
}
