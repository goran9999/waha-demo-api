FROM node:latest

WORKDIR /app

COPY ./ /app

COPY ["package.json", "./"]

RUN npm i -g ts-node

RUN npm install --force

RUN npm i -g tsup

RUN npm run build

EXPOSE 5500

CMD ["npm","run","start"]