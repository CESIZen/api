FROM node:22-alpine3.22 AS builder

LABEL org.opencontainers.image.source=https://github.com/cesizen/api

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# On copie le script d'entrée dans le conteneur et on retire le .sh pour ne pas avoir à le remettre à chaque fois
COPY docker/nest/entrypoint.sh /usr/local/bin/entrypoint
 # On donne les droits d'exécution au script
RUN chmod +x /usr/local/bin/entrypoint

ENTRYPOINT [ "entrypoint" ]
#CMD ["node", "dist/main", "start:migrate:prod"]
CMD ["npm", "run", "start:migrate:prod"]