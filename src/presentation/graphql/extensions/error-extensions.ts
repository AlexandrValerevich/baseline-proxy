import { GraphQLFormattedError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import {
  ModeError,
  ValidationError,
  WrongConfigurationModeError,
} from "../../../application/exceptions/index.js";

declare global {
  interface Error {
    toGraphQLFormattedError(): GraphQLFormattedError;
  }
}

Error.prototype.toGraphQLFormattedError = function (this: Error): GraphQLFormattedError {
  const originalError = this;

  if (originalError instanceof ValidationError) {
    return {
      message: originalError.message,
      extensions: {
        code: ApolloServerErrorCode.BAD_REQUEST,
        details: originalError.detail,
        http: { status: 400 },
      },
    };
  }

  if (originalError instanceof WrongConfigurationModeError) {
    return {
      message: originalError.message,
      extensions: {
        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
        details: originalError.detail,
        http: { status: 500 },
      },
    };
  }

  if (originalError instanceof ModeError) {
    return {
      message: originalError.message,
      extensions: {
        ...originalError.extensions,
      },
    };
  }

  return {
    message: originalError.message,
    extensions: {
      code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
      http: { status: 500 },
    },
  };
};

export {};
