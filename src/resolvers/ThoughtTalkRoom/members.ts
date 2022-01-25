import { ThoughtTalkRoomResolvers } from "~/generated/graphql";
import { createPageInfo } from "~/helpers/createPageInfo";

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

  const members = await prisma.thoughtTalkRoom
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .members({
      where: {
        userId: {
          not: requestUser?.id,
        },
      },
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

  const count = members.length - (after ?? 0);
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
