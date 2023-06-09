type MatchStatusDTO = 'live' | 'done' | 'canceled' | 'planned' | 'delayed' | 'new_value'

interface LocalizedStringDTO {
  name: string
  languageCode: 'RU' | 'EN' | 'NEW'
}

interface MatchDTO {
  id: number
  name: string
  status: MatchStatusDTO

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
    names: LocalizedStringDTO[]
    total?: number
    probability?: number
  }

  awayTeam: {
    id: number
    names: LocalizedStringDTO[]
    total?: number
    probability?: number
  }

  season: {
    id: number
    names: LocalizedStringDTO[]
    startDate: string
    endDate: string
  }

  tournament: {
    id: number
    names: LocalizedStringDTO[]
  }

  sport: {
    id: number
    names: LocalizedStringDTO[]
  }

  country: {
    id: number
    names: LocalizedStringDTO[]
  }

  venue: {
    id: number
    names: LocalizedStringDTO[]
  }
}

export type { MatchDTO, MatchStatusDTO, LocalizedStringDTO }
