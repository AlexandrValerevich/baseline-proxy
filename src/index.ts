import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "./extensions/index.js";
import bodyParser from "body-parser";
import { logger } from "./logger/index.js";
import { ApolloServer } from "@apollo/server";
import { TYPES, container } from "./container/index.js";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { DelayPlugin, IContext, LoggingPlugin, resolvers, typeDefs } from "./presentation/index.js";
import { IMatchService, IModeConfigurationService, IScoutService } from "./application/index.js";
import Middleware from "./presentation/middleware/index.js";
import {
  bodyRouter,
  configurationRouter,
  delayRouter,
  errorRouter,
  matchRouter,
  modeRouter,
  scoutRouter,
} from "./presentation/routers/index.js";
dotenv.config();

const app = express();
const httpServer = http.createServer(app);

app.use(bodyParser.json());
app.use(Middleware.logger);

app.use(modeRouter);
app.use(configurationRouter);
app.use(errorRouter);
app.use(scoutRouter);
app.use(matchRouter);
app.use(delayRouter);
app.use(bodyRouter);

app.use(Middleware.bodySubstitution);
app.use(Middleware.errorHandler);
app.use(Middleware.errorLogger);

const server = new ApolloServer<IContext>({
  typeDefs: typeDefs,
  resolvers: resolvers,
  plugins: [
    new LoggingPlugin(),
    new DelayPlugin(),
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],

  formatError(formattedError: GraphQLFormattedError, error: GraphQLError): GraphQLFormattedError {
    const originError = error.originalError;
    if (!originError) {
      return formattedError;
    }
    return originError.toGraphQLFormattedError();
  },
});

await server.start();
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  expressMiddleware(server, {
    context: async () => ({
      serviceProvider: container,
      scoutService: container.get<IScoutService>(TYPES.ScoutsService),
      matchesService: container.get<IMatchService>(TYPES.MatchesService),
      modeConfigurationsService: container.get<IModeConfigurationService>(
        TYPES.ModeConfigurationService,
      ),
    }),
  }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

logger.info(`🚀  Server ready at: "http://localhost:4000"`);
logger.info(`🚀  Environment: ${process.env.NODE_ENV}`);
