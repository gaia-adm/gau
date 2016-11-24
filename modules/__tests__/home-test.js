jest.unmock('../Home.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Home from '../Home';

describe('HomeTest', () => {

  it('HomeAppearance', () => {
    const ho = TestUtils.renderIntoDocument(
      <Home />
    );
    const hono = ReactDOM.findDOMNode(ho);
    expect(TestUtils.isCompositeComponent(ho)).toBe(true);
    expect(TestUtils.isDOMComponent(hono)).toBe(true);
    expect(hono.tagName.toLowerCase()).toEqual('div');
    expect(hono.querySelector('h2').textContent).toEqual('Welcome to Gaia Administration!');
  });

  it('HoweWhenUserLoggedIn', () => {
    const ho = TestUtils.renderIntoDocument(<Home />);
    expect(ho.state.loggedIn).toBe(-1);
    ho.isLoggedIn(true);
    expect(ho.state.loggedIn).toBe(1);
  });

  it('HoweWhenUserFailedToLogin', () => {
    const ho = TestUtils.renderIntoDocument(<Home />);
    expect(ho.state.loggedIn).toBe(-1);
    ho.isLoggedIn(false);
    expect(ho.state.loggedIn).toBe(0);
  });

});
