import { SubscriptionResolvers } from "~/generated/graphql";
import { thoughtTalkRoomMessageCreated } from "./thoughtTalkRoomMessageCreated";

export const Subscription: SubscriptionResolvers = {
  thoughtTalkRoomMessageCreated,
};
