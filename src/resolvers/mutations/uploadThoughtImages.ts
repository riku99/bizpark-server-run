import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-cloud-functions";
import { createRandomString } from "~/helpers/createRandomString";
import { Upload } from "graphql-upload";
import { upload } from "~/helpers/uploadImage";

export const uploadThoughtImages: MutationResolvers["uploadThoughtImages"] = async (
  _,
  { files },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  let promises: Promise<any>[] = [];
  files.forEach((file) => {
    promises.push(upload({ file }));
  });

  const urls = await Promise.all(promises);

  return {
    urls,
  };
};
