// @ts-nocheck

import { SubscriptionResolvers } from "~/generated/graphql";
import { pubsub } from "~/lib/pubsub";

export const newsTalkRoomMessageCreated: SubscriptionResolvers["newsTalkRoomMessageCreated"] = {
  subscribe: () => pubsub.asyncIterator(["NEWS_TALK_ROOM_MESSAGE_CREATED"]),
};
