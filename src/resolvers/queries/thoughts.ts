import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";
import { findThoughtsWithRelayStyle } from "~/models/thought";
import { createThoughtConnection } from "~/helpers/createThoughtConnection";
import { Prisma } from "@prisma/client";

const DEFAULT_TAKE_COUNT = 20;

// 前にページネーションすることはないものとして実装する
export const thoughts: QueryResolvers["thoughts"] = async (
  _,
  { genre, first, after },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const decodedAfter = after
    ? Number(Buffer.from(after, "base64").toString())
    : null;

  const where: Prisma.ThoughtWhereInput = {
    genre,
    contributor: {
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

  let count: number;
  if (decodedAfter) {
    count = await prisma.thought.count({
      where,
    });
  } else {
    count = await prisma.thought.count({
      where,
    });
  }

  const connection = createThoughtConnection({
    thoughts,
    after: decodedAfter,
    first: first ?? DEFAULT_TAKE_COUNT,
    count,
  });

  return connection;
};
