import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";
import { findNewsWithRelayStyle } from "~/models/news";
import { createNewsConnection } from "~/helpers/createNewsConnection";

const DEFAULT_TAKE_COUNT = 20;

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

  const news = await findNewsWithRelayStyle({
    where: {
      genre,
    },
    userId: requestUser.id,
    first: first ?? DEFAULT_TAKE_COUNT,
    after: decodedAfter,
  });

  let count: number;
  if (decodedAfter) {
    count = await prisma.news.count({
      where: {
        genre,
        cursor: {
          lt: decodedAfter,
        },
      },
    });
  } else {
    count = await prisma.news.count({
      where: {
        genre,
      },
    });
  }

  const connection = createNewsConnection({
    news,
    first: first ?? DEFAULT_TAKE_COUNT,
    count,
    after: decodedAfter,
  });

  return connection;
};
