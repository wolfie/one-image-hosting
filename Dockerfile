FROM node:12.0.0-alpine
ARG SHARED_SECRET
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install --production
COPY . .
EXPOSE 8000
ENV PORT 8000
ENV SHARED_SECRET $SHARED_SECRET
CMD [ "yarn", "start" ]

