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

const fs = require('fs');
const MemoryFileSystem = require('memory-fs');
const path = require('path');
// const parallel = require('mocha.parallel');
const webpack = require('../index');

describe('webpack', function () {
  const modulesDir = path.resolve(__dirname, 'fixture_modules');
  const fixtureModuleList = fs.readdirSync(modulesDir).sort();

  fixtureModuleList.forEach(function (fixtureModuleName) {
    const moduleContext = path.resolve(modulesDir, fixtureModuleName);

    it(fixtureModuleName, function () {
      this.timeout(10000);

      return webpack({
        context: moduleContext,
        outputFileSystem: new MemoryFileSystem(),
      });
    });
  });
});
