import {
  MutationResolvers,
  CustomErrorResponseCode,
} from "~/generated/graphql";
import { ApolloError, ForbiddenError } from "apollo-server-express";

export const getOutThoughtTalkRoom: MutationResolvers["getOutThoughtTalkRoom"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  try {
    await prisma.thoughtTalkRoomMember.delete({
      where: {
        talkRoomId_userId: {
          talkRoomId: input.roomId,
          userId: requestUser.id,
        },
      },
    });
  } catch (e) {
    throw new ApolloError(
      "既にトークルームが存在しません",
      CustomErrorResponseCode.InvalidRequest
    );
  }

  return true;
};
