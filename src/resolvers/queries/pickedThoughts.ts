import { QueryResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";

export const pickedThoughts: QueryResolvers["pickedThoughts"] = async (
  _,
  { first, after },
  { prisma, requestUser }
) => {};
