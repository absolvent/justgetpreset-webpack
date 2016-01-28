/**
 * @license Copyright (c) 2016-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/* eslint no-param-reassign: 0 */

const basename = require('basename');
const fs = require('fs');
const glob = require('ultra-glob');
const path = require('path');
const Promise = require('bluebird');
const RxNode = require('rx-node');
const webpack = require('webpack');

function createFileStream(context, filesGlobPattern) {
  return glob.readableStream(filesGlobPattern, {
    cwd: context,
  });
}

function runFiles(context, filesGlobPattern, options) {
  return RxNode.fromReadableStream(createFileStream(context, filesGlobPattern))
    .map(function (file) {
      return {
        basename: basename(file.path),
        path: file.path,
      };
    })
    .reduce(function (config, file) {
      config.entry[file.basename] = file.path;

      return config;
    }, {
      context,
      entry: {},
      output: {
        filename: 'hello.js',
        path: path.resolve('./'),
      },
    })
    .toPromise(Promise)
    .then(config => webpack(config))
    .then(function (compiler) {
      compiler.outputFileSystem = options.outputFileSystem || fs;

      return Promise.fromCallback(cb => compiler.run(cb));
    })
    .then(function (stats) {
      console.log(stats.hasErrors());
    });
}

module.exports = runFiles;
