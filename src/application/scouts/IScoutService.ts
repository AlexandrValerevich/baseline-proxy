export interface IScoutService {
  getScouts(query: GetScoutsForPeriodQuery): Promise<ScoutDTO[]>;
}
