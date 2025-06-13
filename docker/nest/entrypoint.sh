#!/bin/sh

echo "Lancement de l'entrypoint du conteneur NestJS"

#if ["$NODE_ENV" = "development"]; then
#  npm install
#  npx prisma generate
#  npx prisma migrate dev
#fi

npm install
npx prisma generate

#if ["$NODE_ENV" = "production"]; then
# npx prisma generate
# npx prisma migrate deploy
#fi

exec "$@"