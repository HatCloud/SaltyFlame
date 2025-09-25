import { useCallback } from 'react'
import type { Character } from '../interface/Character'
import type { Condition } from '../interface/Scene'
import {
  ConditionType,
  CoreCharacteristicKey,
  RollEnum,
} from '../constant/enums'
import { useConditionDescription } from './useConditionDescription'

export const useCheckCondition = () => {
  const { getConditionDescription } = useConditionDescription()

  const checkCondition = useCallback(
    (
      condition: Condition,
      characterData: Character | null,
      gameFlags: Record<string, boolean | number | string> | undefined,
      history: string[],
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
        case ConditionType.COMPARE:
          if (
            condition.targetObject &&
            condition.comparisonObject !== undefined &&
            condition.comparisonOperator &&
            characterData
          ) {
            const objectKey = condition.targetObject
            if (!objectKey) {
              met = false
              break
            }
            let targetValue: number
            if (objectKey in characterData.characteristics) {
              targetValue =
                characterData.characteristics[
                  objectKey as CoreCharacteristicKey
                ]
            } else if (objectKey === RollEnum.SANITY) {
              targetValue = characterData.sanity.current
            } else {
              met = false
              break
            }

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
            } else if (condition.comparisonObject === RollEnum.SANITY) {
              comparisonValue = characterData.sanity.current
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
        case ConditionType.NOT_GONE: {
          // Check if the scene has not been visited
          if (
            !condition.expectedValue ||
            typeof condition.expectedValue !== 'string'
          ) {
            met = false // If no expected value, default to not met
          } else {
            // Check if the scene ID is not in the gone list
            met = !history?.includes(condition.expectedValue)
          }
          break
        }
        case ConditionType.HAS_GONE_SOME_SCENE: {
          // Check if any of the gone scene IDs are in the history
          if (
            !condition.sceneGoneIds ||
            !Array.isArray(condition.sceneGoneIds)
          ) {
            met = false // If no gone IDs, default to not met
          } else {
            // 需要检查一下满足条件（condition.sceneGoneIds中的）去过的场景ID的数量是否超过 condition.expectedValue
            const goneCount = condition.sceneGoneIds.reduce(
              (count, sceneId) => count + (history.includes(sceneId) ? 1 : 0),
              0,
            )
            if (condition.expectedValue === undefined) {
              met = goneCount > 0 // 如果没有期望值，则只要有去过一个场景就满足条件
            } else if (typeof condition.expectedValue === 'number') {
              met = goneCount >= condition.expectedValue // 检查是否去过的场景数量大于等于期望值
            } else {
              met = false // 如果期望值不是数字，则不满足条件
            }
          }
          break
        }
        case ConditionType.ALIVE: {
          if (condition.expectedValue === false) {
            met = characterData.hitPoints.current <= 0
          } else {
            met = characterData.hitPoints.current > 0
          }
          break
        }
        case ConditionType.IS_MAJOR_WOUND: {
          // 检查是否有重伤
          if (condition.expectedValue === false) {
            met = characterData.hitPoints.isMajorWound === false
          } else {
            met = characterData.hitPoints.isMajorWound
          }
          break
        }
      }
      console.log(`Condition check for ${condition.type} met: ${met}`, {
        condition,
        characterData,
        gameFlags,
        history,
      })
      return { met, description }
    },
    [getConditionDescription],
  )

  return { checkCondition }
}
