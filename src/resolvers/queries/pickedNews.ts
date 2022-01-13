import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";
import { findNewsWithRelayStyle } from "~/models/news";
import { createNewsConnection } from "~/helpers/createNewsConnection";

export const pickedNews: QueryResolvers["pickedNews"] = async (
  _,
  { after, first },
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
      picked: {
        some: {
          pickerId: requestUser.id,
        },
      },
    },
    first,
    after: decodedAfter,
    userId: requestUser.id,
  });

  let count: number;
  if (decodedAfter) {
    count = await prisma.news.count({
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
  } else {
    count = await prisma.news.count({
      where: {
        picked: {
          some: {
            pickerId: requestUser.id,
          },
        },
      },
    });
  }

  const connection = createNewsConnection({
    news,
    first,
    after: decodedAfter,
    count,
  });

  return connection;
};
