import { type ErrorModel } from './ErrorModel.js'
import { type ModeModel } from './ModeModel.js'
import { type PredefinedResponsesModel } from './PredefinedResponsesModel.js'
import { type SubstitutionModel } from './SubstitutionModel.js'

interface ModeConfigurationModel {
  mode: ModeModel
  error: ErrorModel
  predefinedResponses: PredefinedResponsesModel
  delay: number
  substitutionMessage: SubstitutionModel
}

export type { ModeConfigurationModel }
