import { TYPES } from "../../container/types.js";
import { IBaseLineClient } from "../baseline/index.js";
import { inject, injectable } from "inversify";
import { ValidationError } from "../exceptions/index.js";
import { IScoutService } from "./IScoutService.js";
import { GetScoutsForPeriodQuery, ScoutDTO } from "./dto/index.js";
import { getScoutsForPeriodQueryValidator } from "./validation/index.js";

@injectable()
class DirectScoutService implements IScoutService {
  private client: IBaseLineClient;

  constructor(@inject(TYPES.BaseLineClient) client: IBaseLineClient) {
    this.client = client;
  }

  async getScouts(query: GetScoutsForPeriodQuery): Promise<ScoutDTO[]> {
    const { error } = getScoutsForPeriodQueryValidator.validate(query);
    if (error) {
      throw new ValidationError(error.message, error.detailsAsSting());
    }

    const response = await this.client.getScoutsForPeriod({
      dateFrom: query.timeFrom,
      dateTo: query.timeTo,
    });

    return response;
  }
}

export { DirectScoutService };
