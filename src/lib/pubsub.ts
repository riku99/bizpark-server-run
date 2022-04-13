// @ts-nocheck

import { PubSub } from 'graphql-subscriptions';
import { PostgresPubSub } from 'graphql-postgres-subscriptions';
import { Client } from 'pg';

export let pubsub: PubSub;

if (process.env.NODE_ENV === 'dev') {
  // pubsub = new PubSub();
  const client = new Client({
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    password: 'password',
    port: 5432,
  });

  client.connect();

  pubsub = new PostgresPubSub({ client }) as PubSub;
} else {
  const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
  });

  client.connect();

  pubsub = new PostgresPubSub({ client }) as PubSub;
}
