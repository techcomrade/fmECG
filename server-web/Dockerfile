FROM node:20-alpine

WORKDIR /server/

COPY package.json .

RUN npm install

# phải run npm install trước
COPY . .

CMD [ "sh", "-c", "sleep 10; npm start" ]