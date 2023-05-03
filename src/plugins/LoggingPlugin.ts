import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestListener,
  GraphQLServerContext,
  GraphQLServerListener,
} from "@apollo/server";

class LoggingPlugin implements ApolloServerPlugin {
  async serverWillStart(service: GraphQLServerContext): Promise<void | GraphQLServerListener> {
    service.logger.info("Server starting up!");
  }

  async requestDidStart({ request, logger }): Promise<void | GraphQLRequestListener<BaseContext>> {
    if (request.operationName !== "IntrospectionQuery") {
      logger.info(
        `Handling request: ${JSON.stringify(request)
          .replace(/\\n|\\r/g, "")
          .replace(/[ \t]{2,}/g, " ")}`,
      );
    }

    return {
      async willSendResponse({ response, logger }) {
        if (request.operationName !== "IntrospectionQuery") {
          logger.info(`Sending response: ${JSON.stringify(response)}`);
        }
      },
    };
  }
}

export { LoggingPlugin };
