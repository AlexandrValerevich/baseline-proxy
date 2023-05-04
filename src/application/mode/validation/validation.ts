import Joi from "joi";
import { PredefinedResponsesDTO, ErrorDTO } from "../dto/index.js";
import { matchDTOValidator } from "../../matches/validation/index.js";
import { scoutDTOValidator } from "../../scouts/validation/index.js";

const errorDTOValidator = Joi.object<ErrorDTO>({
  message: Joi.string().required(),
  http: Joi.object<{ status: number }>({
    status: Joi.number().integer().min(400).max(599),
  }),
  details: Joi.string().not().required(),
});

const predefinedResponsesDTOValidator = Joi.object<PredefinedResponsesDTO>({
  scouts: Joi.array().items(scoutDTOValidator),
  matches: Joi.array().items(matchDTOValidator),
});

export { errorDTOValidator, predefinedResponsesDTOValidator };
