import "./extensions/index.js";
import dotenv from "dotenv";
import { container, TYPES } from "./container/index.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer, ApolloServerOptions } from "@apollo/server";
import { IMatchService, IModeConfigurationService, IScoutService } from "./application/index.js";
import { DelayPlugin, IValueContext, LoggingPlugin, resolvers, typeDefs } from "./graphql/index.js";
import { logger } from "./logger/index.js";
dotenv.config();

const serverOptions: ApolloServerOptions<IValueContext> = {
  typeDefs: typeDefs,
  resolvers: resolvers,
  plugins: [new LoggingPlugin(), new DelayPlugin()],
  introspection: process.env.NODE_ENV !== "production",
  includeStacktraceInErrorResponses: false,
};
const server = new ApolloServer<IValueContext>(serverOptions);

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
