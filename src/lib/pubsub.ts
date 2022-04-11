import { PubSub } from 'graphql-subscriptions';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { GooglePubSub } from '@axelspringer/graphql-google-pubsub';
import Redis from 'ioredis';

const options = {
  host: 'host.docker.internal',
  port: 6379,
};

export const pubsub =
  process.env.NODE_ENV === 'development' ? new PubSub() : new GooglePubSub();
