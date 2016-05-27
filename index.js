/**
 * @license Copyright (c) 2016-present, lookly
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/* eslint no-param-reassign: 0 */

const assign = require('lodash/assign');
const basename = require('./basename');
const fromPairs = require('lodash/fromPairs');
const glob = require('ultra-glob');
const gutil = require('gulp-util');
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

function interpretResults(options, results) {
  if (!options.isSilent) {
    const stats = results.stats.toJson();

    stats.warnings.forEach(gutil.log);
    stats.errors.forEach(gutil.log);
  }

  if (!options.noThrow && results.stats.hasErrors()) {
    throw new gutil.PluginError({
      message: new Error('webpack detected errors'),
      plugin: 'lookly-preset-webpack',
    });
  }

  return results;
}

function normalizeOptions(options) {
  const defaultOptions = {
    context: process.cwd(), // where to look for packages
    filesGlobPattern: '*.entry.js', // glob pattern for entry points
    isSilent: false, // disable console output
    outputFileSystem: new NodeOutputFileSystem(),
    noThrow: false, // do not throw exceptions
  };

  return assign({}, defaultOptions, options);
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
    .map(files => ({
      context: options.context,
      entry: fromPairs(files),
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: require.resolve('babel-loader'),
            query: {
              presets: [
                require.resolve('babel-preset-es2015'),
                require.resolve('babel-preset-react'),
                require.resolve('babel-preset-stage-0'),
              ],
            },
          },
        ],
      },
      output: {
        filename: 'hello.js',
        path: path.resolve('./'),
      },
    }))
    .toPromise(Promise)
    .then(config => webpack(config))
    .then(compiler => {
      compiler.outputFileSystem = options.outputFileSystem;

      return Promise.fromCallback(cb => compiler.run(cb))
        .then(stats => ({ compiler, stats }));
    })
    .then(results => interpretResults(options, results));
}

function runWebpack(options) {
  return runFiles(normalizeOptions(options));
}

module.exports = runWebpack;
