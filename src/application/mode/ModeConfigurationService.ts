import { injectable } from "inversify";

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
    this.configuration = {
      mode: ModeDTO.Random,
      errors: [],
      queriesResponses: { scouts: [], matches: [] },
      randomErrors: { count: 0, sended: 0 },
    };
  }
  private configuration: ModeConfigurationDTO;

  read(): ModeConfigurationDTO {
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
