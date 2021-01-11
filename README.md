# alexa-express-async

Set up an Express.js-based endpoint for Alexa. Pleasant alternative to AWS Lambda.

This example application supports a couple intents:
* Fortunes (thanks to https://github.com/ef-gy/fortuned)
* Chuck Norris "facts" (thanks to https://api.chucknorris.io/)

Tested with [Node.js v14 LTS](https://nodejs.org/en/).

## Configure HTTP server and application path

```bash
cd alexa-express-async/site-config
cp http-server.json.EXAMPLE http-server.json
```

Finish configuration in `http-server.json`. Treat the "path" as a secret. (Generate using `pwgen -s 30 -N 1` or similar.) It will be provided in the Alexa endpoint setup.

## Install and unit test

```bash
cd alexa-express-async
npm install
npm test
```

## Configure and build Alexa app

Set up intents and utterances. No slots are used by this example application.

![Screenshot](/README.md-img/utterances.png?raw=true)

Set up the endpoint using the path from your `alexa-express-async/site-config` file.

![Screenshot](/README.md-img/endpoint.png?raw=true)

## Launch it

```bash
node app.js
```
