'use strict';

const craTemplate = require('..');
const assert = require('assert').strict;

assert.strictEqual(craTemplate(), 'Hello from craTemplate');
console.info("craTemplate tests passed");
