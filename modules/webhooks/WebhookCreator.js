'use strict';

import React from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'

var WebhookCreator = React.createClass({

  onCreateStandardClick: function (payload) {
    var event = new CustomEvent('whCreateEvent', {'detail': payload});
    window.dispatchEvent(event);
  },

  render: function () {

    return (
      <div class="webhookCreator">
        <Button bsStyle="info" style={{"marginLeft": "10px"}} onClick={this.onCreateStandardClick.bind(null, {"datasource": "foo","event": "boo","tsField": "foo.boo"})}>Foo (boo)</Button>
        <Button bsStyle="info" style={{"marginLeft": "10px"}} onClick={this.onCreateStandardClick.bind(null, {"datasource": "github","event": "push","tsField": "repository.pushed_at"})}>Github (push)</Button>
        <Button bsStyle="info" style={{"marginLeft": "10px"}} onClick={this.onCreateStandardClick.bind(null, {"datasource": "trello","event": "management","tsField": "repository.pushed_at"})}>Trello (management)</Button>
      </div>
    );
  }

});

module.exports = WebhookCreator;