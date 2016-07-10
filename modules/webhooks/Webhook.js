import React from 'react'
import {Button} from 'react-bootstrap'
import WebhookEditor from './WebhookEditor'

var Webhook = React.createClass({

  propTypes: {
    datasource: React.PropTypes.string,
    event: React.PropTypes.string,
    hookUrl: React.PropTypes.string,
    tsField: React.PropTypes.string,
    tid: React.PropTypes.string
  },

  getInitialState: function () {
    return ({showEditor: false});
  },
  onEditClick: function () {
    {
      this.state.showEditor ? document.getElementById('editWebhook' + this.props.tid).innerHTML = 'Edit' : document.getElementById('editWebhook' + this.props.tid).innerHTML = 'Exit Editing';
    }
    this.setState({showEditor: !this.state.showEditor});
  },
  onDeleteClick: function () {
    var event = new CustomEvent('whDeleteEvent', {'detail': this});
    window.dispatchEvent(event);
  },
  formatDate: function (epoch) {
    var date = new Date(epoch);
    if (isNaN(date.getTime())) {
      return ''
    }
    ;
    var hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
    var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    var seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    var year = date.getFullYear();
    var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth()+1);
    var date = (date.getDate() < 10 ? '0' : '') + date.getDate();
    return hours + ':' + minutes + ':' + seconds + ' ' + date + '/' + month + '/' + year;
  },
  getPart: function (date, part) {
    var result;
    if (part === 'hours') {
      result = date.getHours()
    }
  },
  render: function () {
    return (
      <div className='token'>
        <b>Datasource:</b> {this.props.datasource}&nbsp;<b>Event:</b> {this.props.event}<br/>
        <b>URL:</b> {this.props.hookUrl}<br/>
        <b>Created at: </b>{this.formatDate(this.props.createdAt)}<br/>
        { this.state.showEditor ? <WebhookEditor tsField={this.props.tsField} datasource={this.props.datasource}
                                                 event={this.props.event}/> : null }
        <Button className='btn btn-primary' id={'editWebhook'+this.props.tid} type='button' onClick={this.onEditClick}>
          Edit
        </Button>
        &nbsp;
        <Button className='btn btn-danger' id={'deleteWebhook'+this.props.tid} type='button'
                onClick={this.onDeleteClick}>Delete
        </Button>
        &nbsp;
        <p/>
      </div>
    )
  }
});

module.exports = Webhook;