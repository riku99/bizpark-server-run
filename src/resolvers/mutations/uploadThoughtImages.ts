import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-cloud-functions";
import { Storage } from "@google-cloud/storage";
import * as fs from "fs";

const storage = new Storage();
const myBucket = storage.bucket("bizpark-dev");
const contents = "This is the contents of the file.";

export const uploadThoughtImages: MutationResolvers["uploadThoughtImages"] = async (
  _,
  { file },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  console.log("👀 Hey");

  const fileName = myBucket.file("upload1");

  console.log(fileName);

  const { createReadStream, filename, mimetype, encoding } = await file;

  console.log(typeof createReadStream);

  const stream = createReadStream();
  stream.pipe(fileName.createWriteStream({ gzip: true })).on("error", () => {});

  return {
    id: "fileId",
  };
};
