import React from 'react'
import {Button} from 'react-bootstrap'
import shared from '../../SharedConsts'
import HomeRC from '../utils/HomeRestClient'

var waitingTextStyle = {
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '10px',
    marginDown: '20px',
    fontFamily: 'Times New Roman, Times, serif',
    fontStyle: 'italic',
    fontSize: '1.8em',
    fontWeight: 'bold'
};

var WaitingButton = React.createClass({

    propTypes: {
        val: React.PropTypes.string,
        onClick: React.PropTypes.func,
        id: React.PropTypes.string
    },

    getInitialState(){
        if (sessionStorage.getItem(shared.atValue)) {
            return {
                loggedIn: true
            }
        } else {
            return {
                loggedIn: false
            }
        }
    },
    Logout(){
        this.setState({
            loggedIn: false
        });
        HomeRC.logout();
    },

    render: function () {

        return (
            <div>
                <Button bsStyle="info" bsSize="small" onClick={this.Logout}><div style={waitingTextStyle}>Waiting...<br/>(or press to re-login)</div></Button>
            </div>
        )
    }

});

module.exports = WaitingButton;
