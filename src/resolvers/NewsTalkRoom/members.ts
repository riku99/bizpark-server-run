import { NewsTalkRoomResolvers } from "~/generated/graphql";
import { createPagenationValues } from "~/helpers/createPageNationValues";
import { Prisma } from "@prisma/client";
import { createPageInfo } from "~/helpers/createPageInfo";

const DEFAULT_TAKE_COUNT = 6;

export const members: NewsTalkRoomResolvers["members"] = async (
  parent,
  arges,
  { requestUser, prisma }
) => {
  const cursorKey = "id";
  const { after, take, skip, cursor } = createPagenationValues({
    after: arges.after,
    first: arges.first ?? DEFAULT_TAKE_COUNT,
    cursorKey,
  });

  const where: Prisma.NewsTalkRoomMemberWhereInput = {
    userId: {
      not: requestUser?.id,
    },
  };

  const getMembers = prisma.newsTalkRoom
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .members({
      where,
      include: {
        user: true,
      },
      orderBy: {
        id: "desc",
      },
      take,
      skip,
      cursor,
    });

  const getMemberMe = !after
    ? prisma.newsTalkRoom
        .findUnique({
          where: {
            id: parent.id,
          },
        })
        .members({
          where: {
            userId: requestUser?.id,
          },
          include: {
            user: true,
          },
        })
    : undefined;

  const getTotal = prisma.newsTalkRoom
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .members({
      where: {
        ...where,
        id: {
          lt: after ?? undefined,
        },
      },
      select: {
        id: true,
      },
    });

  const [members, memberMe, total] = await Promise.all([
    getMembers,
    getMemberMe,
    getTotal,
  ]);

  // 自分を先頭にする
  if (memberMe?.length) {
    members.unshift(memberMe[0]);
  }

  const pageInfo = createPageInfo({
    count: total.length,
    first: take,
    after: !!after,
    nodes: members,
    cursorKey,
  });
};
