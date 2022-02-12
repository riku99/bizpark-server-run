import { UserResolvers } from "~/generated/graphql";

export const follow: UserResolvers["follow"] = async (
  parent,
  _,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    return false;
  }

  const follower = await prisma.user
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .follower({
      where: {
        followerId: requestUser.id,
      },
    });

  const follow = !!follower.length;

  return follow;
};
