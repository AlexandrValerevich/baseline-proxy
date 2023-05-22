import { type TeamDTO } from './TeamDTO.js'
import { type SportDTO } from './SportDTO.js'
import { type VenueDTO } from './VenueDTO.js'
import { type SeasonDTO } from './SeasonDTO.js'
import { type CountryDTO } from './CountryDTO.js'
import { type TournamentDTO } from './TournamentDTO.js'
import { type PeriodScoreDTO } from './PeriodScoreDTO.js'
import { type ShootoutScoresDTO } from './ShootoutScoresDTO.js'

type MatchStatusDTO = 'planned' | 'prematch' | 'live' | 'done' | 'forecast_missed' | 'delayed' | 'canceled'

interface MatchDTO {
  id: number
  name: string
  period?: number
  status: MatchStatusDTO
  timestamp?: number
  startedAt: string
  betStatus?: boolean
  homeTeam: TeamDTO
  awayTeam: TeamDTO
  shootoutsScores?: ShootoutScoresDTO[]
  periodScores?: PeriodScoreDTO[]
  season?: SeasonDTO
  tournament?: TournamentDTO
  sport?: SportDTO
  country?: CountryDTO
  venue?: VenueDTO
}

export type { MatchDTO, MatchStatusDTO }
