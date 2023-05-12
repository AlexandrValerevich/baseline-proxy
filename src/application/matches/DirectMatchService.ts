import { TYPES } from "../../container/types.js";
import { IBaseLineClient, MatchModel } from "../baseline/index.js";
import { inject, injectable } from "inversify";
import { ValidationError } from "../exceptions/index.js";
import { IMatchService } from "./IMatchService.js";
import { getMatchesForPeriodQueryValidator } from "./validation/index.js";
import { MatchDTO, GetMatchesForPeriodQuery, BetStopDTO } from "./dto/index.js";

@injectable()
class DirectMatchService implements IMatchService {
  private client: IBaseLineClient;

  constructor(@inject(TYPES.BaseLineClient) client: IBaseLineClient) {
    this.client = client;
  }

  async getMatches(query: GetMatchesForPeriodQuery): Promise<MatchDTO[]> {
    const { error } = getMatchesForPeriodQueryValidator.validate(query);
    if (error) {
      throw new ValidationError(error.message, error.detailsAsSting());
    }

    const response = await this.client.getMatchesForPeriod({
      dateFrom: query.timeFrom,
      dateTo: query.timeTo,
    });

    const matchesDto = this.map(response);

    return matchesDto;
  }

  private map(matches: MatchModel[]): MatchDTO[] {
    return matches;
  }
}

export { DirectMatchService };
