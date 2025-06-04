FROM gcr.io/distroless/nodejs24-debian12:nonroot
ENV NODE_ENV=production

COPY node_modules /node_modules/
# Without the package.json in place telling node that the runtime is of type "module" an error was thrown
COPY package.json /
COPY dist/ /dist/

WORKDIR /

EXPOSE 3000
ENTRYPOINT ["/nodejs/bin/node", "dist/server.js"]