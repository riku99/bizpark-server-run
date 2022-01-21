import { ForbiddenError } from "apollo-server-express";

export const throwAuthError = () => {
  throw new ForbiddenError("auth error");
};
