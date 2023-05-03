import Joi from "joi";
import { PredefinedResponsesDTO } from "./PredefinedResponsesDTO.js";
import { ScoutEventTypeRuDTO } from "../../scouts/dto/ScoutEventTypeRuDTO.js";

const errorDTOValidator = Joi.object<ErrorDTO>({
  message: Joi.string().required(),
  http: Joi.object<{ status: number }>({
    status: Joi.number().integer().min(400).max(599),
  }),
  details: Joi.string().not().required(),
});

const scoutDTOValidator = Joi.object<ScoutDTO>({
  id: Joi.number().integer().min(0).required(),
  team: Joi.string().required(),
  matchId: Joi.number().integer().min(0).required(),
  eventName: Joi.string().valid(
    ...Object.values(ScoutEventTypeRuDTO).filter((x) => typeof x === "string"),
  ),
  eventId: Joi.string().valid(
    ...Object.values(ScoutEventTypeRuDTO).filter((x) => typeof x === "number"),
  ),
  minutes: Joi.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  timeOfEvent: Joi.date().required(),
  stage: Joi.number().integer().min(1).max(4),
  eventTimestamp: Joi.number().integer().min(0).required(),
  playerId: Joi.number().integer().min(0).required(),
  triggerId: Joi.string().guid(),
  changeType: Joi.string().valid("ADDED", "REMOVED", "SYSTEM"),
  timestamp: Joi.number().integer().min(0).required(),
});

const predefinedResponsesDTOValidator = Joi.object<PredefinedResponsesDTO>({
  scouts: Joi.array().items(scoutDTOValidator),
});

export { errorDTOValidator, predefinedResponsesDTOValidator };
