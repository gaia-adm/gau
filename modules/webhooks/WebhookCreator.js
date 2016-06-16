'use strict';

import React from 'react'
import {Button, Form, FormGroup, ControlLabel, FormControl, Col} from 'react-bootstrap'

var WebhookCreator = React.createClass({

  onCreateStandardClick: function (payload) {
    var event = new CustomEvent('whCreateEvent', {'detail': payload});
    window.dispatchEvent(event);
  },

  render: function () {

    return (
      <div class="webhookCreator">
        <h4 style={{"font-style": "oblique"}}>Press the button to create standard configuration immediately:</h4><p/>
        <Button bsStyle="info" style={{"marginLeft": "10px"}}
                onClick={this.onCreateStandardClick.bind(null, {"datasource": "foo","event": "boo","tsField": "foo.boo"})}>Foo
          (boo)</Button>
        <Button bsStyle="info" style={{"marginLeft": "10px"}}
                onClick={this.onCreateStandardClick.bind(null, {"datasource": "github","event": "push","tsField": "repository.pushed_at"})}>Github
          (push)</Button>
        <Button bsStyle="info" style={{"marginLeft": "10px"}}
                onClick={this.onCreateStandardClick.bind(null, {"datasource": "trello","event": "management","tsField": "repository.pushed_at"})}>Trello
          (management)</Button>
        <p/>
        <h4 style={{"font-style": "oblique"}}>Or create custom configuration:</h4>
        <div style={{"marginLeft": "10px"}}>
          <Form horizontal>
            <FormGroup controlId="datasource">
              <Col componentClass={ControlLabel} sm={1} style={{"textAlign": "left"}}>Datasource</Col>
              <Col sm={10}><FormControl type="text" placeholder="Enter datasource (for example, stash)"/></Col>
            </FormGroup>
            <FormGroup controlId="event">
              <Col componentClass={ControlLabel} sm={1} style={{"textAlign": "left"}}>Event</Col>
              <Col sm={10}><FormControl type="text" placeholder="Enter event (for example, push)"/></Col>
            </FormGroup>
            <FormGroup controlId="tsField">
              <Col componentClass={ControlLabel} sm={1} style={{"textAlign": "left"}}>Timestamp field</Col>
              <Col sm={10}><FormControl type="text"
                                        placeholder="Optional - enter timestamp field (for example, changesets.values[0].toCommit.authorTimestamp)"/></Col>
            </FormGroup>
            <Button bsStyle="warning" type="reset">
              Reset
            </Button>
            <Button bsStyle="info" type="submit" style={{"marginLeft": "10px"}}>
              Submit
            </Button>
          </Form>
        </div>
        <p/>
        <h4 style={{"font-style": "oblique"}}>Exit creation mode</h4>
        <Button bsStyle="info" style={{"marginLeft": "10px"}}
                onClick={this.onCreateStandardClick.bind(null, {})}>Back</Button>
      </div>
    );
  }

});

module.exports = WebhookCreator;