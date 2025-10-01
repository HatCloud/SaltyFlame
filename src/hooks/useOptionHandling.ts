import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useCheckSystem } from './useCheckSystem'
import { useGameState } from './useGameState'
import type { SceneInteractOption, Effect } from '../interface/Scene'
import type { RootStackParamList } from '../interface/navigation'

type NavigationProp = StackNavigationProp<RootStackParamList, 'SceneScreen'>

// Type guard for goto option with occupation
interface GotoOptionWithOccupation {
  type: 'goto'
  goto: string
  applyOccupation?: string
  effects?: Effect[]
  text?: string
}

interface UseOptionHandlingProps {
  onShowOccupationModal: (option: SceneInteractOption) => boolean
}

export const useOptionHandling = ({
  onShowOccupationModal,
}: UseOptionHandlingProps) => {
  const { actions: checkActions } = useCheckSystem()
  const { actions: gameActions } = useGameState()
  const navigation = useNavigation<NavigationProp>()

  const handleInteractOptionPress = useCallback(
    (option: SceneInteractOption, disabled?: boolean) => {
      if (disabled) return

      if (option.type === 'check') {
        checkActions.performCheck(option.check, option)
      } else if (option.type === 'goto') {
        // If this option has an occupation to apply, show the modal first
        const gotoOption = option as GotoOptionWithOccupation
        if (gotoOption.applyOccupation) {
          const modalShown = onShowOccupationModal(option)
          if (modalShown) return
        }

        // Then apply other effects
        if (option.effects && option.effects.length > 0) {
          option.effects.forEach(effect => checkActions.applyEffect(effect))
        }
        // Finally, change scene
        gameActions.changeScene(option.goto)
      } else if (option.type === 'custom_navigation') {
        // Apply pre-navigation effects if any
        if (option.effects && option.effects.length > 0) {
          option.effects.forEach(effect => checkActions.applyEffect(effect))
        }
        // Navigate to the target screen with parameters
        if (option.navigationTarget === 'AttributeAllocationScreen') {
          navigation.navigate('AttributeAllocationScreen', {
            onCompleteNavigateToSceneId: option.onCompleteNavigateToSceneId,
            attributeValuesToAssign: option.attributeValuesToAssign || [],
          })
        } else {
          console.warn(
            'Unknown custom_navigation target:',
            option.navigationTarget,
          )
        }
      }
    },
    [checkActions, gameActions, navigation, onShowOccupationModal],
  )

  return {
    handleInteractOptionPress,
  }
}
