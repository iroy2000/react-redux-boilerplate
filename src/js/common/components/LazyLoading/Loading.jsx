import React, { PureComponent } from 'react';

import './Loading.css'

class Loading extends PureComponent {
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
      } if (pastDelay) {
        return <div className="loader">Loading...</div>;
      }
      return null;
    } if (error) {
      return <div>{errorMessage}</div>;
    }

    return null;
  }

  render() {
    return this.getMessage()
  }
}

export default Loading;
