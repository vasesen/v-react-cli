'use strict';

const createReactApp = require('..');
const assert = require('assert').strict;

assert.strictEqual(createReactApp(), 'Hello from createReactApp');
console.info("createReactApp tests passed");
