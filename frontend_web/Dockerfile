FROM nginx:1.24-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY /build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]