jest.unmock('../ApiTokenBox.js');

var React = require('react');
var ReactDom = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var ApiTokenBox = require('../ApiTokenBox');
var ApiTokenRC = require('../../utils/ApiTokenRestClient');

describe('ApiTokenBox tests', function () {

  beforeEach(function () {
    global.sessionStorage = jest.genMockFunction();
    global.sessionStorage.setItem = jest.genMockFunction();
    global.sessionStorage.getItem = jest.genMockFunction();
    ApiTokenRC.fetch = jest.genMockFunction();
    ApiTokenRC.revoke = jest.genMockFunction();
  });

  it('BasicAppearance', function () {
    const atb = TestUtils.renderIntoDocument(<ApiTokenBox/>);
    const atbNode = ReactDom.findDOMNode(atb);

    expect(atbNode).not.toBeNull();
    expect(atb.state.confirmRevoke).toBeFalsy();
    expect(atbNode.innerHTML.indexOf('API token is not available')>0).toBeTruthy();
  });

  it('ClickRevokeButton', function () {
    const atb = TestUtils.renderIntoDocument(<ApiTokenBox/>);
    const atbNode = ReactDom.findDOMNode(atb);
    expect(atbNode).not.toBeNull();
    expect(atb.state.confirmRevoke).toBeFalsy();
    atb.revokeMyToken();
    expect(atb.state.confirmRevoke).toBeTruthy();
  });
  
  it('NonEmptyToken', function () {
    global.sessionStorage.getItem.mockReturnValue('somevalue');
    const atb = TestUtils.renderIntoDocument(<ApiTokenBox/>);
    const atbNode = ReactDom.findDOMNode(atb);
    expect(atb.state.token).toBe('somevalue');
    expect(atbNode.innerHTML.indexOf('API token:')>0).toBeTruthy();
  });

  it('Invalid_NonEmtpyTokenButEmptyCreatedAt', function () {
    global.sessionStorage.getItem.mockReturnValueOnce('somevalue');
    const atb = TestUtils.renderIntoDocument(<ApiTokenBox/>);
    expect(atb.state.token).toBeNull();
  });

  it('GetMyToken', function () {
    const atb = TestUtils.renderIntoDocument(<ApiTokenBox/>);
    atb.getMyTokenAjax();
    expect(ApiTokenRC.fetch).toBeCalled();
    expect(ApiTokenRC.fetch.mock.calls.length).toBe(1);
  });

  it('ConfirmRevokeMessage', function () {
    const atb = TestUtils.renderIntoDocument(<ApiTokenBox/>);
    atb.handleRevokeConfirmationDismiss(true);
    expect(atb.state.confirmRevoke).toBeFalsy();
    expect(ApiTokenRC.revoke).toBeCalled();
    expect(ApiTokenRC.revoke.mock.calls.length).toBe(1);
  });

  it('DismissRevokeMessage', function () {
    const atb = TestUtils.renderIntoDocument(<ApiTokenBox/>);
    atb.handleRevokeConfirmationDismiss(false);
    expect(atb.state.confirmRevoke).toBeFalsy();
  });

  it('handleRevokeResultGood', function () {
    const atb = TestUtils.renderIntoDocument(<ApiTokenBox/>);
    atb.handleRevokeResult();
    expect(atb.state.errorMessage).toBeUndefined();
  });

  it('handleRevokeResultWithError', function () {
    const atb = TestUtils.renderIntoDocument(<ApiTokenBox/>);
    atb.handleRevokeResult();
    expect(atb.state.errorMessage).not.toBeNull();
  });

  it('getMyTokenAjaxResultGood', function () {
    const atb = TestUtils.renderIntoDocument(<ApiTokenBox/>);
    atb.handleGetMyTokenAjaxResult();
    expect(atb.state.errorMessage).toBeUndefined();
  });

  it('getMyTokenAjaxResultWithError', function () {
    const atb = TestUtils.renderIntoDocument(<ApiTokenBox/>);
    atb.handleGetMyTokenAjaxResult();
    expect(atb.state.errorMessage).not.toBeNull();
  });
  
  it('errorMessageAppearance', function () {
    const atb = TestUtils.renderIntoDocument(<ApiTokenBox/>);
    atb.setState({errorMessage: 'MyLovelyError'});
    const atbNode = ReactDom.findDOMNode(atb);
    expect(atbNode.innerHTML.indexOf('MyLovelyError')>0).toBeTruthy();
  });
  
});
