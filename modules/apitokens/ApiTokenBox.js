import React from 'react'
import {Button} from 'react-bootstrap'
import shared from '../../SharedConsts'

var ApiTokenBox = React.createClass({

  getInitialState(){
    console.log('Initialize token box');
    var myTokenValue = sessionStorage.getItem('gaia.at.value');
    var myTokenBirthday = sessionStorage.getItem('gaia.at.birthday');
    if (!myTokenValue || !myTokenBirthday) {
      return {
        token: null,
        createdAt: null
      }
    } else {
      return {
        token: myTokenValue,
        createdAt: myTokenBirthday,
        errorMessage: null
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
        sessionStorage.setItem('gaia.at.value', data.access_token);
        sessionStorage.setItem('gaia.at.birthday', new Date(Number(data.createdAt)));
        this.setState({
          token: sessionStorage.getItem('gaia.at.value'),
          createdAt: sessionStorage.getItem('gaia.at.birthday'),
          errorMessage: ''
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(xhr.url, status, err.toString());
        sessionStorage.removeItem('gaia.at.value');
        sessionStorage.removeItem('gaia.at.birthday');
        this.setState({
          token: sessionStorage.getItem('gaia.at.value'),
          createdAt: sessionStorage.getItem('gaia.at.birthday'),
          errorMessage: err.toString() + ' (Reason: ' + (xhr.responseJSON ? xhr.responseJSON.message : 'unkonwn') + ')'
        });
      }.bind(this)
    });
  },

  revokeMyToken() {
    alert('Not implemented yet');
  },

  createMarkup() {
    var infoString;
    if (this.state.token && this.state.createdAt) {
      infoString = "<p><b>API token: </b>" + this.state.token + "</p><p><b>Created at: </b>" + this.state.createdAt + "</p>"
    } else if (this.state.errorMessage) {
      infoString = "<p>API token is not available, the last error happened: "+this.state.errorMessage+"</p><p>Please press <b>'Get My API Token'</b> button below in order to obtain the token</p>";
    } else {
      infoString = "<p>API token is not available, please press <b>'Get My Token'</b> button below in order to obtain the token</p>";
    }
    return {__html: infoString};
  },

  render: function () {
    return (
      <div>
        <h2 style={{'textAlign': 'center', 'backgroundColor': '#e7e7e7', 'color': '#003366'}}>API Token</h2>
        <div className='tokenBox'>
          <div dangerouslySetInnerHTML={this.createMarkup()}/>
          <Button bsStyle='info' bsSize='large' onClick={this.getMyToken}>Get My API Token</Button>&nbsp;
          <Button bsStyle='danger' bsSize='large' onClick={this.revokeMyToken}>Revoke API Token</Button>&nbsp;
          <p/>
        </div>
      </div>
    )
  }


});

module.exports = ApiTokenBox;