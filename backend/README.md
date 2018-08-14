# SmartFunding Crypto Platform

### Development

What you'll need to start:

- Docker CE
- Traefik Docker Image
- NodeJS 6.10+
- Postgres 10
- Redis 4

To start off in development, clone the repository and all pre-requisites must be installed. After that configure `backend/config.json` containing AWS secret key and AWS identifier.

~~~
{
  "accessKeyId": "<IDENTIFIER>",
  "secretAccessKey": "<SECRET>",
  "region": "us-west-2"
}
~~~

On the root folder and backend folder install all dependencies using `npm install`.

Lastly, run `make` on root directory to run the frontend. To run the backend run `make` again inside `backend` folder.

### Production / Staging

The production contains same development workflow / prerequisites but instead of hosting the Postgres and Redis in docker, must use external service like AWS DynamoDB for ease and scaling and near bare metal performance.

1. Clone the this repo.
2. Configure database settings either on environment variables or in `src/config/index.ts`.
3. Run `make build` on root folder.
4. Again on backend run `make build`.

### Envrironment Variables

`NODE_ENV` must always set to `production` when deploying to live server.

`MONGODB_URI` set to mongodb instance.

`REDIS_URI` must be set to redis database uri.

`BASE_URI` always set this to relative path when not in docker image.

`WALLET_WIF` must be generated for receiving funds through stealth addresses.

