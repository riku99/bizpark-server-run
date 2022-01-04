import { createUser } from "./createUser";
import { MutationResolvers } from "~/generated/graphql";
import { createPick } from "./createPick";
import { deletePick } from "./deletePick";
import { signOut } from "./signOut";
import { uploadThoughtImages } from "./uploadThoughtImages";

export const Mutation: MutationResolvers = {
  createUser,
  createPick,
  deletePick,
  signOut,
  uploadThoughtImages,
};
