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
  period: Int
  status: MatchStatus!
  timestamp: Float
  startedAt: String!
  shootoutsScores: [ShootoutScores!]
  homeTeam: ExternalTeam!
  awayTeam: ExternalTeam!
  betStatus: Boolean
  season: ExternalSeason
  tournament: ExternalTournament
  sport: ExternalSport
  country: ExternalCountry
  periodScores: [PeriodScores!]
}

type InternalEvent {
  id: Int!
  owned: EventSource!
  matchId: Int!
  eventId: Int!
  ingameTime: String!
  changeType: String
  timestamp: Float
}

type ExternalTeam {
  id: Int!
  name: String!
  languageCode: String!
  total: Float
  probability: Float
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
  scoreTeam: Int!
  scoreHome: Int!
  scoreAway: Int!
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
`

export { typeDefs }
