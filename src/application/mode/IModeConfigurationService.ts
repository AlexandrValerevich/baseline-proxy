import { ModeConfigurationDTO } from "./dto/ModeConfigurationDTO.js";
import { PredefinedResponsesDTO } from "./dto/PredefinedResponsesDTO.js";

export interface IModeConfigurationService {
  getModeConfiguration(): ModeConfigurationDTO;
  setModeConfiguration(config: ModeConfigurationDTO): ModeConfigurationDTO;
  setDirectMode(): ModeConfigurationDTO;
  setRandomMode(): ModeConfigurationDTO;
  setErrorsMode(errors: ErrorDTO[]): ModeConfigurationDTO;
  serRandomErrorsMode(count: number): ModeConfigurationDTO;
  setPredefinedResponseMode(responses: PredefinedResponsesDTO): ModeConfigurationDTO;
}
