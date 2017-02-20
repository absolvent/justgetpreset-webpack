/**
 * @license Copyright (c) 2016-present, justgetpreset.com
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const createWebpackConfigFromFileName = require('./createWebpackConfigFromFileName');
const presetBabel = require('lookly-preset-babel');

function createWebpackConfigFromFileList(fileList) {
  const babelOptions = presetBabel();

  return fileList.map(fileName => createWebpackConfigFromFileName(fileName, babelOptions));
}

module.exports = createWebpackConfigFromFileList;
