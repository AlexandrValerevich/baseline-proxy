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
  let extensions: {
    code: string | ApolloServerErrorCode;
    details?: string;
    http: { status: number };
  };

  if (originalError instanceof ValidationError) {
    extensions = {
      code: ApolloServerErrorCode.BAD_REQUEST,
      details: originalError.detail,
      http: { status: 400 },
    };
  } else if (originalError instanceof WrongConfigurationModeError) {
    extensions = {
      code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
      details: originalError.detail,
      http: { status: 500 },
    };
  } else if (originalError instanceof ModeError) {
    extensions = {
      code: "CUSTOM_GENERATED_ERROR",
      details: originalError.detail,
      http: { status: originalError.http.status },
    };
  } else {
    extensions = {
      code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
      http: { status: 500 },
    };
  }

  return {
    message: originalError.message,
    extensions,
  };
};

export {};
