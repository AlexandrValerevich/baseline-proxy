import { ApolloServerErrorCode } from "@apollo/server/errors";
import { ModeDTO } from "../application/mode/dto/ModeDTO.js";
import { GraphQLError, GraphQLScalarType, Kind } from "graphql";
import { IContext } from "./context.js";
import {
  BetStopStatusDTO,
  BetStopTypeDTO,
  BetStopValueDTO,
  ErrorDTO,
  MatchDTO,
  MatchStatusDTO,
  ModeConfigurationService,
  ScoutDTO,
  TimerStatusDTO,
} from "../application/index.js";

const query = {
  Query: {
    matches: (_, { dateFrom, dateTo }, { matchesService }: IContext, __) => {
      const response = matchesService.getMatches({ timeFrom: dateFrom, timeTo: dateTo });
      return response;
    },
    getMatchScoutEvents: (_, { timeFrom, timeTo }, { scoutService }: IContext, __) => {
      const response = scoutService.getScouts({ timeFrom: timeFrom, timeTo: timeTo });
      return response;
    },
    getModeConfiguration: (_, __, { modeConfigurationsService }: IContext, ___) =>
      modeConfigurationsService.getModeConfiguration(),
  },
};

const mutation = {
  Mutation: {
    onDirectMode: (_, ___, { modeConfigurationsService }: IContext, __) =>
      modeConfigurationsService.onDirectMode(),
    onRandomMode: (_, ___, { modeConfigurationsService }: IContext, __) =>
      modeConfigurationsService.onRandomMode(),
    onErrorOnceMode: (_, ___, { modeConfigurationsService }: IContext, __) =>
      modeConfigurationsService.onErrorOnceMode(),
    onErrorInfinityMode: (_, ___, { modeConfigurationsService }: IContext, __) =>
      modeConfigurationsService.onErrorInfinityMode(),
    onPredefinedResponseMode: (_, ___, { modeConfigurationsService }: IContext, __) =>
      modeConfigurationsService.onPredefinedResponseMode(),
    setDelay: (_, { delay }: { delay: number }, { modeConfigurationsService }: IContext, __) =>
      modeConfigurationsService.setDelay(delay),
    setError: (_, { error }: { error: ErrorDTO }, { modeConfigurationsService }: IContext, __) =>
      modeConfigurationsService.setError(error),
    setPredefinedScouts: (
      _,
      { scouts }: { scouts: ScoutDTO[] },
      { modeConfigurationsService }: IContext,
      __,
    ) => modeConfigurationsService.setPredefinedScouts(scouts),
    setPredefinedMatches: (
      _,
      { matches }: { matches: MatchDTO[] },
      { modeConfigurationsService }: IContext,
      __,
    ) => modeConfigurationsService.setPredefinedMatches(matches),
  },
};

const dateTime = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "Date with time (iso format)",
    parseValue: (value) => {
      if (typeof value !== "string") {
        throw new GraphQLError(
          `GraphQL DateTime Scalar requires a string input, but received: ${typeof value}`,
          {
            extensions: {
              code: ApolloServerErrorCode.BAD_USER_INPUT,
              http: { status: 400 },
            },
          },
        );
      }

      const date = new Date(value);

      if (!date.IsValid()) {
        throw new GraphQLError(`GraphQL DateTime Scalar failed parse. Provided value: [${value}]`, {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            http: { status: 400 },
          },
        });
      }

      return date;
    },
    serialize: (value) => {
      if (value instanceof Date) {
        return value.toISOString(); // Convert outgoing Date to ISO Date for JSON
      }
      throw new GraphQLError("GraphQL DateTime Scalar serializer expected a `Date` object", {
        extensions: {
          code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
          http: { status: 500 },
        },
      });
    },
    parseLiteral: (ast) => {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError("Provided value is not an ISO Date", {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            http: { status: 400 },
          },
        });
      }

      const date = new Date(ast.value);

      if (!date.IsValid()) {
        throw new GraphQLError("Invalid ISO Date provided", {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            http: { status: 400 },
          },
        });
      }

      return date;
    },
  }),
};

const mode = {
  Mode: {
    direct: ModeDTO.Direct,
    error_infinity: ModeDTO.ErrorInfinity,
    error_once: ModeDTO.ErrorOnce,
    predefined_responses: ModeDTO.PredefinedResponses,
    random: ModeDTO.Random,
  },
};

const matchStatus = {
  MatchStatus: {
    planned: MatchStatusDTO.Planned,
    prematch: MatchStatusDTO.Prematch,
    live: MatchStatusDTO.Live,
    done: MatchStatusDTO.Done,
    forecast_missed: MatchStatusDTO.ForecastMissed,
  },
};

const betstopValues = {
  BetstopsValues: {
    ok: BetStopValueDTO.Ok,
    timeout: BetStopValueDTO.Timeout,
    stop: BetStopValueDTO.Stop,
    ready_to_stop: BetStopValueDTO.ReadToStop,
    ready_to_start: BetStopValueDTO.ReadToStart,
  },
};

const timerStatus = {
  TimerStatus: {
    stopped: TimerStatusDTO.Stopped,
    running: TimerStatusDTO.Running,
  },
};

const betstopType = {
  BetstopType: {
    scout: BetStopTypeDTO.Scout,
    system: BetStopTypeDTO.System,
    analyst: BetStopTypeDTO.Analyst,
  },
};

const betstopStatus = {
  BetstopStatus: {
    ok: BetStopStatusDTO.Ok,
    stop: BetStopStatusDTO.Stop,
    ready_to_start: BetStopStatusDTO.ReadToStart,
  },
};

const resolvers = [
  query,
  mutation,
  mode,
  matchStatus,
  betstopValues,
  timerStatus,
  betstopType,
  betstopStatus,
  dateTime,
];

export { resolvers };
