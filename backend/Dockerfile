FROM node:latest
WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build:ts

EXPOSE 3000
CMD ["npm", "run", "production"]

