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
      members: true,
      messages: true,
    },
  });

  if (existingData) {
    return existingData;
  }

  const newData = await prisma.thoughtTalkRoom.create({
    data: {
      thoughtId: input.thoughtId,
    },
    include: {
      members: true,
      messages: true,
    },
  });

  return newData;
};
