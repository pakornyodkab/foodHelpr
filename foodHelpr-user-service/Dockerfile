FROM node:14-alpine

WORKDIR /app
COPY package.json .

RUN npm install

COPY . .
EXPOSE 3001
EXPOSE 4001

CMD [ "npm", "run", "start:dev" ]