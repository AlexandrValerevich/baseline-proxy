import { inject, injectable } from "inversify";
import { IScoutService } from "./IScoutService.js";
import { TYPES } from "../../types.js";
import { getScoutsForPeriodQueryValidationScheme } from "./dto/validation.js";
import { ValidationError } from "../exceptions/ValidationError.js";

@injectable()
class DirectScoutService implements IScoutService {
  private client: IBaseLineClient;

  constructor(@inject(TYPES.BaseLineClient) client: IBaseLineClient) {
    this.client = client;
  }

  getScouts(query: GetScoutsForPeriodQuery): Promise<ScoutDTO[]> {
    const { error } = getScoutsForPeriodQueryValidationScheme.validate(query);
    if (error) {
      throw new ValidationError(error.message, error.detailsAsSting());
    }

    return this.client.getScoutsForPeriod({
      dateFrom: query.timeFrom,
      dateTo: query.timeTo,
    });
  }
}

export { DirectScoutService };
