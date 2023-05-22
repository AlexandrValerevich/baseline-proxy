import { type TeamModel } from './TeamModel.js'
import { type SportModel } from './SportModel.js'
import { type VenueModel } from './VenueModel.js'
import { type SeasonModel } from './SeasonModel.js'
import { type BetStopModel } from './BetStopModel.js'
import { type CountryModel } from './CountryModel.js'
import { type TournamentModel } from './TournamentModel.js'
import { type PeriodScoreModel } from './PeriodScoreModel.js'
import { type TimerStatusModel } from './TimerStatusModel.js'
import { type BetStopValueModel } from './BetStopValueModel.js'
import { type ShootoutScoresModel } from './ShootoutScoresModel.js'
import { type AssignedTraderModel } from './AssignedTraderModel.js'
import { type MatchStatusModel } from './MatchStatusModel.js'

interface MatchModel {
  id: number
  name: string
  startedAt: string
  status: MatchStatusModel
  homeTeam: TeamModel
  awayTeam: TeamModel
  ingameTime?: string
  betstopStatus?: BetStopValueModel
  refundStatus?: boolean
  triggerId?: string
  options?: {
    periods: number
    periodTime: number
  }
  homeScore?: number
  awayScore?: number
  periodScores?: PeriodScoreModel[]
  period?: number
  aftermatchShootouts?: boolean
  shootoutsScores?: ShootoutScoresModel
  timer?: number
  timerStatus?: TimerStatusModel
  betstop?: BetStopModel[]
  assignedTrader?: AssignedTraderModel
  leagueName?: string
  homeCorrection?: number
  awayCorrection?: number
  homeTotal?: number
  awayTotal?: number
  matchDelay?: boolean
  timestamp: number
  season: SeasonModel
  tournament: TournamentModel
  sport: SportModel
  country: CountryModel
  venue: VenueModel
}

export type { MatchModel }
