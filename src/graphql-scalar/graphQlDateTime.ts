import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError, GraphQLScalarType, Kind } from "graphql";

const graphQlDateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "Date with time (iso format)",
  parseValue: (value) => {
    if (typeof value !== "string") {
      throw new GraphQLError(
        `GraphQL DateTime Scalar requires a string input, but received: ${typeof value}`,
        {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            http: { status: 400 },
          },
        }
      );
    }

    const date = new Date(value);

    if (!date.IsValid()) {
      throw new GraphQLError(
        `GraphQL DateTime Scalar failed parse. Provided value: [${value}]`,
        {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            http: { status: 400 },
          },
        }
      );
    }

    return date;
  },
  serialize: (value) => {
    if (value instanceof Date) {
      return value.toISOString(); // Convert outgoing Date to ISO Date for JSON
    }
    throw new GraphQLError(
      "GraphQL DateTime Scalar serializer expected a `Date` object",
      {
        extensions: {
          code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
          http: { status: 500 },
        },
      }
    );
  },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError("Provided value is not an ISO Date", {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
          http: { status: 400 },
        },
      });
    }

    const date = new Date(ast.value);

    if (!date.IsValid()) {
      throw new GraphQLError("Invalid ISO Date provided", {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
          http: { status: 400 },
        },
      });
    }

    return date;
  },
});

export { graphQlDateTime };
