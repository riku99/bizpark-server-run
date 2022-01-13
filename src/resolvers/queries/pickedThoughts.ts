import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";
import { findThoughtsWithRelayStyle } from "~/models/thought";
import { createThoughtConnection } from "~/helpers/createThoughtConnection";

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

  let count: number;
  if (decodedAfter) {
    count = await prisma.thought.count({
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
    count = await prisma.thought.count({
      where: {
        picked: {
          some: {
            pickerId: requestUser.id,
          },
        },
      },
    });
  }

  const connection = createThoughtConnection({
    thoughts,
    after: decodedAfter,
    first,
    count,
  });

  return connection;
};
