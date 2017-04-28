import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { actions as exampleActions } from '../../redux/modules/example';
import { exampleSelector } from '../../redux/selectors/exampleSelector';
import MediaQuery from 'react-responsive'

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

            <MediaQuery query='(min-device-width: 1224px)'>
              <MediaQuery query='(orientation: portrait)'>
                <p>You are in portrait mode</p>
              </MediaQuery>
              <MediaQuery query='(orientation: landscape)'>
                <p>You are in landscape mode</p>
              </MediaQuery>
            </MediaQuery>

            <MediaQuery query='(max-device-width: 1224px)'>
              <MediaQuery query='(orientation: portrait)'>
                <p>Isn't it that fun ?</p>
              </MediaQuery>
              <MediaQuery query='(orientation: landscape)'>
                <p>Now your jsx understand media query</p>
              </MediaQuery>
            </MediaQuery>
          </div>


      );
    }
    return <div />;
  }
}

export default ExampleView;
