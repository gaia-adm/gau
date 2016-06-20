'use strict';

import React from 'react'
import {Button, Form, FormGroup, ControlLabel, FormControl, Col, Alert} from 'react-bootstrap'

var WebhookCreator = React.createClass({

  getInitialState() {
    console.log('initializing creator');
    return {
      datasource: '',
      event: '',
      tsField: '',
      invalidInput: false
    }
  },

  handleDatasourceValue: function (evt) {
    this.setState({datasource: evt.target.value});
  },
  handleEventValue: function (evt) {
    this.setState({event: evt.target.value});
  },
  handleTimestampValue: function (evt) {
    this.setState({tsField: evt.target.value});
  },
  validatePayload: function () {
    var reason = null;
    var patt = new RegExp('^[a-z][a-z-_0-9]+$');
    if (!this.state.datasource || !this.state.event || this.state.datasource.length < 3 || this.state.event.length < 3 || this.state.datasource.length > 20 || this.state.event.length > 20) {
      reason = 'Bad input provided: datasource and event fields are mandatory and must have 3-20 characters';
      console.log(reason);
      this.setState({invalidInput: reason});
    } else if (this.state.tsField && (this.state.tsField.length < 3 || this.state.tsField.length > 30)) {
      reason = 'Bad input provided: timestamp field is optional but must have 3-30 characters if provided';
      console.log(reason);
      this.setState({invalidInput: reason});
    } else if (!patt.test(this.state.datasource) || !patt.test(this.state.event)) {
      reason = 'Bad input provided: datasource and event fields must start from lowercase English alphabetic character and contain also dash, underscore or numeric character';
      console.log(reason);
      this.setState({invalidInput: reason});
    } else {
      this.onCreateStandardClick({
        'datasource': this.state.datasource,
        'event': this.state.event,
        'tsField': this.state.tsField
      })
    }
  },
  onCreateStandardClick: function (payload) {
    console.log('CREATING!');
    var event = new CustomEvent('whCreateEvent', {'detail': payload});
    window.dispatchEvent(event);
  },

  handleAlertDismiss: function () {
    this.setState({invalidInput: null});
  },


  render: function () {
    if (this.state.invalidInput) {
      return (
        <div className='webhookCreator'>
          <Alert bsStyle='danger'>
            <div style={{'textAlign': 'center'}}>
              <h4>{this.state.invalidInput}</h4>
              <Button onClick={this.handleAlertDismiss.bind(null, null)}>Got it!</Button>
            </div>
          </Alert>
        </div>
      )
    }
    return (
      <div className='webhookCreator'>
        <h4 style={{'fontStyle': 'oblique'}}>Press the button to create standard configuration immediately:</h4><p/>
        <Button bsStyle='info' style={{'marginLeft': '10px'}}
                onClick={this.onCreateStandardClick.bind(null, {'datasource': 'foo','event': 'boo','tsField': 'foo.boo'})}>Foo
          (boo)</Button>
        <Button bsStyle='info' style={{'marginLeft': '10px'}}
                onClick={this.onCreateStandardClick.bind(null, {'datasource': 'github','event': 'push','tsField': 'repository.pushed_at'})}>Github
          (push)</Button>
        <Button bsStyle='info' style={{'marginLeft': '10px'}}
                onClick={this.onCreateStandardClick.bind(null, {'datasource': 'trello','event': 'management','tsField': 'repository.pushed_at'})}>Trello
          (any)</Button>
        <p/>
        <h4 style={{'fontStyle': 'oblique'}}>Or create custom configuration:</h4>
        <div style={{'marginLeft': '10px'}}>
          <Form horizontal>
            <FormGroup controlId='datasource'>
              <Col componentClass={ControlLabel} sm={1} style={{'textAlign': 'left'}}>Datasource</Col>
              <Col sm={10}><FormControl type='text' value={this.state.datasource}
                                        placeholder='Enter datasource (for example, stash)'
                                        onChange={this.handleDatasourceValue}/></Col>
            </FormGroup>
            <FormGroup controlId='event'>
              <Col componentClass={ControlLabel} sm={1} style={{'textAlign': 'left'}}>Event</Col>
              <Col sm={10}><FormControl type='text' value={this.state.event}
                                        placeholder='Enter event (for example, push)'
                                        onChange={this.handleEventValue}/></Col>
            </FormGroup>
            <FormGroup controlId='tsField'>
              <Col componentClass={ControlLabel} sm={1} style={{'textAlign': 'left'}}>Timestamp field</Col>
              <Col sm={10}><FormControl type='text' value={this.state.tsField}
                                        placeholder='Optional - enter timestamp field (for example, changesets.values[0].toCommit.authorTimestamp)'
                                        onChange={this.handleTimestampValue}/></Col>
            </FormGroup>
            <Button bsStyle='warning' type='reset'>
              Reset
            </Button>
            <Button bsStyle='info' type='button' style={{'marginLeft': '10px'}}
                    onClick={this.validatePayload.bind(null, this)}>
              Submit
            </Button>
          </Form>
        </div>
        <p/>
        <h4 style={{'fontStyle': 'oblique'}}>Exit creation mode</h4>
        <Button bsStyle='info' style={{'marginLeft': '10px'}}
                onClick={this.onCreateStandardClick.bind(null, {})}>Back</Button>
      </div>
    );
  }

});

module.exports = WebhookCreator;