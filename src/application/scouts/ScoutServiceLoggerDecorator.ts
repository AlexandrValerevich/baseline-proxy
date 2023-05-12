import "../extensions/index.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../container/types.js";
import { GetScoutsForPeriodQuery, ScoutDTO } from "./dto/index.js";
import { logger } from "../../logger/index.js";
import { IScoutService } from "./IScoutService.js";

@injectable()
class ScoutServiceLoggerDecorator implements IScoutService {
  private readonly scoutService: IScoutService;

  constructor(@inject(TYPES.ScoutsService) scoutService: IScoutService) {
    this.scoutService = scoutService;
  }

  async getScouts(query: GetScoutsForPeriodQuery): Promise<ScoutDTO[]> {
    const start = performance.now();
    const { timeFrom, timeTo } = {
      timeFrom: query.timeFrom.toISOString(),
      timeTo: query.timeTo.toISOString(),
    };
    const timeDiff = query.timeFrom.timeDiff(query.timeTo);
    try {
      const scouts = await this.scoutService.getScouts(query);
      const elapsed = (performance.now() - start).toFixed(2);;;

      logger.info({
        message: `Getting scouts on period from ${timeFrom} to ${timeTo} is competed successfully in ${elapsed} ms`,
        timeDiff: timeDiff,
        query,
        scouts,
      });

      return scouts;
    } catch (error) {
      const elapsed = (performance.now() - start).toFixed(2);;;
      logger.error({
        message: `Getting scouts on period from ${timeFrom} to ${timeTo} has failed in ${elapsed} ms`,
        timeDiff: timeDiff,
        error,
        query,
      });
      throw error;
    }
  }
}

export { ScoutServiceLoggerDecorator };
