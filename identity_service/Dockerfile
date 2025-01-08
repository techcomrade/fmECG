# Sử dụng Node.js làm base image
FROM node:18.20.1-alpine AS build

WORKDIR /identity/

COPY package.json 

RUN npm i @nestjs/cli

RUN npm install
# Sao chép tất cả mã nguồn vào trong container
COPY . .

RUN npm run build

EXPOSE 3003

# Chạy ứng dụng
CMD ["npm", "start"]
