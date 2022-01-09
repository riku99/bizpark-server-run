import { QueryResolvers } from "~/generated/graphql";
import { thoughts } from "./thoughts";
import { initialData } from "./initial";
import { news } from "./news";
import { me } from "./me";

export const Query: QueryResolvers = {
  thoughts,
  initialData,
  news,
  me,
};
