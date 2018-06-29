FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf

ADD dist /usr/share/nginx/html/

EXPOSE 80
