/**
 * Copyright (c) 2016-present, goreutils
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const eslint = require('gore-eslint');
const mocha = require('gore-mocha');

gulp.task('lint', function gulpLintTask() {
  return eslint('{./__tests__/,./}*.js');
});

gulp.task('test', ['lint'], function gulpTestTask() {
  return mocha('__tests__/**/*.test.js');
});
