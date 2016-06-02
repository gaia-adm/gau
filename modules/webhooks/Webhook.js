import React from 'react'
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
      this.state.showEditor ? document.getElementById('editWebhook'+this.props.tid).innerHTML = 'Edit' : document.getElementById('editWebhook'+this.props.tid).innerHTML = 'Exit Editing';
    }
    this.setState({showEditor: !this.state.showEditor});
  },
  onDeleteClick: function () {
    return (
      alert('Not implemented yet')
    );
  },
  render: function () {
    return (
      <div className='token'>
        <b>Datasource:</b> {this.props.datasource}&nbsp;<b>Event:</b> {this.props.event}
        <br/><b>URL:</b> {this.props.hookUrl}<br/>
        { this.state.showEditor ? <WebhookEditor tsField={this.props.tsField}/> : null }
        <button className='btn btn-primary' id={'editWebhook'+this.props.tid} type='button' onClick={this.onEditClick}>Edit</button>
        &nbsp;
        <button className='btn btn-danger' id={'deleteWebhook'+this.props.tid} type='button'
                onClick={this.onDeleteClick}>Delete
        </button>
        &nbsp;
        <p/>
      </div>
    )
  }
});

module.exports = Webhook;