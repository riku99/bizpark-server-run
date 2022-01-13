import { prisma } from "~/lib/prisma";
import { Prisma } from "@prisma/client";

export const findNewsWithRelayStyle = async ({
  where,
  first,
  after,
  userId,
}: {
  where: Prisma.NewsWhereInput;
  first: number;
  after: number | null;
  userId: string;
}) => {
  return await prisma.news.findMany({
    where,
    orderBy: {
      cursor: "desc",
    },
    include: {
      picked: {
        where: {
          pickerId: userId,
        },
      },
    },
    take: first,
    skip: after && after > 1 ? 1 : 0,
    cursor: after ? { cursor: after } : undefined,
  });
};
