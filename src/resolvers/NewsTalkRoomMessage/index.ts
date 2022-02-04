import { NewsTalkRoomMessageResolvers } from "~/generated/graphql";
import { replyMessage } from "./replyMessage";

export const NewsTalkRoomMessage: NewsTalkRoomMessageResolvers = {
  replyMessage,
};
