import Joi from "joi";
import { GetMatchesForPeriodQuery, MatchDTO, TeamDTO } from "../dto/index.js";

const getMatchesForPeriodQueryValidator = Joi.object<GetMatchesForPeriodQuery>({
  timeFrom: Joi.date().required(),
  timeTo: Joi.date().required(),
});

const teamDtoValidator = Joi.object<TeamDTO>({
  id: Joi.number().integer().min(0).required(),
  name: Joi.string().trim().required(),
  languageCode: Joi.string().required(),
}).required();

const matchDTOValidator = Joi.object<MatchDTO>({
  id: Joi.number().integer().min(0).required(),
  name: Joi.string().trim().required(),
  startedAt: Joi.string().required(),
  status: Joi.valid("planned", "prematch", "live", "done", "forecast_missed").required(),
  homeTeam: teamDtoValidator,
  awayTeam: teamDtoValidator,
  ingameTime: Joi.string().allow(null, "").optional(),
  betstopStatus: Joi.valid("ok", "timeout", "stop", "read_to_stop", "read_to_start")
    .allow(null)
    .optional(),
  refundStatus: Joi.boolean().allow(null).optional(),
  triggerId: Joi.string().guid().allow(null).optional(),
  options: Joi.object({
    periods: Joi.number().integer().min(0).required(),
    periodTime: Joi.number().integer().min(0).required(),
  })
    .allow(null)
    .optional(),
  homeScore: Joi.number().integer().min(0).allow(null).optional(),
  awayScore: Joi.number().integer().min(0).allow(null).optional(),
  periodScores: Joi.array()
    .items(
      Joi.object({
        period: Joi.number().integer().min(0).required(),
        homeScore: Joi.number().integer().min(0).required(),
        awayScore: Joi.number().integer().min(0).required(),
      }),
    )
    .allow(null)
    .optional(),
  period: Joi.number().integer().min(0).allow(null).optional(),
  aftermatchShootouts: Joi.boolean().allow(null).optional(),
  shootoutsScores: Joi.object({
    homeScores: Joi.array().items(Joi.number().integer().min(0)).required(),
    awayScores: Joi.array().items(Joi.number().integer().min(0)).required(),
  })
    .allow(null)
    .optional(),
  timer: Joi.number().integer().min(0).allow(null).optional(),
  timerStatus: Joi.valid("stopped", "running").allow(null).optional(),
  betstop: Joi.array()
    .items(
      Joi.object({
        type: Joi.valid("scout", "system", "analyst").required(),
        value: Joi.valid("ok", "stop", "read_to_start").required(),
        updatedBy: Joi.string().allow("").optional(),
        updatedAt: Joi.string().allow("", null).optional(),
      }),
    )
    .allow(null)
    .optional(),
  assignedTrader: Joi.object({
    id: Joi.number().integer().min(0).required(),
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
  })
    .allow(null)
    .optional(),
  leagueName: Joi.string().trim().allow(null, "").optional(),
  homeCorrection: Joi.number().allow(null).optional(),
  awayCorrection: Joi.number().allow(null).optional(),
  homeTotal: Joi.number().min(0).allow(null).optional(),
  awayTotal: Joi.number().min(0).allow(null).optional(),
  matchDelay: Joi.boolean().allow(null).optional(),
  timestamp: Joi.number().min(0).allow(null).optional(),
  season: Joi.object({
    id: Joi.number().integer().min(0).required(),
    name: Joi.string().trim().required(),
    languageCode: Joi.string().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
  })
    .allow(null)
    .optional(),
  tournament: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required(),
  })
    .allow(null)
    .optional(),
  sport: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required(),
  })
    .allow(null)
    .optional(),
  country: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required(),
  })
    .allow(null)
    .optional(),
  venue: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required(),
  })
    .allow(null)
    .optional(),
});

const arrayMatchDtoValidator = Joi.array<MatchDTO[]>().items(matchDTOValidator);

export { getMatchesForPeriodQueryValidator, matchDTOValidator, arrayMatchDtoValidator };
