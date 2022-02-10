import { Mutation } from "./mutations";
import { Resolvers } from "~/generated/graphql";
import { Query } from "./queries";
import { GraphQLUpload } from "graphql-upload";
import { Subscription } from "./subscriptoins";
import { Thought } from "./Thought";
import { ThoughtTalkRoom } from "./ThoughtTalkRoom";
import { ThoughtTalkRoomMessage } from "./ThoughtTalkRoomMessage";
import { NewsTalkRoom } from "./NewsTalkRoom";
import { User } from "./User";
import { NewsTalkRoomMessage } from "./NewsTalkRoomMessage";
import { News } from "./News";
import { NewsPick } from "./NewsPick";
import { OneOnOneTalkRoom } from "./OneOnOneTalkRoom";
import { OneOnOneTalkRoomMessage } from "./OneOnOneTalkRoomMessage";

export const resolvers: Resolvers = {
  // @ts-ignore
  Upload: GraphQLUpload,
  Mutation,
  Query,
  Subscription,
  ThoughtTalkRoom,
  ThoughtTalkRoomMessage,
  Thought,
  NewsTalkRoom,
  User,
  NewsTalkRoomMessage,
  News,
  NewsPick,
  OneOnOneTalkRoom,
  OneOnOneTalkRoomMessage,
};
