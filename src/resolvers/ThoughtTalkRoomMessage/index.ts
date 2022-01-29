import { ThoughtTalkRoomMessageResolvers } from "~/generated/graphql";
import { talkRoom } from "./talkRoom";
import { replyMessage } from "./replyMessage";

export const ThoughtTalkRoomMessage: ThoughtTalkRoomMessageResolvers = {
  talkRoom,
  replyMessage,
};
