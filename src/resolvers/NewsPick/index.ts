import { NewsPickResolvers } from "~/generated/graphql";
import { picker } from "./picker";
import { news } from "./news";

export const NewsPick: NewsPickResolvers = {
  picker,
  news,
};
