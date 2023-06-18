FROM node:16-alpine
ARG BUILD_DATE
ARG CACHEBUST
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn global add eslint
COPY .eslintrc ./
RUN yarn install
COPY . ../.env
CMD ["yarn", "start"]