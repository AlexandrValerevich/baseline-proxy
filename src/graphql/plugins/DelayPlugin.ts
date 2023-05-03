import { ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener } from "@apollo/server";
import { IValueContext } from "../context";
import chalk from "chalk";

class DelayPlugin implements ApolloServerPlugin {
  async requestDidStart(
    requestContext: GraphQLRequestContext<IValueContext>,
  ): Promise<GraphQLRequestListener<IValueContext>> {
    const modeConfig = requestContext.contextValue.modeConfigurationsService.getModeConfiguration();
    const delay = modeConfig.delay;

    return {
      async willSendResponse({ request, logger }) {
        if (request.operationName !== "IntrospectionQuery") {
          await new Promise((resolve) => setTimeout(resolve, delay));
          logger.info(
            `${chalk.blue("Request handling was delayed on ")} ${chalk.green(`${delay}ms`)}`,
          );
        }
      },
    };
  }
}

export { DelayPlugin };
