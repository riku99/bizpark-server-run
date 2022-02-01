import { ThoughtTalkRoomMessageResolvers } from "~/generated/graphql";
import { talkRoom } from "./talkRoom";
import { replyMessage } from "./replyMessage";
import { sender } from "./sender";

export const ThoughtTalkRoomMessage: ThoughtTalkRoomMessageResolvers = {
  talkRoom,
  replyMessage,
  sender,
};
