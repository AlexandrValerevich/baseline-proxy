import { ErrorModel } from "./ErrorModel.js";
import { ModeModel } from "./ModeModel.js";
import { PredefinedResponsesModel } from "./PredefinedResponsesModel.js";

interface ModeConfigurationModel {
  mode: ModeModel;
  error: ErrorModel;
  predefinedResponses: PredefinedResponsesModel;
  delay: number;
  bodySubstitutionMessage?: string;
}

export { ModeConfigurationModel };
