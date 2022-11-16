FROM node:14-alpine

WORKDIR /app
COPY package.json .

RUN npm install

COPY . .
# EXPOSE 5672
EXPOSE 6672

CMD [ "npm", "run", "start:dev" ]