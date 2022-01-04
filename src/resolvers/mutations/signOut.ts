import { MutationResolvers } from "~/generated/graphql";

export const signOut: MutationResolvers["signOut"] = async (
  _,
  __,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new Error("no user");
  }

  await prisma.user.update({
    where: {
      id: requestUser.id,
    },
    data: {
      loggedIn: false,
    },
  });

  return {
    id: requestUser.id,
  };
};
