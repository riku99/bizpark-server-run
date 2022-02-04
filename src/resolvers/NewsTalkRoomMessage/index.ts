import { NewsTalkRoomMessageResolvers } from "~/generated/graphql";
import { replyMessage } from "./replyMessage";
import { sender } from "./sender";

export const NewsTalkRoomMessage: NewsTalkRoomMessageResolvers = {
  replyMessage,
  sender,
};
