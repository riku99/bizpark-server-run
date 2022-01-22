import { Mutation } from "./mutations";
import { Resolvers } from "~/generated/graphql";
import { Query } from "./queries";
import { GraphQLUpload } from "graphql-upload";
import { Subscription } from "./subscriptoins";
import { ThoughtTalkRoom } from "./ThoughtTalkRoom";

export const resolvers: Resolvers = {
  // @ts-ignore
  Upload: GraphQLUpload,
  Mutation,
  Query,
  Subscription,
  ThoughtTalkRoom,
};
