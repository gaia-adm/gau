jest.unmock('../Home.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Home from '../Home';

describe('HomeTest', () => {
  it('Home, sweet home', () => {
    const ho = TestUtils.renderIntoDocument(
      <Home />
    );
    const hono = ReactDOM.findDOMNode(ho);
    expect(TestUtils.isCompositeComponent(ho)).toBe(true);
    expect(TestUtils.isDOMComponent(hono)).toBe(true);
    expect(hono.tagName.toLowerCase()).toEqual('div');
    expect(hono.querySelector('h2').textContent).toEqual('Welcome to Gaia home!');
  })
});
