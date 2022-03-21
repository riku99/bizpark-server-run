import { NotificationResolvers } from '~/generated/graphql';
import { performer } from './performer';
import { user } from './user';

export const Notification: NotificationResolvers = {
  performer,
  user,
};
