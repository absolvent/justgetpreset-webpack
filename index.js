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
const gutil = require('gulp-util');
const merge = require('lodash/merge');
const NodeOutputFileSystem = require('webpack/lib/node/NodeOutputFileSystem');
const path = require('path');
const Promise = require('bluebird');
const RxNode = require('rx-node');
const webpack = require('webpack');

const defaultOptions = {
  context: process.cwd(), // where to look for packages
  filesGlobPattern: '*.entry.js', // glob pattern for entry points
  isSilent: false, // disable console output
  noThrow: false, // do not throw exceptions
};

function createFileStream(options) {
  return glob.readableStream(options.filesGlobPattern, {
    cwd: options.context,
  });
}

function normalizeOptions(options) {
  return merge({}, defaultOptions, options);
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
    })
    .then(function (results) {
      if (!options.isSilent) {
        const stats = results.stats.toJson();

        stats.warnings.forEach(gutil.log);
        stats.errors.forEach(gutil.log);
      }

      if (!options.noThrow && results.stats.hasErrors()) {
        throw new gutil.PluginError({
          message: new Error('webpack detected errors'),
          plugin: 'space-preconfigured-webpack',
        });
      }

      return results;
    });
}

function runWebpack(options) {
  return runFiles(normalizeOptions(options));
}

module.exports = runWebpack;
