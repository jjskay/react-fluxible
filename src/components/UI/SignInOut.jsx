var React = require('react');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var ReactIntl = require('react-intl');
var { IntlMixin, FormattedMessage } = ReactIntl;

var AuthStore = require('../../stores/AuthStore');
var AuthActions = require('../../actions/AuthActions');

var SignInOut = React.createClass({
	contextTypes: {
		router: React.PropTypes.func.isRequired
	},

	mixins: [IntlMixin,FluxibleMixin],

	statics: {
		storeListeners: [AuthStore]
	},

	getInitialState: function(){
		return this.getStateFromStores();
	},

	getStateFromStores: function(){
		return {
			isSignIn: this.getStore(AuthStore).isSignIn(),
			isSignOut: this.getStore(AuthStore).isSignOut(),
			isSignLocation: this.getStore(AuthStore).isSignLocation(),
			isLoginCookie: this.getStore(AuthStore).isLoginCookie()
		}
	},

	onChange: function(){
		this.setState(this.getStateFromStores());
	},

	render: function(){
		if(this.state.isLoginCookie){
			return <a href="" onClick={this.onClickSignOut}>Sign out</a>
		}
		if(!this.state.isSignIn && !this.state.isSignLocation){
			return <a onClick={this.clickToSign}>Sign in</a>;
		}
        
        if(!this.state.isSignIn && this.state.isSignLocation){
			return <a onClick={this.clickToIndex}>Index</a>;
		}

		if(this.state.isSignOut){
			return <span>Signing out...</span>
		}

		return <a href="" onClick={this.onClickSignOut}>Sign out</a>
	},

	onClickSignOut: function(e){
        e.preventDefault();
        this.executeAction(AuthActions.signOut, {});
	},

	clickToSign: function(e){
		e.preventDefault();
		this.executeAction(AuthActions.signTo, {});
	},

	clickToIndex: function(e){
		e.preventDefault();
		this.executeAction(AuthActions.backIndex, {});
	}
})


module.exports = SignInOut;






























