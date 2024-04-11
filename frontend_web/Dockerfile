FROM node:20-alpine AS node_builder

WORKDIR /web/

COPY package.json ./

RUN npm i

# phải run npm install trước
COPY . .

RUN npm run build

FROM nginx:1.24-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=node_builder /web/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]