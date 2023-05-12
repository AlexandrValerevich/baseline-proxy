import { GetMatchesForPeriodQuery, MatchDTO } from "./dto/index.js";

interface IMatchService {
  getMatches(query: GetMatchesForPeriodQuery): Promise<MatchDTO[]>;
}

export { IMatchService };
