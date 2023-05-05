const typeDefs = `#graphql
"""Date with time (iso format)"""
scalar DateTime

type Query {
  matches(dateFrom: String!, dateTo: String!, status: MatchStatus = null, clientId: Int = null, allCalculated: Boolean = null): [Match!]!
  getMatchScoutEvents(matchId: Int = null, timeFrom: DateTime = null, timeTo: DateTime = null): [InternalEvent!]!
  getModeConfiguration: ModeConfiguration!
}

type Mutation{
  setDelay(delay: Int!): ModeConfiguration!
  setError(error: ErrorModelInput): ModeConfiguration!
  setPredefinedScouts(scouts: [InternalEventInput!]): ModeConfiguration!
  setPredefinedMatches(matches: [MatchInput!]): ModeConfiguration!

  onDirectMode: ModeConfiguration!
  onRandomMode: ModeConfiguration!
  onErrorOnceMode: ModeConfiguration!
  onErrorInfinityMode: ModeConfiguration!
  onPredefinedResponseMode: ModeConfiguration!
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

type ModeConfiguration{
  mode: Mode!
  delay: Int!
  error: ErrorModel!
  predefinedResponses: PredefinedResponses!
}

enum Mode {
  direct
  random
  error_once
  error_infinity
  predefined_responses
}

type ErrorModel{
  http: HttpModel!
  message: String!
  details: String
}

type HttpModel{
  status: Int!
}

type PredefinedResponses {
  scouts: [InternalEvent!]!
  matches: [Match!]!
}

input ErrorModelInput{
  http: HttpModelInput!
  message: String!
  details: String
}

input HttpModelInput{
  status: Int!
}

input InternalEventInput {
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

input MatchInput {
  id: Int!
  name: String!
  startedAt: String!
  status: MatchStatus!
  homeTeam: ExternalTeamInput!
  awayTeam: ExternalTeamInput!
  ingameTime: String
  betstopStatus: BetstopsValues
  refundStatus: Boolean
  triggerId: String
  options: OptionsInput
  homeScore: Int
  awayScore: Int
  periodScores: [PeriodScoresInput!]
  period: Int
  aftermatchShootouts: Boolean
  shootoutsScores: ShootoutScoresInput
  timer: Int
  timerStatus: TimerStatus
  betstop: [BetStopInput!]
  assignedTrader: AssignedTraderInput
  leagueName: String
  homeCorrection: Float
  awayCorrection: Float
  homeTotal: Float
  awayTotal: Float
  matchDelay: Boolean
  timestamp: Float
  season: ExternalSeasonInput
  tournament: ExternalTournamentInput
  sport: ExternalSportInput
  country: ExternalCountryInput
  venue: ExternalVenueInput
}

input ExternalTeamInput {
  id: Int!
  name: String!
  languageCode: String!
}


input OptionsInput {
  periods: Int!
  periodTime: Int!
}

input PeriodScoresInput {
  period: Int!
  homeScore: Int!
  awayScore: Int!
}

input ShootoutScoresInput {
  homeScores: [Int!]!
  awayScores: [Int!]!
}

input BetStopInput {
  type: BetstopType!
  value: BetstopStatus!
  updatedBy: String!
  updatedAt: String!
}

input AssignedTraderInput {
  id: Int!
  name: String!
  email: String!
}

input ExternalSeasonInput {
  id: Int!
  name: String!
  startDate: String!
  endDate: String!
  languageCode: String!
}

input ExternalTournamentInput {
  id: Int!
  name: String!
  languageCode: String!
}

input ExternalVenueInput {
  id: Int!
  name: String!
  languageCode: String!
}

input ExternalSportInput {
  id: Int!
  name: String!
  languageCode: String!
}

input ExternalCountryInput {
  id: Int!
  name: String!
  languageCode: String!
}

`;

export { typeDefs };
