import { ModeDTO } from "./ModeDTO.js";
import { ErrorDTO } from "./ErrorDTO.js";
import { PredefinedResponsesDTO } from "./PredefinedResponsesDTO.js";

interface ModeConfigurationDTO {
  mode: ModeDTO;
  errorOnce: ErrorDTO;
  errorInfinity: ErrorDTO;
  queriesResponses: PredefinedResponsesDTO;
  delay: number;
}

export { ModeConfigurationDTO };
