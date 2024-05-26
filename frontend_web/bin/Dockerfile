FROM node:20-alpine

WORKDIR /bin_login/

COPY package.json .

RUN npm install

# phải run npm install trước
COPY . .

CMD [ "npm", "start" ]