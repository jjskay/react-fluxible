var React = require('react');
var Router = require('react-router');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var { Route, RouteHandler, Link, State, Navigation } = Router;
var classSet = require('classnames');
var AuthStore = require('../stores/AuthStore');
var AuthActions = require('../actions/AuthActions');
var Datas = require('../actions/Datas');
var Login = React.createClass({
    
  contextTypes: {
		router: React.PropTypes.func.isRequired
	},

	mixins: [State, Navigation,FluxibleMixin],

	statics: {
		storeListeners: [AuthStore]
	},

	getInitialState: function(){
		return this.getStateFromStores();
	},

	getStateFromStores: function(){
		return {
			isLoginCookie: this.getStore(AuthStore).isLoginCookie(),
			isGoReg: this.getStore(AuthStore).isGoReg(),
      error: this.getStore(AuthStore).isError()
		}
	},

	onChange: function(){
	   var states = this.getStateFromStores();
        if (states.isLoginCookie) {
            var path = this.getQuery().returnUrl || '/list';
            this.transitionTo(path);
        } else {
            this.setState(this.getStateFromStores());
        }
	},

	render: function(){
        return (
            <div className="loginBody">
                <form onSubmit={this.loginSub}>
                   <p><label>username:<input type="text" ref="username" placeholder="username" /></label></p>
                   {' '}
                   <p><label>password:<input type="password" ref="password" placeholder="password" onKeyDown={this.onKeyDownSub} /></label></p>
                   {' '}
                   <p style={{color:'red'}}>{this.state.error}</p>
                   {' '}
                   <div className="loginBottom">
                      {this.loginButton()}
                   	  {this.regButton()}
                   </div>
                </form>
            </div>
        )
	},

	loginButton: function(){
		var disabled;
		var text = 'Sign in';
		if(this.state.isSignIn){
			disabled = true;
			text = 'Signing in...';
		}
		return (
            <input type="submit" value={text} disabled={disabled}  />
		)
	},

	regButton: function(){
        var text = 'Reg', disabled;
        if(this.state.isGoReg){
        	disabled = true;
        	text = 'Reging...';
        }

		return (
               <input type="button" value={text} disabled={disabled} onClick={this.locationReg}  />
			)
	},
  
  onKeyDownSub: function(e){
     if(e.keyCode !== 13){
        return;
     }
     this.loginSub(e);
  },

	loginSub: function(e){
		 e.preventDefault();
		 var username = React.findDOMNode(this.refs.username).value;
		 var password = React.findDOMNode(this.refs.password).value;
         '' !== username && '' !== password ? this.setState({error:''}) : '';
         '' !== username && '' !== password ? this.executeAction(AuthActions.SignIn, {
         	username:username,
            password:password
         }) : this.setState({
                error: 'Please fill in the user name and password.'
         });
	},

    locationReg: function(e){
         e.preventDefault();
         this.executeAction(AuthActions.regEnter, {});
    }
})



module.exports = Login;

































