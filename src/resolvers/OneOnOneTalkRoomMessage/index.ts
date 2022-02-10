import { OneOnOneTalkRoomMessageResolvers } from "~/generated/graphql";
import { sender } from "./sender";

export const OneOnOneTalkRoomMessage: OneOnOneTalkRoomMessageResolvers = {
  sender,
};
