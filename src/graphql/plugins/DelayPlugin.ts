import { ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener } from "@apollo/server";
import { IValueContext } from "../context";
import { logger } from "../../logger/index.js";

class DelayPlugin implements ApolloServerPlugin {
  async requestDidStart(
    requestContext: GraphQLRequestContext<IValueContext>,
  ): Promise<GraphQLRequestListener<IValueContext>> {
    const modeConfig = requestContext.contextValue.modeConfigurationsService.getModeConfiguration();
    const delay = modeConfig.delay;

    return {
      async willSendResponse({ request }) {
        if (request.operationName !== "IntrospectionQuery") {
          await new Promise((resolve) => setTimeout(resolve, delay));
          logger.info(`Request handling was delayed on ${delay}ms`);
        }
      },
    };
  }
}

export { DelayPlugin };
