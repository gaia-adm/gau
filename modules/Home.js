'use strict';

import React from 'react'
import shared from '../SharedConsts'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'

var Home = React.createClass({

  render: function () {

    var homeButton;

    if(sessionStorage.getItem(shared.atValue)) {
      homeButton = <LogoutButton />
    } else {
      homeButton = <LoginButton />
    }

    return (
      <div>
        <div><h2>Welcome to Gaia Administration!</h2></div>
        <div>
          {homeButton}
        </div>
      </div>
    )}
});

module.exports = Home;