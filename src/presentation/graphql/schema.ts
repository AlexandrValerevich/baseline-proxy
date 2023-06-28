const typeDefs = `#graphql
"""Date with time (iso format)"""
scalar DateTime

type Query {
  matches(dateFrom: DateTime!, dateTo: DateTime!): [Match!]!
  events(dateFrom: DateTime!, dateTo: DateTime!): [InternalEvent!]!
}

type Match {
  id: Int!
  name: String!
  status: MatchStatus!

  dateTime: DateTime!
  startedAt: String!

  homeScore: Int
  awayScore: Int
  period: Int
  betStatus: Boolean
  shootoutsStatus: Boolean

  homeTeam: ExternalTeam!
  awayTeam: ExternalTeam!

  periodScores: [PeriodScores!]
  shootoutsScores: [ShootoutScores!]
  
  season: ExternalSeason!
  tournament: ExternalTournament!
  sport: ExternalSport!
  country: ExternalCountry!
  venue: ExternalVenue!
}

type InternalEvent {
  id: Int!
  owner: EventSource!
  matchId: Int!
  eventId: Int!
  eventName: String!
  ingameTime: String!
  changeType: ChangeType!
  dateTime: DateTime!
  period: Int!
  additional: AdditionalEventInfo
}

type AdditionalEventInfo {
  playerId: Int!
  player: String!
  assistingPlayerId: Int
  assistingPlayer: String
}

type LocalizedString{
  ru: String!
  en: String!
}

type ExternalTeam {
  id: Int!
  names: LocalizedString!
  total: Float
  probability: Float
}

enum ChangeType {
  added
  removed
  restored
  edited
  new_value
}

enum EventSource{
  game
  home
  away
  new_value
}

enum MatchStatus {
  live
  done
  canceled
  planned
  delayed
  new_value
}

type PeriodScores {
  period: Int!
  homeScore: Int!
  awayScore: Int!
}

type ShootoutScores {
  number: Int!
  owner: ShootingTeam!
  isScored: Boolean!
}

enum ShootingTeam {
  home
  away
  new_value
}

type ExternalSeason {
  id: Int!
  names: LocalizedString!
  startDate: String!
  endDate: String!
}

type ExternalTournament {
  id: Int!
  names: LocalizedString!
}

type ExternalSport {
  id: Int!
  names: LocalizedString!
}

type ExternalCountry {
  id: Int!
  names: LocalizedString!
}

type ExternalVenue {
  id: Int!
  names: LocalizedString!
}
`

export { typeDefs }
