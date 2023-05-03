import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestListener,
  GraphQLServerContext,
  GraphQLServerListener,
} from "@apollo/server";

import chalk from "chalk";

class LoggingPlugin implements ApolloServerPlugin {
  async serverWillStart(service: GraphQLServerContext): Promise<void | GraphQLServerListener> {
    service.logger.info(chalk.blue("Server starting up!"));
  }

  async requestDidStart(): Promise<void | GraphQLRequestListener<BaseContext>> {
    return {
      async willSendResponse({ request, response, logger }) {
        if (request.operationName !== "IntrospectionQuery") {
          logger.info(`
            ${chalk.blue("GraphQL request is handled.")}
            ${chalk.green("Request:")} ${JSON.stringify(request)
            .replace(/\\n|\\r/g, "")
            .replace(/[ \t]{2,}/g, " ")},
            ${chalk.green("Response:")} ${JSON.stringify(response)}
          `);
        }
      },
    };
  }
}

export { LoggingPlugin };
