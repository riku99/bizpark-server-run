import { UserResolvers } from '~/generated/graphql';
import { follow } from './follow';
import { blocking } from './blocking';
import { pickedNews } from './pickedNews';
import { pickedThoughts } from './pickedThoughts';

export const User: UserResolvers = {
  follow,
  blocking,
  pickedNews,
  pickedThoughts,
};
