import { ApolloServerErrorCode } from "@apollo/server/errors";
import { ModeDTO } from "../application/mode/dto/ModeDTO.js";
import { GraphQLError, GraphQLScalarType, Kind } from "graphql";
import { IValueContext } from "./context.js";

const query = {
  Query: {
    matches: () => [],
    getMatchScoutEvents: (_, { timeFrom, timeTo }, { scoutService }: IValueContext, __) => {
      const response = scoutService.getScouts({
        timeFrom: timeFrom,
        timeTo: timeTo,
      });
      return response;
    },
    getModeConfiguration: (_, __, { modeConfigurationsService }: IValueContext, ___) =>
      modeConfigurationsService.getModeConfiguration(),
  },
};

const mutation = {
  Mutation: {
    setDelay: (_, { delay }, { modeConfigurationsService }: IValueContext, __) => {
      console.log("Start handler SetDelay");
      return modeConfigurationsService.setDelay(delay);
    },
    setDirectMode: (_, ___, { modeConfigurationsService }: IValueContext, __) =>
      modeConfigurationsService.setDirectMode(),
    setRandomMode: (_, ___, { modeConfigurationsService }: IValueContext, __) =>
      modeConfigurationsService.setRandomMode(),
    setErrorOnceMode: (_, { error }, { modeConfigurationsService }: IValueContext, __) =>
      modeConfigurationsService.setErrorOnceMode(error),
    setErrorInfinityMode: (_, { error }, { modeConfigurationsService }: IValueContext, __) =>
      modeConfigurationsService.setErrorInfinityMode(error),
    setPredefinedResponseMode: (
      _,
      { responses },
      { modeConfigurationsService }: IValueContext,
      __,
    ) => modeConfigurationsService.setPredefinedResponseMode(responses),
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
    error_once: ModeDTO.ErrorInfinity,
    predefined_responses: ModeDTO.PredefinedResponses,
    random: ModeDTO.Random,
  },
};

const resolvers = [query, mutation, mode, dateTime];

export { resolvers };
