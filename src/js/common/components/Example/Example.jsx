import React, { PureComponent } from 'react'

class Example extends PureComponent {
  render () {
    const props = this.props;
    const result = props.example && props.example.result ? props.example.result : null;

    if (result && result.size && result.size > 0) {
      return (

        <div className="row example">
            <pre className="col-md-12 example__output">
              {JSON.stringify(result.toJS(), undefined, 2)}
            </pre>
        </div>


      );
    }
    return <div />;
  }
}

export default Example
