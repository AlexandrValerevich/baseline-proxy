import { ApolloServerErrorCode } from '@apollo/server/errors'
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql'
import { type IContext } from './context.js'
import { isValidDate } from './helpers/index.js'
import { type MatchModel, type ScoutModel } from '../contracts/index.js'

const query = {
  Query: {
    matches: async (
      _,
      { dateFrom, dateTo },
      { matchesService }: IContext,
      __
    ): Promise<MatchModel[]> => {
      const response = matchesService.getMatches({ dateFrom, dateTo })
      return await response
    },
    events: async (
      _,
      { dateFrom, dateTo },
      { scoutService }: IContext,
      __
    ): Promise<ScoutModel[]> => {
      const response = scoutService.getScouts({ dateFrom, dateTo })
      return await response
    }
  }
}

const eventSource = {
  EventSource: {
    game: 'game',
    home: 'home',
    away: 'away'
  }
}

const dateTime = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'Date with time (iso format)',
    parseValue: (value) => {
      if (typeof value !== 'string') {
        throw new GraphQLError(
          `GraphQL DateTime Scalar requires a string input, but received: ${typeof value}`,
          {
            extensions: {
              code: ApolloServerErrorCode.BAD_USER_INPUT,
              http: { status: 400 }
            }
          }
        )
      }

      const date = new Date(value)

      if (!isValidDate(date)) {
        throw new GraphQLError(`GraphQL DateTime Scalar failed parse. Provided value: [${value}]`, {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            http: { status: 400 }
          }
        })
      }

      return date
    },
    serialize: (value) => {
      if (value instanceof Date) {
        return value.toISOString() // Convert outgoing Date to ISO Date for JSON
      }
      throw new GraphQLError('GraphQL DateTime Scalar serializer expected a `Date` object', {
        extensions: {
          code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
          http: { status: 500 }
        }
      })
    },
    parseLiteral: (ast) => {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError('Provided value is not an ISO Date', {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            http: { status: 400 }
          }
        })
      }

      const date = new Date(ast.value)

      if (!isValidDate(date)) {
        throw new GraphQLError('Invalid ISO Date provided', {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            http: { status: 400 }
          }
        })
      }

      return date
    }
  })
}

const resolvers = [query, dateTime, eventSource]

export { resolvers }
