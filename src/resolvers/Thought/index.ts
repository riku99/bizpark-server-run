import { ThoughtResolvers } from '~/generated/graphql';
import { contributor } from './contributor';
import { picked } from './picked';
import { images } from './images';
import { liked } from './liked';

export const Thought: ThoughtResolvers = {
  contributor,
  picked,
  images,
  liked,
};
