import { useAppReducer } from '../hook'
import { translations } from './resources'
import { I18nContextType, LanguageCode } from './types'

export function useI18n(): I18nContextType {
  const [state] = useAppReducer()
  const lang = (state.language === 'cn' ? 'cn' : 'en') as LanguageCode

  const t = (path: string): string => {
    const keys = path.split('.')
    let result: any = translations[lang]

    for (const key of keys) {
      if (result?.[key] === undefined) {
        console.warn(`Translation key not found: ${path}`)
        return path
      }
      result = result[key]
    }

    return result
  }

  return {
    t,
    lang,
  }
}
