import { type LanguageCodeModel } from "./LanguageCodeModel"

interface VenueModel {
  id: number
  name: string
  languageCode: LanguageCodeModel
}

export type { VenueModel }
