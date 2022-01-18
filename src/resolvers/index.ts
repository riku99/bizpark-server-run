import { Mutation } from "./mutations";
import { Resolvers } from "~/generated/graphql";
import { Query } from "./queries";
import { GraphQLUpload } from "graphql-upload";
import { Subscription } from "./subscriptoins";

export const resolvers: Resolvers = {
  // @ts-ignore
  Upload: GraphQLUpload,
  Mutation,
  Query,
  Subscription,
};
