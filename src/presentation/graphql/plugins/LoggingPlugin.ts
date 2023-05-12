import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestContextExecutionDidStart,
  GraphQLRequestListener,
} from "@apollo/server";
import { logger } from "../../../logger/index.js";
import { IContext } from "../context.js";
import { ModeDTO } from "../../../application/index.js";

const introspectionQuery = "IntrospectionQuery";

class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart({
    request,
  }: GraphQLRequestContext<IContext>): Promise<void | GraphQLRequestListener<BaseContext>> {
    if (request.operationName === introspectionQuery) {
      return;
    }
    return {
      async executionDidStart({ contextValue }: GraphQLRequestContextExecutionDidStart<IContext>) {
        const modeService = contextValue.modeConfigurationsService;
        logger.debug(`Current service mode: ${modeService.getMode()}`);
      },
      async willSendResponse({ request, response }) {
        const logData = {
          request: {
            query: request.query?.replace(/\\n|\\r/g, "").replace(/[ \t]{2,}/g, " "),
            variables: request.variables,
            operationName: request.operationName,
          },
          response,
        };

        logger.info("GraphQL request handled.", logData);
      },
      async didEncounterErrors(ctx: GraphQLRequestContext<BaseContext>): Promise<void> {
        const logData = {
          request: {
            query: ctx.request.query?.replace(/\\n|\\r/g, "").replace(/[ \t]{2,}/g, " "),
            variables: ctx.request.variables,
            operationName: ctx.request.operationName,
          },
          errors: ctx.errors,
        };

        logger.error("GraphQL request encountered errors.", logData);
      },
    };
  }

  async startupDidFail({ error }: { error: Error }): Promise<void> {
    logger.error("Startup did failed.", error);
  }

  async invalidRequestWasReceived({ error }: { error: Error }): Promise<void> {
    logger.error(`Invalid request was received.`, error);
  }

  async contextCreationDidFail({ error }: { error: Error }): Promise<void> {
    logger.error(`Context creation error.`, error);
  }

  async unexpectedErrorProcessingRequest({ error }: { error: Error }): Promise<void> {
    logger.error("Unexpected error processing request.", error);
  }
}
export { LoggingPlugin };
