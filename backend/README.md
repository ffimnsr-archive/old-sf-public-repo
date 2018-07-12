# SmartFunding Crypto Platform

### Development

What you'll need to start:

- Docker CE
- Traefik Docker Image
- Node Docker Image
- Postgres
- Redis

To start off in development, clone the repository and all pre-requisites must be installed. After that configure `backend/config.json` containing AWS secret key and AWS identifier.

~~~
{
"accessKeyId": "<IDENTIFIER>",
"secretAccessKey": "<SECRET>",
"region": "us-west-2"
}
~~~

Lastly, run `make` on root directory to run the frontend. To run the backend run `make` again inside `backend` folder.

### Production / Staging

The production contains same development workflow but instead of hosting the Postgres and Redis in docker, must use external service like AWS DynamoDB for ease and scaling and near bare metal performance.

1. Clone the this repo.
2. TBD
