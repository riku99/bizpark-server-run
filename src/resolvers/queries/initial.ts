import { QueryResolvers } from "~/graphql-api/generated/graphql";
import { ForbiddenError } from "apollo-server-cloud-functions";

export const initialData: QueryResolvers["initialData"] = async (
  _,
  __,
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  if (!requestUser.loggedIn) {
    await prisma.user.update({
      where: {
        id: requestUser.id,
      },
      data: {
        loggedIn: true,
      },
    });
  }

  return {
    me: requestUser,
  };
};
