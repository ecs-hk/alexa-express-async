'use strict';

/* eslint new-cap: ["error", { "newIsCapExceptions": ["app"] }] */

// -------------------------------------------------------------------------
// Variable definitions
// -------------------------------------------------------------------------

const express = require('express');
const Alexa = require('alexa-app');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const f = require('./functions');

const HTTPCONF = 'http-server.json';

var app = express();

// -------------------------------------------------------------------------
// Listen IP address, port, and Alexa path get sucked in from config file
// -------------------------------------------------------------------------

var httpListener = fs.readFileSync(path.join(__dirname, 'site-config',
  HTTPCONF));
httpListener = JSON.parse(httpListener);

// -------------------------------------------------------------------------
// Alexa configuration
// -------------------------------------------------------------------------

// NB: the configured path must match the Alexa app service endpoint
// path (e.g. https://web.srv/xxyyrandpath)
var AlexaApp = new Alexa.app(httpListener.path);

AlexaApp.express({
  expressApp: app,
  checkCert: false,
  debug: false,
});

// -------------------------------------------------------------------------
// Express configuration
// -------------------------------------------------------------------------

app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// -------------------------------------------------------------------------
// Express routes
// -------------------------------------------------------------------------

app.get('/', (req, res) => {
  res.status(200).json({msg: '/'});
});
app.get('/health-check', (req, res) => {
  res.status(200).json({msg: 'OK'});
});

// Handle HTTP 404 if we didn't match any defined routes (above)
// or the Alexa path
app.use((req, res) => {
  res.status(404).json({error: 'Not found'});
});

// Handle HTTP 500 if we hit an application error
app.use((err, req, res, next) => {
  console.log('ERROR: ' + err);
  res.status(500).json({error: 'Internal error'});
});

// -------------------------------------------------------------------------
// Start Alexa
// -------------------------------------------------------------------------

AlexaApp.launch(function(req, res) {
  res.say('Welcome. I can give you wisdom or your fortune.');
});

AlexaApp.intent('GetWisdom', {
  slots: {},
  utterances: [ 'chuck norris', 'chuck', 'norris', 'wisdom',
    'give me wisdom', 'tell me wisdom', 'share wisdom' ],
},
function(req, res) {
  let promise = f.getNorrisWisdom(res);
  return promise;
}
);

AlexaApp.intent('GetFortune', {
  slots: {},
  utterances: [ 'fortune', 'tell me my fortune', 'give me my fortune',
    'tell me a fortune', 'give me a fortume' ],
},
function(req, res) {
  let promise = f.getFortune(res);
  return promise;
}
);

// Print intents and utterances so that they can be plugged into
// the Alexa Developer Console app.
console.log(AlexaApp.schemas.intent());
console.log(AlexaApp.utterances());

// -------------------------------------------------------------------------
// Start the Express HTTP server
// -------------------------------------------------------------------------

app.listen(httpListener.port, httpListener.ip, function(){
  console.log('Alexa service endpoint: ' + JSON.stringify(httpListener));
});
