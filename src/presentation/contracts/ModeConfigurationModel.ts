import { type ErrorModel } from './ErrorModel.js'
import { type ModeModel } from './ModeModel.js'
import { type PredefinedResponsesModel } from './PredefinedResponsesModel.js'

interface ModeConfigurationModel {
  mode: ModeModel
  error: ErrorModel
  predefinedResponses: PredefinedResponsesModel
  delay: number
  bodySubstitutionMessage?: string
}

export type { ModeConfigurationModel }
