import { MyAppState } from '../interface/MyAppState'
import { Check } from '../interface/Scene'
import { CheckDifficulty, CheckOutcome } from '../constant/enums'
import { rollDice } from '../utils/utils'
import { getCheckValue } from '../utils/skillUtils'

export function executeCheckLogic(
  state: MyAppState,
  check: Check,
): { rollValue: number; resultType: CheckOutcome; diceFaces: number } {
  const characterValue = getCheckValue(state.characterData, check.subObject)
  const diceFaces = 100 // Standard D100 roll for CoC checks
  const roll = rollDice(diceFaces)
  let targetValue = characterValue

  switch (check.difficulty) {
    case CheckDifficulty.HARD:
      targetValue = Math.floor(characterValue / 2)
      break
    case CheckDifficulty.EXTREME:
      targetValue = Math.floor(characterValue / 5)
      break
    default: // CheckDifficulty.NORMAL
      break
  }

  const baseSuccess = roll <= targetValue

  // Determine result type based on CoC 7e rules
  let resultType: CheckOutcome
  if (roll === 1) {
    resultType = CheckOutcome.CRITICAL_SUCCESS
  } else if (roll <= 5 && baseSuccess) {
    // Rolls 2-5 are critical if also a normal success
    resultType = CheckOutcome.CRITICAL_SUCCESS
  } else if (roll === 100) {
    resultType = CheckOutcome.FUMBLE
  } else if (roll >= 96 && characterValue < 50) {
    // Rolls 96-99 are fumbles if skill < 50
    resultType = CheckOutcome.FUMBLE
  } else if (baseSuccess) {
    resultType = CheckOutcome.SUCCESS
  } else {
    resultType = CheckOutcome.FAILURE
  }
  return { rollValue: roll, resultType, diceFaces }
}
