import { ApolloServerPlugin, BaseContext, GraphQLRequestListener } from "@apollo/server";
import { logger } from "../../logger/index.js";

class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<void | GraphQLRequestListener<BaseContext>> {
    return {
      async willSendResponse({ request, response }) {
        if (request.operationName === "IntrospectionQuery") {
          return;
        }

        const logData = {
          request: {
            query: request.query?.replace(/\\n|\\r/g, "").replace(/[ \t]{2,}/g, " "),
            variables: request.variables,
            operationName: request.operationName,
          },
          response,
        };

        logger.info({ message: "GraphQL request handled.", logData });
      },
    };
  }
}
export { LoggingPlugin };
