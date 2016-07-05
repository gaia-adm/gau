'use strict';

import React from 'react'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import HomeRC from './utils/HomeRestClient';


var Home = React.createClass({

  getInitialState() {
    HomeRC.verify(this.isLoggedIn);
    return {
      loggedIn: false
    }
  },

  isLoggedIn(status){
    if(status){
      console.log('User is now logged in');
      this.setState({loggedIn:true});
    } else {
      console.log('User is now NOT logged in');
      this.setState({loggedIn:false});
    }
  },
  
  render: function () {

    var homeButton;

    if(this.state.loggedIn) {
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