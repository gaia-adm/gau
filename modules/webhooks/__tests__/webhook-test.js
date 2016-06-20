jest.unmock('../Webhook.js');
jest.unmock('../WebhookEditor.js');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
import Webhook from '../Webhook';
var Btn = require('react-bootstrap').Button;

describe('Webhook', ()=> {
  var we = require('../WebhookEditor');
  var token = '1234567890';
  var t = {
    tid: token,
    datasource: 'github',
    event: 'fork',
    hookUrl: 'https://webhook.jest.gaiahub.io/abcd-efgh-1234-5678/' + token,
    tsField: 'github.pushed_at'
  };

  const wh = TestUtils.renderIntoDocument(<Webhook key={t.tid} tid={t.tid} datasource={t.datasource} event={t.event}
                                                   hookUrl={t.hookUrl} tsField={t.tsField}/>);

  const constWhNode = ReactDOM.findDOMNode(wh);

  it('initial creation validation', function () {
    expect(TestUtils.isCompositeComponent(wh)).toBe(true);
    expect(TestUtils.isDOMComponent(constWhNode)).toBe(true);
    expect(t).toEqual(wh.props);
    expect(wh.state.showEditor).toBeFalsy();
    expect(wh.props.datasource).toBe('github');
  });
  it('showEditor behavior test', function () {
    expect(wh.state.showEditor).toBeFalsy();
    wh.setState({showEditor: true});
    expect(wh.state.showEditor).toBeTruthy();
  });
  it('buttons and editor rendering test', function () {
    //Webhook Editor is rendered too
    expect(TestUtils.scryRenderedComponentsWithType(wh, we).length).toBe(1);
    expect(TestUtils.scryRenderedComponentsWithType(wh, Btn).length).toBe(2);
  });
});