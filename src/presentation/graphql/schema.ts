const typeDefs = `#graphql
"""Date with time (iso format)"""
scalar DateTime

type Query {
  getMatches(dateFrom: DateTime!, dateTo: DateTime!): [Match!]!
  getScouts(dateFrom: DateTime!, dateTo: DateTime!): [InternalEvent!]!
}

type Match {
  id: Int!
  name: String!
  period: Int
  status: MatchStatus!
  timestamp: Float
  startedAt: String!
  aftermatchShootouts: Boolean
  shootoutsScores: ShootoutScores
  homeTeam: ExternalTeam!
  awayTeam: ExternalTeam!
  betstop: [BetStop!]
  season: ExternalSeason
  tournament: ExternalTournament
  sport: ExternalSport
  country: ExternalCountry
  periodScores: [PeriodScores!]
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
  total: Float
  probability: Float
}

enum MatchStatus {
  planned
  prematch
  live
  done
  forecast_missed
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

type BetStop {
  type: BetstopType!
  value: BetstopStatus!
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
