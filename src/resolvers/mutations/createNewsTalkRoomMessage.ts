import {
  MutationResolvers,
  CustomErrorResponseCode,
} from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";
import { NOT_TALKROOM_FOUND } from "~/constants";

export const createNewsTalkRoomMessage: MutationResolvers["createNewsTalkRoomMessage"] = async (
  _,
  { input },
  { prisma, requestUser, pubsub }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const findTalkRoom = prisma.newsTalkRoom.findUnique({
    where: {
      id: input.talkRoomId,
    },
  });

  const findMemberMe = prisma.newsTalkRoomMember.findUnique({
    where: {
      talkRoomId_userId: {
        talkRoomId: input.talkRoomId,
        userId: requestUser.id,
      },
    },
  });

  const [talkRoom, memberMe] = await Promise.all([findTalkRoom, findMemberMe]);

  if (!talkRoom || !memberMe) {
    throw new ApolloError(
      NOT_TALKROOM_FOUND,
      CustomErrorResponseCode.InvalidRequest
    );
  }

  const message = await prisma.newsTalkRoomMessage.create({
    data: {
      roomId: input.talkRoomId,
      text: input.text,
      replyTo: input.replyTo,
      senderId: requestUser.id,
    },
  });

  await prisma.newsTalkRoom.update({
    where: {
      id: input.talkRoomId,
    },
    data: {
      updatedAt: new Date(),
    },
  });

  pubsub.publish("NEWS_TALK_ROOM_MESSAGE_CREATED", {
    newsTalkRoomMessageCreated: message,
  });

  return message;
};
