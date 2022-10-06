FROM node:slim

# *NOTE: non-standard "NODE_ENV" value in your environment - https://nextjs.org/docs/messages/non-standard-node-env
# development/production environment
# ENV NODE_ENV=production

ENV PATH /app/node_modules/.bin:$PATH

# working directory
WORKDIR /app

# copy repo to working directory
COPY . .

# install dependencies
RUN npm ci && next build

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nogroup /app

USER nextjs

# forward env var port to port 3000
EXPOSE ${PORT:-3000}:3000

# CMD [ "npm", "run", "dev" ]
CMD [ "next", "start" ]
# CMD [ "/bin/sh" ]
