FROM node:23-alpine

ENV NODE_ENV=production

COPY package.json ./
COPY public/ public/
COPY src/ src/
COPY tsconfig.json ./


RUN yarn install
RUN yarn build

EXPOSE 3000
ENTRYPOINT ["node", "dist/server.js"]
