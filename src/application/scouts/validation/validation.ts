import Joi from 'joi'
import { type ScoutDTO, type GetScoutsForPeriodQuery, ScoutEventTypeRuDTO } from '../dto/index.js'

const getScoutsForPeriodQueryValidator = Joi.object<GetScoutsForPeriodQuery>({
  dateFrom: Joi.date().required(),
  dateTo: Joi.date().required()
})

const scoutDTOValidator = Joi.object<ScoutDTO>({
  id: Joi.number().required(),
  matchId: Joi.number().required(),
  owner: Joi.number().valid('game', 'home', 'away'),
  eventId: Joi.number()
    .valid(...Object.values(ScoutEventTypeRuDTO))
    .required(),
  ingameTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):[0-5]\d$/)
    .required(),
  dateTime: Joi.date(),
  changeType: Joi.string().valid('added', 'removed', 'restored')
})

const arrayScoutDTOValidator = Joi.array<ScoutDTO[]>().items(scoutDTOValidator)

export { getScoutsForPeriodQueryValidator, scoutDTOValidator, arrayScoutDTOValidator }
