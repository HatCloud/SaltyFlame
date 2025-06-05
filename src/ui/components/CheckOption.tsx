import React from 'react'
import type { SceneInteractOption, CheckPayload } from '../../interface/Scene' // Import CheckPayload
import OptionButton from './OptionButton'
import { useI18n } from '../../i18n/useI18n'
import { useAppReducer } from '../../hook'
import { getCheckValue } from '../../utils/skillUtils'
import { CheckObjectNames, CheckObjectKey } from '../../constant/enums' // Import CheckObjectKey

interface CheckOptionProps {
  option: SceneInteractOption
  onPress: (option: SceneInteractOption) => void
  disabled?: boolean
  conditionDescription?: string
}

const CheckOption: React.FC<CheckOptionProps> = ({
  option,
  onPress,
  disabled,
  conditionDescription,
}) => {
  const { t, lang } = useI18n()
  const [state] = useAppReducer()

  if (option.type !== 'check') {
    return null
  }

  // option.check is of type CheckPayload
  const checkPayload = option.check as CheckPayload // Explicit for clarity, though TS should infer
  const checkDetails = checkPayload.details // This is of type Check from Scene.ts

  const { characterData } = state
  let checkValueDescription = ''

  if (characterData) {
    // checkDetails.subObject is the CheckObjectKey
    const objectKeyToUse: CheckObjectKey = checkDetails.subObject
    const checkValue = getCheckValue(characterData, objectKeyToUse)
    const objectName =
      CheckObjectNames[objectKeyToUse]?.[lang] || String(objectKeyToUse)

    checkValueDescription = t('check.yourValueIs', {
      skillName: objectName,
      value: checkValue,
    })
  }

  const buttonText =
    option.text || t('check.perform') + ' ' + t('check.skillCheck')

  return (
    <OptionButton
      onPress={() => onPress(option)}
      disabled={disabled}
      conditionDescription={conditionDescription}
      checkValueDescription={checkValueDescription}
    >
      {'🎲 ' + buttonText}
    </OptionButton>
  )
}

export default CheckOption
