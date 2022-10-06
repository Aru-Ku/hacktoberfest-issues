FROM node:slim

# TODO: setting `NODE_ENV` breaks page dependencies. `devDependencies` need to be migrated to `dependencies`
# development/production environment
# ENV NODE_ENV=production

# working directory
WORKDIR /app

# copy repo to working directory
COPY . .

# install dependencies
RUN npm install --global

# forward env var port to port 3000
EXPOSE ${PORT:-3000}:3000

# start dev server
CMD [ "npm", "run", "dev" ]
