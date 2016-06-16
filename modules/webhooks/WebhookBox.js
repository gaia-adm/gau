'use strict';

import React from 'react'
import {Alert, Button} from 'react-bootstrap'
import shared from '../../SharedConsts'
import WebhookList from './WebhookList'

var WebhookBox = React.createClass({

  propTypes: {
    data: React.PropTypes.array,
    errorMessage: React.PropTypes.string,
    alertVisible: React.PropTypes.bool
  },

  getInitialState() {
    console.log('initialization');
    return {
      data: [],
      alertVisible: false,
      errorMessage: '',
      confirmDelete: {}
    }
  },

  componentDidMount() {
    console.log('mounted');
    window.addEventListener('whDeleteEvent', this.handleDeleteRequest);
    this.listWebhooks();
  },
  handleAlertDismiss() {
    this.setState({alertVisible: false});
  },
  handleDeleteRequest(evt){
    console.log('Webhook deletion request: ' + evt.detail.props);
    this.setState({confirmDelete: evt.detail});
  },
  handleDeleteConfirmationDismiss(shouldDelete) {
    console.log('delete confirmation dismissed while shouldDelete is ' + shouldDelete);

    if (shouldDelete) {
      this.deleteWebhook();
    } else {
      this.setState({confirmDelete: {}});
    }
  },
  deleteWebhook() {
    var whdel = this.state.confirmDelete;
    $.ajax({
      type: 'DELETE',
      url: '/' + shared.bePath + '/webhook/' + whdel.props.tid,
      datatype: 'json',
      cache: false,
      headers: {'Authorization': 'Bearer ' + shared.apiToken},
      success: function () {
        console.log('Webhook deleted: ' + whdel.props.tid);
        this.listWebhooks();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(xhr.url, status, err.toString());
      }.bind(this)
    });
  },
  listWebhooks() {
    $.ajax({
      type: 'GET',
      url: '/' + shared.bePath + '/webhook',
      datatype: 'json',
      cache: false,
      headers: {'Authorization': 'Bearer ' + shared.apiToken},
      success: function (data) {
        console.log('Body: ' + JSON.stringify(data));
        this.setState({alertVisible: false, data: data, confirmDelete: {}});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(xhr.url, status, err.toString());
        this.setState({
          alertVisible: true,
          data: [],
          confirmDelete: {},
          errorMessage: err.toString() + ' (Reason: ' + (xhr.responseJSON ? xhr.responseJSON.message : 'unkonwn') + ')'
        });
      }.bind(this)
    });
  },
  render: function () {
    console.log('Rendering Webhook Box...');
    if (this.state.alertVisible) {
      return (
        <div className="tokenBox">
          <h2>Webhooks:</h2>
          <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
            <h4>Error occurred - {this.state.errorMessage}</h4>
            <Button onClick={this.handleAlertDismiss}>Got it!</Button>
          </Alert>
        </div>
      )
    }
    if (Object.keys(this.state.confirmDelete).length) {
      return (
        <div className="tokenBox">
          <h2>Webhooks:</h2>
          <Alert bsStyle="danger" >
            <h4>Your are going to delete </h4>
            <Button onClick={this.handleDeleteConfirmationDismiss.bind(null, true)}>Yes, delete!</Button>
            <Button onClick={this.handleDeleteConfirmationDismiss.bind(null, false)}>No, stop it!</Button>
          </Alert>
        </div>
      )
    } else {
      return (
        <div className="tokenBox">
          <h2>Webhooks:</h2>
          <WebhookList data={this.state.data}/>
        </div>
      )
    }
  }
});


module.exports = WebhookBox;