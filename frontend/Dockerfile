FROM node:16-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn global add eslint
COPY .eslintrc /app/.eslintrc
RUN yarn install
COPY . .
CMD ["yarn", "start"]