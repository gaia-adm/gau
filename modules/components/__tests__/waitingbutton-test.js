jest.unmock('../WaitingButton.js');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import WaitingButton from '../WaitingButton';
import HomeRC from '../../utils/HomeRestClient'

describe('WaitingButtonTests', ()=> {

    beforeEach(function () {
        global.sessionStorage = jest.genMockFunction();
        global.sessionStorage.setItem = jest.genMockFunction();
        global.sessionStorage.getItem = jest.genMockFunction();
        HomeRC.login = jest.genMockFunction();
    });

    it('WaitingButtonAppearance', ()=> {
        const waitingButton = TestUtils.renderIntoDocument(<WaitingButton/>);
        const waitingButtonNode = ReactDOM.findDOMNode(waitingButton);
        expect(waitingButtonNode).not.toBeNull();
        expect(waitingButtonNode.isLoggedIn).toBeFalsy();
    });

    it('ClickWaitingButton', ()=> {
        const waitingButton = TestUtils.renderIntoDocument(<WaitingButton/>);
        expect(waitingButton.state.loggedIn).toBeFalsy();
        waitingButton.Logout();
        expect(waitingButton.state.loggedIn).toBeFalsy();
        expect(HomeRC.logout).toBeCalled();
        expect(HomeRC.logout.mock.calls.length).toBe(1);
    });

});

