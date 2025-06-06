export type LanguageCode = 'cn' | 'en'

export interface I18nContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string, options?: Record<string, any>) => string
  lang: LanguageCode
}
