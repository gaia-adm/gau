'use strict';

import React from 'react'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import WaitingButton from './components/WaitingButton'
import HomeRC from './utils/HomeRestClient';


var Home = React.createClass({

  getInitialState() {
    HomeRC.verify(this.isLoggedIn);
    return {
      loggedIn: -1
    }
  },

  isLoggedIn(status){
    if(status){
      console.log('User is now logged in');
      this.setState({loggedIn:1});
    } else {
      console.log('User is now NOT logged in');
      this.setState({loggedIn:0});
    }
  },

  render: function () {

    var homeButton = <WaitingButton/>

    if(this.state.loggedIn == 1) {
      homeButton = <LogoutButton />
    } else if(this.state.loggedIn == 0) {
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