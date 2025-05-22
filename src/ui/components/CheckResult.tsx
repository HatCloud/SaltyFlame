import { StyleSheet, Text, View } from 'react-native' // Pressable removed
import React from 'react'
import { padding } from '../../theme/padding'
import { typeface } from '../../theme/typeface'
import { CheckAttemptState } from '../../interface/MyAppState'
import { CheckObjectNames } from '../../interface/enums'
import { useI18n } from '../../i18n/useI18n'
import OptionButton from './OptionButton'

interface CheckResultProps {
  checkAttempt: CheckAttemptState
  onResolve: () => void
}

const CheckResult: React.FC<CheckResultProps> = ({
  checkAttempt,
  onResolve,
}) => {
  const { t, lang } = useI18n()

  const checkName =
    CheckObjectNames[checkAttempt.checkDefinition.subObject]?.[lang] ||
    String(checkAttempt.checkDefinition.subObject)

  return (
    <View style={styles.checkResultContainer}>
      <Text style={styles.checkInfoText}>
        {t('check.result')} {checkName}
        {checkAttempt.checkDefinition.difficulty
          ? ` (${checkAttempt.checkDefinition.difficulty})`
          : ''}
      </Text>
      <Text style={styles.checkInfoText}>
        {t('check.rollValue')}: {checkAttempt.rollValue}
      </Text>
      <Text style={styles.checkInfoText}>
        {checkAttempt.isSuccess ? t('check.success') : t('check.failure')}
        {checkAttempt.isSuccess && checkAttempt.successMessage && (
          <Text style={styles.checkInfoText}>
            {': '}
            {checkAttempt.successMessage}
          </Text>
        )}
        {!checkAttempt.isSuccess && checkAttempt.failureMessage && (
          <Text style={styles.checkInfoText}>
            {': '}
            {checkAttempt.failureMessage}
          </Text>
        )}
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
    marginBottom: padding.Small,
  },
})

export default CheckResult
