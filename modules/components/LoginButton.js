import React from 'react'
import {Button} from 'react-bootstrap'
import shared from '../../SharedConsts'
import HomeRC from '../utils/HomeRestClient'

var loginTextStyle = {
  marginLeft: '10px',
  marginRight: '10px',
  marginTop: '10px',
  marginDown: '20px',
  fontFamily: 'Times New Roman, Times, serif',
  fontStyle: 'italic',
  fontSize: '3.6em',
  fontWeight: 'bold'
};

var LoginButton = React.createClass({

  propTypes: {
    val: React.PropTypes.string,
    onClick: React.PropTypes.func,
    id: React.PropTypes.string
  },

  getInitialState(){
    if (sessionStorage.getItem(shared.atValue)) {
      return {
        loggedIn: true
      }
    } else {
      return {
        loggedIn: false
      }
    }
  },
  LogoutStart(){
    HomeRC.logout(this.LogoutEnd);
  },
  LogoutEnd(err){
    if(err){
      console.log('Logout failed somehow');
    } else {
      console.log('Completely logged out!')
      this.setState({
        loggedIn: false
      });
    }

  },

  render: function () {

    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.LogoutStart}>
          <div style={loginTextStyle}>Login</div>
        </Button>
      </div>
    )
  }

});

module.exports = LoginButton;