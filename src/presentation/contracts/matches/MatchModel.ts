type MatchStatusModel =
  | 'planned'
  | 'prematch'
  | 'live'
  | 'done'
  | 'forecast_missed'
  | 'delayed'
  | 'canceled'
  | 'new_value'

interface MatchModel {
  id: number
  name: string
  status: MatchStatusModel
  dateTime: Date
  startedAt: string
  period?: number
  betStatus?: boolean
  periodScores?: Array<{
    period: number
    homeScore: number
    awayScore: number
  }>
  shootoutsScores?: Array<{
    shootoutsNumber: number
    scoreTeam: 'home' | 'away' | 'new_value'
    realised: boolean
  }>
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
  season: {
    id: number
    name: string
    languageCode: string
    startDate: string
    endDate: string
  }
  tournament: {
    id: number
    name: string
    languageCode: string
  }
  sport: {
    id: number
    name: string
    languageCode: string
  }
  country: {
    id: number
    name: string
    languageCode: string
  }
  venue: {
    id: number
    name: string
    languageCode: string
  }
}

export type { MatchModel }
