/**
 * Copyright (c) 2016-present, spacekick
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/* eslint func-names: 0 */
/* global describe: false, it: false */

const assert = require('chai').assert;
const basename = require('../basename');

describe('basename', function () {
  it('should strip file extension', function () {
    assert.strictEqual(basename('index.entry.jsx'), 'index');
  });

  it('should strip file extension from js files', function () {
    assert.strictEqual(basename('foo.entry.js'), 'foo');
  });
});
