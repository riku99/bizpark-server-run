import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

const DEFAULT_TAKE_COUNT = 30;

export const news: QueryResolvers["news"] = async (
  _,
  { genre, after, first },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const decodedAfter = after
    ? Number(Buffer.from(after, "base64").toString())
    : null;

  const news = await prisma.news.findMany({
    where: {
      genre,
    },
    orderBy: {
      cursor: "desc",
    },
    include: {
      picked: {
        where: {
          pickerId: requestUser.id,
        },
      },
    },
    take: first ?? DEFAULT_TAKE_COUNT,
    skip: decodedAfter && decodedAfter > 1 ? 1 : 0,
    cursor: decodedAfter ? { cursor: decodedAfter } : undefined,
  });

  const genreCount = await prisma.news.count({
    where: {
      genre,
    },
  });

  let hasNextPage: boolean;
  let hasPreviousPage: boolean;

  if (decodedAfter) {
    const afterGenreCount = await prisma.news.count({
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
    hasNextPage = genreCount > (first ?? DEFAULT_TAKE_COUNT);
    hasPreviousPage = false;
  }

  const pageInfo = {
    hasNextPage,
    hasPreviousPage,
    startCursor: news[0].cursor.toString(),
    endCursor: news[news.length - 1].cursor.toString(),
  };

  const convertedNews = news.map((n) => {
    const picked = !!n.picked.length;
    return {
      ...n,
      picked,
    };
  });

  const edges = convertedNews.map((n) => {
    return {
      node: n,
      cursor: n.cursor.toString(),
    };
  });

  return {
    edges,
    pageInfo,
  };
};
