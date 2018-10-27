import React from 'react'
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'

import LazyLoading from './common/components/LazyLoading'

const ExampleRouteHandler = LazyLoading(() => import('./views/example'))
const Header = LazyLoading(() => import('./common/components/Header/Header'))

const JustAnotherPage = () => (
  <div>
    <h2>This is Just Another Page</h2>
    <p>Please remove this from your route, it is just to show case basic setup for router.</p>
  </div>
)

const HeaderWithRouter = withRouter((props) => <Header {...props} />)

module.exports = (
  <div className="container">
    <HeaderWithRouter />
    <hr />
    <div className="container__content">
      <Switch>
        <Route exact path="/" component={ExampleRouteHandler} />
        <Route path="/page" component={JustAnotherPage} />
        <Route path="*" component={ExampleRouteHandler} />
      </Switch>
    </div>
  </div>
)
