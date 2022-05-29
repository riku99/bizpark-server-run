import { MutationResolvers } from '~/generated/graphql';
import { addDeviceToken } from './addDeviceToken';
import { block } from './block';
import { changeReceiveFollowPushNotification } from './changeReceiveFollowPushNotification';
import { changeReceiveOneOnOneTalkRoomMessage } from './changeReceiveOneOnOneTalkRoomMessage';
import { changeReceiveOneOnOneTalkRoomMessagePushNotification } from './changeReceiveOneOnOneTalkRoomMessagePushNotification';
import { changeReceiveReplyPushNotification } from './changeReceiveReplyPushNotification';
import { createEmailAuthCode } from './createEmailAuthCode';
import { createNewsPick } from './createNewsPick';
import { createNewsTalkRoomMessage } from './createNewsTalkRoomMessage';
import { createOneOnOneTalkRoom } from './createOneOnOneTalkRoom';
import { createOneOnOneTalkRoomMessage } from './createOneOnOneTalkRoomMessage';
import { createPick } from './createPick';
import { createThought } from './createThought';
import { createThoughtTalkRoomMessage } from './createThoughtTalkRoomMessage';
import { createUser } from './createUser';
import { createUserNewsTalkRoomMessageSeen } from './createUserNewsTalkRoomMessageSeen';
import { createUserThoughtTalkRoomMessageSeen } from './createUserThoughtTalkRoomMessageSeen';
import { deleteAccount } from './deleteAccount';
import { deleteNewsPick } from './deleteNewsPick';
import { deleteOneOnOneTalkRoom } from './deleteOneOnOneTalkRoom';
import { deletePick } from './deletePick';
import { deleteThoughtTalkRoom } from './deleteThoughtTalkRoom';
import { deleteThoughtTalkRoomMember } from './deleteThoughtTalkRoomMember';
import { deleteThought } from './deleteTohught';
import { follow } from './follow';
import { getOutNewsTalkRoom } from './getOutNewsTalkRoom';
import { getOutThoughtTalkRoom } from './getOutThoughtTalkRoom';
import { joinNewsTalkRoom } from './joinNewsTalkRoom';
import { joinThoughtTalk } from './joinThoughtTalk';
import { likeThought } from './likeThought';
import { requestNewsTalkRoomMemberDeletion } from './requestNewsTalkRoomMemberDeletion';
import { seenOneOnOneTalkRoomMessage } from './seenOneOnOneTalkRoomMessage';
import { seeNotification } from './seeNotification';
import { signOut } from './signOut';
import { unblock } from './unblock';
import { unfollow } from './unfollow';
import { unlikeThought } from './unlikeThought';
import { updateEmail } from './updateEmail';
import { updateMe } from './updateMe';
import { uploadImage } from './uploadImage';
import { uploadThoughtImages } from './uploadThoughtImages';
import { verifyEmailAuthCode } from './verifyEmailAuthCode';
import { verifyIapReceipt } from './verifyIapReceipt';

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
  getOutThoughtTalkRoom,
  deleteThoughtTalkRoomMember,
  deleteThoughtTalkRoom,
  joinNewsTalkRoom,
  createNewsTalkRoomMessage,
  createUserNewsTalkRoomMessageSeen,
  getOutNewsTalkRoom,
  requestNewsTalkRoomMemberDeletion,
  createOneOnOneTalkRoom,
  createOneOnOneTalkRoomMessage,
  seenOneOnOneTalkRoomMessage,
  deleteOneOnOneTalkRoom,
  addDeviceToken,
  likeThought,
  unlikeThought,
  deleteAccount,
  seeNotification,
  verifyIapReceipt,
  updateEmail,
  createEmailAuthCode,
  verifyEmailAuthCode,
  changeReceiveOneOnOneTalkRoomMessage,
  changeReceiveReplyPushNotification,
  changeReceiveOneOnOneTalkRoomMessagePushNotification,
  changeReceiveFollowPushNotification,
};
