import { Mutation } from "./mutations";
import { Resolvers } from "~/graphql-api/generated/graphql";
import { Query } from "./queries";
import { GraphQLUpload } from "graphql-upload";
import type { GraphQLScalarType } from "graphql";

export const resolvers: Resolvers = {
  // @ts-ignore
  Upload: GraphQLUpload,
  Mutation,
  Query,
};
