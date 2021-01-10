FROM node:14-alpine

RUN npm install -g yarn sequelize-cli --force

# set working directory
WORKDIR /app

# Install app dependencies.
COPY package.json yarn.lock ./
RUN yarn install --production --cache-folder ./node_modules/

# Bundle app source
COPY . .

EXPOSE 8000

ENTRYPOINT [ "./entrypoint.sh" ]