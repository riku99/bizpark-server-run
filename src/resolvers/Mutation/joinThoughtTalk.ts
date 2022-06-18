import { Prisma } from '@prisma/client';
import { ApolloError, ForbiddenError } from 'apollo-server-express';
import { startOfMonth } from 'date-fns';
import { NORMAL_USER_JOIN_TALK_ROOM_LIMIT } from '~/constants';
import {
  MutationResolvers,
  ThouhgtTalkRoomJoinError,
} from '~/generated/graphql';

export const joinThoughtTalk: MutationResolvers['joinThoughtTalk'] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError('auth error');
  }

  const blocked = await prisma.block.findUnique({
    where: {
      blockBy_blockTo: {
        blockBy: input.contributorId,
        blockTo: requestUser.id,
      },
    },
  });

  if (blocked) {
    throw new ApolloError(
      'ブロックされています',
      ThouhgtTalkRoomJoinError.Blokced
    );
  }

  if (requestUser.plan === 'Normal') {
    const alreadyJoinedRoomsInThisMonth = await prisma.thoughtTalkRoomMember.findMany(
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
      alreadyJoinedRoomsInThisMonth.length >= NORMAL_USER_JOIN_TALK_ROOM_LIMIT
    ) {
      throw new ApolloError(
        '参加上限に達しています',
        ThouhgtTalkRoomJoinError.UpperLimit
      );
    }
  }

  const include: Prisma.ThoughtTalkRoomInclude = {
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
    },
  };

  const existingData = await prisma.thoughtTalkRoom.findUnique({
    where: {
      thoughtId: input.thoughtId,
    },
    include: {
      thought: true,
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  if (existingData) {
    const includedMe = existingData.members.some(
      (m) => m.userId === requestUser.id
    );

    if (!includedMe) {
      await prisma.thoughtTalkRoomMember.create({
        data: {
          talkRoomId: existingData.id,
          userId: requestUser.id,
        },
      });
    }

    return existingData;
  }

  const newData = await prisma.thoughtTalkRoom.create({
    data: {
      thoughtId: input.thoughtId,
    },
    include,
  });

  const membersData = [
    {
      talkRoomId: newData.id,
      userId: requestUser.id,
    },
  ];

  if (requestUser.id !== input.contributorId) {
    membersData.push({
      talkRoomId: newData.id,
      userId: input.contributorId,
    });
  }

  await prisma.thoughtTalkRoomMember.createMany({
    data: membersData,
  });

  // 新しいトークルーム = メッセージは存在していない のでallMessageSeenはtrueでいい
  return {
    ...newData,
    allMessageSeen: true,
  };
};
