import { injectable } from "inversify";
import { ModeDTO } from "./dto/ModeDTO.js";
import { ModeConfigurationDTO } from "./dto/ModeConfigurationDTO.js";
import { PredefinedResponsesDTO } from "./dto/PredefinedResponsesDTO.js";
import { IModeConfigurationService } from "./IModeConfigurationService.js";
import { ValidationError } from "../exceptions/ValidationError.js";
import { errorDTOValidator, predefinedResponsesDTOValidator } from "./dto/validation.js";

@injectable()
class ModeConfigurationService implements IModeConfigurationService {
  private configuration: ModeConfigurationDTO;

  constructor() {
    const defaultError: ErrorDTO = {
      http: { status: 500 },
      message: "Internal Error",
    };

    this.configuration = {
      mode: ModeDTO.Direct,
      errorOnce: defaultError,
      errorInfinity: defaultError,
      queriesResponses: { scouts: [], matches: [] },
      delay: 1000,
    };
  }
  setDelay(delay: number): ModeConfigurationDTO {
    if (delay <= 0) {
      throw new ValidationError(`Provided delay value less than 0. Delay ${delay}`);
    }
    this.configuration.delay = delay;
    return this.configuration;
  }

  getModeConfiguration(): ModeConfigurationDTO {
    return this.configuration;
  }
  setDirectMode(): ModeConfigurationDTO {
    this.configuration.mode = ModeDTO.Direct;
    return this.configuration;
  }
  setRandomMode(): ModeConfigurationDTO {
    this.configuration.mode = ModeDTO.Random;
    return this.configuration;
  }
  setErrorsOnceMode(error: ErrorDTO): ModeConfigurationDTO {
    const validateResult = errorDTOValidator.validate(error);
    if (validateResult.error) {
      throw new ValidationError(
        validateResult.error.message,
        validateResult.error.detailsAsSting(),
      );
    }

    this.configuration.mode = ModeDTO.ErrorInfinity;
    this.configuration.errorOnce = error;
    return this.configuration;
  }
  setErrorsInfinityMode(error: ErrorDTO): ModeConfigurationDTO {
    const validateResult = errorDTOValidator.validate(error);
    if (validateResult.error) {
      throw new ValidationError(
        validateResult.error.message,
        validateResult.error.detailsAsSting(),
      );
    }

    this.configuration.mode = ModeDTO.ErrorInfinity;
    this.configuration.errorInfinity = error;
    return this.configuration;
  }
  setPredefinedResponseMode(responses: PredefinedResponsesDTO): ModeConfigurationDTO {
    const { error } = predefinedResponsesDTOValidator.validate(responses);
    if (error) {
      throw new ValidationError(error.message, error.detailsAsSting());
    }
    this.configuration.mode = ModeDTO.ErrorInfinity;
    this.configuration.queriesResponses = responses;
    return this.configuration;
  }
}

export { IModeConfigurationService, ModeConfigurationService };
