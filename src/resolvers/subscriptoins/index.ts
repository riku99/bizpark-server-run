// @ts-nocheck
import { withFilter } from "graphql-subscriptions";

import { SubscriptionResolvers } from "~/generated/graphql";
import { pubsub } from "~/lib/pubsub";

export const Subscription: SubscriptionResolvers = {
  thoughtTalkRoomMessageCreated: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(["THOUGHT_TALK_ROOM_MESSAGE_CREATED"]),
      (payload, variables) => {
        // console.log(payload);
        return variables.roomIds.some(
          (id) => id === payload.thoughtTalkRoomMessageCreated.roomId
        );
      }
    ),
  },
};
