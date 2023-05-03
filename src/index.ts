import { ApolloServer, ApolloServerOptions } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { container, TYPES } from "./inversify.config.js";
import "./extensions/date-extensions.js";
import { IScoutService } from "./application/scouts/IScoutService.js";
import { IModeConfigurationService } from "./application/mode/ModeConfigurationService.js";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { Container } from "inversify";
import { LoggingPlugin } from "./plugins/LoggingPlugin.js";

interface IValueContext {
  serviceProvider: Container;
  scoutService: IScoutService;
  modeConfigurationsService: IModeConfigurationService;
}

const serverOptions: ApolloServerOptions<IValueContext> = {
  typeDefs: typeDefs,
  resolvers: resolvers,
  plugins: [new LoggingPlugin()],
  introspection: !(process.env.NODE_ENV === "production"),
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

console.log(`🚀  Server ready at: ${url}`);
