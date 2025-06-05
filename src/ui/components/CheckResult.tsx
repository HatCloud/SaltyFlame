import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { padding } from '../../theme/padding'
import { typeface } from '../../theme/typeface'
import { CheckAttemptState } from '../../interface/MyAppState'
import { CheckObjectNames, CheckObjectKey } from '../../constant/enums' // Import CheckObjectKey
import { useI18n } from '../../i18n/useI18n'
import OptionButton from './OptionButton'
import { useAppReducer } from '../../hook' // Import useAppReducer
import { getCheckValue } from '../../utils/skillUtils' // Import getCheckValue

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
    // checkName is already localized name of the skill/characteristic
    characterValueText = t('check.yourValueIs', {
      skillName: checkName,
      value: charValue,
    })
  }

  return (
    <View style={styles.checkResultContainer}>
      {checkAttempt.isSuccess && checkAttempt.successMessage && (
        <Text style={styles.checkInfoText}>{checkAttempt.successMessage}</Text>
      )}
      {!checkAttempt.isSuccess && checkAttempt.failureMessage && (
        <Text style={styles.checkInfoText}>{checkAttempt.failureMessage}</Text>
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
        {checkAttempt.isSuccess ? t('check.success') : t('check.failure')}
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
    backgroundColor: '#2C2C2E',
    borderRadius: padding.Mini,
    borderWidth: 1,
    borderColor: '#444',
  },
  checkInfoText: {
    fontSize: typeface.Size.Normal,
    color: typeface.Color.Highlight,
    marginBottom: padding.Normal,
    marginTop: padding.Mini,
  },
  descriptionText: {
    fontSize: typeface.Size.Small, // Slightly smaller
    color: '#AEAEB2', // A less prominent color
    fontStyle: 'italic',
    marginBottom: padding.Small,
  },
})

export default CheckResult
