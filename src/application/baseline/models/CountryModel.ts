import { type LanguageCodeModel } from './LanguageCodeModel'

interface CountryModel {
  id: number
  name: string
  languageCode: LanguageCodeModel
}

export type { CountryModel }
