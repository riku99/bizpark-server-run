import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

// 自分以外のユーザーのフォローは見せない仕様なので、requestUserのみで検索
export const follows: QueryResolvers["follows"] = async (
  _,
  { first, after, q },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const decodedAfter = after
    ? Number(Buffer.from(after, "base64").toString())
    : null;

  const follows = await prisma.follow.findMany({
    where: {
      followerId: requestUser.id,
      followee: q
        ? {
            OR: [
              {
                name: {
                  contains: q,
                },
              },
              {
                bio: {
                  contains: q,
                },
              },
            ],
          }
        : undefined,
    },
    include: {
      followee: true,
    },
    orderBy: {
      cursor: "desc",
    },
    take: first,
    cursor: decodedAfter ? { cursor: decodedAfter } : undefined,
    skip: decodedAfter && decodedAfter > 1 ? 1 : 0,
  });

  let hasNextPage: boolean;
  let hasPreviousPage: boolean;

  let count: number;

  if (decodedAfter) {
    count = await prisma.follow.count({
      where: {
        followerId: requestUser.id,
        cursor: {
          lt: decodedAfter,
        },
      },
    });
    hasNextPage = count - first > 0;
    hasPreviousPage = true;
  } else {
    count = await prisma.follow.count({
      where: {
        followerId: requestUser.id,
      },
    });
    hasNextPage = count > first;
    hasPreviousPage = false;
  }

  const convertedFollows = follows.map((f) => {
    const { followee } = f;
    return {
      ...followee,
      follow: true,
    };
  });

  const pageInfo = {
    hasNextPage,
    hasPreviousPage,
    startCursor: follows.length ? follows[0].cursor.toString() : null,
    endCursor: follows.length
      ? follows[follows.length - 1].cursor.toString()
      : null,
  };

  const edges = convertedFollows.map((follow, idx) => ({
    node: follow,
    cursor: follows[idx].cursor.toString(),
  }));

  return {
    edges,
    pageInfo,
  };
};
