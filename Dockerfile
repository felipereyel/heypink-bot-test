FROM node:14-alpine

WORKDIR /node-app

COPY package.json .

RUN apk --no-cache add git
RUN npm install --quiet
RUN sed -i 's+`mongodb://127.0.0.1:27017/${bot.settings.name}-brain`+process.env.MONGO_URL+g' node_modules/bbot/dist/adapters/mongo.js

COPY . . 

CMD ["node", "src/index.js"]