import { type TeamDTO } from './TeamDTO.js'
import { type SportDTO } from './SportDTO.js'
import { type VenueDTO } from './VenueDTO.js'
import { type SeasonDTO } from './SeasonDTO.js'
import { type BetStopDTO } from './BetStopDTO.js'
import { type CountryDTO } from './CountryDTO.js'
import { type TournamentDTO } from './TournamentDTO.js'
import { type PeriodScoreDTO } from './PeriodScoreDTO.js'
import { type ShootoutScoresDTO } from './ShootoutScoresDTO.js'

type MatchStatusDTO = 'planned' | 'prematch' | 'live' | 'done' | 'forecast_missed'
type TimerStatusDTO = 'stopped' | 'running'

interface MatchDTO {
  id: number
  name: string
  period?: number
  status: MatchStatusDTO
  timestamp?: number
  startedAt: string
  aftermatchShootouts?: boolean
  shootoutsScores?: ShootoutScoresDTO
  homeTeam: TeamDTO
  awayTeam: TeamDTO
  betstop?: BetStopDTO[]
  periodScores?: PeriodScoreDTO[]
  season?: SeasonDTO
  tournament?: TournamentDTO
  sport?: SportDTO
  country?: CountryDTO
  venue?: VenueDTO
}

export type { MatchDTO, MatchStatusDTO, TimerStatusDTO }
