# Node Post

## What is it?
`node-post` is created to receive webhooks. Whenever it receives webhook, it simiply emails to the given email ID.

Currently, it is created specifically for Docker Hub.

You can configure webhooks in Docker Hub. Which gets fired on successful build.

## How to use it?
Two files has to be created `.env.development` and `.env.production` from the example `.env.example` file.

`heroku_env_set.sh` will set all the variables from `.env.production` to Heroku.

## How to deploy?

It is 'Heroku Ready'. Just create one Heroku app and push this.
