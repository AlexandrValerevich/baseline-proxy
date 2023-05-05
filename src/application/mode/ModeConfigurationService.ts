import "reflect-metadata";
import { injectable } from "inversify";
import { IModeConfigurationService } from "./IModeConfigurationService.js";
import { errorDTOValidator, predefinedResponsesDTOValidator } from "./validation/index.js";
import { ModeError, ValidationError, WrongConfigurationModeError } from "../exceptions/index.js";
import { ErrorDTO, ModeDTO, ModeConfigurationDTO, PredefinedResponsesDTO } from "./dto/index.js";
import { logger } from "../../logger/index.js";
import { MatchDTO } from "../matches/index.js";
import { ScoutDTO } from "../scouts/index.js";
import { arrayScoutDTOValidator } from "../scouts/validation/index.js";
import { arrayMatchDtoValidator } from "../matches/validation/index.js";

@injectable()
class ModeConfigurationService implements IModeConfigurationService {
  private configuration: ModeConfigurationDTO;

  constructor() {
    this.configuration = {
      mode: ModeDTO.Direct,
      error: {
        http: { status: 500 },
        message: "Internal Error",
        details: "Some error details",
      },
      predefinedResponses: { scouts: [], matches: [] },
      delay: 100,
    };
  }

  setError(error?: ErrorDTO | undefined): ModeConfigurationDTO {
    const { value, error: validationError } = errorDTOValidator.validate(error);
    if (validationError) {
      throw new ValidationError(validationError.message, validationError.detailsAsSting());
    }
    this.configuration.error = value;
    this.logNewConfigurationValue();
    return this.configuration;
  }

  setPredefinedScouts(scouts: ScoutDTO[]): ModeConfigurationDTO {
    const { value, error } = arrayScoutDTOValidator.validate(scouts);
    if (error) {
      throw new ValidationError(error.message, error.detailsAsSting());
    }
    this.configuration.predefinedResponses.scouts = value;
    this.logNewConfigurationValue();
    return this.configuration;
  }

  setPredefinedMatches(matches: MatchDTO[]): ModeConfigurationDTO {
    const { value, error } = arrayMatchDtoValidator.validate(matches);
    if (error) {
      throw new ValidationError(error.message, error.detailsAsSting());
    }
    this.configuration.predefinedResponses.matches = value;
    this.logNewConfigurationValue();
    return this.configuration;
  }

  getModeConfiguration(): ModeConfigurationDTO {
    return this.configuration;
  }

  getDelay(): number {
    return this.configuration.delay;
  }

  getMode(): ModeDTO {
    return this.configuration.mode;
  }

  getPredefinedScouts(): ScoutDTO[] {
    return this.configuration.predefinedResponses.scouts;
  }

  getPredefinedMatches(): MatchDTO[] {
    return this.configuration.predefinedResponses.matches;
  }

  throwOnceError() {
    if (this.configuration.mode !== ModeDTO.ErrorOnce) {
      throw new WrongConfigurationModeError(this.configuration.mode, ModeDTO.ErrorOnce);
    }
    logger.debug("Throw once error and switch to direct mode.");
    this.configuration.mode = ModeDTO.Direct;
    const error = this.configuration.error;
    throw new ModeError(error.message, error.http, error.details);
  }

  throwInfinityError() {
    if (this.configuration.mode !== ModeDTO.ErrorInfinity) {
      throw new WrongConfigurationModeError(this.configuration.mode, ModeDTO.ErrorInfinity);
    }
    logger.debug("Throw infinity error.");
    const error = this.configuration.error;
    throw new ModeError(error.message, error.http, error.details);
  }

  setDelay(delay: number): ModeConfigurationDTO {
    if (delay <= 0) {
      throw new ValidationError(`Provided delay value less than 0. Delay ${delay}`);
    }
    this.configuration.delay = delay;
    this.logNewConfigurationValue();
    return this.configuration;
  }

  onDirectMode(): ModeConfigurationDTO {
    this.configuration.mode = ModeDTO.Direct;
    this.logNewConfigurationValue();
    return this.configuration;
  }

  onRandomMode(): ModeConfigurationDTO {
    this.configuration.mode = ModeDTO.Random;
    this.logNewConfigurationValue();
    return this.configuration;
  }

  onErrorOnceMode(): ModeConfigurationDTO {
    this.configuration.mode = ModeDTO.ErrorOnce;
    this.logNewConfigurationValue();
    return this.configuration;
  }

  onErrorInfinityMode(): ModeConfigurationDTO {
    this.configuration.mode = ModeDTO.ErrorInfinity;
    this.logNewConfigurationValue();
    return this.configuration;
  }

  onPredefinedResponseMode(): ModeConfigurationDTO {
    this.configuration.mode = ModeDTO.PredefinedResponses;
    this.logNewConfigurationValue();
    return this.configuration;
  }

  private logNewConfigurationValue() {
    logger.info({
      message: `New configuration value is set. Mode: ${ModeDTO[this.configuration.mode]}, Delay ${
        this.configuration.delay
      }`,
      configuration: this.configuration,
    });
  }
}

export { IModeConfigurationService, ModeConfigurationService };
