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
    const { dateFrom, dateTo } = {
      dateFrom: query.dateFrom.toISOString(),
      dateTo: query.dateTo.toISOString(),
    };
    const timeDiff = query.dateFrom.timeDiff(query.dateTo);

    try {
      const matches = await this.matchService.getMatches(query);
      const elapsed = (performance.now() - start).toFixed(2);
      logger.info({
        message: `Getting matches on period from ${dateFrom} to ${dateTo} is competed successfully in ${elapsed} ms`,
        timeDiff: timeDiff,
        query,
        matches,
      });

      return matches;
    } catch (error) {
      const elapsed = (performance.now() - start).toFixed(2);
      logger.error({
        message: `Getting matches on period from ${dateFrom} to ${dateTo} has failed in ${elapsed} ms`,
        timeDiff: timeDiff,
        error,
        query,
      });
      throw error;
    }
  }
}

export { MatchServiceLoggerDecorator };
