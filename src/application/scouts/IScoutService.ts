import { type GetScoutsForPeriodQuery, type ScoutDTO } from './dto'

interface IScoutService {
  getScouts: (query: GetScoutsForPeriodQuery) => Promise<ScoutDTO[]>
}

export type { IScoutService }
