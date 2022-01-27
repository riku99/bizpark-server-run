// @ts-nocheck

import { SubscriptionResolvers } from "~/generated/graphql";
import { withFilter } from "graphql-subscriptions";
import { pubsub } from "~/lib/pubsub";
import { prisma } from "~/lib/prisma";

export const thoughtTalkRoomMessageCreated: SubscriptionResolvers["thoughtTalkRoomMessageCreated"] = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["THOUGHT_TALK_ROOM_MESSAGE_CREATED"]),
    async (payload, variables) => {
      // メンバーから削除されている場合はpublishしない
      const member = await prisma.thoughtTalkRoomMember.findFirst({
        where: {
          talkRoomId: payload.thoughtTalkRoomMessageCreated.roomId,
          userId: variables.userId,
        },
      });

      if (!member) {
        return false;
      }

      // 参加しているトークルームか自分の投稿に対してのメッセージならパブリッシュする
      const send =
        payload.thoughtTalkRoomMessageCreated.contributorId ===
          variables.userId ||
        variables.roomIds.some(
          (id) => id === payload.thoughtTalkRoomMessageCreated.roomId
        );
      return send;
    }
  ),
};
