import { createRandomString } from "~/helpers/createRandomString";
import { Upload } from "graphql-upload";
import { Storage } from "@google-cloud/storage";

const storage = new Storage();
const myBucket = storage.bucket(process.env.STORAGE_BUCKET as string);

export const upload = async ({ file }: { file: Upload }) => {
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
    .on("finish", (data: unknown) => {});

  return filePath;
};
