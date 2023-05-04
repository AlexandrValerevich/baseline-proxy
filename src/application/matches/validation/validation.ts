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
  startedAt: Joi.date().iso().required(),
  status: Joi.valid(...Object.values(MatchStatusDTO)).required(),
  homeTeam: teamDtoValidator,
  awayTeam: teamDtoValidator,
  ingameTime: Joi.string().required(),
  betstopStatus: Joi.valid(...Object.values(BetStopStatusDTO)).required(),
  refundStatus: Joi.boolean().required(),
  triggerId: Joi.string().guid().required(),
  options: Joi.object({
    periods: Joi.number().integer().min(0).required(),
    periodTime: Joi.number().integer().min(0).required(),
  }).required(),
  homeScore: Joi.number().integer().min(0).required(),
  awayScore: Joi.number().integer().min(0).required(),
  periodScores: Joi.array()
    .items(
      Joi.object({
        period: Joi.number().integer().min(0).required(),
        homeScore: Joi.number().integer().min(0).required(),
        awayScore: Joi.number().integer().min(0).required(),
      }),
    )
    .required(),
  period: Joi.number().integer().min(0).required(),
  aftermatchShootouts: Joi.boolean().required(),
  shootoutsScores: Joi.object({
    homeScores: Joi.array().items(Joi.number().integer().min(0)).required(),
    awayScores: Joi.array().items(Joi.number().integer().min(0)).required(),
  }).required(),
  timer: Joi.number().integer().min(0).required(),
  timerStatus: Joi.valid(...Object.values(TimerStatusDTO)).required(),
  betstop: Joi.array()
    .items(
      Joi.object({
        type: Joi.valid(...Object.values(BetStopTypeDTO)).required(),
        value: Joi.valid(...Object.values(BetStopStatusDTO)).required(),
        updatedBy: Joi.string().required(),
        updatedAt: Joi.date().iso().required(),
      }),
    )
    .required(),
  assignedTrader: Joi.object({
    id: Joi.number().integer().min(0).required(),
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
  }).required(),
  leagueName: Joi.string().trim().required(),
  homeCorrection: Joi.number().integer().min(0).required(),
  awayCorrection: Joi.number().integer().min(0).required(),
  homeTotal: Joi.number().integer().min(0).required(),
  awayTotal: Joi.number().integer().min(0).required(),
  matchDelay: Joi.boolean().required(),
  timestamp: Joi.number().integer().min(0).required(),
  season: Joi.object({
    id: Joi.number().integer().min(0).required(),
    name: Joi.string().trim().required(),
    languageCode: Joi.string().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
  }).required(),
  tournament: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required(),
  }).required(),
  sport: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required(),
  }).required(),
  country: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required(),
  }).required(),
  venue: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    languageCode: Joi.string().required(),
  }).required(),
});

export { getMatchesForPeriodQueryValidator, matchDTOValidator };
