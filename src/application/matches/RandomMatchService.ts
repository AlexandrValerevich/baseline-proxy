import { inject } from "inversify";
import { TYPES } from "../../container/types.js";
import { ValidationError } from "../exceptions/index.js";
import { IMatchService } from "./IMatchService.js";
import { IRandomMatchGenerator } from "./generator/index.js";
import { GetMatchesForPeriodQuery, MatchDTO } from "./dto/index.js";
import { getMatchesForPeriodQueryValidator } from "./validation/index.js";

class RandomMatchService implements IMatchService {
  private matchGenerator: IRandomMatchGenerator;

  constructor(@inject(TYPES.RandomMatchGenerator) matchGenerator: IRandomMatchGenerator) {
    this.matchGenerator = matchGenerator;
  }

  async getMatches(query: GetMatchesForPeriodQuery): Promise<MatchDTO[]> {
    const { error } = getMatchesForPeriodQueryValidator.validate(query);
    if (error) {
      throw new ValidationError(error.message, error.detailsAsSting());
    }

    const matchesDto = this.matchGenerator.generateArray(5);
    return matchesDto;
  }
}

export { RandomMatchService };
