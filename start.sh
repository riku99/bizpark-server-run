#!/bin/bash
if [ "$NODE_ENV" = "production" ]
then
# echo ${GOOGLE_CREDENTIALS} > /google_credentials.json
# yarn prisma migrate deploy
yarn prisma generate
yarn generate
yarn ts-node --transpile-only -r tsconfig-paths/register ./src/index.ts
elif [ "$NODE_ENV" = 'dev' ]
then
yarn generate
yarn prisma migrate dev
yarn dev
fi