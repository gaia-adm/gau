jest.unmock('../WebhookEditor.js');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
import WebhookEditor from '../WebhookEditor';

describe('WebhookEditor', ()=> {
  var params = {
    datasource: 'github',
    event: 'fork',
    tsField: 'github.pushed_at'
  };
  var whe = TestUtils.renderIntoDocument(<WebhookEditor datasource={params.datasource} event={params.event}
                                                          tsField={params.tsField}/>);

  const constWheNode = ReactDOM.findDOMNode(whe);

  it('initial creation validation', function () {
    expect(TestUtils.isCompositeComponent(whe)).toBe(true);
    expect(TestUtils.isDOMComponent(constWheNode)).toBe(true);

  });

  it('initial state test', function () {
    expect(whe.state.tsField).toBe(whe.props.tsField);
    expect(whe.state.hasChanges).toBeFalsy();
  });

  it('initial children rendering test', function () {
    expect(TestUtils.scryRenderedDOMComponentsWithTag(whe, 'input').length).toBe(1);
    //hasChanges: false by default, so no buttons appear
    expect(TestUtils.scryRenderedComponentsWithType(whe, 'button').length).toBe(0);
  });

  it('children are rendered on change VALUES test', function () {
    expect(whe.state.hasChanges).toBeFalsy();
    var tsInput=TestUtils.findRenderedDOMComponentWithTag(whe, 'input');
    ReactDOM.findDOMNode(tsInput).value='github.committed_at';
    TestUtils.Simulate.change(tsInput)
    expect(whe.state.hasChanges).toBeTruthy();
    expect(whe.state.tsField).toBe('github.committed_at');
    expect(tsInput.value).toBe('github.committed_at');
  });

  it('children are rendered on change FLOW test', function () {
    whe.onChange= jest.genMockFn();
    whe.setState = jest.genMockFn();
    var tsInput=TestUtils.findRenderedDOMComponentWithTag(whe, 'input');
    ReactDOM.findDOMNode(tsInput).value='github.committed_at22';
    TestUtils.Simulate.change(tsInput)
    expect(whe.setState).toBeCalled();
    //onChange does not appear as called due to an issue in jest - see https://github.com/facebook/jest/issues/232
  });

  it('children are rendered on change VALUES NO REAL CHANGE test', function () {
    whe = TestUtils.renderIntoDocument(<WebhookEditor datasource={params.datasource} event={params.event}
                                                            tsField={params.tsField}/>);
    expect(whe.state.hasChanges).toBeFalsy();
    var tsInput=TestUtils.findRenderedDOMComponentWithTag(whe, 'input');
    ReactDOM.findDOMNode(tsInput).value='github.pushed_at';
    TestUtils.Simulate.change(tsInput)
    expect(whe.state.hasChanges).toBeFalsy();
    expect(whe.state.tsField).toBe('github.pushed_at');
    expect(tsInput.value).toBe('github.pushed_at');
  });

  it('test', function () {
    whe = TestUtils.renderIntoDocument(<WebhookEditor datasource={params.datasource} event={params.event}
                                                      tsField={params.tsField}/>);
    expect(whe.state.hasChanges).toBeFalsy();
    var tsInput=TestUtils.findRenderedDOMComponentWithTag(whe, 'input');
    ReactDOM.findDOMNode(tsInput).value='github.pushed_at';
    TestUtils.Simulate.change(tsInput)
    expect(whe.state.hasChanges).toBeFalsy();
    expect(whe.state.tsField).toBe('github.pushed_at');
    expect(tsInput.value).toBe('github.pushed_at');
  });
});