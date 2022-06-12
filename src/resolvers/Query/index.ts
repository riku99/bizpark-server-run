import { QueryResolvers } from '~/generated/graphql';
import { blockingUsers } from './blockingUsers';
import { developer } from './developer';
import { follows } from './follows';
import { initialData } from './initial';
import { me } from './me';
import { news } from './news';
import { newsTalkRoom } from './newsTalkRoom';
import { newsTalkRoomMessage } from './newsTalkRoomMessage';
import { newsTalkRooms } from './newsTalkRooms';
import { notifications } from './notifications';
import { oneNews } from './oneNews';
import { oneOnOneTalkRoom } from './oneOnOneTalkRoom';
import { oneOnOneTalkRoomMessage } from './oneOnOneTalkRoomMessage';
import { oneOnOneTalkRooms } from './oneOnOneTalkRooms';
import { pickedNews } from './pickedNews';
import { pickedThoughts } from './pickedThoughts';
import { thoughtTalkRooms } from './thoguhtTalkRooms';
import { thought } from './thought';
import { thoughts } from './thoughts';
import { thoughtTalkRoom } from './thoughtTalkRoom';
import { thoughtTalkRoomMessage } from './thoughtTalkRoomMessage';
import { user } from './user';
import { userThoughts } from './userThoughts';

export const Query: QueryResolvers = {
  thoughts,
  initialData,
  news,
  me,
  user,
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
  oneOnOneTalkRoomMessage,
  developer,
};
