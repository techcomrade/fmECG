FROM node:23-alpine

WORKDIR /server/

COPY package*.json .

RUN npm install

# phải run npm install trước
COPY . .

# Build the NestJS application
RUN npm run build

# EXPOSE 3000

CMD ["sh", "-c", "npm run db:reset && npm run db:migrate && npm run db:seed && npm start"]