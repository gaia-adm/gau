import React from 'react'
import { Link } from 'react-router'
import Home from './Home'
import shared from '../SharedConsts'

var App = React.createClass({

  propTypes: {
    children: React.PropTypes.element
  },

  render: function () {
    return (
      <div>
        <ul role="nav">
          <li><Link to={ '/'+shared.uiPath+'/'} onlyActiveOnIndex activeStyle={{ color: 'purple' }}>Home</Link></li>
          <li><Link to={ '/'+shared.uiPath+'/webhooks' } activeStyle={{ color: 'purple' }}>Webhooks</Link></li>
          <li><Link to={ '/'+shared.uiPath+'/tokens' } activeStyle={{ color: 'purple' }}>Access Tokens</Link></li>
        </ul>
        {this.props.children || <Home/>}
      </div>
    );
  }
});

module.exports = App;
