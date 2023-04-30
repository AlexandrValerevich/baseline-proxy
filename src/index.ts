import { ApolloServer, ApolloServerOptions } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Container } from "inversify";
import { container, TYPES } from "./inversify.config.js";
import "./extensions/date-extensions.js";
import { IScoutService } from "./application/scouts/ScoutService.js";
import { graphQlDateTime } from "./graphql-scalar/graphQlDateTime.js";
import { IModeConfigurationService } from "./application/mode/ModeConfigurationService.js";

interface IValueContext {
  serviceProvider: Container;
  scoutService: IScoutService;
  modeConfigurationsService: IModeConfigurationService;
}

const serverOptions: ApolloServerOptions<IValueContext> = {
  typeDefs: `#graphql
    """Date with time (iso format)"""
    scalar DateTime

    type Query {
      matches(dateFrom: String!, dateTo: String!, status: MatchStatus = null, clientId: Int = null, allCalculated: Boolean = null): [Match!]!
      getMatchScoutEvents(matchId: Int = null, timeFrom: DateTime = null, timeTo: DateTime = null): [InternalEvent!]!
      getModeConfiguration(): ModeConfiguration!
    }

    type Match {
      id: Int!
      name: String!
      startedAt: String!
      status: MatchStatus!
      homeTeam: ExternalTeam!
      awayTeam: ExternalTeam!
      ingameTime: String
      betstopStatus: BetstopsValues
      refundStatus: Boolean
      triggerId: String
      options: Options
      homeScore: Int
      awayScore: Int
      periodScores: [PeriodScores!]
      period: Int
      aftermatchShootouts: Boolean
      shootoutsScores: ShootoutScores
      timer: Int
      timerStatus: TimerStatus
      betstop: [BetStop!]
      assignedTrader: AssignedTrader
      leagueName: String
      homeCorrection: Float
      awayCorrection: Float
      homeTotal: Float
      awayTotal: Float
      matchDelay: Boolean
      timestamp: Float
      season: ExternalSeason
      tournament: ExternalTournament
      sport: ExternalSport
      country: ExternalCountry
      venue: ExternalVenue
    }

    type InternalEvent {
      id: Int!
      team: String!
      matchId: Int!
      eventName: String!
      eventId: Int!
      minutes: String!
      timeOfEvent: String!
      stage: Int!
      eventTimestamp: Int!
      playerId: Int
      player: String
      triggerId: String
      changeType: String
      timestamp: Float
    }

    enum MatchStatus {
      planned
      prematch
      live
      done
      forecast_missed
    }

    type ExternalTeam {
      id: Int!
      name: String!
      languageCode: String!
    }

    enum BetstopsValues {
      ok
      timeout
      stop
      ready_to_stop
      ready_to_start
    }

    type Options {
      periods: Int!
      periodTime: Int!
    }

    type PeriodScores {
      period: Int!
      homeScore: Int!
      awayScore: Int!
    }

    type ShootoutScores {
      homeScores: [Int!]!
      awayScores: [Int!]!
    }

    enum TimerStatus {
      stopped
      running
    }

    type BetStop {
      type: BetstopType!
      value: BetstopStatus!
      updatedBy: String!
      updatedAt: String!
    }

    enum BetstopType {
      scout
      system
      analyst
    }

    enum BetstopStatus {
      ok
      stop
      ready_to_start
    }

    type AssignedTrader {
      id: Int!
      name: String!
      email: String!
    }

    type ExternalSeason {
      id: Int!
      name: String!
      startDate: String!
      endDate: String!
      languageCode: String!
    }

    type ExternalTournament {
      id: Int!
      name: String!
      languageCode: String!
    }

    type ExternalVenue {
      id: Int!
      name: String!
      languageCode: String!
    }

    type ExternalSport {
      id: Int!
      name: String!
      languageCode: String!
    }

    type ExternalCountry {
      id: Int!
      name: String!
      languageCode: String!
    }

    type ModeConfiguration{
      mode: Mode!
      errors: [Error!]!
      randomErrors: RandomErrorsState!
      queriesResponses: PredefinedResponses!
    }

    enum Mode {
      direct
      random
      error
      errorRandom
      predefinedResponses
    }

    type Error{
      number: Int!
      isSended: Boolean!
      http: Http!
      message: String!
      details: String
    }

    type Http{
      status: Int!
    }

    type RandomErrorsState{
      count: number
      sended: number
    }

    type PredefinedResponses{
      scouts: [InternalEvent!]!
      matches: [Match!]!
    }
  `,
  resolvers: {
    Query: {
      matches: (parent, args, contextValue, info) => [],
      getMatchScoutEvents: (
        parent,
        args: GetScoutsForPeriodQuery,
        contextValue,
        info
      ) =>
        contextValue.scoutService.getScouts({
          timeFrom: args.timeFrom,
          timeTo: args.timeTo,
        }),
      getModeConfiguration: (parent, args, contextValue, info) => {
        return contextValue.modeConfigurationsService.read();
      },
    },
    DateTime: graphQlDateTime,
  },
  includeStacktraceInErrorResponses: false,
};

const server = new ApolloServer<IValueContext>(serverOptions);
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => ({
    serviceProvider: container,
    scoutService: container.get<IScoutService>(TYPES.ScoutsService),
    modeConfigurationsService: container.get<IModeConfigurationService>(
      TYPES.ModeConfigurationService
    ),
  }),
});

console.log(`🚀  Server ready at: ${url}`);
