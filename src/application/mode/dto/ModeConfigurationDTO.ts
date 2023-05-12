import { ModeDTO } from "./ModeDTO.js";
import { ErrorDTO } from "./ErrorDTO.js";
import { PredefinedResponsesDTO } from "./PredefinedResponsesDTO.js";

interface ModeConfigurationDTO {
  mode: ModeDTO;
  error: ErrorDTO;
  predefinedResponses: PredefinedResponsesDTO;
  delay: number;
  bodySubstitutionMessage?: string;
}

export { ModeConfigurationDTO };
