'use strict';

import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from './modules/App';
import Home from './modules/Home';
import Webhooks from './modules/Webhooks';
import Tokens from './modules/Tokens';


render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
      <Route path="/" component={Home}/>
      <Route path="/webhooks" component={Webhooks}/>
      <Route path="/tokens" component={Tokens}/>
  </Router>
), document.getElementById('content'));

