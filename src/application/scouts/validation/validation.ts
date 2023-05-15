import Joi from 'joi'
import { type ScoutDTO, type GetScoutsForPeriodQuery, ScoutEventTypeRuDTO } from '../dto/index.js'

const getScoutsForPeriodQueryValidator = Joi.object<GetScoutsForPeriodQuery>({
  dateFrom: Joi.date().required(),
  dateTo: Joi.date().required()
})

const scoutDTOValidator = Joi.object<ScoutDTO>({
  id: Joi.number().required(),
  matchId: Joi.number().required(),
  team: Joi.number().valid(1, 2).allow(null).optional(),
  eventId: Joi.number()
    .valid(...Object.values(ScoutEventTypeRuDTO))
    .required(),
  scoutTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):[0-5]\d$/)
    .required(),
  timestamp: Joi.number().optional(),
  changeType: Joi.string().valid('ADDED', 'REMOVED', 'RESTORED').allow(null).optional()
})

const arrayScoutDTOValidator = Joi.array<ScoutDTO[]>().items(scoutDTOValidator)

export { getScoutsForPeriodQueryValidator, scoutDTOValidator, arrayScoutDTOValidator }
