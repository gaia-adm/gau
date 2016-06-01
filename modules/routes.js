import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './App';
import Home from './Home';
import Webhooks from './Webhooks';
import Tokens from './Tokens';

module.exports = (
  <Route path="/gau/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/gau/webhooks" component={Webhooks}/>
    <Route path="/gau/tokens" component={Tokens}/>
  </Route>
);
