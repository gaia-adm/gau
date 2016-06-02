import React from 'react';
import Webhook from './Webhook'

var WebhookList = React.createClass({

  propTypes: {
    data: React.PropTypes.array
  },

  render: function () {
    var tokens = this.props.data.map(function (t) {
      return (
        <Webhook key={t.token} tid={t.token} datasource={t.datasource} event={t.eventType} hookUrl={t.hookUrl} tsField={t.tsField}/>
      );
    });
    return (
      <div className="tokenList">
        {tokens}
      </div>
    );
  }
});

module.exports = WebhookList;