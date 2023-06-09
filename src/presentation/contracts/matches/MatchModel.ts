type MatchStatusModel = 'live' | 'done' | 'canceled' | 'planned' | 'delayed' | 'new_value'

interface LocalizedStringModel {
  name: string
  languageCode: 'RU' | 'EN' | "NEW"
}

interface MatchModel {
  id: number
  name: string
  status: MatchStatusModel

  dateTime: Date
  startedAt: string

  homeScore?: number
  awayScore?: number
  period?: number
  betStatus?: boolean
  shootoutsStatus?: boolean

  periodScores?: Array<{
    period: number
    homeScore: number
    awayScore: number
  }>

  shootoutsScores?: Array<{
    number: number
    owner: 'home' | 'away' | 'new_value'
    isScored: boolean
  }>

  homeTeam: {
    id: number
    names: LocalizedStringModel[]
    total?: number
    probability?: number
  }

  awayTeam: {
    id: number
    names: LocalizedStringModel[]
    total?: number
    probability?: number
  }

  season: {
    id: number
    names: LocalizedStringModel[]
    startDate: string
    endDate: string
  }

  tournament: {
    id: number
    names: LocalizedStringModel[]
  }

  sport: {
    id: number
    names: LocalizedStringModel[]
  }

  country: {
    id: number
    names: LocalizedStringModel[]
  }

  venue: {
    id: number
    names: LocalizedStringModel[]
  }
}

export type { MatchModel }
