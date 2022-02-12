import { UserResolvers } from "~/generated/graphql";

export const blocking: UserResolvers["blocking"] = async (
  parent,
  _,
  { prisma, requestUser }
) => {
  const blocking = await prisma.user
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .blocked({
      where: {
        blockBy: requestUser?.id,
      },
    });

  return !!blocking.length;
};
