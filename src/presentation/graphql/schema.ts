const typeDefs = `#graphql
"""Date with time (iso format)"""
scalar DateTime

type Query {
  matches(dateFrom: DateTime!, dateTo: DateTime!): [Match!]!
  scouts(dateFrom: DateTime!, dateTo: DateTime!): [InternalEvent!]!
}

type Match {
  id: Int!
  name: String!
  status: MatchStatus!
  dateTime: DateTime!
  startedAt: String!
  homeTeam: ExternalTeam!
  awayTeam: ExternalTeam!
  season: ExternalSeason!
  tournament: ExternalTournament!
  sport: ExternalSport!
  country: ExternalCountry!
  venue: ExternalVenue!
  betStatus: Boolean
  period: Int
  periodScores: [PeriodScores!]
  shootoutsScores: [ShootoutScores!]
}

type InternalEvent {
  id: Int!
  owner: EventSource!
  matchId: Int!
  eventId: Int!
  ingameTime: String!
  changeType: ChangeType!
  dateTime: DateTime!
}

type ExternalTeam {
  id: Int!
  name: String!
  languageCode: String!
  total: Float
  probability: Float
}

enum ChangeType {
  added
  removed
  restored
}

enum EventSource{
  game
  home
  away
}

enum MatchStatus {
  planned
  prematch
  live
  done
  forecast_missed
  delayed
  canceled
}

type PeriodScores {
  period: Int!
  homeScore: Int!
  awayScore: Int!
}

type ShootoutScores {
  shootoutsNumber: Int!
  scoreTeam: ShootingTeam!
  realised: Boolean!
}

enum ShootingTeam {
  home
  away
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

type ExternalVenue {
  id: Int!
  name: String!
  languageCode: String!
}
`

export { typeDefs }
