import "../extensions/index.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../container/types.js";
import { IMatchService } from "./IMatchService.js";
import { GetMatchesForPeriodQuery, MatchDTO } from "./dto/index.js";
import { logger } from "../../logger/index.js";

@injectable()
class MatchServiceLoggerDecorator implements IMatchService {
  private readonly matchService: IMatchService;

  constructor(@inject(TYPES.MatchesService) matchService: IMatchService) {
    this.matchService = matchService;
  }

  async getMatches(query: GetMatchesForPeriodQuery): Promise<MatchDTO[]> {
    const start = performance.now();
    const { timeFrom, timeTo } = query;
    const dateFrom = new Date(timeFrom);
    const dateTo = new Date(timeTo);
    const timeDiff = dateFrom.timeDiff(dateTo);
    try {
      const matches = await this.matchService.getMatches(query);
      const elapsed = (performance.now() - start).toFixed(2);;
      logger.info({
        message: `Getting matches on period from ${timeFrom} to ${timeTo} is competed successfully in ${elapsed} ms`,
        timeDiff: timeDiff,
        query,
        matches,
      });

      return matches;
    } catch (error) {
      const elapsed = (performance.now() - start).toFixed(2);;
      logger.error({
        message: `Getting matches on period from ${timeFrom} to ${timeTo} has failed in ${elapsed} ms`,
        timeDiff: timeDiff,
        error,
        query,
      });
      throw error;
    }
  }
}

export { MatchServiceLoggerDecorator };
