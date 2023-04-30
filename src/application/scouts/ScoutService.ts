import { injectable } from "inversify";
import "reflect-metadata";
import { ValidationError } from "../exceptions/ValidationError.js";
import { getScoutsForPeriodQueryValidationScheme } from "./validation/getScoutsForPeriodQueryValidationScheme.js";
import "../extensions/validation-error-extensions.js";

interface IScoutService {
  getScouts(query: GetScoutsForPeriodQuery): ScoutDTO[];
}

@injectable()
class ScoutService implements IScoutService {
  getScouts(query: GetScoutsForPeriodQuery): ScoutDTO[] {
    const { error, value } =
      getScoutsForPeriodQueryValidationScheme.validate(query);
    if (error) {
      throw new ValidationError(error.message, error.detailsAsSting());
    }
    console.log("Query", value);
    return [];
  }
}

export { IScoutService, ScoutService };
