import { useAppReducer } from '../hook'
import { translations } from './resources'
import { I18nContextType, LanguageCode } from './interface'

export function useI18n(): I18nContextType {
  const [state] = useAppReducer()
  const lang = (state.language === 'cn' ? 'cn' : 'en') as LanguageCode

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = (path: string, options?: Record<string, any>): string => {
    const keys = path.split('.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let template: any = translations[lang]

    for (const key of keys) {
      if (template?.[key] === undefined) {
        console.warn(`Translation key not found: ${path}`)
        return path // Return the key itself if not found
      }
      template = template[key]
    }

    if (typeof template !== 'string') {
      console.warn(
        `Translation for key '${path}' is not a string. Found:`,
        template,
      )
      return path // Or some other fallback
    }

    // Basic interpolation: replace {{key}} with value from options
    let result = template
    if (options) {
      for (const placeholderKey in options) {
        if (Object.prototype.hasOwnProperty.call(options, placeholderKey)) {
          const regex = new RegExp(`{{${placeholderKey}}}`, 'g')
          result = result.replace(regex, String(options[placeholderKey]))
        }
      }
    }
    return result
  }

  return {
    t,
    lang,
  }
}
