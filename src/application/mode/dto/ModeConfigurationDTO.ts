import { ModeDTO } from "./ModeDTO.js";

interface ModeConfigurationDTO {
  mode: ModeDTO;
  errorOnce: ErrorDTO;
  errorInfinity: ErrorDTO;
  queriesResponses: PredefinedResponsesDTO;
}

export { ModeConfigurationDTO };
