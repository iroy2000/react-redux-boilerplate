import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { actions as exampleActions } from '../../redux/modules/example';
import { exampleSelector } from '../../redux/selectors/exampleSelector';

require('../../../style/index.css');

const mapStateToProps = state => ({
  example: exampleSelector(state),
});

const mapDispatchToProps = {
  ...exampleActions,
};

@connect(mapStateToProps, mapDispatchToProps)
class ExampleView extends Component {
  static PropTypes = {
    example: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.getAwesomeCode();
  }

  render() {
    const result = this.props.example.result ? this.props.example.result : null;

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

export default ExampleView;
