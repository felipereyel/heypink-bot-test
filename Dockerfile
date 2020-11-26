FROM node:14-alpine

WORKDIR /node-app

COPY package.json .

RUN apk --no-cache add git
RUN npm install --quiet

COPY . . 

CMD ["node", "src/index.js"]