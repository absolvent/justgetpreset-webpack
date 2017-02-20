/**
 * @license Copyright (c) 2016-present, justgetpreset.com
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import test from 'lookly-preset-ava/test';
import webpack from '../webpack';

// test('webpack creates minified collection', () => (
//   webpack('./fixtures/imported-es6-with-jsx/a.entry.js')
// ));

test('webpack packs several entry points', () => (
  webpack('./fixtures/several-entry-points/*.entry.js')
));
