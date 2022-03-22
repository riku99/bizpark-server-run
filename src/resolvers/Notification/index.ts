import { NotificationResolvers } from '~/generated/graphql';
import { performer } from './performer';
import { user } from './user';
import { thought } from './thought';

export const Notification: NotificationResolvers = {
  performer,
  user,
  thought,
};
