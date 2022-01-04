import {
  MutationResolvers,
  CustomErrorResponseCode,
} from "~/generated/graphql";
import { verifyIdToken } from "~/auth/verifyIdToken";
import { ApolloError } from "apollo-server-cloud-functions";

export const createUser: MutationResolvers["createUser"] = async (
  _,
  { input },
  { prisma }
) => {
  const session = await verifyIdToken(input.idToken);

  if (!session) {
    throw new Error("Failed to get token.");
  }

  if (!session.email) {
    throw new Error("The email address does not exist.");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: session.email,
    },
  });

  if (existingUser) {
    throw new ApolloError(
      "There is already a user.",
      CustomErrorResponseCode.AlreadyUserExisting
    );
  }

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: session.email,
      uid: session.uid,
      loggedIn: true,
    },
  });

  return user;
};
