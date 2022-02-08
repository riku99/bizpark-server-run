import {
  MutationResolvers,
  CustomErrorResponseCode,
} from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";
import { NOT_TALKROOM_FOUND } from "~/constants";

export const createThoughtTalkRoomMessage: MutationResolvers["createThoughtTalkRoomMessage"] = async (
  _,
  { input },
  { prisma, requestUser, pubsub }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const findTalkRoom = prisma.thoughtTalkRoom.findFirst({
    where: {
      id: input.roomId,
    },
    select: {
      id: true,
      thought: {
        select: {
          contributorId: true,
        },
      },
    },
  });

  const findMemberMe = prisma.thoughtTalkRoomMember.findFirst({
    where: {
      talkRoomId: input.roomId,
      userId: requestUser.id,
    },
  });

  const [talkRoom, memberMe] = await Promise.all([findTalkRoom, findMemberMe]);

  if (!talkRoom || !memberMe) {
    throw new ApolloError(
      NOT_TALKROOM_FOUND,
      CustomErrorResponseCode.InvalidRequest
    );
  }

  const message = await prisma.thoughtTalkRoomMessage.create({
    data: {
      text: input.text,
      roomId: input.roomId,
      senderId: requestUser.id,
      replyTo: input.replyTo,
    },
    include: {
      sender: true,
    },
  });

  await prisma.thoughtTalkRoom.update({
    where: {
      id: input.roomId,
    },
    data: {
      updatedAt: new Date(),
    },
  });

  pubsub.publish("THOUGHT_TALK_ROOM_MESSAGE_CREATED", {
    thoughtTalkRoomMessageCreated: {
      ...message,
      contributorId: talkRoom.thought.contributorId,
    },
  });

  return message;
};
