import Joi from 'joi'
import { type GetMatchesForPeriodQuery, type MatchDTO } from '../dto/index.js'

const getMatchesForPeriodQueryValidator = Joi.object<GetMatchesForPeriodQuery>({
  dateFrom: Joi.date().required(),
  dateTo: Joi.date().required()
})

const matchStatusDTOValidator = Joi.string().valid('live', 'done', 'canceled', 'planned', 'delayed', 'new_value');

const localizedStringDTOValidator = Joi.object({
  name: Joi.string().required(),
  languageCode: Joi.string().valid('RU', 'EN', 'NEW').required()
});

const matchDTOValidator = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  status: matchStatusDTOValidator.required(),
  dateTime: Joi.date().required(),
  startedAt: Joi.string().required(),
  homeScore: Joi.number(),
  awayScore: Joi.number(),
  period: Joi.number(),
  betStatus: Joi.boolean(),
  shootoutsStatus: Joi.boolean(),
  periodScores: Joi.array().items(
    Joi.object({
      period: Joi.number().required(),
      homeScore: Joi.number().required(),
      awayScore: Joi.number().required()
    })
  ),
  shootoutsScores: Joi.array().items(
    Joi.object({
      number: Joi.number().required(),
      owner: Joi.string().valid('home', 'away', 'new_value').required(),
      isScored: Joi.boolean().required()
    })
  ),
  homeTeam: Joi.object({
    id: Joi.number().required(),
    names: Joi.array().items(localizedStringDTOValidator).required(),
    total: Joi.number(),
    probability: Joi.number()
  }),
  awayTeam: Joi.object({
    id: Joi.number().required(),
    names: Joi.array().items(localizedStringDTOValidator).required(),
    total: Joi.number(),
    probability: Joi.number()
  }),
  season: Joi.object({
    id: Joi.number().required(),
    names: Joi.array().items(localizedStringDTOValidator).required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required()
  }),
  tournament: Joi.object({
    id: Joi.number().required(),
    names: Joi.array().items(localizedStringDTOValidator).required()
  }),
  sport: Joi.object({
    id: Joi.number().required(),
    names: Joi.array().items(localizedStringDTOValidator).required()
  }),
  country: Joi.object({
    id: Joi.number().required(),
    names: Joi.array().items(localizedStringDTOValidator).required()
  }),
  venue: Joi.object({
    id: Joi.number().required(),
    names: Joi.array().items(localizedStringDTOValidator).required()
  })
});

const arrayMatchDtoValidator = Joi.array<MatchDTO[]>().items(matchDTOValidator)

export { getMatchesForPeriodQueryValidator, matchDTOValidator, arrayMatchDtoValidator }
