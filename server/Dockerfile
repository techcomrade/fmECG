FROM node:20-alpine

COPY package.json /fmECG_server/
COPY . /fmECG_server/

WORKDIR /fmECG_server

RUN npm install

CMD [ "npm", "start" ]
