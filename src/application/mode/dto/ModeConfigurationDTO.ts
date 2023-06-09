import { type ModeDTO } from './ModeDTO.js'
import { type ErrorDTO } from './ErrorDTO.js'
import { type PredefinedResponsesDTO } from './PredefinedResponsesDTO.js'
import { type SubstitutionDTO } from './SubstitutionDTO.js'

interface ModeConfigurationDTO {
  mode: ModeDTO
  error: ErrorDTO
  predefinedResponses: PredefinedResponsesDTO
  delay: number
  substitutionMessage: SubstitutionDTO
}

export type { ModeConfigurationDTO }
