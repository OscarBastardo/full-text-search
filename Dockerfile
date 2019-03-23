FROM node:10-alpine

ARG PORT=4000
ENV PORT $PORT
EXPOSE $PORT

WORKDIR /www
COPY package.json package-lock.json* yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

USER node

RUN yarn scrape

CMD [ "yarn", "start" ]
