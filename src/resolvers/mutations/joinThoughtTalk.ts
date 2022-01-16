import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const joinThoughtTalk: MutationResolvers["joinThoughtTalk"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

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
      messages: {
        include: {
          sender: true,
        },
      },
    },
  });

  if (existingData) {
    await prisma.thoughtTalkRoomMember.create({
      data: {
        talkRoomId: existingData.id,
        userId: requestUser.id,
      },
    });

    return existingData;
  }

  const newData = await prisma.thoughtTalkRoom.create({
    data: {
      thoughtId: input.thoughtId,
    },
    include: {
      thought: true,
      members: {
        include: {
          user: true,
        },
      },
      messages: {
        include: {
          sender: true,
        },
      },
    },
  });

  await prisma.thoughtTalkRoomMember.create({
    data: {
      talkRoomId: newData.id,
      userId: requestUser.id,
    },
  });

  return newData;
};
