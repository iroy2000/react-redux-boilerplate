import React, { PureComponent } from 'react';

import './LazyLoading.css'

class LazyLoading extends PureComponent {
  getMessage() {
    const {
      isLoading,
      timedOut,
      pastDelay,
      error,
    } = this.props;

    const errorMessage = 'We can&apos;t pull up information at this point, please try again.'

    if (isLoading) {
      if (timedOut) {
        return <div>{errorMessage}</div>;
      } else if (pastDelay) {
        return <div className="loader">Loading...</div>;
      }
      return null;
    } else if (error) {
      return <div>{errorMessage}</div>;
    }

    return null;
  }

  render() {
    return this.getMessage()
  }
}

export default LazyLoading;
