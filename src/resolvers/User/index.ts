import { UserResolvers } from "~/generated/graphql";
import { follow } from "./follow";

export const User: UserResolvers = {
  follow,
};
