import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-cloud-functions";
import { Storage } from "@google-cloud/storage";
import { createRandomString } from "~/helpers/createRandomString";

const storage = new Storage();
const myBucket = storage.bucket(process.env.STORAGE_BUCKET as string);

export const uploadThoughtImages: MutationResolvers["uploadThoughtImages"] = async (
  _,
  { file },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const randomName = createRandomString();
  const filePath = `${process.env.STORAGE_BASE_PATH}/${randomName}`;
  const fileObj = myBucket.file(randomName);

  const { createReadStream, filename, mimetype, encoding } = await file;

  const stream = createReadStream();
  stream
    .pipe(
      fileObj.createWriteStream({
        gzip: true,
        contentType: mimetype,
      })
    )
    .on("error", (err: unknown) => {
      console.log(err);
    })
    .on("finish", async (data: unknown) => {});

  return {
    id: filePath,
  };
};
