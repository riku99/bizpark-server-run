import { createUser } from "./createUser";
import { MutationResolvers } from "~/generated/graphql";
import { createPick } from "./createPick";
import { deletePick } from "./deletePick";
import { signOut } from "./signOut";
import { uploadThoughtImages } from "./uploadThoughtImages";
import { createThought } from "./createThought";
import { deleteThought } from "./deleteTohught";

export const Mutation: MutationResolvers = {
  createUser,
  createPick,
  deletePick,
  signOut,
  uploadThoughtImages,
  createThought,
  deleteThought,
};
