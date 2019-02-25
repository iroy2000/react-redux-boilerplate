import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
// You could use BrowserRoute or HashRoute
// But passing in history directly to Route will
// give your app more flexibility on deeper integration of `history`
import { Router } from 'react-router-dom'

export default class Root extends Component {
  get content() {
    const { routes, history } = this.props

    return (
      <Router history={history}>
        {routes}
      </Router>
    )
  }

  render() {
    const { store } = this.props

    return (
      <Provider store={store}>
        {this.content}
      </Provider>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.element.isRequired,
  store: PropTypes.object.isRequired,
}
