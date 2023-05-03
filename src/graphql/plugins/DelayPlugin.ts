import { ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener } from "@apollo/server";
import { IValueContext } from "../context";

class DelayPlugin implements ApolloServerPlugin {
  async requestDidStart(
    requestContext: GraphQLRequestContext<IValueContext>,
  ): Promise<GraphQLRequestListener<IValueContext>> {
    const modeConfig = requestContext.contextValue.modeConfigurationsService.getModeConfiguration();
    const delay = modeConfig.delay;

    return {
      async willSendResponse(requestContext) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      },
    };
  }
}

export { DelayPlugin };
