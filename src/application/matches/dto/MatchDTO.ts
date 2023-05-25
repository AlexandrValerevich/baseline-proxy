import { type TeamDTO } from './TeamDTO.js'
import { type SportDTO } from './SportDTO.js'
import { type VenueDTO } from './VenueDTO.js'
import { type SeasonDTO } from './SeasonDTO.js'
import { type CountryDTO } from './CountryDTO.js'
import { type TournamentDTO } from './TournamentDTO.js'
import { type PeriodScoreDTO } from './PeriodScoreDTO.js'
import { type ShootoutScoresDTO } from './ShootoutScoresDTO.js'

type MatchStatusDTO =
  | 'planned'
  | 'prematch'
  | 'live'
  | 'done'
  | 'forecast_missed'
  | 'delayed'
  | 'canceled'
  | 'new_value'

interface MatchDTO {
  id: number
  name: string
  status: MatchStatusDTO
  dateTime: Date
  startedAt: string
  homeTeam: TeamDTO
  awayTeam: TeamDTO
  season: SeasonDTO
  tournament: TournamentDTO
  sport: SportDTO
  country: CountryDTO
  venue: VenueDTO
  betStatus?: boolean
  homeScore?: number
  awayScore?: number
  period?: number
  periodScores?: PeriodScoreDTO[]
  shootoutsScores?: ShootoutScoresDTO[]
}

export type { MatchDTO, MatchStatusDTO }
