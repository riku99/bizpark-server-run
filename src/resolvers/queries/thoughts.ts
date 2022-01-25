import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";
import { findThoughtsWithRelayStyle } from "~/models/thought";
import { createThoughtConnection } from "~/helpers/createThoughtConnection";
import { Prisma } from "@prisma/client";

const DEFAULT_TAKE_COUNT = 20;

// 前にページネーションすることはないものとして実装する
export const thoughts: QueryResolvers["thoughts"] = async (
  _,
  { genre, first, after, follow },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const decodedAfter = after
    ? Number(Buffer.from(after, "base64").toString())
    : null;

  const where: Prisma.ThoughtWhereInput = {
    genre: genre ?? undefined,
    contributor: {
      follower: follow
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

  const thoughts = await findThoughtsWithRelayStyle({
    where,
    userId: requestUser.id,
    first: first ?? DEFAULT_TAKE_COUNT,
    after: decodedAfter,
  });

  const totalCount = await prisma.thought.count({
    where,
  });
  const count = totalCount - (decodedAfter ? totalCount - decodedAfter : 0);

  const connection = createThoughtConnection({
    thoughts,
    after: decodedAfter,
    first: first ?? DEFAULT_TAKE_COUNT,
    count,
  });

  return connection;
};
