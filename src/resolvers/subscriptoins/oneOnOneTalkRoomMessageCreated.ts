// @ts-nocheck

import {
  SubscriptionResolvers,
  SubscriptionOneOnOneTalkRoomMessageCreatedArgs,
} from "~/generated/graphql";
import { pubsub } from "~/lib/pubsub";
import { withFilter } from "graphql-subscriptions";
import { PublishOneOnOneMessagePayload } from "~/resolvers/mutations/createOneOnOneTalkRoomMessage";

export const oneOnOneTalkRoomMessageCreated: SubscriptionResolvers["oneOnOneTalkRoomMessageCreated"] = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["ONE_ON_ONE_TALK_ROOM_MESSAGE_CREATED"]),
    (
      payload: PublishOneOnOneMessagePayload,
      variables: SubscriptionOneOnOneTalkRoomMessageCreatedArgs
    ) => {
      return (
        payload.oneOnOneTalkRoomMessageCreated.messageRecipientId ===
        variables.userId
      );
    }
  ),
};
