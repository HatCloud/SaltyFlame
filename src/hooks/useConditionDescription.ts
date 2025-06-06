import { useCallback } from 'react'
import type { Condition } from '../interface/Scene'
import {
  ConditionType,
  CheckObjectNames,
  // CoreCharacteristicKey, // Not directly used in getConditionDescription
} from '../constant/enums'
import type { LanguageCode } from '../i18n/interface'
import { GameFlagNames } from '../constant/GameFlags'
import { useI18n } from '../i18n/useI18n'

export const useConditionDescription = () => {
  const { t, lang } = useI18n()

  const getConditionDescription = useCallback(
    (condition: Condition): string | undefined => {
      const currentLang = lang as LanguageCode // Assuming lang is 'cn' or 'en'
      switch (condition.type) {
        case ConditionType.HAS_ITEM:
          return condition.item
            ? t('condition.hasItem', { item: condition.item })
            : undefined
        case ConditionType.HAS_NOT_ITEM:
          return condition.item
            ? t('condition.hasNotItem', { item: condition.item })
            : undefined
        case ConditionType.FLAG_SET:
          return condition.gameFlag
            ? t('condition.flagSet', {
                flag: GameFlagNames[condition.gameFlag][lang],
              })
            : undefined
        case ConditionType.FLAG_NOT_SET:
          return condition.gameFlag
            ? t('condition.flagNotSet', {
                flag: GameFlagNames[condition.gameFlag][lang],
              })
            : undefined
        case ConditionType.CHARACTERISTIC_COMPARE:
          if (
            condition.targetObject &&
            condition.comparisonOperator &&
            condition.comparisonObject !== undefined
          ) {
            const charName =
              (condition.targetObject &&
                CheckObjectNames[condition.targetObject]?.[currentLang]) ||
              condition.targetObject ||
              ''
            // Simple operator display, can be localized further if needed
            let displayOp = ''
            switch (condition.comparisonOperator) {
              case 'gt':
                displayOp = '>'
                break
              case 'lt':
                displayOp = '<'
                break
              case 'eq':
                displayOp = '='
                break
              case 'gte':
                displayOp = '>='
                break
              case 'lte':
                displayOp = '<='
                break
              default:
                displayOp = condition.comparisonOperator || ''
                break
            }

            return `${charName} ${displayOp} ${condition.comparisonObject}`
          }
          return undefined
        default: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _exhaustiveCheck: never = condition.type // Ensures all cases are handled
          return undefined
        }
      }
    },
    [t, lang],
  )

  return { getConditionDescription }
}
