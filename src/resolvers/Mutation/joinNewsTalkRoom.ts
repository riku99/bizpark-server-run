import { ApolloError, ForbiddenError } from 'apollo-server-express';
import startOfMonth from 'date-fns/startOfMonth';
import { NORMAL_USER_JOIN_TALK_ROOM_LIMIT } from '~/constants';
import { MutationResolvers, NewsTalkRoomJoinError } from '~/generated/graphql';

export const joinNewsTalkRoom: MutationResolvers['joinNewsTalkRoom'] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const deleted = await prisma.deletedUserFromNewsTalkRoom.findFirst({
    where: {
      userId: requestUser.id,
      talkRoom: {
        newsId: input.newsId,
      },
    },
  });

  if (deleted) {
    throw new ApolloError(
      'トークルームから削除されました',
      NewsTalkRoomJoinError.UserRemoved
    );
  }

  if (requestUser.plan === 'Normal') {
    const alreadyJoinedNewsTalkRoomsInThinMonth = await prisma.newsTalkRoomMember.findMany(
      {
        where: {
          userId: requestUser.id,
          createdAt: {
            gt: startOfMonth(new Date()),
          },
        },
      }
    );

    if (
      alreadyJoinedNewsTalkRoomsInThinMonth.length >=
      NORMAL_USER_JOIN_TALK_ROOM_LIMIT
    ) {
      throw new ApolloError(
        '参加上限に達しています',
        NewsTalkRoomJoinError.UpperLimit
      );
    }
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
