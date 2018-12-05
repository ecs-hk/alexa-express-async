'use strict';

// -------------------------------------------------------------------------
// Variable definitions
// -------------------------------------------------------------------------

const axios = require('axios');

// -------------------------------------------------------------------------
// Helper functions
// -------------------------------------------------------------------------

function getRandomNum(min, max) {
  if (isNaN(min) || isNaN(max) || min < 0 || min >= max) {
    min = 0;
  }
  if (isNaN(max)) {
    max = 99;
  }
  return Math.floor((Math.random() * max) + min);
}

function getGeneralErrorDialog() {
  let phrases = [
    'Oh dear, I lost my train of thought',
    'I wanted to say something, but I forgot it',
    'I am totally not sure what to do right now',
    'Sometimes it is really tough being an Alexa app',
    'I am clueless about how to respond',
    'Loo loo loo, I have got some apples, loo loo loo',
    'I have no words',
    'I am having a moment; try back later',
    'I was zoning out just now',
    'Boy oh boy, this weather is unbelievable',
    'Sometimes silence is best',
  ];
  let n = getRandomNum(0, phrases.length);
  return phrases[n];
}

// -------------------------------------------------------------------------
// Exported functions
// -------------------------------------------------------------------------

exports.getNorrisWisdom = async function(alexaRes) {
  let opt = {
    url: 'https://api.chucknorris.io/jokes/random',
    responseType: 'json',
  };
  try {
    let res = await axios(opt);
    return alexaRes.say(res.data.value);
  } catch (err) {
    console.log('Caught: ' + err);
    return alexaRes.say(getGeneralErrorDialog());
  }
};

exports.getFortune = async function(alexaRes) {
  // The high end of the range (543) appears to be the end of
  // the sequence of fortunes.
  let num = getRandomNum(0, 543);
  let opt = {
    url: 'http://fortunecookieapi.herokuapp.com/v1/fortunes' +
      '?limit=1&skip=' + num,
    responseType: 'json',
  };
  try {
    let res = await axios(opt);
    return alexaRes.say(res.data[0].message);
  } catch (err) {
    console.log('Caught: ' + err);
    return alexaRes.say(getGeneralErrorDialog());
  }
};
