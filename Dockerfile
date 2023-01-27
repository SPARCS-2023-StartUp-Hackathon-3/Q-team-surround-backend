FROM node:lts-alpine

WORKDIR /usr/app/surround
RUN yarn

COPY package*.json ./


COPY yarn.lock .
RUN yarn install --immutable --immutable-cache --check-cache
RUN yarn prisma db push
RUN yarn prisma generate

COPY . .
RUN yarn build

COPY . .
EXPOSE 3000
CMD ["yarn", "start:prod"]
