import React from 'react'
import {Button} from 'react-bootstrap'
import shared from '../../SharedConsts'

var ApiTokenBox = React.createClass({

  getInitialState(){
    console.log('Initialize token box');
    var myToken = sessionStorage.getItem('gaia.at');
    if (!myToken){
      return {
        token: 'none'
      }
    } else {
      return {
        token: myToken
      }
    }
  },

  getMyToken() {
    $.ajax({
      type: 'GET',
      url: '/' + shared.bePath + '/apitoken',
      datatype: 'json',
      cache: false,
      success: function (data) {
        console.log('Body: ' + JSON.stringify(data));
        sessionStorage.setItem('gaia.at', data);
        this.setState({token: data, errorMessage: ''});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(xhr.url, status, err.toString());
        this.setState({
          token: 'error',
          errorMessage: err.toString() + ' (Reason: ' + (xhr.responseJSON ? xhr.responseJSON.message : 'unkonwn') + ')'
        });
      }.bind(this)
    });
  },

  render: function () {
    return (
      <div>
        <h2 style={{'textAlign': 'center', 'backgroundColor': '#e7e7e7', 'color': '#003366'}}>API Token</h2>
        <div className='tokenBox'>
          <p>TOKEN: {this.state.token}</p>
          <Button bsStyle='info' bsSize='large' onClick={this.getMyToken()}>GetMyToken</Button>
          <p/>
        </div>
      </div>
    )
  }
  
});

module.exports = ApiTokenBox;