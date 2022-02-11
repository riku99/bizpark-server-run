// @ts-nocheck

import { SubscriptionResolvers } from "~/generated/graphql";
import { pubsub } from "~/lib/pubsub";

export const oneOnOneTalkRoomMessageCreated: SubscriptionResolvers["oneOnOneTalkRoomMessageCreated"] = {
  subscribe: () =>
    pubsub.asyncIterator(["ONE_ON_ONE_TALK_ROOM_MESSAGE_CREATED"]),
};
