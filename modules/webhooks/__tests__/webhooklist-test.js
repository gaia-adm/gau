jest.unmock('../WebhookList.js');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
import WebhookList from '../WebhookList';

//NOTE: cannot be executed in NODE_ENV=production environment (see http://stackoverflow.com/questions/29586928/react-minified-exception-occurred)

describe('WebhookList', ()=> {
  var staticData='[{"datasource":"dockerhub","eventType":"push","tsField":"push_data.pushed_at","createdAt":1463989059120,"apiToken":"1111-2222-3333-4444","tenantId":1056454051,"token":"69e9428cf222222051a8a528d686c97dd5aad5d1","hookUrl":"https://webhook.server.com/wh/1111-2222-3333-4444/69e9428cf222222051a8a528d686c97dd5aad5d1"},{"datasource":"github","eventType":"push","apiToken":"1111-2222-3333-4444","tenantId":1056454051,"token":"37b9d70f87fcf988888829d2888358ef5bbb5394","hookUrl":"https://webhook.server.com/wh/1111-2222-3333-4444/37b9d70f87fcf988888829d2888358ef5bbb5394","tsField":"repository.pushed_at"}]';
  var data = JSON.parse(staticData);
  var whl = TestUtils.renderIntoDocument( <WebhookList data={data}/>);

  const constWhlNode = ReactDOM.findDOMNode(whl);

  it('initial creation validation', function () {
    expect(TestUtils.isCompositeComponent(whl)).toBe(true);
    expect(TestUtils.isDOMComponent(constWhlNode)).toBe(true);
  });

  it('list content test', function () {
    expect(Array.isArray(whl.props.data)).toBeTruthy();
    expect(whl.props.data.length).toBe(2);
    expect(Object.keys(whl.props.data[0]).length).toBe(8);
  });


});