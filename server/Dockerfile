FROM node:20-alpine

WORKDIR /fmECG_server/

COPY package.json .

RUN npm install

# phải run npm install trước
COPY . .

CMD [ "npm", "start" ]
