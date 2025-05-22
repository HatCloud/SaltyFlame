export type LanguageCode = 'cn' | 'en'

export interface I18nContextType {
  t: (key: string) => string
  lang: LanguageCode
}
