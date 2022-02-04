import { QueryResolvers } from "~/generated/graphql";
import { thoughts } from "./thoughts";
import { initialData } from "./initial";
import { news } from "./news";
import { me } from "./me";
import { user } from "./user";
import { pickedThoughts } from "./pickedThoughts";
import { pickedNews } from "./pickedNews";
import { userThoughts } from "./userThoughts";
import { follows } from "./follows";
import { blockingUsers } from "./blockingUsers";
import { thoughtTalkRooms } from "./thoguhtTalkRooms";
import { thoughtTalkRoom } from "./thoughtTalkRoom";
import { newsTalkRooms } from "./newsTalkRooms";
import { newsTalkRoom } from "./newsTalkRoom";

export const Query: QueryResolvers = {
  thoughts,
  initialData,
  news,
  me,
  user,
  pickedThoughts,
  pickedNews,
  userThoughts,
  follows,
  blockingUsers,
  thoughtTalkRooms,
  thoughtTalkRoom,
  newsTalkRooms,
  newsTalkRoom,
};
