import React from 'react'
import { Link } from 'react-router'
import Home from './Home'

var App = React.createClass({
  render: function () {
    return (
      <div>
        <ul role="nav">
          <li><Link to="/gau/" onlyActiveOnIndex activeStyle={{ color: 'purple' }}>Home</Link></li>
          <li><Link to="/gau/webhooks" activeStyle={{ color: 'purple' }}>Webhooks</Link></li>
          <li><Link to="/gau/tokens" activeStyle={{ color: 'purple' }}>Access Tokens</Link></li>
        </ul>
        {this.props.children || <Home/>}
      </div>
    );
  }
});

module.exports = App;
