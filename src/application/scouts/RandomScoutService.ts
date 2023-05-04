import "reflect-metadata";
import "../extensions/index.js";
import chalk from "chalk";
import { TYPES } from "../../container/types.js";
import { inject, injectable } from "inversify";
import { ValidationError } from "../exceptions/index.js";
import { IScoutService } from "./IScoutService.js";
import { IRandomScoutGenerator } from "./generator/index.js";
import { GetScoutsForPeriodQuery, ScoutDTO } from "./dto/index.js";
import { getScoutsForPeriodQueryValidator } from "./validation/index.js";

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

    const scoutDTOs: ScoutDTO[] = this.scoutGenerator.generateArray(10);
    console.info(`${chalk.blue("Generate random scout data.")}`);

    return scoutDTOs;
  }
}

export { IScoutService, RandomScoutService };
