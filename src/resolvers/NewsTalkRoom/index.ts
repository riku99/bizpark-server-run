import { NewsTalkRoomResolvers } from "~/generated/graphql";
import { allMessageSeen } from "./allMessageSeen";
import { members } from "./members";
import { news } from "./news";
import { messages } from "./messages";

export const NewsTalkRoom: NewsTalkRoomResolvers = {
  allMessageSeen,
  members,
  news,
  messages,
};
