import { type MatchDTO } from '../matches/index.js'
import { type ScoutDTO } from '../scouts/index.js'
import { type ModeConfigurationDTO } from './dto/ModeConfigurationDTO.js'
import { type ErrorDTO, type ModeDTO } from './dto/index.js'

export interface IModeConfigurationService {
  getMode: () => ModeDTO
  getError: () => ErrorDTO
  getDelay: () => number
  getPredefinedScouts: () => ScoutDTO[]
  getPredefinedMatches: () => MatchDTO[]
  getBodySubstitutionMessage: () => string | undefined
  getModeConfiguration: () => ModeConfigurationDTO

  setMode: (mode: ModeDTO) => void
  setError: (error?: ErrorDTO) => void
  setDelay: (delay: number) => void
  setPredefinedScouts: (scouts: ScoutDTO[]) => void
  setPredefinedMatches: (matches: MatchDTO[]) => void
  setBodySubstitutionMessage: (message?: string) => void
  setModeConfiguration: (configuration: ModeConfigurationDTO) => void

  throwOnceError: () => any
  throwInfinityError: () => any
}
