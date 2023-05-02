import { injectable } from "inversify";
import { ModeDTO } from "./dto/ModeDTO.js";
import { ModeConfigurationDTO } from "./dto/ModeConfigurationDTO.js";

interface IModeConfigurationService {
  read(): ModeConfigurationDTO;
  write(config: ModeConfigurationDTO): ModeConfigurationDTO;
  setDirectMode(): ModeConfigurationDTO;
  setRandomMode(): ModeConfigurationDTO;
  setErrorsMode(errors: ErrorDTO[]): ModeConfigurationDTO;
  serRandomErrorsMode(count: number): ModeConfigurationDTO;
  setPredefinedResponseMode(
    responses: PredefinedResponsesDTO
  ): ModeConfigurationDTO;
}

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
    };
  }
  private configuration: ModeConfigurationDTO;

  read(): ModeConfigurationDTO {
    console.log(this.configuration);
    return this.configuration;
  }
  write(config: ModeConfigurationDTO): ModeConfigurationDTO {
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
  setPredefinedResponseMode(
    responses: PredefinedResponsesDTO
  ): ModeConfigurationDTO {
    throw new Error("Method not implemented.");
  }
}

export { IModeConfigurationService, ModeConfigurationService };
