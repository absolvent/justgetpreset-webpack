/**
 * @license Copyright (c) 2016-present, justgetpreset.com
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');

function createWebpackConfigFromFileName(fileName, babelOptions) {
  return {
    // context: 
    entry: fileName,
    module: {
      rules: [
        {
          loader: 'babel-loader',
          options: babelOptions,
          test: /\.jsx?$/,
        },
      ],
    },
    output: {
      filename: path.basename(fileName),
      path: path.resolve(__dirname, 'dist'),
    },
  };
}

module.exports = createWebpackConfigFromFileName;
