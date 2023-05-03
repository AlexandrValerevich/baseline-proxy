import { injectable } from "inversify";
import { ModeDTO } from "./dto/ModeDTO.js";
import { ModeConfigurationDTO } from "./dto/ModeConfigurationDTO.js";
import { PredefinedResponsesDTO } from "./dto/PredefinedResponsesDTO.js";
import { IModeConfigurationService } from "./IModeConfigurationService.js";

@injectable()
class ModeConfigurationService implements IModeConfigurationService {
  /**
   *
   */
  constructor() {
    const defaultError: ErrorDTO = {
      http: { status: 500 },
      message: "Internal Error",
    };

    this.configuration = {
      mode: ModeDTO.Random,
      errorOnce: defaultError,
      errorInfinity: defaultError,
      queriesResponses: { scouts: [], matches: [] },
      delay: 1000,
    };
  }
  private configuration: ModeConfigurationDTO;

  getModeConfiguration(): ModeConfigurationDTO {
    return this.configuration;
  }
  setModeConfiguration(config: ModeConfigurationDTO): ModeConfigurationDTO {
    throw new Error("Method not implemented.");
  }
  setDirectMode(): ModeConfigurationDTO {
    throw new Error("Method not implemented.");
  }
  setRandomMode(): ModeConfigurationDTO {
    throw new Error("Method not implemented.");
  }
  setErrorsMode(errors: ErrorDTO[]): ModeConfigurationDTO {
    throw new Error("Method not implemented.");
  }
  serRandomErrorsMode(count: number): ModeConfigurationDTO {
    throw new Error("Method not implemented.");
  }
  setPredefinedResponseMode(responses: PredefinedResponsesDTO): ModeConfigurationDTO {
    throw new Error("Method not implemented.");
  }
}

export { IModeConfigurationService, ModeConfigurationService };
