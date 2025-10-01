import { RollEnum, CheckOutcome } from '../constant/enums'
import { GameFlag } from '../constant/GameFlags'
import { I18nContextType } from '../i18n/interface'
import { Check } from '../interface/Scene'
import { MyAppState } from '../interface/MyAppState'

// Helper function to roll a single d10 die (0-9)
const rollD10 = () => Math.floor(Math.random() * 10)

export const performCheck = (
  check: Check,
  gameFlags: MyAppState['gameFlags'],
): { result: number; rolls: number[] } => {
  const isLuckOrSanityCheck =
    check.subObject === RollEnum.LUCK || check.subObject === RollEnum.SANITY

  const bonusDice = isLuckOrSanityCheck ? 0 : check.bonusDice || 0
  let penaltyDice = isLuckOrSanityCheck ? 0 : check.penaltyDice || 0

  if (!isLuckOrSanityCheck && gameFlags[GameFlag.PENALTY_DICE_TODAY]) {
    penaltyDice += 1
  }

  const unitsDie = rollD10()
  const tensRolls = [rollD10()]
  let selectedTensDie

  if (bonusDice > 0) {
    for (let i = 0; i < bonusDice; i++) {
      tensRolls.push(rollD10())
    }
    selectedTensDie = Math.min(...tensRolls)
  } else if (penaltyDice > 0) {
    for (let i = 0; i < penaltyDice; i++) {
      tensRolls.push(rollD10())
    }
    selectedTensDie = Math.max(...tensRolls)
  } else {
    selectedTensDie = tensRolls[0]
  }

  let result = selectedTensDie * 10 + unitsDie
  if (result === 0) {
    result = 100
  }

  const allRolls = tensRolls.map(tens => {
    const roll = tens * 10 + unitsDie
    return roll === 0 ? 100 : roll
  })

  return { result, rolls: allRolls }
}

export const getCheckOutcomeText = (
  resultType: CheckOutcome | undefined,
  t: I18nContextType['t'],
): string => {
  if (resultType === undefined) {
    return '' // Or some default text if needed
  }
  switch (resultType) {
    case CheckOutcome.CRITICAL_SUCCESS:
      return t('check.statusCriticalSuccess') // This one is correct
    case CheckOutcome.SUCCESS:
      return t('check.success') // Changed from check.statusSuccess
    case CheckOutcome.FAILURE:
      return t('check.failure') // Changed from check.statusFailure
    case CheckOutcome.FUMBLE:
      return t('check.fumble') // Changed from check.statusFumble
    default:
      // It's good practice to handle unexpected cases,
      // though with TypeScript, this default should ideally not be reached
      // if resultType is strictly CheckOutcome.
      console.warn(
        'Unexpected CheckOutcome in getCheckOutcomeText:',
        resultType,
      )
      return ''
  }
}

// Add other check-related utility functions here if any exist or are planned.
