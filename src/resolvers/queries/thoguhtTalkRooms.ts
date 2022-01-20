import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const thoughtTalkRooms: QueryResolvers["thoughtTalkRooms"] = async (
  _,
  __,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  // where一旦なしで全部取得
  const talkRooms = await prisma.thoughtTalkRoom.findMany({
    include: {
      thought: true,
      members: {
        include: {
          user: true,
        },
        take: 7,
      },
      messages: {
        include: {
          sender: true,
          seen: {
            where: {
              userId: requestUser.id,
            },
          },
        },
        take: 20,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const talkRoomsWithSeenData = talkRooms.map((room, idx) => {
    // そのトークルームの一番最近のメッセージが自分のもの || seenデータが存在する場合は「全て既読した」扱い
    const lastMessage = room.messages[0];
    const allMessageSeen =
      lastMessage.senderId === requestUser.id || !!lastMessage.seen.length;
    return {
      ...room,
      allMessageSeen,
    };
  });

  return talkRoomsWithSeenData;
};
