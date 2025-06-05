import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { Character } from '../../interface/Character'
import { Condition } from '../../interface/Scene'
import { ConditionType, CheckObjectNames } from '../../constant/enums' // Corrected import for ConditionType, CheckObjectKey removed
import type { LanguageCode } from '../../i18n/types'
// Assuming gameFlags will be part of MyAppState, adjust import if necessary
// import { MyAppState } from '../../interface/MyAppState';
import { padding } from '../../theme/padding'
import palette from '../../theme/palette'
import { typeface } from '../../theme/typeface'
import { useAppReducer } from '../../hook'
import type { Scene, SceneInteractOption } from '../../interface/Scene'
import OptionButton from './OptionButton'
import CheckResult from './CheckResult'
import CheckOption from './CheckOption'
import { useI18n } from '../../i18n/useI18n'
import { useNavigation } from '@react-navigation/native' // Added
import { StackNavigationProp } from '@react-navigation/stack' // Added
import { RootStackParamList } from '../../App' // Added

// LanguageCode import might be needed if `lang` from useI18n is used by getConditionDescription

// Define navigation prop type for this screen
type StoryCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SceneScreen' // Assuming StoryCard is primarily used within SceneScreen context for navigation
>

const StoryCard: React.FC = React.memo(() => {
  const [state, dispatch] = useAppReducer()
  const navigation = useNavigation<StoryCardNavigationProp>() // Added
  const { t, lang } = useI18n() // lang might be needed for getConditionDescription
  const currentScene: Scene | undefined =
    state.sceneData?.[state.currentSceneKey]

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
            ? t('condition.flagSet', { flag: condition.gameFlag })
            : undefined
        case ConditionType.FLAG_NOT_SET:
          return condition.gameFlag
            ? t('condition.flagNotSet', { flag: condition.gameFlag })
            : undefined
        case ConditionType.CHARACTERISTIC_COMPARE:
          if (
            condition.characteristic &&
            condition.comparisonOperator &&
            condition.comparisonValue !== undefined
          ) {
            const charName =
              (condition.characteristic &&
                CheckObjectNames[condition.characteristic]?.[currentLang]) ||
              condition.characteristic ||
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

            return `${charName} ${displayOp} ${condition.comparisonValue}`
          }
          return undefined
        default:
          return undefined
      }
    },
    [t, lang],
  )

  // Helper function to check conditions
  const checkCondition = useCallback(
    (
      condition: Condition,
      characterData: Character | null,
      gameFlags: Record<string, boolean> | undefined, // Assuming gameFlags on state
    ): { met: boolean; description?: string } => {
      const description = getConditionDescription(condition)
      if (!characterData) return { met: false, description } // Cannot check conditions without character data

      let met = false
      switch (condition.type) {
        case ConditionType.HAS_ITEM:
          if (condition.item && gameFlags) {
            met =
              gameFlags[`item_${condition.item}`] ===
              (condition.expectedValue !== undefined
                ? condition.expectedValue
                : true)
          } else {
            met = true // Placeholder
          }
          break
        case ConditionType.HAS_NOT_ITEM:
          if (condition.item && gameFlags) {
            met =
              gameFlags[`item_${condition.item}`] ===
              (condition.expectedValue !== undefined
                ? !condition.expectedValue
                : false)
          } else {
            met = true // Placeholder
          }
          break
        case ConditionType.FLAG_SET:
          if (condition.gameFlag && gameFlags) {
            met =
              gameFlags[condition.gameFlag] ===
              (condition.expectedValue !== undefined
                ? condition.expectedValue
                : true)
          } else {
            met = true // Placeholder
          }
          break
        case ConditionType.FLAG_NOT_SET:
          if (condition.gameFlag && gameFlags) {
            met =
              gameFlags[condition.gameFlag] ===
              (condition.expectedValue !== undefined
                ? !condition.expectedValue
                : false)
          } else {
            met = true // Placeholder
          }
          break
        case ConditionType.CHARACTERISTIC_COMPARE:
          if (
            condition.characteristic &&
            condition.comparisonValue !== undefined &&
            condition.comparisonOperator &&
            characterData.characteristics
          ) {
            const inputCharacteristicKey = condition.characteristic
            if (!inputCharacteristicKey) {
              met = false
              break
            }
            const lowercaseCharKey =
              inputCharacteristicKey.toLowerCase() as keyof Character['characteristics']
            if (!(lowercaseCharKey in characterData.characteristics)) {
              met = false
              break
            }
            const charValue = characterData.characteristics[lowercaseCharKey]
            switch (condition.comparisonOperator) {
              case 'gt':
                met = charValue > condition.comparisonValue
                break
              case 'lt':
                met = charValue < condition.comparisonValue
                break
              case 'eq':
                met = charValue === condition.comparisonValue
                break
              case 'gte':
                met = charValue >= condition.comparisonValue
                break
              case 'lte':
                met = charValue <= condition.comparisonValue
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

  const handleInteractOptionPress = useCallback(
    (option: SceneInteractOption, disabled?: boolean) => {
      if (disabled) return // Do nothing if the option is disabled

      if (option.type === 'check') {
        dispatch({
          type: 'PERFORM_INLINE_CHECK',
          payload: { checkPayload: option.check, originalOption: option },
        })
      } else if (option.type === 'goto') {
        if (option.effects && option.effects.length > 0) {
          option.effects.forEach(effect =>
            dispatch({ type: 'APPLY_EFFECT', payload: effect }),
          )
        }
        dispatch({
          type: 'CHANGE_SCENE',
          payload: option.goto,
        })
      } else if (option.type === 'custom_navigation') {
        // Apply pre-navigation effects if any
        if (option.effects && option.effects.length > 0) {
          option.effects.forEach(effect =>
            dispatch({ type: 'APPLY_EFFECT', payload: effect }),
          )
        }
        // Navigate to the target screen with parameters
        if (option.navigationTarget === 'AttributeAllocationScreen') {
          navigation.navigate('AttributeAllocationScreen', {
            onCompleteNavigateToSceneId: option.onCompleteNavigateToSceneId,
            attributeValuesToAssign: option.attributeValuesToAssign || [], // Provide a default empty array
          })
        } else {
          // Handle other potential custom navigation targets if any
          console.warn(
            'Unknown custom_navigation target:',
            option.navigationTarget,
          )
        }
      }
    },
    [dispatch, navigation], // Added navigation
  )

  const handleResolveCheckOutcome = useCallback(() => {
    dispatch({ type: 'RESOLVE_CHECK_OUTCOME' })
  }, [dispatch])

  const goBack = useCallback(() => {
    dispatch({ type: 'GO_BACK' })
  }, [dispatch])

  if (!currentScene) {
    return (
      <View style={styles.storyCardContainer}>
        <Text style={styles.storyCardContentText}>{t('common.notFound')}</Text>
        <OptionButton onPress={goBack}>{t('common.goBack')}</OptionButton>
      </View>
    )
  }

  return (
    <View style={styles.storyCardContainer}>
      <Text style={styles.takeText} onPress={goBack}>
        TAKE {currentScene.id}
      </Text>
      {currentScene.story.split('\n').map((paragraph, index) => (
        <Text key={`story-para-${index}`} style={styles.storyCardContentText}>
          {paragraph}
        </Text>
      ))}

      {state.currentCheckAttempt && (
        <CheckResult
          checkAttempt={state.currentCheckAttempt}
          onResolve={handleResolveCheckOutcome}
        />
      )}

      {!state.currentCheckAttempt && (
        <>
          {currentScene.options?.map((option, index) => {
            const conditionResult = option.condition
              ? checkCondition(
                  option.condition,
                  state.characterData,
                  state.gameFlags,
                )
              : { met: true, description: undefined }

            // Options are now rendered even if not met, but disabled
            if (option.type === 'check') {
              return (
                <CheckOption
                  key={index.toString()}
                  option={option}
                  onPress={op =>
                    handleInteractOptionPress(op, !conditionResult.met)
                  }
                  disabled={!conditionResult.met}
                  conditionDescription={conditionResult.description}
                />
              )
            } else if (option.type === 'goto') {
              return (
                <OptionButton
                  key={index.toString()}
                  onPress={() =>
                    handleInteractOptionPress(option, !conditionResult.met)
                  }
                  disabled={!conditionResult.met}
                  conditionDescription={conditionResult.description}
                >
                  {option.text
                    ? `${option.text}`
                    : `${t('common.goTo')} ${option.goto}`}
                </OptionButton>
              )
            } else if (option.type === 'custom_navigation') {
              // Render a button for custom navigation
              return (
                <OptionButton
                  key={index.toString()}
                  onPress={() =>
                    handleInteractOptionPress(option, !conditionResult.met)
                  }
                  disabled={!conditionResult.met}
                  conditionDescription={conditionResult.description}
                >
                  {option.text}
                </OptionButton>
              )
            }
            return null
          })}
        </>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  takeText: {
    fontSize: 36,
    color: '#cecece',
    fontWeight: typeface.Weight.Bold,
    marginBottom: padding.Small,
    letterSpacing: 2,
  },
  storyCardContainer: {
    marginHorizontal: padding.ScreenLR,
    marginTop: padding.ScreenTB + padding.Large + 40,
    borderRadius: padding.Mini,
    paddingHorizontal: padding.Large,
    paddingVertical: padding.Large,
    shadowRadius: 2,
    backgroundColor: palette.BackgroundGrey,
    marginBottom: 140,
  },
  storyCardContentText: {
    fontSize: typeface.Size.Normal,
    color: typeface.Color.Content,
    lineHeight: typeface.Size.Normal * 1.4,
    marginBottom: padding.Normal, // Ensure inter-paragraph spacing is Normal
  },
})

StoryCard.displayName = 'StoryCard'
export default StoryCard
