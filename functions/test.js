'use strict';

const f = require('.');

// In order to unit test functions, simply create an object with
// a say() property that will print out the HTTP response data.
const fakeRes = {};
fakeRes['say'] = function(s) { console.log('[Alexa says] ' + s); };

Promise.resolve(f.getNorrisWisdom(fakeRes));
Promise.resolve(f.getFortune(fakeRes));
