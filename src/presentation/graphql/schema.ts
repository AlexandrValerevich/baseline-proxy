const typeDefs = `#graphql
"""Date with time (iso format)"""
scalar DateTime

type Query {
  matches(dateFrom: String!, dateTo: String!, status: MatchStatus = null, clientId: Int = null, allCalculated: Boolean = null): [Match!]!
  getScouts(dateFrom: DateTime, dateTo: DateTime): [InternalEvent!]!
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
  team: Int
  matchId: Int!
  eventId: Int!
  scoutTime: String!
  changeType: String
  timestamp: Float
}

type ExternalTeam {
  id: Int!
  name: String!
  languageCode: String!
}

enum MatchStatus {
  planned
  prematch
  live
  done
  forecast_missed
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
`;

export { typeDefs };
