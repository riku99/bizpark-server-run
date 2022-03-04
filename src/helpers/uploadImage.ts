import { createRandomString } from '~/helpers/createRandomString';
import { Upload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';
import sharp from 'sharp';
import { SubImage } from '~/generated/graphql';

const storage = new Storage();
const myBucket = storage.bucket(process.env.STORAGE_BUCKET_NAME as string);

export const upload = async ({ file }: { file: Upload }) => {
  const randomName = createRandomString();
  const filePath = `https://storage.googleapis.com/${process.env.STORAGE_BUCKET_NAME}/${randomName}`;
  const fileObj = myBucket.file(randomName);

  const { createReadStream, filename, mimetype, encoding } = await file;

  let dimensions: { height?: number; width?: number };

  const stream = createReadStream();
  const convertedToWebp = stream.pipe(sharp().webp());
  const metadata = await convertedToWebp.metadata();

  dimensions = { height: metadata.height, width: metadata.width };

  let resizeWidth: number | null | undefined;
  let resizeHeight: number | null | undefined;

  if (metadata.width && metadata.height) {
    if (
      metadata.width > metadata.height ||
      metadata.width === metadata.height
    ) {
      // 元が横長か正方形の場合比率を変えずにwidthを1080にリサイズ
      resizeWidth = 1080;
      resizeHeight = undefined;
    } else {
      // 縦長の場合はheightを基準
      resizeWidth = null;
      resizeHeight = 1080;
    }
  } else {
    // メタデータのwidthをheightがない場合はとりあえずwidthを1080にリサイズ
    resizeWidth = 1080;
    resizeHeight = undefined;
  }

  const resizedStream = convertedToWebp.pipe(
    sharp().resize(resizeWidth, resizeHeight)
  );

  const uploadStream = resizedStream.pipe(
    fileObj.createWriteStream({
      gzip: true,
      contentType: 'image/webp',
    })
  );

  const uploadPromise = () =>
    new Promise<SubImage>((resolve, reject) => {
      uploadStream
        .on('error', (err: unknown) => {
          console.log(err);
          reject();
        })
        .on('finish', (data: unknown) => {
          resolve({
            url: filePath,
            width: dimensions.width,
            height: dimensions.height,
          });
        });
    });

  const data = await uploadPromise();
  return data;
};
