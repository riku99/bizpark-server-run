import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const deleteOneOnOneTalkRoom: MutationResolvers["deleteOneOnOneTalkRoom"] = async (
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
    // 既に削除されていた場合でもエラー出さずにリクエストユーザーが削除したことにすればいい
    return true;
  }

  const deletedTalkRooms = await prisma.oneOnOneTalkRoom.deleteMany({
    where: {
      id: input.talkRoomId,
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

  if (!deletedTalkRooms.count) {
    throw new Error();
  }

  return true;
};
