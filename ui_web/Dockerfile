FROM node:20 AS build

WORKDIR /app
COPY . .
RUN cd bin && npm install && npm run build
RUN npm install && npm run build

EXPOSE 3002
CMD ["node", "/app/bin/dist/index.js"]