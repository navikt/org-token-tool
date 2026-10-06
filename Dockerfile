FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim
ENV NODE_ENV=production

COPY node_modules /node_modules/
# Without the package.json in place telling node that the runtime is of type "module" an error was thrown
COPY package.json /
COPY dist/ /dist/
COPY public/ /public/

WORKDIR /

EXPOSE 3000
ENTRYPOINT ["/usr/bin/node", "dist/server.js"]