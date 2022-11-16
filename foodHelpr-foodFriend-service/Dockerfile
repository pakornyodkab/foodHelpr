FROM node:14-alpine

WORKDIR /app
COPY package.json .

RUN npm install

COPY . .
EXPOSE 3010
EXPOSE 3090

CMD [ "npm", "run", "start:dev" ]