import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";
import { findThoughtsWithRelayStyle } from "~/models/thought";

export const pickedThoughts: QueryResolvers["pickedThoughts"] = async (
  _,
  { first, after },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const decodedAfter = after
    ? Number(Buffer.from(after, "base64").toString())
    : null;

  const thoughts = await findThoughtsWithRelayStyle({
    where: {
      picked: {
        some: {
          pickerId: requestUser.id,
        },
      },
    },
    userId: requestUser.id,
    first,
    after: decodedAfter,
  });

  let hasNextPage: boolean;
  let hasPreviousPage: boolean;

  if (decodedAfter) {
    const afterPickedCount = await prisma.thought.count({
      where: {
        picked: {
          some: {
            pickerId: requestUser.id,
          },
        },
        cursor: {
          lt: decodedAfter,
        },
      },
    });

    hasNextPage = afterPickedCount - first > 0;
    hasPreviousPage = true;
  } else {
    const pickedCount = await prisma.thought.count({
      where: {
        picked: {
          some: {
            pickerId: requestUser.id,
          },
        },
      },
    });

    hasNextPage = pickedCount > first;
    hasPreviousPage = false;
  }

  const pageInfo = {
    hasNextPage,
    hasPreviousPage,
    startCursor: thoughts[0].cursor,
    endCursor: thoughts[thoughts.length - 1].cursor.toString(),
  };

  const convertedThoughts = thoughts.map((t) => {
    const picked = !!t.picked.length;
    return {
      ...t,
      picked,
    };
  });

  const edges = convertedThoughts.map((thought) => {
    return {
      node: thought,
      cursor: thought.cursor,
    };
  });

  return {
    edges,
    pageInfo,
  };
};
