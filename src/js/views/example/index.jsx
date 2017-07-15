import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { actions as exampleActions } from '../../redux/modules/example';
import { exampleSelector } from '../../redux/selectors/exampleSelector';
import { Example } from '../../common/components/Example'

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
    return <Example {...this.props } />
  }
}

export default ExampleView;
