var React = require('react');
var Router = require('react-router');
var {
  Route, RouteHandler, Link
} = Router;

var SignInOut = require('./UI/SignInOut');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');

var IndexSlider = require('./UI/IndexSlider');


var App = React.createClass({

  mixins: [FluxibleMixin],

  contextTypes: {
    router: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
  },

  onChange: function() {
    return;
  },

  render: function() {
    return (
      <div className="body">
               <p className="nav">
                 <SignInOut />
               </p>
               <p>{' '}</p>
               <RouteHandler />
           </div>
    )
  }
})


module.exports = App;