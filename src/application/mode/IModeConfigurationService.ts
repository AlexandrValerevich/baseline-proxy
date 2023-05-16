import { type MatchDTO } from '../matches/index.js'
import { type ScoutDTO } from '../scouts/index.js'
import { type ModeConfigurationDTO } from './dto/ModeConfigurationDTO.js'
import { type SubstitutionDTO } from './dto/SubstitutionDTO.js'
import { type ErrorDTO, type ModeDTO } from './dto/index.js'

export interface IModeConfigurationService {
  getMode: () => ModeDTO
  getError: () => ErrorDTO
  getDelay: () => number
  getPredefinedScouts: () => ScoutDTO[]
  getPredefinedMatches: () => MatchDTO[]
  getSubstitutionMessage: () => SubstitutionDTO
  getModeConfiguration: () => ModeConfigurationDTO

  setMode: (mode: ModeDTO) => void
  setError: (error?: ErrorDTO) => void
  setDelay: (delay: number) => void
  setPredefinedScouts: (scouts: ScoutDTO[]) => void
  setPredefinedMatches: (matches: MatchDTO[]) => void
  setSubstitutionMessage: (message?: SubstitutionDTO) => void
  setBodySubstitutionMessage: (body: string | undefined) => void
  setStatusSubstitutionMessage: (status: number) => void
  setModeConfiguration: (configuration: ModeConfigurationDTO) => void

  throwOnceError: () => any
  throwInfinityError: () => any
}
