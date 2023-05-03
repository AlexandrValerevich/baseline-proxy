import { ApolloServer, ApolloServerOptions } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { container, TYPES } from "./inversify.config.js";
import "./extensions/date-extensions.js";
import { IScoutService } from "./application/scouts/IScoutService.js";
import { IModeConfigurationService } from "./application/mode/IModeConfigurationService.js";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { LoggingPlugin } from "./graphql/plugins/LoggingPlugin.js";
import { IValueContext } from "./graphql/context.js";
import { DelayPlugin } from "./graphql/plugins/DelayPlugin.js";

const serverOptions: ApolloServerOptions<IValueContext> = {
  typeDefs: typeDefs,
  resolvers: resolvers,
  plugins: [new LoggingPlugin(), new DelayPlugin()],
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
