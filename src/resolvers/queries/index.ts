import { QueryResolvers } from "~/generated/graphql";
import { thoughts } from "./thoughts";
import { initialData } from "./initial";
import { news } from "./news";

export const Query: QueryResolvers = {
  thoughts,
  initialData,
  news,
};
