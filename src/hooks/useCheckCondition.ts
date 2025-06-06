import { useCallback } from 'react'
import type { Character } from '../interface/Character'
import type { Condition } from '../interface/Scene'
import { ConditionType, CoreCharacteristicKey } from '../constant/enums'
import { useConditionDescription } from './useConditionDescription'

export const useCheckCondition = () => {
  const { getConditionDescription } = useConditionDescription()

  const checkCondition = useCallback(
    (
      condition: Condition,
      characterData: Character | null,
      gameFlags: Record<string, boolean | number | string> | undefined,
    ): { met: boolean; description?: string } => {
      const description = getConditionDescription(condition)
      if (!characterData) return { met: false, description } // Cannot check conditions without character data

      let met = false
      switch (condition.type) {
        case ConditionType.HAS_ITEM:
          if (!condition.item) {
            break
          }
          met =
            characterData.inventory.find(item => {
              if (typeof item === 'string') {
                // Direct string comparison
                return item === condition.item
              } else {
                // Item object comparison
                return item.name === condition.item
              }
            }) !== undefined
          break
        case ConditionType.HAS_NOT_ITEM:
          if (!condition.item) {
            break
          }
          met =
            characterData.inventory.find(item => {
              if (typeof item === 'string') {
                return item === condition.item
              } else {
                return item.name === condition.item
              }
            }) === undefined
          break
        case ConditionType.FLAG_SET:
          if (!condition.gameFlag || !gameFlags) {
            met = true // Or false, depending on desired behavior for missing flags/gameFlags object
            break
          }
          if (condition.expectedValue === undefined) {
            met = condition.gameFlag in gameFlags
            break
          }
          met = gameFlags[condition.gameFlag] === condition.expectedValue
          break
        case ConditionType.FLAG_NOT_SET:
          if (!condition.gameFlag || !gameFlags) {
            met = true // Or false
            break
          }
          if (condition.expectedValue === undefined) {
            met = !(condition.gameFlag in gameFlags)
            break
          }
          met = gameFlags[condition.gameFlag] !== condition.expectedValue
          break
        case ConditionType.CHARACTERISTIC_COMPARE:
          if (
            condition.targetObject &&
            condition.comparisonObject !== undefined &&
            condition.comparisonOperator &&
            characterData
          ) {
            const characteristicKey = condition.targetObject
            if (!characteristicKey) {
              met = false
              break
            }
            if (!(characteristicKey in characterData.characteristics)) {
              met = false
              break
            }
            const targetValue =
              characterData.characteristics[
                characteristicKey as CoreCharacteristicKey
              ]

            let comparisonValue: number | undefined
            if (typeof condition.comparisonObject === 'number') {
              comparisonValue = condition.comparisonObject
            } else if (
              condition.comparisonObject in characterData.characteristics
            ) {
              comparisonValue =
                characterData.characteristics[
                  condition.comparisonObject as CoreCharacteristicKey
                ]
            }
            if (comparisonValue === undefined) {
              met = false
              break
            }
            switch (condition.comparisonOperator) {
              case 'gt':
                met = targetValue > comparisonValue
                break
              case 'lt':
                met = targetValue < comparisonValue
                break
              case 'eq':
                met = targetValue === comparisonValue
                break
              case 'gte':
                met = targetValue >= comparisonValue
                break
              case 'lte':
                met = targetValue <= comparisonValue
                break
              default:
                met = false
            }
          } else {
            met = false
          }
          break
        default: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _exhaustiveCheck: never = condition.type
          met = true // If condition type is unknown, default to met
        }
      }
      return { met, description }
    },
    [getConditionDescription],
  )

  return { checkCondition }
}
