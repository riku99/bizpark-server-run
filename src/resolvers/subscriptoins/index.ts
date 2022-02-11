import { SubscriptionResolvers } from "~/generated/graphql";
import { thoughtTalkRoomMessageCreated } from "./thoughtTalkRoomMessageCreated";
import { newsTalkRoomMessageCreated } from "./newsTalkRoomMessageCreated";
import { oneOnOneTalkRoomMessageCreated } from "./oneOnOneTalkRoomMessageCreated";

export const Subscription: SubscriptionResolvers = {
  thoughtTalkRoomMessageCreated,
  newsTalkRoomMessageCreated,
  oneOnOneTalkRoomMessageCreated,
};
