import "reflect-metadata";
import { injectable } from "inversify";
import { IModeConfigurationService } from "./IModeConfigurationService.js";
import {
  errorDTOValidator,
  modeConfigurationDTOValidator,
  modeDTOValidator,
} from "./validation/index.js";
import { ModeError, ValidationError, WrongConfigurationModeError } from "../exceptions/index.js";
import { ErrorDTO, ModeDTO, ModeConfigurationDTO } from "./dto/index.js";
import { logger } from "../../logger/index.js";
import { MatchDTO } from "../matches/index.js";
import { ScoutDTO } from "../scouts/index.js";
import { arrayScoutDTOValidator } from "../scouts/validation/index.js";
import { arrayMatchDtoValidator } from "../matches/validation/index.js";

@injectable()
class ModeConfigurationService implements IModeConfigurationService {
  private readonly configuration: ModeConfigurationDTO;

  constructor() {
    this.configuration = {
      mode: "direct",
      error: {
        message: "Internal Error",
        details: "Some error details",
        extensions: { http: { status: 500 }, randomField: "randomValue" },
      },
      predefinedResponses: { scouts: [], matches: [] },
      delay: 100,
      bodySubstitutionMessage: "",
    };
  }

  setDelay(delay: number): void {
    if (delay <= 0) {
      throw new ValidationError(`Provided delay value less than 0. Delay ${delay}`);
    }
    this.configuration.delay = delay;
    this.logNewConfigurationValue();
  }

  setMode(mode: ModeDTO): void {
    const { value, error: validationError } = modeDTOValidator.validate(mode);
    if (validationError) {
      throw new ValidationError(validationError.message, validationError.detailsAsSting());
    }
    this.configuration.mode = value;
    this.logNewConfigurationValue();
  }

  setBodySubstitutionMessage(message?: string): void {
    this.configuration.bodySubstitutionMessage = message;
    this.logNewConfigurationValue();
  }

  setError(error?: ErrorDTO | undefined): void {
    const { value, error: validationError } = errorDTOValidator.validate(error);
    if (validationError) {
      throw new ValidationError(validationError.message, validationError.detailsAsSting());
    }
    this.configuration.error = value;
    this.logNewConfigurationValue();
  }

  setPredefinedScouts(scouts: ScoutDTO[]): void {
    const { value, error } = arrayScoutDTOValidator.validate(scouts);
    if (error) {
      throw new ValidationError(error.message, error.detailsAsSting());
    }
    this.configuration.predefinedResponses.scouts = value;
    this.logNewConfigurationValue();
  }

  setPredefinedMatches(matches: MatchDTO[]): void {
    const { value, error } = arrayMatchDtoValidator.validate(matches);
    if (error) {
      throw new ValidationError(error.message, error.detailsAsSting());
    }
    this.configuration.predefinedResponses.matches = value;
    this.logNewConfigurationValue();
  }

  setModeConfiguration(configuration: ModeConfigurationDTO): void {
    const { value, error } = modeConfigurationDTOValidator.validate(configuration);
    if (error) {
      throw new ValidationError(error.message, error.detailsAsSting());
    }
    this.configuration.mode = value.mode;
    this.configuration.delay = value.delay;
    this.configuration.error = value.error;
    this.configuration.predefinedResponses = value.predefinedResponses;
    this.configuration.bodySubstitutionMessage = value.bodySubstitutionMessage;
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

  getBodySubstitutionMessage(): string | undefined {
    return this.configuration.bodySubstitutionMessage;
  }

  getError(): ErrorDTO {
    return this.configuration.error;
  }

  throwOnceError() {
    if (this.configuration.mode !== "error_once") {
      throw new WrongConfigurationModeError(this.configuration.mode, "error_once");
    }
    logger.debug("Throw once error and switch to direct mode.");
    this.configuration.mode = "direct";
    throw new ModeError(this.configuration.error);
  }

  throwInfinityError() {
    if (this.configuration.mode !== "error_infinity") {
      throw new WrongConfigurationModeError(this.configuration.mode, "error_infinity");
    }
    logger.debug("Throw infinity error.");
    throw new ModeError(this.configuration.error);
  }

  private logNewConfigurationValue() {
    logger.debug({
      message: `New configuration value is set. Mode: ${this.configuration.mode}, Delay ${this.configuration.delay}`,
      configuration: this.configuration,
    });
  }
}

export { IModeConfigurationService, ModeConfigurationService };
