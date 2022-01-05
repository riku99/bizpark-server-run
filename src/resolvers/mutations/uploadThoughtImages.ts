import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-cloud-functions";
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

  const images = await Promise.all(promises);

  return {
    images,
  };
};
