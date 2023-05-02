export interface IScoutService {
  getScouts(query: GetScoutsForPeriodQuery): ScoutDTO[];
}
