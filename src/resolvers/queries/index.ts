import { QueryResolvers } from "~/graphql-api/generated/graphql";
import { thoughts } from "./thoughts";
import { initialData } from "./initial";

export const Query: QueryResolvers = {
  thoughts,
  initialData,
};
