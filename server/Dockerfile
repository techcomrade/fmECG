FROM node:20.9.0-alpine

WORKDIR /server/

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]