import { type MatchDTO } from '../../matches/dto/MatchDTO.js'
import { type ScoutDTO } from '../../scouts/dto/index.js'

interface PredefinedResponsesDTO {
  scouts: ScoutDTO[]
  matches: MatchDTO[]
}

export type { PredefinedResponsesDTO }
