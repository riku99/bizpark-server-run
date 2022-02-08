import { NewsTalkRoomMessageResolvers } from "~/generated/graphql";
import { replyMessage } from "./replyMessage";
import { sender } from "./sender";
import { talkRoom } from "./talkRoom";

export const NewsTalkRoomMessage: NewsTalkRoomMessageResolvers = {
  replyMessage,
  sender,
  talkRoom,
};
