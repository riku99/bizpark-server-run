import {
  MutationResolvers,
  CustomErrorResponseCode,
} from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";
import { pubsub } from "~/lib/pubsub";

export const createThoughtTalkRoomMessage: MutationResolvers["createThoughtTalkRoomMessage"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const findTalkRoom = prisma.thoughtTalkRoom.findFirst({
    where: {
      id: input.roomId,
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
      "トークルームが見つかりません",
      CustomErrorResponseCode.InvalidRequest
    );
  }

  const message = await prisma.thoughtTalkRoomMessage.create({
    data: {
      text: input.text,
      roomId: input.roomId,
      senderId: requestUser.id,
    },
    include: {
      sender: true,
    },
  });

  const update = prisma.thoughtTalkRoom.update({
    where: {
      id: input.roomId,
    },
    data: {
      updatedAt: new Date(),
    },
  });

  const findThoughtData = prisma.thoughtTalkRoom.findUnique({
    where: {
      id: input.roomId,
    },
    select: {
      thought: {
        select: {
          contributorId: true,
        },
      },
    },
  });

  const [, thogutData] = await Promise.all([update, findThoughtData]);

  pubsub.publish("THOUGHT_TALK_ROOM_MESSAGE_CREATED", {
    thoughtTalkRoomMessageCreated: {
      ...message,
      contributorId: thogutData?.thought.contributorId,
    },
  });

  return message;
};
