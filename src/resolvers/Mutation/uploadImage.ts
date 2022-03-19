import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-express";
import { upload } from "~/helpers/uploadImage";

export const uploadImage: MutationResolvers["uploadImage"] = async (
  _,
  { file },
  { requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const result = await upload({ file });

  return result;
};
