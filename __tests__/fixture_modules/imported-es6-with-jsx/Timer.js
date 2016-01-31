/**
 * @license Copyright (c) 2016-present, spacekick
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import React from 'react';

function padNumbers(number) {
  return String(100 + number).substr(1, 2);
}

export default class Timer extends React.Component {
  static propTypes = {
    countdown: React.PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      timeLeft: props.countdown,
    };
  }

  componentDidMount() {
    this.decrementCountdownInterval = setInterval(() => {
      return this.decrementCountdown();
    }, 1000);
  }

  componentWillUnmount() {
    this.clearCountdownInterval();
  }

  clearCountdownInterval() {
    clearInterval(this.decrementCountdownInterval);
  }

  decrementCountdown() {
    if (this.state.timeLeft < 1) {
      this.clearCountdownInterval();
    } else {
      this.setState({
        timeLeft: this.state.timeLeft - 1,
      });
    }
  }

  render() {
    if (this.state.timeLeft < 1) {
      return (
        <div style={{
          backgroundColor: '#f55',
          color: '#fff',
        }}>
          time is up
        </div>
      );
    }

    return (
      <div>
        {padNumbers(this.state.timeLeft / 3600)}:
        {padNumbers(this.state.timeLeft / 60)}:
        {padNumbers(this.state.timeLeft % 60)}
      </div>
    );
  }
}
