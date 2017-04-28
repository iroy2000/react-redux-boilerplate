import React from 'react';
import {
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import DemoApp from './app';
import ExampleRouteHandler from './views/example';

const Home = () => (
  <div>
    <h2>This is Homepage</h2>
  </div>
)

module.exports = (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/example">Example</Link></li>
    </ul>
    <hr />
    <DemoApp>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/example" component={ExampleRouteHandler}/>
        <Route path="*" component={Home}/>
      </Switch>
    </DemoApp>
  </div>
);
