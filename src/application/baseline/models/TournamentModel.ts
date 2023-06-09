import { type LanguageCodeModel } from "./LanguageCodeModel"

interface TournamentModel {
  id: number
  name: string
  languageCode: LanguageCodeModel
}

export type { TournamentModel }
