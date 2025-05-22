import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { padding } from '../../theme/padding'
import { typeface } from '../../theme/typeface'
import { CheckAttemptState } from '../../interface/MyAppState'
import { CheckObjectNames } from '../../interface/enums'

interface CheckResultProps {
  checkAttempt: CheckAttemptState
  lang: 'cn' | 'en'
  onResolve: () => void
}

const CheckResult: React.FC<CheckResultProps> = ({
  checkAttempt,
  lang,
  onResolve,
}) => {
  return (
    <View style={styles.checkResultContainer}>
      <Text style={styles.checkInfoText}>
        {lang === 'cn' ? '检定:' : 'Check:'}{' '}
        {CheckObjectNames[checkAttempt.checkDefinition.subObject]?.[lang] ||
          String(checkAttempt.checkDefinition.subObject)}
        {checkAttempt.checkDefinition.difficulty
          ? ` (${checkAttempt.checkDefinition.difficulty})`
          : ''}
      </Text>
      <Text style={styles.checkInfoText}>
        {lang === 'cn' ? '掷骰点数:' : 'Roll:'} {checkAttempt.rollValue}
      </Text>
      <Text style={styles.checkInfoText}>
        {lang === 'cn' ? '结果:' : 'Result:'}{' '}
        {checkAttempt.isSuccess
          ? lang === 'cn'
            ? '成功'
            : 'Success'
          : lang === 'cn'
            ? '失败'
            : 'Failure'}
        {checkAttempt.isSuccess && checkAttempt.successMessage && (
          <Text style={styles.checkInfoText}>
            {' '}
            ({checkAttempt.successMessage})
          </Text>
        )}
        {!checkAttempt.isSuccess && checkAttempt.failureMessage && (
          <Text style={styles.checkInfoText}>
            {' '}
            ({checkAttempt.failureMessage})
          </Text>
        )}
      </Text>
      <Pressable onPress={onResolve} style={styles.resolveButton}>
        <Text style={styles.storyCardOptionText}>
          {lang === 'cn' ? '继续' : 'Continue'}
        </Text>
      </Pressable>
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
  resolveButton: {
    marginTop: padding.Normal,
    paddingVertical: padding.Small,
    paddingHorizontal: padding.Normal,
    backgroundColor: typeface.Color.Striking,
    borderRadius: padding.Mini,
    alignItems: 'center',
  },
  storyCardOptionText: {
    fontSize: typeface.Size.Normal,
    color: typeface.Color.Content,
    lineHeight: typeface.Size.Normal * 1.3,
    marginBottom: padding.Normal,
  },
})

export default CheckResult
