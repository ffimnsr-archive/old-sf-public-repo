FROM node:latest
WORKDIR /app
COPY . /app

RUN npm install --no-optional
RUN npm run build:ts

EXPOSE 3000
CMD ["npm", "run", "start"]

