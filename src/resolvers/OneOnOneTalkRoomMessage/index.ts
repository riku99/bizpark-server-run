import { OneOnOneTalkRoomMessageResolvers } from "~/generated/graphql";
import { sender } from "./sender";
import { talkRoom } from "./talkRoom";
import { replyMessage } from "./replyMessage";

export const OneOnOneTalkRoomMessage: OneOnOneTalkRoomMessageResolvers = {
  sender,
  talkRoom,
  replyMessage,
};
