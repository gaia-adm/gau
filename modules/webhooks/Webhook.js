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
  render: function () {
    return (
      <div className='token'>
        <b>Datasource:</b> {this.props.datasource}&nbsp;<b>Event:</b> {this.props.event}
        <br/><b>URL:</b> {this.props.hookUrl}<br/>
        { this.state.showEditor ? <WebhookEditor tsField={this.props.tsField} datasource={this.props.datasource} event={this.props.event} /> : null }
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