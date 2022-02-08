import { ThoughtResolvers } from "~/generated/graphql";
import { contributor } from "./contributor";
import { picked } from "./picked";

export const Thought: ThoughtResolvers = {
  contributor,
  picked,
};
