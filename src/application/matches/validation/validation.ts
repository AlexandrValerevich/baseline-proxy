import Joi from "joi";

import {
  BetStopStatusDTO,
  BetStopTypeDTO,
  GetMatchesForPeriodQuery,
  MatchDTO,
  MatchStatusDTO,
  TeamDTO,
  TimerStatusDTO,
} from "../dto/index.js";

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
  status: Joi.valid(...Object.values(MatchStatusDTO)).required(),
  homeTeam: teamDtoValidator,
  awayTeam: teamDtoValidator,
  ingameTime: Joi.string().allow(null, "").optional(),
  betstopStatus: Joi.valid(...Object.values(BetStopStatusDTO)).optional(),
  refundStatus: Joi.boolean().optional(),
  triggerId: Joi.string().guid().optional(),
  options: Joi.object({
    periods: Joi.number().integer().min(0).required(),
    periodTime: Joi.number().integer().min(0).required(),
  }).optional(),
  homeScore: Joi.number().integer().min(0).optional(),
  awayScore: Joi.number().integer().min(0).optional(),
  periodScores: Joi.array()
    .items(
      Joi.object({
        period: Joi.number().integer().min(0).required(),
        homeScore: Joi.number().integer().min(0).required(),
        awayScore: Joi.number().integer().min(0).required(),
      }),
    )
    .optional(),
  period: Joi.number().integer().min(0).optional(),
  aftermatchShootouts: Joi.boolean().optional(),
  shootoutsScores: Joi.object({
    homeScores: Joi.array().items(Joi.number().integer().min(0)).required(),
    awayScores: Joi.array().items(Joi.number().integer().min(0)).required(),
  }).optional(),
  timer: Joi.number().integer().min(0).optional(),
  timerStatus: Joi.valid(...Object.values(TimerStatusDTO)).optional(),
  betstop: Joi.array()
    .items(
      Joi.object({
        type: Joi.valid(...Object.values(BetStopTypeDTO)).required(),
        value: Joi.valid(...Object.values(BetStopStatusDTO)).required(),
        updatedBy: Joi.string().allow("").optional(),
        updatedAt: Joi.string().allow("", null).optional(),
      }),
    )
    .optional(),
  assignedTrader: Joi.object({
    id: Joi.number().integer().min(0).required(),
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
  }).optional(),
  leagueName: Joi.string().trim().allow(null, "").optional(),
  homeCorrection: Joi.number().optional(),
  awayCorrection: Joi.number().optional(),
  homeTotal: Joi.number().min(0).optional(),
  awayTotal: Joi.number().min(0).optional(),
  matchDelay: Joi.boolean().optional(),
  timestamp: Joi.number().min(0).optional(),
  season: Joi.object({
    id: Joi.number().integer().min(0).required(),
    name: Joi.string().trim().required(),
    languageCode: Joi.string().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
  }).optional(),
  tournament: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required(),
  }).optional(),
  sport: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required(),
  }).optional(),
  country: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required(),
  }).optional(),
  venue: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required(),
  }).optional(),
});

const arrayMatchDtoValidator = Joi.array<MatchDTO[]>().items(matchDTOValidator);

export { getMatchesForPeriodQueryValidator, matchDTOValidator, arrayMatchDtoValidator };
