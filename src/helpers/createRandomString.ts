import crypto from "crypto";

export const createRandomString = () => {
  let N = 64;
  return crypto
    .randomBytes(N)
    .toString("base64")
    .substring(0, N)
    .replace(/\//g, "");
};
