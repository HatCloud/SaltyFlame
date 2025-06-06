import { CheckOutcome } from '../constant/enums'
import { I18nContextType } from '../i18n/interface'

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
