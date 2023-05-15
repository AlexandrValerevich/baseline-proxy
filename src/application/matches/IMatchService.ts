import { type GetMatchesForPeriodQuery, type MatchDTO } from './dto/index.js'

interface IMatchService {
  getMatches: (query: GetMatchesForPeriodQuery) => Promise<MatchDTO[]>
}

export type { IMatchService }
