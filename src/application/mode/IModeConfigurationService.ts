import { ModeConfigurationDTO } from "./dto/ModeConfigurationDTO.js";
import { PredefinedResponsesDTO } from "./dto/PredefinedResponsesDTO.js";

export interface IModeConfigurationService {
  getModeConfiguration(): ModeConfigurationDTO;
  setDelay(delay: number): ModeConfigurationDTO;
  setDirectMode(): ModeConfigurationDTO;
  setRandomMode(): ModeConfigurationDTO;
  setErrorsOnceMode(error: ErrorDTO): ModeConfigurationDTO;
  setErrorsInfinityMode(error: ErrorDTO): ModeConfigurationDTO;
  setPredefinedResponseMode(responses: PredefinedResponsesDTO): ModeConfigurationDTO;
}
