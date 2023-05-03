import { injectable } from "inversify";
import { ModeDTO } from "./dto/ModeDTO.js";
import { ModeConfigurationDTO } from "./dto/ModeConfigurationDTO.js";
import { PredefinedResponsesDTO } from "./dto/PredefinedResponsesDTO.js";
import { IModeConfigurationService } from "./IModeConfigurationService.js";
import { ValidationError } from "../exceptions/ValidationError.js";
import { errorDTOValidator, predefinedResponsesDTOValidator } from "./dto/validation.js";
import chalk from "chalk";

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

  getModeConfiguration(): ModeConfigurationDTO {
    return this.configuration;
  }

  setDelay(delay: number): ModeConfigurationDTO {
    if (delay <= 0) {
      throw new ValidationError(`Provided delay value less than 0. Delay ${delay}`);
    }
    this.configuration.delay = delay;

    console.log(
      `${chalk.blue("New configuration value is set")}. ${chalk.green("Configuration")}: ${
        this.configuration
      }`,
    );

    return this.configuration;
  }
  setDirectMode(): ModeConfigurationDTO {
    this.configuration.mode = ModeDTO.Direct;

    this.logNewConfigurationValue();
    return this.configuration;
  }
  setRandomMode(): ModeConfigurationDTO {
    this.configuration.mode = ModeDTO.Random;

    this.logNewConfigurationValue();
    return this.configuration;
  }
  setErrorOnceMode(error: ErrorDTO): ModeConfigurationDTO {
    const validateResult = errorDTOValidator.validate(error);
    if (validateResult.error) {
      throw new ValidationError(
        validateResult.error.message,
        validateResult.error.detailsAsSting(),
      );
    }

    this.configuration.mode = ModeDTO.ErrorOnce;
    this.configuration.errorOnce = error;

    this.logNewConfigurationValue();

    return this.configuration;
  }
  setErrorInfinityMode(error: ErrorDTO): ModeConfigurationDTO {
    const validateResult = errorDTOValidator.validate(error);
    if (validateResult.error) {
      throw new ValidationError(
        validateResult.error.message,
        validateResult.error.detailsAsSting(),
      );
    }

    this.configuration.mode = ModeDTO.ErrorInfinity;
    this.configuration.errorInfinity = error;

    this.logNewConfigurationValue();

    return this.configuration;
  }
  setPredefinedResponseMode(responses: PredefinedResponsesDTO): ModeConfigurationDTO {
    const { error } = predefinedResponsesDTOValidator.validate(responses);
    if (error) {
      throw new ValidationError(error.message, error.detailsAsSting());
    }
    this.configuration.mode = ModeDTO.ErrorInfinity;
    this.configuration.queriesResponses = responses;

    this.logNewConfigurationValue();

    return this.configuration;
  }

  private logNewConfigurationValue() {
    console.log(
      `${chalk.blue("New configuration value is set")}. ${chalk.green(
        "Configuration",
      )}: ${JSON.stringify(this.configuration)}`,
    );
  }
}

export { IModeConfigurationService, ModeConfigurationService };
