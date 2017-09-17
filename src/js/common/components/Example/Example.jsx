import React, { PureComponent } from 'react';

class Example extends PureComponent {
  render() {
    const { result } = this.props;

    if (result) {
      return (
        <div className="jumbotron">
          <h1>Let's Get Started</h1>
          <p>If you see this screen, it means you are all setup</p>
          <p>{result}</p>
        </div>
      );
    }
    return <div />;
  }
}

export default Example;
