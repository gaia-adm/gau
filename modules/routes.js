import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './App';
import Home from './Home';
import Webhooks from './Webhooks';
import Tokens from './Tokens';
import shared from '../SharedConsts'

module.exports = (
  <Route path={'/'+shared.uiPath+'/'} component={App}>
    <IndexRoute component={Home}/>
    <Route path={'/'+shared.uiPath+'/webhooks'} component={Webhooks}/>
    <Route path={'/'+shared.uiPath+'/tokens'} component={Tokens}/>
  </Route>
);
