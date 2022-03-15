// @ts-nocheck

import {
  SubscriptionResolvers,
  SubscriptionOneOnOneTalkRoomMessageCreatedArgs,
} from '~/generated/graphql';
import { pubsub } from '~/lib/pubsub';
import { withFilter } from 'graphql-subscriptions';
import { PublishOneOnOneMessagePayload } from '~/resolvers/Mutation/createOneOnOneTalkRoomMessage';

export const oneOnOneTalkRoomMessageCreated: SubscriptionResolvers['oneOnOneTalkRoomMessageCreated'] = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(['ONE_ON_ONE_TALK_ROOM_MESSAGE_CREATED']),
    (
      payload: PublishOneOnOneMessagePayload,
      variables: SubscriptionOneOnOneTalkRoomMessageCreatedArgs
    ) => {
      payload.oneOnOneTalkRoomMessageCreated.talkRoom;
      return (
        payload.oneOnOneTalkRoomMessageCreated.messageRecipientId ===
          variables.userId ||
        payload.oneOnOneTalkRoomMessageCreated.senderId === variables.userId
      );
    }
  ),
};
