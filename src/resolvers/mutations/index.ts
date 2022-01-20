import { createUser } from "./createUser";
import { MutationResolvers } from "~/generated/graphql";
import { createPick } from "./createPick";
import { deletePick } from "./deletePick";
import { signOut } from "./signOut";
import { uploadThoughtImages } from "./uploadThoughtImages";
import { createThought } from "./createThought";
import { deleteThought } from "./deleteTohught";
import { createNewsPick } from "./createNewsPick";
import { deleteNewsPick } from "./deleteNewsPick";
import { updateMe } from "./updateMe";
import { uploadImage } from "./uploadImage";
import { follow } from "./follow";
import { unfollow } from "./unfollow";
import { block } from "./block";
import { unblock } from "./unblock";
import { joinThoughtTalk } from "./joinThoughtTalk";
import { createThoughtTalkRoomMessage } from "./createThoughtTalkRoomMessage";
import { createUserThoughtTalkRoomMessageSeen } from "./createUserThoughtTalkRoomMessageSeen";

export const Mutation: MutationResolvers = {
  createUser,
  createPick,
  deletePick,
  signOut,
  uploadThoughtImages,
  createThought,
  deleteThought,
  createNewsPick,
  deleteNewsPick,
  updateMe,
  uploadImage,
  follow,
  unfollow,
  block,
  unblock,
  joinThoughtTalk,
  createThoughtTalkRoomMessage,
  createUserThoughtTalkRoomMessageSeen,
};
