'use strict';

/* eslint-env mocha */

// --------------------------------------------------------------------------
//                      GLOBAL VAR DEFINITIONS
// --------------------------------------------------------------------------

const assert = require('assert');
const rewire = require('rewire');
const pf = rewire('../functions');

// Map rewired, private functions to friendlier names
const getRandomNum = pf.__get__('getRandomNum');
const getGeneralErrorDialog = pf.__get__('getGeneralErrorDialog');

const ITERATIONS = 100;

// --------------------------------------------------------------------------
//                      MOCHA TESTS
// --------------------------------------------------------------------------

describe('Random value generator', function() {
  describe('Known numeric range', function() {
    it('should return numbers within the supplied range', function() {
      let min = 1;
      let max = 5;
      for (let i = 0; i < ITERATIONS; i++) {
        let n = getRandomNum(min, max);
        assert.equal(n >= min && n <= max, true);
      }
    });
  });
  describe('Bogus range values', function() {
    it('should return numbers from 0 to 99', function() {
      let min = null;
      let max = 'cow';
      for (let i = 0; i < ITERATIONS; i++) {
        let n = getRandomNum(min, max);
        assert.equal(n >= 0 && n <= 99, true);
      }
    });
  });
  describe('Response dialogs', function() {
    it('should return a string', function() {
      for (let i = 0; i < ITERATIONS; i++) {
        let s = getGeneralErrorDialog();
        assert.equal(typeof s, 'string');
        assert.equal(s.length > 0, true);
      }
    });
  });
});
