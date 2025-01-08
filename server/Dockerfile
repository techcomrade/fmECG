FROM node:18.20.1-alpine

WORKDIR /server/

COPY package.json .

RUN npm install

# phải run npm install trước
COPY . .

# Build the NestJS application
RUN npm run build

CMD ["sh", "-c", "npm start"]