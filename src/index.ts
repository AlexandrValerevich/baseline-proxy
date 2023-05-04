import "./extensions/index.js";
import chalk from "chalk";
import dotenv from "dotenv";
import { container, TYPES } from "./container/index.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer, ApolloServerOptions } from "@apollo/server";
import { IModeConfigurationService, IScoutService } from "./application/index.js";
import { DelayPlugin, IValueContext, LoggingPlugin, resolvers, typeDefs } from "./graphql/index.js";
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
    modeConfigurationsService: container.get<IModeConfigurationService>(
      TYPES.ModeConfigurationService,
    ),
  }),
});

console.log("🚀  Server ready at: " + chalk.green(`${url}`));
console.log("🚀  Environment: " + chalk.green(`${process.env.NODE_ENV}`));
