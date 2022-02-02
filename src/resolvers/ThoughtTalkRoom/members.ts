import { ThoughtTalkRoomResolvers } from "~/generated/graphql";
import { createPageInfo } from "~/helpers/createPageInfo";
import { Prisma } from "@prisma/client";
import { createPagenationValues } from "~/helpers/createPageNationValues";

const DEFAULT_TAKE_COUNT = 6;

export const members: ThoughtTalkRoomResolvers["members"] = async (
  parent,
  args,
  { prisma, requestUser }
) => {
  const { after, take, skip, cursor } = createPagenationValues({
    after: args.after,
    first: args.first ?? DEFAULT_TAKE_COUNT,
    cursorKey: "id",
  });

  const where: Prisma.ThoughtTalkRoomMemberWhereInput = {
    userId: {
      not: requestUser?.id,
    },
  };

  const getMembers = prisma.thoughtTalkRoom
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
    ? prisma.thoughtTalkRoom
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

  const getTotal = prisma.thoughtTalkRoom
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
    cursorKey: "id",
  });

  const edges = members.map((member) => ({
    node: member,
    cursor: member.id.toString(),
  }));

  return {
    edges,
    pageInfo,
  };
};
