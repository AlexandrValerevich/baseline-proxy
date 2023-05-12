import {
  GetMatchesForPeriodRequestModel,
  GetScoutsFroPeriodRequestModel,
  MatchModel,
  ScoutModel,
} from "./models/index.js";

interface IBaseLineClient {
  getScoutsForPeriod(request: GetScoutsFroPeriodRequestModel): Promise<ScoutModel[]>;
  getMatchesForPeriod(request: GetMatchesForPeriodRequestModel): Promise<MatchModel[]>;
}

export { IBaseLineClient };
