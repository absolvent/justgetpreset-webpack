/**
 * Copyright (c) 2016-present, lookly
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const eslint = require('lookly-preset-eslint');
const mocha = require('lookly-preset-mocha');

gulp.task('lint', function gulpLintTask() {
  return eslint([
    '__tests__/**/*.test.js',
    '*.js',
  ]);
});

gulp.task('test', ['lint'], function gulpTestTask() {
  return mocha('__tests__/**/*.test.js');
});
