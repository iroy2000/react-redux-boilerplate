import React from 'react';
import { Route, IndexRoute } from 'react-router';
import DemoApp from './app';
import ExampleRouteHandler from './views/example';


module.exports = (
  <Route path="/" component={DemoApp}>
    <IndexRoute component={ExampleRouteHandler} />
    <Route path="*" component={ExampleRouteHandler} />
  </Route>
);
