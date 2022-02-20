import { UserResolvers } from '~/generated/graphql';
import { follow } from './follow';
import { blocking } from './blocking';
import { pickedNews } from './pickedNews';
import { likedThoughts } from './likedThoughts';

export const User: UserResolvers = {
  follow,
  blocking,
  pickedNews,
  likedThoughts,
};
