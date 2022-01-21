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

  // 「自分が発言したトークルーム」のみを取得
  const talkRooms = await prisma.thoughtTalkRoom.findMany({
    where: {
      members: {
        some: {
          userId: requestUser.id,
        },
      },
      messages: {
        some: {
          senderId: requestUser.id,
        },
      },
    },
    include: {
      thought: true,
      members: {
        where: {
          userId: {
            not: requestUser.id,
          },
        },
        include: {
          user: true,
        },
        take: 6,
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
    orderBy: {
      updatedAt: "desc",
    },
  });

  const talkRoomsWithSeenData = talkRooms.map((room, idx) => {
    // そのトークルームの一番最近のメッセージが自分のもの || seenデータが存在する場合は「全て既読した」扱い
    let allMessageSeen = true;
    if (room.messages.length) {
      const lastMessage = room.messages[0];
      allMessageSeen =
        lastMessage.senderId === requestUser.id || !!lastMessage.seen.length;
    }

    return {
      ...room,
      allMessageSeen,
    };
  });

  return talkRoomsWithSeenData;
};
