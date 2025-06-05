import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { padding } from '../../theme/padding'
import { typeface } from '../../theme/typeface'
import { CheckAttemptState } from '../../interface/MyAppState'
import {
  CheckObjectNames,
  CheckObjectKey,
  CheckOutcome,
} from '../../constant/enums' // Import CheckObjectKey and CheckOutcome
import { useI18n } from '../../i18n/useI18n'
import OptionButton from './OptionButton'
import { useAppReducer } from '../../hook' // Import useAppReducer
import { getCheckValue } from '../../utils/skillUtils' // Import getCheckValue
import palette from '../../theme/palette'

interface CheckResultProps {
  checkAttempt: CheckAttemptState
  onResolve: () => void
}

const CheckResult: React.FC<CheckResultProps> = ({
  checkAttempt,
  onResolve,
}) => {
  const { t, lang } = useI18n()
  const [state] = useAppReducer() // Get state

  const checkName =
    CheckObjectNames[checkAttempt.checkDefinition.subObject]?.[lang] ||
    String(checkAttempt.checkDefinition.subObject)

  let characterValueText = ''
  if (state.characterData) {
    const objectKeyToUse: CheckObjectKey =
      checkAttempt.checkDefinition.subObject
    const charValue = getCheckValue(state.characterData, objectKeyToUse)
    characterValueText = t('check.yourValueIs', {
      skillName: checkName,
      value: charValue,
    })
  }

  let resultStatusText = ''
  let mainMessageText = ''

  if (checkAttempt.resultType) {
    switch (checkAttempt.resultType) {
      case CheckOutcome.CRITICAL_SUCCESS:
        resultStatusText = t('check.statusCriticalSuccess')
        mainMessageText =
          checkAttempt.successMessage || t('check.statusCriticalSuccess') // Fallback if specific message not provided
        break
      case CheckOutcome.SUCCESS:
        resultStatusText = t('check.success')
        mainMessageText = checkAttempt.successMessage || t('check.success')
        break
      case CheckOutcome.FAILURE:
        resultStatusText = t('check.failure')
        mainMessageText = checkAttempt.failureMessage || t('check.failure')
        break
      case CheckOutcome.FUMBLE:
        resultStatusText = t('check.fumble')
        mainMessageText = checkAttempt.failureMessage || t('check.fumble') // Fumble uses failure message or generic fumble
        break
      default:
        resultStatusText = t('check.failure') // Should not happen
        mainMessageText = checkAttempt.failureMessage || t('check.failure')
    }
  }

  return (
    <View style={styles.checkResultContainer}>
      {mainMessageText && (
        <Text style={styles.checkInfoText}>{mainMessageText}</Text>
      )}
      <Text style={styles.descriptionText}>
        {characterValueText ? characterValueText : ''} {t('check.rollValue')}:{' '}
        {checkAttempt.rollValue}
        {'\n'}
        {t('check.difficulty')}
        {checkAttempt.checkDefinition.difficulty
          ? `${checkAttempt.checkDefinition.difficulty}, `
          : ' '}
        {t('check.result')}
        {resultStatusText}
      </Text>

      <OptionButton
        onPress={onResolve}
        disabled={false}
        children={t('check.continue')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  checkResultContainer: {
    marginTop: padding.Normal,
    marginBottom: padding.Normal,
    padding: padding.Normal,
    borderRadius: padding.Mini,
    borderWidth: 1,
    borderColor: palette.DarkGrey,
  },
  checkInfoText: {
    fontSize: typeface.Size.Normal,
    color: typeface.Color.Highlight,
    marginBottom: padding.Normal,
    marginTop: padding.Mini,
  },
  descriptionText: {
    fontSize: typeface.Size.Small, // Slightly smaller
    color: typeface.Color.Desc, // A less prominent color
    fontStyle: 'italic',
    marginBottom: padding.Small,
  },
})

export default CheckResult
