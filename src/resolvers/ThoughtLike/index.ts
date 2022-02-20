import { ThoughtLikeResolvers } from '~/generated/graphql';
import { user } from './user';
import { thought } from './thought';

export const ThoughtLike: ThoughtLikeResolvers = {
  user,
  thought,
};
