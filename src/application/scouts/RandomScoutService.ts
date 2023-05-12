import "reflect-metadata";
import "../extensions/index.js";
import { TYPES } from "../../container/types.js";
import { inject, injectable } from "inversify";
import { ValidationError } from "../exceptions/index.js";
import { IScoutService } from "./IScoutService.js";
import { IRandomScoutGenerator } from "./generator/index.js";
import { GetScoutsForPeriodQuery, ScoutDTO } from "./dto/index.js";
import { getScoutsForPeriodQueryValidator } from "./validation/index.js";
import { logger } from "../../logger/logger.js";

@injectable()
class RandomScoutService implements IScoutService {
  private scoutGenerator: IRandomScoutGenerator;

  constructor(@inject(TYPES.RandomScoutGenerator) scoutGenerator: IRandomScoutGenerator) {
    this.scoutGenerator = scoutGenerator;
  }

  async getScouts(query: GetScoutsForPeriodQuery): Promise<ScoutDTO[]> {
    const { error } = getScoutsForPeriodQueryValidator.validate(query);
    if (error) {
      throw new ValidationError(error.message, error.detailsAsSting());
    }

    const scoutsDto: ScoutDTO[] = this.scoutGenerator.generateArray(5);

    logger.debug({
      message: `Random scouts resolving is completed successfully.`,
      query,
      scoutsDto,
    });

    return scoutsDto;
  }
}

export { IScoutService, RandomScoutService };
