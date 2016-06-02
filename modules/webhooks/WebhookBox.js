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
      errorMessage: ''
    }
  },

  componentDidMount() {
    console.log('mounted');
    $.ajax({
      type: 'GET',
      url: '/'+shared.bePath+'/webhooks',
      datatype: 'json',
      cache: false,
      headers: {'Authorization': 'Bearer aaa'},
      success: function (data) {
        console.log('Body: ' + JSON.stringify(data));
        this.setState({alertVisible: false, data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(xhr.url, status, err.toString());
        this.setState({alertVisible: true, data: [], errorMessage: err.toString()+' (Reason: ' + (xhr.responseJSON ? xhr.responseJSON.message : 'unkonwn') +')' });
      }.bind(this)
    });
  },
  handleAlertDismiss() {
    this.setState({alertVisible: false});
  },
  render: function () {
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