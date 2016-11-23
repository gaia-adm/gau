import React from 'react'
import {Link} from 'react-router'
import Home from './Home'
import shared from '../SharedConsts'

var App = React.createClass({

    propTypes: {
        children: React.PropTypes.element
    },

    getSelectedTenant() {
        //credits to https://davidwalsh.name/query-string-javascript
        let regex = new RegExp('[\\?&]' + 'st' + '=([^&#]*)');
        let results = regex.exec(window.location.search);
        if (results != null) {
            let selectedTenant = decodeURIComponent(results[1].replace(/\+/g, ' '));
            sessionStorage.setItem(shared.selectedTenant, selectedTenant);
            console.log('Working with account ' + sessionStorage.getItem(shared.selectedTenant));
        }
    },


    render: function () {

        this.getSelectedTenant();

        return (
            <div>
                <ul role="nav">
                    <li><Link to={ '/' + shared.uiPath + '/'} onlyActiveOnIndex
                              activeStyle={{color: 'purple'}}>Home</Link></li>
                    <li><Link to={ '/' + shared.uiPath + '/tokens' } activeStyle={{color: 'purple'}}>API Token</Link>
                    </li>
                    <li><Link to={ '/' + shared.uiPath + '/webhooks' } activeStyle={{color: 'purple'}}>Webhooks</Link>
                    </li>
                </ul>
                {this.props.children || <Home/>}
            </div>
        );
    }
});

module.exports = App;
