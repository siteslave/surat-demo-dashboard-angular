FROM node:lts-alpine3.14

LABEL maintainer="Satit Rianpit <rianpit@gmail.com>"

WORKDIR /home/app

RUN apk add --upgrade --no-cache --virtual deps python3 build-base git

COPY . .

RUN npm i

RUN npm i -g @angular/cli

RUN npm run build

RUN npm i express

CMD [ "node", "server.js" ]

EXPOSE 80
