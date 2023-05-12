import Joi from "joi";
import { PredefinedResponsesDTO, ErrorDTO, ModeDTO, ModeConfigurationDTO } from "../dto/index.js";
import { matchDTOValidator } from "../../matches/validation/index.js";
import { scoutDTOValidator } from "../../scouts/validation/index.js";

const errorDTOValidator = Joi.object<ErrorDTO>({
  message: Joi.string().required(),
  details: Joi.string().optional(),
  extensions: Joi.any().allow(null).optional(),
});

const predefinedResponsesDTOValidator = Joi.object<PredefinedResponsesDTO>({
  scouts: Joi.array().items(scoutDTOValidator),
  matches: Joi.array().items(matchDTOValidator),
});

const modeDTOValidator = Joi.string<ModeDTO>().valid(
  "direct",
  "random",
  "predefined_response",
  "error_once",
  "error_infinity",
  "body_substitution",
);

const modeConfigurationDTOValidator = Joi.object<ModeConfigurationDTO>({
  mode: modeDTOValidator,
  delay: Joi.number().min(0),
  error: errorDTOValidator,
  predefinedResponses: predefinedResponsesDTOValidator,
  bodySubstitutionMessage: Joi.string().allow("", null),
});

export {
  errorDTOValidator,
  predefinedResponsesDTOValidator,
  modeDTOValidator,
  modeConfigurationDTOValidator,
};
