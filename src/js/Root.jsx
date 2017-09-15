import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

export default class Root extends Component {
  get content() {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    );
  }

  render() {
    return (
      <Provider store={this.props.store}>
        {this.content}
      </Provider>
    );
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.element.isRequired,
  store: PropTypes.object.isRequired,
};
