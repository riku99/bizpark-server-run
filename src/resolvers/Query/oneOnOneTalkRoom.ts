import { QueryResolvers, CustomErrorResponseCode } from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";
import { NOT_TALKROOM_FOUND } from "~/constants";

export const oneOnOneTalkRoom: QueryResolvers["oneOnOneTalkRoom"] = async (
  _,
  { id },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const oneOnOneTalkRoom = await prisma.oneOnOneTalkRoom.findUnique({
    where: {
      id,
    },
  });

  if (!oneOnOneTalkRoom) {
    throw new ApolloError(NOT_TALKROOM_FOUND, CustomErrorResponseCode.NotFound);
  }

  return oneOnOneTalkRoom;
};
