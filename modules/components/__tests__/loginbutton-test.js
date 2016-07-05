jest.unmock('../LoginButton.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import LoginButton from '../LoginButton';
import HomeRC from '../../utils/HomeRestClient'

describe('LoginButtonTests', ()=> {

  beforeEach(function () {
    global.sessionStorage = jest.genMockFunction();
    global.sessionStorage.setItem = jest.genMockFunction();
    global.sessionStorage.getItem = jest.genMockFunction();
    HomeRC.login = jest.genMockFunction();
  });

  it('LoginButtonAppearance', ()=> {
    const loginButton = TestUtils.renderIntoDocument(<LoginButton/>);
    const loginButtonNode = ReactDOM.findDOMNode(loginButton);
    expect(loginButtonNode).not.toBeNull();
    expect(loginButtonNode.isLoggedIn).toBeFalsy();
  });

  it('ClickLoginButtonWhenLoggedOut', ()=> {
    const loginButton = TestUtils.renderIntoDocument(<LoginButton/>);
    expect(loginButton.state.loggedIn).toBeFalsy();
    loginButton.Login();
    expect(loginButton.state.loggedIn).toBeTruthy();
    expect(HomeRC.login).toBeCalled();
    expect(HomeRC.login.mock.calls.length).toBe(1);
  });

  it('InitiallyLoggedIn', ()=> {
    global.sessionStorage.getItem.mockReturnValue(true);
    const loginButton = TestUtils.renderIntoDocument(<LoginButton/>);
    expect(loginButton.state.loggedIn).toBeTruthy();
  });

});

