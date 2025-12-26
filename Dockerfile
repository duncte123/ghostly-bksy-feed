FROM node:25 AS builder

WORKDIR /var/build/ghostfeed

COPY . .

RUN yarn && yarn build

FROM node:25

WORKDIR /var/app/ghostfeed

COPY package.json yarn.lock ./

RUN yarn install

COPY --from=builder /var/build/ghostfeed/dist/ ./

CMD [ "node", "index.js" ]
