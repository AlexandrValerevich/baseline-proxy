import { type LanguageCodeModel } from './LanguageCodeModel'

interface SeasonModel {
  id: number
  name: string
  languageCode: LanguageCodeModel
  startDate: string
  endDate: string
}

export type { SeasonModel }
