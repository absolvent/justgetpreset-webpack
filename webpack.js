/**
 * @license Copyright (c) 2016-present, justgetpreset.com
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const createWebpackConfigFromFileList = require('./createWebpackConfigFromFileList');
const glob = require('ultra-glob');
const webpack = require('webpack');

function runFiles(filesGlobPattern) {
  return glob(filesGlobPattern)
    .then(files => createWebpackConfigFromFileList(files))
    .then(configList => (
      new Promise((resolve, reject) => {
        webpack(configList, (err, status) => {
          if (err) {
            reject(err);
          } else {
            resolve(status);
          }
        });
      })
    ))
  ;
}

module.exports = runFiles;
