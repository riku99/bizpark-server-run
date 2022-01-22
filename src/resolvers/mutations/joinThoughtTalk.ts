import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";
import { Prisma } from "@prisma/client";

export const joinThoughtTalk: MutationResolvers["joinThoughtTalk"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
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
    messages: {
      include: {
        sender: true,
        seen: {
          where: {
            userId: requestUser.id,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
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
        where: {
          userId: {
            not: requestUser.id,
          },
        },
        include: {
          user: true,
        },
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
        orderBy: {
          createdAt: "desc",
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

    let allMessageSeen = true;
    if (existingData.messages.length) {
      const lastMessage = existingData.messages[0];
      allMessageSeen =
        lastMessage.senderId === requestUser.id || !!lastMessage.seen.length;
    }

    return {
      ...existingData,
      allMessageSeen,
    };
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
