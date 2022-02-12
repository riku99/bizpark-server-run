import { UserResolvers } from "~/generated/graphql";
import { follow } from "./follow";
import { blocking } from "./blocking";

export const User: UserResolvers = {
  follow,
  blocking,
};
