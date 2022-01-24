import { prisma } from "~/lib/prisma";
import { Prisma } from "@prisma/client";

export const findThoughtsWithRelayStyle = async ({
  where,
  userId,
  first,
  after,
}: {
  where: Prisma.ThoughtWhereInput;
  userId: string;
  first: number;
  after: number | null;
}) => {
  const data = await prisma.thought.findMany({
    where,
    include: {
      picked: {
        where: {
          pickerId: userId,
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
    take: first,
    skip: after && after > 1 ? 1 : 0, // Skip the cursor
    cursor: after
      ? {
          cursor: after,
        }
      : undefined,
  });

  return data;
};
