import { ApolloServerPlugin, GraphQLRequestListener } from "@apollo/server";
import { IContext } from "../context";
import { logger } from "../../../logger/index.js";

class DelayPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<GraphQLRequestListener<IContext>> {
    return {
      async willSendResponse({ contextValue, request }) {
        if (request.operationName !== "IntrospectionQuery") {
          const delay = contextValue.modeConfigurationsService.getDelay();
          await new Promise((resolve) => setTimeout(resolve, delay));
          logger.debug(`Request handling was delayed on ${delay}ms`);
        }
      },
    };
  }
}

export { DelayPlugin };
