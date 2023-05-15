import {
  type GetMatchesForPeriodRequestModel,
  type GetScoutsFroPeriodRequestModel,
  type MatchModel,
  type ScoutModel
} from './models/index.js'

interface IBaseLineClient {
  getScoutsForPeriod: (request: GetScoutsFroPeriodRequestModel) => Promise<ScoutModel[]>
  getMatchesForPeriod: (request: GetMatchesForPeriodRequestModel) => Promise<MatchModel[]>
}

export type { IBaseLineClient }
