import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './App';
import Home from './Home';
import WebhookBox from './webhooks/WebhookBox';
import ApiTokenBox from './apitokens/ApiTokenBox';
import shared from '../SharedConsts'

module.exports = (
  <Route path={'/'+shared.uiPath+'/'} component={App}>
    <IndexRoute component={Home}/>
    <Route path={'/'+shared.uiPath+'/webhooks'} component={WebhookBox}/>
    <Route path={'/'+shared.uiPath+'/tokens'} component={ApiTokenBox}/>
  </Route>
);
