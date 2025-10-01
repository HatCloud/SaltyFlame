import React, { useCallback } from 'react'
import GlobalDiceRollAnimation from '../ui/components/GlobalDiceRollAnimation'
import { useAppReducer } from '../context/AppContext'

const GlobalComponents: React.FC = () => {
  const [state, dispatch] = useAppReducer()

  const handleAnimationFinish = useCallback(() => {
    dispatch({ type: 'HIDE_DICE_ROLL_ANIMATION' })
  }, [dispatch])

  return (
    <GlobalDiceRollAnimation
      isVisible={state.diceRollAnimation.isVisible}
      rollResult={state.diceRollAnimation.rollResult}
      resultType={state.diceRollAnimation.resultType}
      onAnimationFinish={handleAnimationFinish}
    />
  )
}

export default GlobalComponents
