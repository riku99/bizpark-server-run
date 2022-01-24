import { Mutation } from "./mutations";
import { Resolvers } from "~/generated/graphql";
import { Query } from "./queries";
import { GraphQLUpload } from "graphql-upload";
import { Subscription } from "./subscriptoins";
import { ThoughtTalkRoom } from "./ThoughtTalkRoom";
import { ThoughtTalkRoomMessage } from "./ThoughtTalkRoomMessage";

export const resolvers: Resolvers = {
  // @ts-ignore
  Upload: GraphQLUpload,
  Mutation,
  Query,
  Subscription,
  ThoughtTalkRoom,
  ThoughtTalkRoomMessage,
};
