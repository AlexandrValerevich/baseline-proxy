import Joi from 'joi'
import { type GetMatchesForPeriodQuery, type MatchDTO, type TeamDTO } from '../dto/index.js'

const getMatchesForPeriodQueryValidator = Joi.object<GetMatchesForPeriodQuery>({
  dateFrom: Joi.date().required(),
  dateTo: Joi.date().required()
})

const teamDtoValidator = Joi.object<TeamDTO>({
  id: Joi.number().integer().min(0).required(),
  name: Joi.string().trim().required(),
  languageCode: Joi.string().required(),
  probability: Joi.number().min(0).max(10).allow(null).optional(),
  total: Joi.number().min(0).max(10).allow(null).optional()
}).required()

const matchDTOValidator = Joi.object<MatchDTO>({
  id: Joi.number().integer().min(0).required(),
  name: Joi.string().trim().required(),
  startedAt: Joi.string().required(),
  status: Joi.valid('planned', 'prematch', 'live', 'done', 'forecast_missed').required(),
  homeTeam: teamDtoValidator,
  awayTeam: teamDtoValidator,
  periodScores: Joi.array()
    .items(
      Joi.object({
        period: Joi.number().integer().min(0).required(),
        homeScore: Joi.number().integer().min(0).required(),
        awayScore: Joi.number().integer().min(0).required()
      })
    )
    .allow(null)
    .optional(),
  period: Joi.number().integer().min(0).allow(null).optional(),
  shootoutsScores: Joi.object({
    homeScores: Joi.array().items(Joi.number().integer().min(0)).optional(),
    awayScores: Joi.array().items(Joi.number().integer().min(0)).optional()
  })
    .allow(null)
    .optional(),
  betStatus: Joi.boolean().allow(null).optional(),
  dateTime: Joi.date().min(0).allow(null).optional(),
  season: Joi.object({
    id: Joi.number().integer().min(0).required(),
    name: Joi.string().trim().required(),
    languageCode: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required()
  })
    .allow(null)
    .optional(),
  tournament: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required()
  })
    .allow(null)
    .optional(),
  sport: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required()
  })
    .allow(null)
    .optional(),
  country: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required()
  })
    .allow(null)
    .optional(),
  venue: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required()
  })
    .allow(null)
    .optional()
})

const arrayMatchDtoValidator = Joi.array<MatchDTO[]>().items(matchDTOValidator)

export { getMatchesForPeriodQueryValidator, matchDTOValidator, arrayMatchDtoValidator }
