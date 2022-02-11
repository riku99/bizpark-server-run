import {
  MutationResolvers,
  CustomErrorResponseCode,
  OneOnOneTalkRoomMessage,
} from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";
import { NOT_TALKROOM_FOUND } from "~/constants";

export type PublishOneOnOneMessagePayload = {
  oneOnOneTalkRoomMessageCreated: OneOnOneTalkRoomMessage & {
    messageRecipientId: string;
  };
};

export const createOneOnOneTalkRoomMessage: MutationResolvers["createOneOnOneTalkRoomMessage"] = async (
  _,
  { input },
  { requestUser, prisma, pubsub }
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

  const messageRecipientId =
    talkRoom.senderId === requestUser.id
      ? talkRoom.recipientId
      : talkRoom.senderId;

  const message = await prisma.oneOnOneTalkRoomMessage.create({
    data: {
      roomId: input.talkRoomId,
      text: input.text,
      senderId: requestUser.id,
      replyTo: input.replyTo,
    },
  });

  await prisma.oneOnOneTalkRoom.update({
    where: {
      id: input.talkRoomId,
    },
    data: {
      updatedAt: new Date(),
    },
  });

  pubsub.publish("ONE_ON_ONE_TALK_ROOM_MESSAGE_CREATED", {
    oneOnOneTalkRoomMessageCreated: {
      ...message,
      messageRecipientId,
    },
  });

  return message;
};
