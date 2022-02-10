import {
  MutationResolvers,
  CustomErrorResponseCode,
} from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";
import { NOT_TALKROOM_FOUND } from "~/constants";

export const seenOneOnOneTalkRoomMessage: MutationResolvers["seenOneOnOneTalkRoomMessage"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const talkRoom = await prisma.oneOnOneTalkRoom.findUnique({
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

  try {
    await prisma.oneOnOneTalkRoomMessage.updateMany({
      where: {
        id: input.messageId,
        room: {
          id: input.talkRoomId,
          recipientId: requestUser.id,
        },
      },
      data: {
        seen: true,
      },
    });
  } catch (e) {}

  return talkRoom;
};
