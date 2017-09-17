import React, { PureComponent } from 'react';
import './example.css';

class Example extends PureComponent {
  render() {
    const { result } = this.props;

    if (result) {
      return (
        <div className="example__output">
          <h1>Let's Get <span className="emphsize">Started</span></h1>
          <p>If you see this screen, it means you are all setup. {result}</p>
        </div>
      );
    }
    return <div />;
  }
}

export default Example;
