'use strict';

import React from 'react'
import {Alert, Button} from 'react-bootstrap'
import shared from '../../SharedConsts'
import WebhookList from './WebhookList'
import WebhookCreator from './WebhookCreator'

var WebhookBox = React.createClass({

  propTypes: {
    data: React.PropTypes.array,
    errorMessage: React.PropTypes.string,
    alertVisible: React.PropTypes.bool
  },

  getInitialState() {
    console.log('Initialize webhook box');
    return {
      data: [],
      alertVisible: false,
      errorMessage: '',
      confirmDelete: {},
      action: ''
    }
  },

  componentDidMount() {
    console.log('mounted');
    window.addEventListener('whDeleteEvent', this.handleDeleteRequest);
    window.addEventListener('whCreateEvent', this.handleCreateRequest);
    window.addEventListener('whUpdateEvent', this.handleUpdateRequest);
    this.listWebhooks();
  },

  //close general error message (bad credentials, no connection, etc.)
  handleAlertDismiss() {
    this.setState({alertVisible: false});
  },
  //start handling webhook create request
  handleCreateRequest(evt){
    if (Object.keys(evt.detail).length > 0) {
      console.log('Going to create event: ' + JSON.stringify(evt.detail));
      this.createWebhook(evt.detail);
    } else {
      this.setState({action: ''});
    }
  },
  //start handling webhook create request that serves as update too
  handleUpdateRequest(evt){
    if (Object.keys(evt.detail).length > 0) {
      console.log('Going to update event: ' + JSON.stringify(evt.detail));
      this.createWebhook(evt.detail);
    } else {
      this.setState({action: ''});
    }
  },
  //start handling webhook deletion - when Delete button pressed in Webhook object
  handleDeleteRequest(evt){
    console.log('Webhook deletion request: ' + evt.detail.props);
    this.setState({confirmDelete: evt.detail});
  },
  //handle final decision - should the webhook be deleted or not
  handleDeleteConfirmationDismiss(shouldDelete) {
    console.log('delete confirmation dismissed while shouldDelete is ' + shouldDelete);
    if (shouldDelete) {
      this.deleteWebhook();
    } else {
      this.setState({confirmDelete: {}});
    }
  },
  //set state action=create in order to switch to the WebhookCreator
  handleCreateButtonPressed(){
    this.setState({action: 'create'})
  },
  //ajax call to delete the webhook
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
        this.setState({
          alertVisible: true,
          data: [],
          confirmDelete: {},
          action: '',
          errorMessage: err.toString() + ' (Reason: ' + (xhr.responseJSON ? xhr.responseJSON.message : 'unkonwn') + ')'
        });
      }.bind(this)
    });
  },
  //ajax call to create the webhook
  createWebhook(whConfig) {
    $.ajax({
      type: 'POST',
      url: '/' + shared.bePath + '/webhook/',
      datatype: 'json',
      cache: false,
      data: whConfig,
      headers: {'Authorization': 'Bearer ' + shared.apiToken},
      success: function () {
        console.log('Webhook created: ' + JSON.stringify(whConfig));
        this.listWebhooks();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(xhr.url, status, err.toString());
        this.setState({
          alertVisible: true,
          data: [],
          confirmDelete: {},
          action: '',
          errorMessage: err.toString() + ' (Reason: ' + (xhr.responseJSON ? xhr.responseJSON.message : 'unkonwn') + ')'
        });
      }.bind(this)
    });
  },
  //ajax call to display all existing webhooks (for the authorized tenant)
  //it also reset all 'special' states - confirmDelete in deletion flow, action in create flow
  listWebhooks() {
    $.ajax({
      type: 'GET',
      url: '/' + shared.bePath + '/webhook',
      datatype: 'json',
      cache: false,
      headers: {'Authorization': 'Bearer ' + shared.apiToken},
      success: function (data) {
        console.log('Body: ' + JSON.stringify(data));
        this.setState({alertVisible: false, data: data, confirmDelete: {}, action: ''});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(xhr.url, status, err.toString());
        this.setState({
          alertVisible: true,
          data: [],
          confirmDelete: {},
          action: '',
          errorMessage: err.toString() + ' (Reason: ' + (xhr.responseJSON ? xhr.responseJSON.message : 'unkonwn') + ')'
        });
      }.bind(this)
    });
  },
  render: function () {
    console.log('Rendering Webhook Box...');
    //show general error message in case of problem (credentials, connectivity,...)
    if (this.state.alertVisible) {
      return (
        <div>
          <h2 style={{'textAlign': 'center', 'backgroundColor': '#e7e7e7', 'color': '#003366'}}>Webhooks</h2>
          <div className='tokenBox'>
            <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
              <div style={{'textAlign': 'center'}}>
                <h4>Error occurred - {this.state.errorMessage}</h4>
                <Button onClick={this.handleAlertDismiss}>Got it!</Button>
              </div>
            </Alert>
          </div>
        </div>
      );
    }
    //Delete confirmation dialog
    if (Object.keys(this.state.confirmDelete).length) {
      return (
        <div>
          <h2 style={{'textAlign': 'center', 'backgroundColor': '#e7e7e7', 'color': '#003366'}}>Webhooks</h2>
          <div className='tokenBox'>
            <Alert bsStyle='warning'>
              <div style={{'textAlign': 'center'}}>
                <h4>Your are going to delete webhook configuration for <b>{this.state.confirmDelete.props.event} </b>
                  event of <b>{this.state.confirmDelete.props.datasource}</b>.</h4>
                <h4>This action is not recoverable - you will not be able to send these events to Gaia anymore.</h4>
                <h4>Are you sure?</h4>
                <Button onClick={this.handleDeleteConfirmationDismiss.bind(null, true)}>Yes, delete it!</Button>
                <Button onClick={this.handleDeleteConfirmationDismiss.bind(null, false)}>No, keep this one!</Button>
              </div>
            </Alert>
          </div>
        </div>
      );
    }
    //Create new webhook dialog
    if (this.state.action === 'create') {
      console.log('creating...')
      return (
        <div>
          <h2 style={{'textAlign': 'center', 'backgroundColor': '#e7e7e7', 'color': '#003366'}}>Webhooks</h2>
          <div className='tokenBox'>
            <WebhookCreator />
          </div>
        </div>
      );
    }
    //Regular webhooks list
    return (
      <div>
        <h2 style={{'textAlign': 'center', 'backgroundColor': '#e7e7e7', 'color': '#003366'}}>Webhooks</h2>
        <div className='tokenBox'>
          <Button bsStyle='info' bsSize='large' onClick={this.handleCreateButtonPressed}>Register new webhook
            configuration...</Button>
          <p/>
          <WebhookList data={this.state.data}/>
        </div>
      </div>
    );
  }
});


module.exports = WebhookBox;