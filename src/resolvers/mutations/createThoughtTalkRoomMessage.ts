import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";
import { pubsub } from "~/lib/pubsub";

export const createThoughtTalkRoomMessage: MutationResolvers["createThoughtTalkRoomMessage"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
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
    },
  });

  return message;
};
