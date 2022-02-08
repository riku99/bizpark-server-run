import { SubscriptionResolvers } from "~/generated/graphql";
import { thoughtTalkRoomMessageCreated } from "./thoughtTalkRoomMessageCreated";
import { newsTalkRoomMessageCreated } from "./newsTalkRoomMessageCreated";

export const Subscription: SubscriptionResolvers = {
  thoughtTalkRoomMessageCreated,
  newsTalkRoomMessageCreated,
};
