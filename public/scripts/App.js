var React = require('react');
var {Link, RouteHandler} = require('react-router');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <ul role="nav">
          <li><Link to="home">Home</Link></li>
          <li><Link to="webhooks">Webhooks</Link></li>
          <li><Link to="tokens">Access Tokens</Link></li>
        </ul>
      </div>
    );
  }
});

module.exports = App;
