type MatchStatusModel =
  | 'planned'
  | 'prematch'
  | 'live'
  | 'done'
  | 'forecast_missed'
  | 'delayed'
  | 'canceled'

interface MatchModel {
  id: number
  name: string
  period?: number
  status: MatchStatusModel
  timestamp?: number
  startedAt: string
  betStatus?: boolean
  homeTeam: {
    id: number
    name: string
    languageCode: string
    total?: number
    probability?: number
  }
  awayTeam: {
    id: number
    name: string
    languageCode: string
    total?: number
    probability?: number
  }
  periodScores?: Array<{
    period: number
    homeScore: number
    awayScore: number
  }>
  shootoutsScores?: Array<{
    shootoutsNumber: number
    scoreTeam: 1 | 2
    scoreHome: 0 | 1
    scoreAway: 0 | 1
  }>
  season?: {
    id: number
    name: string
    languageCode: string
    startDate: string
    endDate: string
  }
  tournament?: {
    id: number
    name: string
    languageCode: string
  }
  sport?: {
    id: number
    name: string
    languageCode: string
  }
  country?: {
    id: number
    name: string
    languageCode: string
  }
}

export type { MatchModel }
