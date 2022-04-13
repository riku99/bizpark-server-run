// @ts-nocheck

import {
  SubscriptionResolvers,
  SubscriptionNewsTalkRoomMessageCreatedArgs,
} from '~/generated/graphql';
import { pubsub } from '~/lib/pubsub';
import { withFilter } from 'graphql-subscriptions';
import { prisma } from '~/lib/prisma';
import { NewsTalkRoomMessage } from '@prisma/client';

export const newsTalkRoomMessageCreated: SubscriptionResolvers['newsTalkRoomMessageCreated'] = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(['NEWS_TALK_ROOM_MESSAGE_CREATED']),
    async (
      payload: { newsTalkRoomMessageCreated: NewsTalkRoomMessage },
      variables: SubscriptionNewsTalkRoomMessageCreatedArgs
    ) => {
      const member = await prisma.newsTalkRoomMember.findUnique({
        where: {
          talkRoomId_userId: {
            talkRoomId: payload.newsTalkRoomMessageCreated.roomId,
            userId: variables.userId,
          },
        },
      });

      if (!member) {
        return false;
      }

      const send = variables.roomIds.some(
        (id) => id === payload.newsTalkRoomMessageCreated.roomId
      );

      return send;
    }
  ),
};
