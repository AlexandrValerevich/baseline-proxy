import Joi from "joi";
import { ScoutDTO, GetScoutsForPeriodQuery, ScoutEventTypeRuDTO } from "../dto/index.js";

const getScoutsForPeriodQueryValidator = Joi.object<GetScoutsForPeriodQuery>({
  timeFrom: Joi.date().required(),
  timeTo: Joi.date().required(),
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
  playerId: Joi.number().integer().min(0).allow(null).optional(),
  player: Joi.string().allow(null).optional(),
  triggerId: Joi.string().guid().optional(),
  changeType: Joi.string().valid("ADDED", "REMOVED", "SYSTEM"),
  timestamp: Joi.number().min(0),
});

const arrayScoutDTOValidator = Joi.array<ScoutDTO[]>().items(scoutDTOValidator);

export { getScoutsForPeriodQueryValidator, scoutDTOValidator, arrayScoutDTOValidator };
