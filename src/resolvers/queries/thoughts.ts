import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";
import { Prisma } from "@prisma/client";
import { createPagenationValues } from "~/helpers/createPageNationValues";
import { createPageInfo } from "~/helpers/createPageInfo";
import { createEdges } from "~/helpers/createEdges";

const DEFAULT_TAKE_COUNT = 20;

const CURSOR_KEY = "cursor";

// 前にページネーションすることはないものとして実装する
export const thoughts: QueryResolvers["thoughts"] = async (
  _,
  args,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const { after, take, skip, cursor } = createPagenationValues({
    after: args.after,
    first: args.first ?? DEFAULT_TAKE_COUNT,
    cursorKey: CURSOR_KEY,
  });

  const where: Prisma.ThoughtWhereInput = {
    genre: args.genre ?? undefined,
    contributor: {
      follower: args.follow
        ? {
            some: {
              followerId: requestUser.id,
            },
          }
        : undefined,
      blocked: {
        none: {
          blockBy: requestUser.id,
        },
      },
      blocks: {
        none: {
          blockTo: requestUser.id,
        },
      },
    },
  };

  const getThoughts = prisma.thought.findMany({
    where,
    take,
    skip,
    cursor,
    orderBy: {
      cursor: "desc",
    },
  });

  const getCount = prisma.thought.count({
    where: {
      ...where,
      cursor: {
        lt: after ?? undefined,
      },
    },
  });

  const [thoughts, count] = await Promise.all([getThoughts, getCount]);

  const pageInfo = createPageInfo({
    count,
    first: take,
    after: !!after,
    nodes: thoughts,
    cursorKey: CURSOR_KEY,
  });

  const edges = createEdges<typeof thoughts[number], typeof CURSOR_KEY>({
    nodes: thoughts,
    cursorKey: CURSOR_KEY,
  });

  return {
    edges,
    pageInfo,
  };
};
