/**
 * Copyright (c) 2016-present, lookly
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

export default class Calculator {
  constructor(a, b) {
    this.lhs = a;
    this.rhs = b;
  }

  add() {
    return this.a + this.b;
  }
}
