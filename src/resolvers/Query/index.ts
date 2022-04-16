import { QueryResolvers } from '~/generated/graphql';
import { thoughts } from './thoughts';
import { initialData } from './initial';
import { news } from './news';
import { me } from './me';
import { userResult } from './userResult';
import { pickedThoughts } from './pickedThoughts';
import { pickedNews } from './pickedNews';
import { userThoughts } from './userThoughts';
import { follows } from './follows';
import { blockingUsers } from './blockingUsers';
import { thoughtTalkRooms } from './thoguhtTalkRooms';
import { thoughtTalkRoom } from './thoughtTalkRoom';
import { newsTalkRooms } from './newsTalkRooms';
import { newsTalkRoom } from './newsTalkRoom';
import { oneNews } from './oneNews';
import { thought } from './thought';
import { oneOnOneTalkRooms } from './oneOnOneTalkRooms';
import { oneOnOneTalkRoom } from './oneOnOneTalkRoom';
import { notifications } from './notifications';
import { newsTalkRoomMessage } from './newsTalkRoomMessage';
import { thoughtTalkRoomMessage } from './thoughtTalkRoomMessage';

export const Query: QueryResolvers = {
  thoughts,
  initialData,
  news,
  me,
  userResult,
  pickedThoughts,
  pickedNews,
  userThoughts,
  follows,
  blockingUsers,
  thoughtTalkRooms,
  thoughtTalkRoom,
  newsTalkRooms,
  newsTalkRoom,
  oneNews,
  thought,
  oneOnOneTalkRooms,
  oneOnOneTalkRoom,
  notifications,
  newsTalkRoomMessage,
  thoughtTalkRoomMessage,
};
