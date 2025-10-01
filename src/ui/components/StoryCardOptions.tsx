import React from 'react'
import { useGameState } from '../../hooks/useGameState'
import { useCheckCondition } from '../../hooks/useCheckCondition'
import { useI18n } from '../../i18n/useI18n'
import type { Scene, SceneInteractOption } from '../../interface/Scene'
import OptionButton from './OptionButton'
import CheckOption from './CheckOption'

interface StoryCardOptionsProps {
  scene: Scene
  onOptionPress: (option: SceneInteractOption, disabled?: boolean) => void
}

const StoryCardOptions: React.FC<StoryCardOptionsProps> = ({
  scene,
  onOptionPress,
}) => {
  const { characterData, gameFlags, history } = useGameState()
  const { checkCondition } = useCheckCondition()
  const { t } = useI18n()

  return (
    <>
      {scene.options?.map((option, index) => {
        const conditionResult = option.condition
          ? checkCondition(option.condition, characterData, gameFlags, history)
          : { met: true, description: undefined }

        if (!conditionResult.met && !__DEV__) {
          return null
        }

        if (option.type === 'check') {
          return (
            <CheckOption
              key={index.toString()}
              option={option}
              onPress={op => onOptionPress(op, !conditionResult.met)}
              disabled={!conditionResult.met}
              conditionDescription={conditionResult.description}
            />
          )
        } else if (option.type === 'goto') {
          return (
            <OptionButton
              key={index.toString()}
              onPress={() => onOptionPress(option, !conditionResult.met)}
              disabled={!conditionResult.met}
              conditionDescription={conditionResult.description}
            >
              {option.text
                ? `${option.text}`
                : `${t('common.goTo')} ${option.goto}`}
            </OptionButton>
          )
        } else if (option.type === 'custom_navigation') {
          return (
            <OptionButton
              key={index.toString()}
              onPress={() => onOptionPress(option, !conditionResult.met)}
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
  )
}

export default StoryCardOptions
