import { ThoughtTalkRoomResolvers } from "~/generated/graphql";
import { messages } from "./messages";
import { allMessageSeen } from "./allMessageSeen";

export const ThoughtTalkRoom: ThoughtTalkRoomResolvers = {
  messages,
  allMessageSeen,
};
