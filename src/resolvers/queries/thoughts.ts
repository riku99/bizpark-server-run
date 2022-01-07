import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

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

  const thoughts = await prisma.thought.findMany({
    where: {
      genre,
    },
    include: {
      contributor: true,
      picked: {
        where: {
          pickerId: requestUser.id,
        },
        select: {
          id: true,
        },
      },
      images: {
        select: {
          id: true,
          url: true,
          width: true,
          height: true,
        },
      },
    },
    orderBy: {
      cursor: "desc",
    },
    take: first ?? DEFAULT_TAKE_COUNT,
    skip: decodedAfter && decodedAfter > 1 ? 1 : 0, // Skip the cursor
    cursor: decodedAfter
      ? {
          cursor: decodedAfter,
        }
      : undefined,
  });

  const genreCount = await prisma.thought.count({
    where: {
      genre,
    },
  });

  let hasNextPage: boolean;
  let hasPreviousPage: boolean;

  if (decodedAfter) {
    const afterGenreCount = await prisma.thought.count({
      where: {
        genre,
        cursor: {
          lt: decodedAfter,
        },
      },
    });

    hasNextPage = afterGenreCount - (first ?? DEFAULT_TAKE_COUNT) > 0;
    hasPreviousPage = true;
  } else {
    // afterがない。初回。
    hasNextPage = genreCount > DEFAULT_TAKE_COUNT;
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
  }, []);

  return {
    edges,
    pageInfo,
  };
};
