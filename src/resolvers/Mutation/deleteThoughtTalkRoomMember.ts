import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const deleteThoughtTalkRoomMember: MutationResolvers["deleteThoughtTalkRoomMember"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const room = await prisma.thoughtTalkRoom.findFirst({
    where: {
      id: input.roomId,
      thought: {
        contributorId: requestUser.id,
      },
    },
  });

  if (!room) {
    throw new Error();
  }

  await prisma.thoughtTalkRoomMember.delete({
    where: {
      talkRoomId_userId: {
        talkRoomId: input.roomId,
        userId: input.userId,
      },
    },
  });

  return room;
};
