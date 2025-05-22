import React from 'react'
import { SceneInteractOption } from '../../interface/Scene'
import { CheckObjectNames } from '../../interface/enums'
import OptionButton from './OptionButton'

interface CheckOptionProps {
  option: SceneInteractOption
  lang: 'cn' | 'en'
  onPress: (option: SceneInteractOption) => void
}

const CheckOption: React.FC<CheckOptionProps> = ({ option, lang, onPress }) => {
  if (option.type !== 'check') return null

  const checkDetails = option.check.details
  const subObjectDisplay =
    checkDetails.subObject && CheckObjectNames[checkDetails.subObject]
      ? CheckObjectNames[checkDetails.subObject]?.[lang]
      : checkDetails.subObject
  const difficultyDisplay = checkDetails.difficulty
    ? ` (${checkDetails.difficulty})`
    : ''
  const optionCheckText = `${
    option.text || (lang === 'cn' ? '进行检定' : 'Perform Check')
  } (${subObjectDisplay}${difficultyDisplay}) -->🎲`

  return (
    <OptionButton onPress={() => onPress(option)}>
      {optionCheckText}
    </OptionButton>
  )
}

export default CheckOption
