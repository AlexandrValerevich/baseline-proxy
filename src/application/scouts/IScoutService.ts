import { GetScoutsForPeriodQuery, ScoutDTO } from "./dto";

interface IScoutService {
  getScouts(query: GetScoutsForPeriodQuery): Promise<ScoutDTO[]>;
}

export { IScoutService };
