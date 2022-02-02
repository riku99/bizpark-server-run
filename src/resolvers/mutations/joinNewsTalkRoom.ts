import {
  MutationResolvers,
  CustomErrorResponseCode,
} from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const joinNewsTalkRoom: MutationResolvers["joinNewsTalkRoom"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const existingTalkRoom = await prisma.newsTalkRoom.findUnique({
    where: {
      newsId: input.newsId,
    },
  });

  if (existingTalkRoom) {
    try {
      await prisma.newsTalkRoomMember.create({
        data: {
          talkRoomId: existingTalkRoom.id,
          userId: requestUser.id,
        },
      });
    } catch (e) {
      // ユニークエラー出てもエラースローする必要ない
    }

    return existingTalkRoom;
  }

  const newTalkRoom = await prisma.newsTalkRoom.create({
    data: {
      newsId: input.newsId,
    },
  });

  try {
    await prisma.newsTalkRoomMember.create({
      data: {
        talkRoomId: newTalkRoom.id,
        userId: requestUser.id,
      },
    });
  } catch (e) {}

  return newTalkRoom;
};
