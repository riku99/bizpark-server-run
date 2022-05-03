import { Mutation } from './Mutation';
import { Resolvers } from '~/generated/graphql';
import { Query } from './Query';
import { GraphQLUpload } from 'graphql-upload';
import { Thought } from './Thought';
import { ThoughtTalkRoom } from './ThoughtTalkRoom';
import { ThoughtTalkRoomMessage } from './ThoughtTalkRoomMessage';
import { NewsTalkRoom } from './NewsTalkRoom';
import { User } from './User';
import { NewsTalkRoomMessage } from './NewsTalkRoomMessage';
import { News } from './News';
import { NewsPick } from './NewsPick';
import { OneOnOneTalkRoom } from './OneOnOneTalkRoom';
import { OneOnOneTalkRoomMessage } from './OneOnOneTalkRoomMessage';
import { ThoughtLike } from './ThoughtLike';
import { Notification } from './Notification';

export const resolvers: Resolvers = {
  // @ts-ignore
  Upload: GraphQLUpload,
  Mutation,
  Query,
  ThoughtTalkRoom,
  ThoughtTalkRoomMessage,
  Thought,
  NewsTalkRoom,
  User,
  NewsTalkRoomMessage,
  News,
  NewsPick,
  OneOnOneTalkRoom,
  OneOnOneTalkRoomMessage,
  ThoughtLike,
  Notification,
};
