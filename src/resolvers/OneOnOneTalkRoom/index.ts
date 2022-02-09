import { OneOnOneTalkRoomResolvers } from "~/generated/graphql";
import { sender } from "./sender";
import { recipient } from "./recipient";
import { allMessageSeen } from "./allMessageSeen";

export const OneOnOneTalkRoom: OneOnOneTalkRoomResolvers = {
  sender,
  recipient,
  allMessageSeen,
};
