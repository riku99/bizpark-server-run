import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

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
};
