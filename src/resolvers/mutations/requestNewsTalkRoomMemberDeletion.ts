import {
  MutationResolvers,
  CustomErrorResponseCode,
} from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";

export const requestNewsTalkRoomMemberDeletion: MutationResolvers["requestNewsTalkRoomMemberDeletion"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  // 既に同じMemberに対して自分以外のユーザーからの申請が存在するか確認
  const sameMemberRequest = await prisma.newsTalkRoomMemberDeleteRequest.findFirst(
    {
      where: {
        talkRoomId: input.talkRoomId,
        memberId: input.memberId,
        requestUserId: {
          not: requestUser.id,
        },
      },
    }
  );

  // 既に申請されていた場合2件目の申請なので削除
  if (sameMemberRequest) {
    await prisma.newsTalkRoomMember.delete({
      where: {
        id: input.memberId,
      },
    });
  } else {
    try {
      await prisma.newsTalkRoomMemberDeleteRequest.create({
        data: {
          talkRoomId: input.talkRoomId,
          memberId: input.memberId,
          requestUserId: requestUser.id,
        },
      });
    } catch (e) {
      // 既に自分が申請済みの時のエラー
      throw new ApolloError(
        "既に申請しています",
        CustomErrorResponseCode.InvalidRequest
      );
    }
  }

  return true;
};
