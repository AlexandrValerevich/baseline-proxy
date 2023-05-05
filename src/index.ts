import "./extensions/index.js";
import dotenv from "dotenv";
import { container, TYPES } from "./container/index.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer, ApolloServerOptions } from "@apollo/server";
import { IMatchService, IModeConfigurationService, IScoutService } from "./application/index.js";
import { DelayPlugin, IContext, LoggingPlugin, resolvers, typeDefs } from "./graphql/index.js";
import { logger } from "./logger/index.js";
import { GraphQLError, GraphQLFormattedError } from "graphql/error/index.js";
dotenv.config();

const serverOptions: ApolloServerOptions<IContext> = {
  typeDefs: typeDefs,
  resolvers: resolvers,
  plugins: [new LoggingPlugin(), new DelayPlugin()],
  introspection: process.env.NODE_ENV !== "production",
  includeStacktraceInErrorResponses: false,
  formatError(formattedError: GraphQLFormattedError, error: GraphQLError): GraphQLFormattedError {
    const originError = error.originalError;
    if (!originError) {
      return formattedError;
    }
    return originError.toGraphQLFormattedError();
  },
};
const server = new ApolloServer<IContext>(serverOptions);

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => ({
    serviceProvider: container,
    scoutService: container.get<IScoutService>(TYPES.ScoutsService),
    matchesService: container.get<IMatchService>(TYPES.MatchesService),
    modeConfigurationsService: container.get<IModeConfigurationService>(
      TYPES.ModeConfigurationService,
    ),
  }),
});

logger.info(`🚀  Server ready at: ${url}`);
logger.info(`🚀  Environment: ${process.env.NODE_ENV}`);
