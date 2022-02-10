import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const oneOnOneTalkRooms: QueryResolvers["oneOnOneTalkRooms"] = async (
  _,
  __,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const talkRooms = await prisma.oneOnOneTalkRoom.findMany({
    where: {
      OR: [
        {
          senderId: requestUser.id,
        },
        {
          recipientId: requestUser.id,
        },
      ],
    },
  });

  return talkRooms;
};
