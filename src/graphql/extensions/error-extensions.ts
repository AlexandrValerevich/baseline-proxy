import { GraphQLError } from "graphql";
import { ValidationError } from "../../application/exceptions/ValidationError.js";
import { ApolloServerErrorCode } from "@apollo/server/dist/esm/errors";

declare global {
  interface Error {
    toGraphQlError(): GraphQLError;
  }
}

Error.prototype.toGraphQlError = function (this: Error): GraphQLError {
  if (this instanceof ValidationError) {
    return new GraphQLError(this.message, {
      // originalError: this,
      extensions: {
        code: ApolloServerErrorCode.BAD_REQUEST,
        details: this.detail,
        http: { status: 400 },
      },
    });
  }

  return new GraphQLError(this.message, {
    // originalError: this,
    extensions: {
      code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
      http: { status: 500 },
    },
  });
};

export {};
