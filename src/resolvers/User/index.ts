import { UserResolvers } from '~/generated/graphql';
import { follow } from './follow';
import { blocking } from './blocking';
import { pickedNews } from './pickedNews';
import { likedThoughts } from './likedThoughts';
import { snsAccounts } from './snsAccounts';
import { blocked } from './blocked';

export const User: UserResolvers = {
  follow,
  blocking,
  pickedNews,
  likedThoughts,
  snsAccounts,
  blocked,
};
