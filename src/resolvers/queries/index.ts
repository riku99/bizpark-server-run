import { QueryResolvers } from "~/generated/graphql";
import { thoughts } from "./thoughts";
import { initialData } from "./initial";

export const Query: QueryResolvers = {
  thoughts,
  initialData,
};
