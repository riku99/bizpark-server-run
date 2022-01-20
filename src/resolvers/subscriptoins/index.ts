// @ts-nocheck

import { SubscriptionResolvers } from "~/generated/graphql";
import { pubsub } from "~/lib/pubsub";

export const Subscription: SubscriptionResolvers = {
  thoughtTalkRoomMessageCreated: {
    subscribe: () =>
      pubsub.asyncIterator(["THOUGHT_TALK_ROOM_MESSAGE_CREATED"]),
  },
};
