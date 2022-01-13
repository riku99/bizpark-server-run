import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";
import { findThoughtsWithRelayStyle } from "~/models/thought";
import { createThoughtConnection } from "~/helpers/createThoughtConnection";

export const userThoughts: QueryResolvers["userThoughts"] = async (
  _,
  { userId, first, after },
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
      contributorId: userId,
    },
    userId: requestUser.id,
    first,
    after: decodedAfter,
  });

  let count: number;
  if (decodedAfter) {
    count = await prisma.thought.count({
      where: {
        contributorId: userId,
        cursor: {
          lt: decodedAfter,
        },
      },
    });
  } else {
    count = await prisma.thought.count({
      where: {
        contributorId: userId,
      },
    });
  }

  const connection = createThoughtConnection({
    thoughts,
    first,
    count,
    after: decodedAfter,
  });

  return connection;
};
