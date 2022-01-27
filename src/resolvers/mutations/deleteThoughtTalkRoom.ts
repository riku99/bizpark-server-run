import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const deleteThoughtTalkRoom: MutationResolvers["deleteThoughtTalkRoom"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const data = await prisma.thoughtTalkRoom.findFirst({
    where: {
      id: input.talkRoomId,
      thought: {
        contributorId: requestUser.id,
      },
    },
  });

  if (!data) {
    throw new Error();
  }

  await prisma.thoughtTalkRoom.delete({
    where: {
      id: input.talkRoomId,
    },
  });

  return true;
};
