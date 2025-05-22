import React from 'react'
import type { SceneInteractOption } from '../../interface/Scene'
import OptionButton from './OptionButton'
import { useI18n } from '../../i18n/useI18n'

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
  const { t } = useI18n()

  if (option.type !== 'check') {
    return null
  }

  return (
    <OptionButton
      onPress={() => onPress(option)}
      disabled={disabled}
      conditionDescription={conditionDescription}
    >
      {'🎲 ' + option.text || t('check.perform') + t('check.skillCheck')}
    </OptionButton>
  )
}

export default CheckOption
