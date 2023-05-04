import chalk from "chalk";
import { injectable } from "inversify";
import { IModeConfigurationService } from "./IModeConfigurationService.js";
import { errorDTOValidator, predefinedResponsesDTOValidator } from "./validation/index.js";
import { ModeError, ValidationError, WrongConfigurationModeError } from "../exceptions/index.js";
import { ErrorDTO, ModeDTO, ModeConfigurationDTO, PredefinedResponsesDTO } from "./dto/index.js";

@injectable()
class ModeConfigurationService implements IModeConfigurationService {
  private configuration: ModeConfigurationDTO;

  constructor() {
    this.configuration = {
      mode: ModeDTO.Direct,
      errorOnce: {
        http: { status: 500 },
        message: "Internal Error",
      },
      errorInfinity: {
        http: { status: 500 },
        message: "Internal Error",
      },
      queriesResponses: { scouts: [], matches: [] },
      delay: 100,
    };
  }

  throwOnceError() {
    if (this.configuration.mode !== ModeDTO.ErrorOnce) {
      throw new WrongConfigurationModeError(this.configuration.mode, ModeDTO.ErrorOnce);
    }
    this.configuration.mode = ModeDTO.Direct;
    const { message, http, details } = this.configuration.errorOnce;
    throw new ModeError(message, http, details);
  }

  throwInfinityError() {
    if (this.configuration.mode !== ModeDTO.ErrorOnce) {
      throw new WrongConfigurationModeError(this.configuration.mode, ModeDTO.ErrorInfinity);
    }
    const { message, http, details } = this.configuration.errorInfinity;
    throw new ModeError(message, http, details);
  }

  getModeConfiguration(): ModeConfigurationDTO {
    return this.configuration;
  }

  setDelay(delay: number): ModeConfigurationDTO {
    if (delay <= 0) {
      throw new ValidationError(`Provided delay value less than 0. Delay ${delay}`);
    }
    this.configuration.delay = delay;
    this.logNewConfigurationValue();
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

  setErrorOnceMode(error?: ErrorDTO): ModeConfigurationDTO {
    if (error) {
      const { error: validationError } = errorDTOValidator.validate(error);
      if (validationError) {
        throw new ValidationError(validationError.message, validationError.detailsAsSting());
      }
      this.configuration.errorOnce = error;
    }

    this.configuration.mode = ModeDTO.ErrorOnce;
    this.logNewConfigurationValue();
    return this.configuration;
  }

  setErrorInfinityMode(error?: ErrorDTO): ModeConfigurationDTO {
    if (error) {
      const { error: validationError } = errorDTOValidator.validate(error);
      if (validationError) {
        throw new ValidationError(validationError.message, validationError.detailsAsSting());
      }
      this.configuration.errorInfinity = error;
    }

    this.configuration.mode = ModeDTO.ErrorInfinity;
    this.configuration.errorInfinity = error;

    this.logNewConfigurationValue();

    return this.configuration;
  }
  setPredefinedResponseMode(responses?: PredefinedResponsesDTO): ModeConfigurationDTO {
    if (responses) {
      const { error } = predefinedResponsesDTOValidator.validate(responses);
      if (error) {
        throw new ValidationError(error.message, error.detailsAsSting());
      }
      this.configuration.mode = ModeDTO.ErrorInfinity;
    }
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
