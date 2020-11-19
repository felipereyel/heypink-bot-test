FROM node:14-alpine

WORKDIR /node-app

COPY package.json .

RUN npm install --quiet

COPY . . 

CMD ["node", "index.js"]