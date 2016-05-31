'use strict';

var React = require('react');
var App = require('./App');
var Home = require('./Home');
var Webhooks = require('./Webhooks');
var Tokens = require('./Tokens');
import { render } from 'react-dom'
var RouterLib = require('react-router');
var Router = RouterLib.Router;
var Route = RouterLib.Route;
import { hashHistory } from 'react-router';

render((
  <Router history={hashHistory} >
    <Route path="/" component={App} />
    <Route path="/home" component={Home} />
    <Route path="/webhooks" component={Webhooks} />
    <Route path="/tokens" component={Tokens} />
  </Router>
), document.getElementById('content'));

