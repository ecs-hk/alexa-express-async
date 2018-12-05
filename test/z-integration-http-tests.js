'use strict';

/* eslint-env mocha */

// --------------------------------------------------------------------------
//                      GLOBAL VAR DEFINITIONS
// --------------------------------------------------------------------------

const f = require('../functions');

// In order to test Alexa promises, simply create an object with
// a say() property that will print out the HTTP response data.
const fakeRes = {};
fakeRes['say'] = function(s) { return '[Alexa says] ' + s; };

// --------------------------------------------------------------------------
//                      MOCHA TESTS
// --------------------------------------------------------------------------

describe('HTTP promises', function() {
  describe('Chuck Norris', function() {
    it('should return a string', async function() {
      let s = await f.getNorrisWisdom(fakeRes);
      console.log(s);
    });
  });
  describe('Fortune', function() {
    it('should return a string', async function() {
      let s = await f.getFortune(fakeRes);
      console.log(s);
    });
  });
});
