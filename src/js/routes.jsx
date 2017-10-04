import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import ExampleRouteHandler from './views/example';
import Workshop1Page from './views/workshop1/index'

require('../style/index.css');

const Cool = () => <div>Cool Man</div>;

module.exports = (
  <div className="container">
    <div className="container__content">
      <Switch>
        <Route exact path="/" component={ExampleRouteHandler} />
        <Route exact path="/cool" component={Cool} />
        <Route path="/workshop1" component={ Workshop1Page } />
        <Route path="*" component={ExampleRouteHandler} />
      </Switch>
    </div>
  </div>
);
