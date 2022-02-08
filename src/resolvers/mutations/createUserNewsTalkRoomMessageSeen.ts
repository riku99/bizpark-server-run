import {
  MutationResolvers,
  CustomErrorResponseCode,
} from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";
import { NOT_TALKROOM_FOUND } from "~/constants";

export const createUserNewsTalkRoomMessageSeen: MutationResolvers["createUserNewsTalkRoomMessageSeen"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  try {
    await prisma.userNewsTalkRoomMessageSeen.create({
      data: {
        userId: requestUser.id,
        messageId: input.messageId,
      },
    });
  } catch (e) {}

  const talkRoom = await prisma.newsTalkRoom.findUnique({
    where: {
      id: input.talkRoomId,
    },
  });

  if (!talkRoom) {
    throw new ApolloError(
      NOT_TALKROOM_FOUND,
      CustomErrorResponseCode.InvalidRequest
    );
  }

  return talkRoom;
};
