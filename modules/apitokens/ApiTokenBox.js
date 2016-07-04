import React from 'react'
import {Alert, Button} from 'react-bootstrap'
import ApiTokenFetcher from '../utils/ApiTokenFetcher'

var ApiTokenBox = React.createClass({

  getInitialState(){
    console.log('Initialize token box');
    var myTokenValue = sessionStorage.getItem('gaia.at.value');
    var myTokenBirthday = sessionStorage.getItem('gaia.at.birthday');
    if (!myTokenValue || !myTokenBirthday) {
      return {
        token: null,
        createdAt: null,
        confirmDelete: false
      }
    } else {
      return {
        token: myTokenValue,
        createdAt: myTokenBirthday,
        errorMessage: null,
        confirmDelete: false
      }
    }
  },

  getMyTokenAjax() {
    ApiTokenFetcher(this.handleGetMyTokenAjaxResult);
  },
  
  handleGetMyTokenAjaxResult(err){
    if (!err) {
      this.setState({
        token: sessionStorage.getItem('gaia.at.value'),
        createdAt: sessionStorage.getItem('gaia.at.birthday'),
        errorMessage: ''
      });
    } else {
      this.setState({
        token: sessionStorage.getItem('gaia.at.value'),
        createdAt: sessionStorage.getItem('gaia.at.birthday'),
        errorMessage: err
      });
    }
  },

  createMarkup() {
    var infoString;
    if (this.state.token && this.state.createdAt) {
      infoString = '<p><b>API token: </b>' + this.state.token + '</p><p><b>Created at: </b>' + this.state.createdAt + '</p>'
    } else if (this.state.errorMessage) {
      infoString = '<p>API token is not available, the last error happened: ' + this.state.errorMessage + '</p><p>Please press <b>Get My API Token</b> button below in order to obtain the token</p>';
    } else {
      infoString = '<p>API token is not available, please press <b>Get My Token</b> button below in order to obtain the token</p>';
    }
    return {__html: infoString};
  },
  //start handling webhook deletion - when Delete button pressed in Webhook object
  revokeMyToken(){
    console.log('API token deletion request for ' + this.state.token);
    this.setState({confirmDelete: true});
  },
  //handle final decision - should the webhook be deleted or not
  handleDeleteConfirmationDismiss(shouldDelete) {
    if (shouldDelete) {
      console.log('API token deletion confirmed for ' + this.state.token);
      this.setState({confirmDelete: false});
//      this.deleteToken();
    } else {
      console.log('API token deletion cancelled for ' + this.state.token);
      this.setState({confirmDelete: false});
    }
  },
  render: function () {
    //Delete confirmation dialog
    if (this.state.confirmDelete) {
      return (
        <div>
          <h2 style={{'textAlign': 'center', 'backgroundColor': '#D96363', 'color': '#FFFFFF'}}>API Token</h2>
          <div className='tokenBox'>
            <Alert bsStyle='danger'>
              <div style={{'textAlign': 'center'}}>
                <h4>Your are going to delete API token {this.state.token}.<br/>
                  This action is not recoverable in terms of restoring exactly the same token, although you can generate another one instead.<br/>
                  <b>NOTE:</b> all current webhook configurations will become invalid, if you remove current API token; you'll need to recreate
                  webhook configurations after the new API token generation.</h4>
                <h4>Are you sure?</h4>
                <Button onClick={this.handleDeleteConfirmationDismiss.bind(null, true)}>Yes, delete it!</Button>
                <Button onClick={this.handleDeleteConfirmationDismiss.bind(null, false)}>No, keep this one!</Button>
              </div>
            </Alert>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h2 style={{'textAlign': 'center', 'backgroundColor': '#e7e7e7', 'color': '#003366'}}>API Token</h2>
        <div className='tokenBox'>
          <div dangerouslySetInnerHTML={this.createMarkup()}/>
          <Button bsStyle='info' bsSize='large' onClick={this.getMyTokenAjax}>Get My API Token</Button>&nbsp;
          <Button bsStyle='danger' bsSize='large' onClick={this.revokeMyToken}>Revoke API Token</Button>&nbsp;
          <p/>
        </div>
      </div>
    )
  }


});

module.exports = ApiTokenBox;