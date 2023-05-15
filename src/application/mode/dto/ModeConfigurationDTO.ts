import { type ModeDTO } from './ModeDTO.js'
import { type ErrorDTO } from './ErrorDTO.js'
import { type PredefinedResponsesDTO } from './PredefinedResponsesDTO.js'

interface ModeConfigurationDTO {
  mode: ModeDTO
  error: ErrorDTO
  predefinedResponses: PredefinedResponsesDTO
  delay: number
  bodySubstitutionMessage?: string
}

export type { ModeConfigurationDTO }
