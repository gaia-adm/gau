import React from 'react'

var WebhookEditor = React.createClass({

  propTypes: {
    tsField: React.PropTypes.string
  },

  getInitialState: function () {
    return {tsField: this.props.tsField, hasChanges: false}
  },
  onChange: function (e) {
    //show save/cancel buttons only if the initial value has changed
    if (this.props.tsField === e.target.value) {
      this.setState({tsField: e.target.value, hasChanges: false})
    } else {
      this.setState({tsField: e.target.value, hasChanges: true})
    }
  },
  onSaveClick: function () {
    var event = new CustomEvent('whUpdateEvent', {'detail': {"datasource": this.props.datasource,"event": this.props.event,"tsField": this.state.tsField}});
    window.dispatchEvent(event);
/*    return (
      alert('Not implemented yet: ' + this.state.tsField+this.props.datasource+this.props.event)
    )*/
  },
  onCancelClick: function () {
    this.setState({tsField: this.props.tsField, hasChanges: false});
    /*    return (
     alert('Not implemented yet')
     );*/
  },
  render: function () {
    return (
      <div className="tokenEditor">


        <b>Timestamp field: </b> <input type="text" size="50" onChange={this.onChange}
                                        value={this.state.tsField}></input>&nbsp;

        {this.state.hasChanges ?
          <button className="btn btn-sm btn-primary" id="saveWebhook" type="button" onClick={this.onSaveClick}>
            Save </button> : null}&nbsp;
        {this.state.hasChanges ?
          <button className="btn btn-sm btn-warning" id="notSaveWebhook" type="button" onClick={this.onCancelClick}>
            Cancel </button> : null}&nbsp;
        <br/>
      </div>
    )
  }
});

module.exports = WebhookEditor;