FROM node:18.17.1-alpine

WORKDIR /home/app

RUN apk update && apk add bash && apk add --no-cache git
