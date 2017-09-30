import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import ExampleRouteHandler from './views/example';

require('../style/index.css');

const Cool = () => <div>Cool Man</div>;

module.exports = (
  <div className="container">
    <div className="container__content">
      <Switch>
        <Route exact path="/" component={ExampleRouteHandler} />
        <Route exact path="/cool" component={Cool} />
        <Route path="*" component={ExampleRouteHandler} />
      </Switch>
    </div>
  </div>
);
