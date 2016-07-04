import React from 'react'
import {Button} from 'react-bootstrap'
import shared from '../../SharedConsts'
import HomeRC from '../utils/HomeRestClient'

var logoutTextStyle = {
  marginLeft: '10px',
  marginRight: '10px',
  marginTop: '10px',
  marginDown: '20px',
  fontFamily: 'Times New Roman, Times, serif',
  fontStyle: 'italic',
  fontSize: '3.6em',
  fontWeight: 'bold'
};

var LogoutButton = React.createClass({

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
  Logout(){
    this.setState({
      loggedIn: false
    });
    HomeRC.logout();
  },

  render: function () {

    return (
      <div>
        <Button bsStyle="warning" bsSize="large" onClick={this.Logout}><div style={logoutTextStyle}>Logout</div></Button>
      </div>
    )
  }

});

module.exports = LogoutButton;