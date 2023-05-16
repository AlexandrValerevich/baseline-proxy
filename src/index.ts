import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import './extensions/index.js'
import bodyParser from 'body-parser'
import { logger } from './logger/index.js'
import { ApolloServer } from '@apollo/server'
import { TYPES, container } from './container/index.js'
import { type GraphQLError, type GraphQLFormattedError } from 'graphql'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { DelayPlugin, LoggingPlugin } from './presentation/graphql/plugins/index.js'
import { type IContext, resolvers, typeDefs, errorToGraphQLFormattedError } from './presentation/index.js'
import { type IMatchService, type IModeConfigurationService, type IScoutService } from './application/index.js'
import * as Middleware from './presentation/middleware/index.js'
import * as Routes from './presentation/routers/index.js'
dotenv.config()

const app = express()
const httpServer = http.createServer(app)

app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(Middleware.requestLogger)

app.use(Routes.modeRouter)
app.use(Routes.configurationRouter)
app.use(Routes.errorRouter)
app.use(Routes.scoutRouter)
app.use(Routes.matchRouter)
app.use(Routes.delayRouter)
app.use(Routes.substitutionRouter)

app.use(Middleware.bodySubstitution)
app.use(Middleware.errorHandler)
app.use(Middleware.errorLogger)

const server = new ApolloServer<IContext>({
  typeDefs,
  resolvers,
  plugins: [
    new LoggingPlugin(),
    new DelayPlugin(),
    ApolloServerPluginDrainHttpServer({ httpServer })
  ],

  formatError (formattedError: GraphQLFormattedError, error: GraphQLError): GraphQLFormattedError {
    const originError = error.originalError
    if (originError == null) {
      return formattedError
    }
    return errorToGraphQLFormattedError(originError)
  }
})

await server.start()
app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  expressMiddleware(server, {
    context: async () => ({
      serviceProvider: container,
      scoutService: container.get<IScoutService>(TYPES.ScoutsService),
      matchesService: container.get<IMatchService>(TYPES.MatchesService),
      modeConfigurationsService: container.get<IModeConfigurationService>(
        TYPES.ModeConfigurationService
      )
    })
  })
)

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))

logger.info('🚀  Server ready at: "http://localhost:4000"')
logger.info(`🚀  Environment: ${process.env.NODE_ENV ?? ''}`)
