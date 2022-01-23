import { ThoughtTalkRoomResolvers } from "~/generated/graphql";
import { messages } from "./messages";
import { allMessageSeen } from "./allMessageSeen";
import { members } from "./members";
import { thought } from "./thought";

export const ThoughtTalkRoom: ThoughtTalkRoomResolvers = {
  messages,
  allMessageSeen,
  members,
  thought,
};
