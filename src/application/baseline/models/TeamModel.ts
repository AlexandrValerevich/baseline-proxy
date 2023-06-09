import { type LanguageCodeModel } from './LanguageCodeModel'

interface TeamModel {
  id: number
  name: string
  languageCode: LanguageCodeModel
}

export type { TeamModel }
