/**
 * @license Copyright (c) 2016-present, spacekick
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/* eslint no-param-reassign: 0 */

const basename = require('./basename');
const fromPairs = require('lodash/fromPairs');
const glob = require('ultra-glob');
const NodeOutputFileSystem = require('webpack/lib/node/NodeOutputFileSystem');
const path = require('path');
const Promise = require('bluebird');
const RxNode = require('rx-node');
const webpack = require('webpack');

function createFileStream(options) {
  return glob.readableStream(options.filesGlobPattern, {
    cwd: options.context,
  });
}

function runFiles(options) {
  return RxNode.fromReadableStream(createFileStream(options))
    .reduce(function (fileList, file) {
      return fileList.concat([
        [
          basename(file.path),
          file.path,
        ],
      ]);
    }, [])
    .map(function (files) {
      return {
        context: options.context,
        entry: fromPairs(files),
        output: {
          filename: 'hello.js',
          path: path.resolve('./'),
        },
      };
    })
    .toPromise(Promise)
    .then(config => webpack(config))
    .then(function (compiler) {
      compiler.outputFileSystem = options.outputFileSystem || new NodeOutputFileSystem();

      return Promise.fromCallback(cb => compiler.run(cb)).then(stats => ({
        compiler,
        stats,
      }));
    });
}

module.exports = runFiles;
