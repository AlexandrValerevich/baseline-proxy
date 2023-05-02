import { ApolloServer, ApolloServerOptions } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { container, TYPES } from "./inversify.config.js";
import "./extensions/date-extensions.js";
import { IScoutService } from "./application/scouts/ScoutService.js";
import { IModeConfigurationService } from "./application/mode/ModeConfigurationService.js";
import { typeDef } from "./graphql/typeDef.js";
import { resolvers } from "./graphql/resolvers.js";
import { IValueContext } from "./graphql/IValueContext.js";

const serverOptions: ApolloServerOptions<IValueContext> = {
  typeDefs: typeDef,
  resolvers: resolvers,
};
const server = new ApolloServer<IValueContext>(serverOptions);

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => ({
    serviceProvider: container,
    scoutService: container.get<IScoutService>(TYPES.ScoutsService),
    modeConfigurationsService: container.get<IModeConfigurationService>(
      TYPES.ModeConfigurationService
    ),
  }),
});

console.log(`🚀  Server ready at: ${url}`);
