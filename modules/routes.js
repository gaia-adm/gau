import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './App';
import Home from './Home';
import Webhooks from './Webhooks';
import Tokens from './Tokens';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/webhooks" component={Webhooks}/>
    <Route path="/tokens" component={Tokens}/>
  </Route>
)
