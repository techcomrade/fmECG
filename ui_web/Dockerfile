FROM node:18.20.1-alpine AS node_builder

WORKDIR /ui-web/

ENV PORT=3002
ENV WATCHPACK_POLLING=true
ENV BUILD_PATH=./www

COPY package.json ./

RUN npm i -g npm@20.18.1

RUN npm i
RUN npm run build 
RUN cd bin && npm i && npm run build
# phải run npm install trước
COPY . .

CMD ["cd", "bin", "npm", "start" ]
