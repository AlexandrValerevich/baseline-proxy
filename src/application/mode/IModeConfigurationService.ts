import { ModeConfigurationDTO } from "./dto/ModeConfigurationDTO.js";
import { PredefinedResponsesDTO } from "./dto/PredefinedResponsesDTO.js";
import { ErrorDTO } from "./dto/index.js";

export interface IModeConfigurationService {
  getModeConfiguration(): ModeConfigurationDTO;
  setDelay(delay: number): ModeConfigurationDTO;
  setDirectMode(): ModeConfigurationDTO;
  setRandomMode(): ModeConfigurationDTO;
  setErrorOnceMode(error?: ErrorDTO): ModeConfigurationDTO;
  setErrorInfinityMode(error?: ErrorDTO): ModeConfigurationDTO;
  setPredefinedResponseMode(responses?: PredefinedResponsesDTO): ModeConfigurationDTO;
  throwOnceError();
  throwInfinityError();
}
