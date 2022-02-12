import { OneOnOneTalkRoomResolvers } from "~/generated/graphql";
import { sender } from "./sender";
import { recipient } from "./recipient";
import { allMessageSeen } from "./allMessageSeen";
import { messages } from "./messages";

export const OneOnOneTalkRoom: OneOnOneTalkRoomResolvers = {
  sender,
  recipient,
  allMessageSeen,
  messages,
};
