jest.unmock('../LogoutButton.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import LogoutButton from '../LogoutButton';
import HomeRC from '../../utils/HomeRestClient'

describe('LogoutButtonTests', ()=> {

  beforeEach(function () {
    global.sessionStorage = jest.genMockFunction();
    global.sessionStorage.setItem = jest.genMockFunction();
    global.sessionStorage.getItem = jest.genMockFunction();
    HomeRC.logout = jest.genMockFunction();
  });

  it('LogoutButtonAppearance', ()=> {
    const logoutButton = TestUtils.renderIntoDocument(<LogoutButton/>);
    const logoutButtonNode = ReactDOM.findDOMNode(logoutButton);
    expect(logoutButtonNode).not.toBeNull();
    expect(logoutButtonNode.isLoggedIn).toBeFalsy();
  });

  it('ClickLogoutButtonWhenLoggedIn', ()=> {
    global.sessionStorage.getItem.mockReturnValue(true);
    const logoutButton = TestUtils.renderIntoDocument(<LogoutButton/>);
    expect(logoutButton.state.loggedIn).toBeTruthy();
    logoutButton.Logout();
    expect(logoutButton.state.loggedIn).toBeFalsy();
    expect(HomeRC.logout).toBeCalled();
    expect(HomeRC.logout.mock.calls.length).toBe(1);
  });

  it('InitiallyLoggedOut', ()=> {
    const logoutButton = TestUtils.renderIntoDocument(<LogoutButton/>);
    expect(logoutButton.state.loggedIn).toBeFalsy();
    logoutButton.Logout();
    expect(logoutButton.state.loggedIn).toBeFalsy();
    expect(HomeRC.logout).toBeCalled();
    expect(HomeRC.logout.mock.calls.length).toBe(1);
  });

});

