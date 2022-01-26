import { ThoughtTalkRoomResolvers } from "~/generated/graphql";
import { createPageInfo } from "~/helpers/createPageInfo";
import { Prisma } from "@prisma/client";

const DEFAULT_TAKE_COUNT = 6;

export const members: ThoughtTalkRoomResolvers["members"] = async (
  parent,
  args,
  { prisma, requestUser }
) => {
  const after = args.after
    ? Number(Buffer.from(args.after, "base64").toString())
    : null;
  const first = args.first ?? DEFAULT_TAKE_COUNT;
  const skip = after && after > 1 ? 1 : 0;
  const cursor = after ? { id: after } : undefined;

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
      take: first,
      skip,
      cursor,
    });

  const getMemberMe = prisma.thoughtTalkRoom
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
    });

  const getTotal = prisma.thoughtTalkRoom
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .members({
      where,
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
  members.unshift(memberMe[0]);

  const count = members.length - (after ? total.length - after : 0);
  const pageInfo = createPageInfo({
    count,
    first,
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
