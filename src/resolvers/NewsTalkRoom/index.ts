import { NewsTalkRoomResolvers } from "~/generated/graphql";
import { allMessageSeen } from "./allMessageSeen";
import { members } from "./members";
import { news } from "./news";

export const NewsTalkRoom: NewsTalkRoomResolvers = {
  allMessageSeen,
  members,
  news,
};
