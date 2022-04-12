// @ts-nocheck

import { PubSub } from 'graphql-subscriptions';
import { PostgresPubSub } from 'graphql-postgres-subscriptions';
import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  host: 'db',
  database: 'postgres',
  password: 'password',
  port: 5432,
});

client.connect();

export const pubsub =
  process.env.NODE_ENV === 'dev'
    ? new PubSub()
    : (new PostgresPubSub({ client }) as PubSub);

pubsub.subscribe('error', (err) => {
  console.log(err.message);
  console.log('Error');
});
