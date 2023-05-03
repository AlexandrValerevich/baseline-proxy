interface IBaseLineClient {
  getScoutsForPeriod(request: GetScoutFroPeriodRequestModel): Promise<ScoutModel[]>;
  getMatchesForPeriod(request: GetMatchesForPeriodRequestModel): Promise<MatchModel[]>;
}
