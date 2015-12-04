var React = require('react');
var Router = require('react-router');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var { Route, RouteHandler, Link, State, Navigation } = Router;
var classSet = require('classnames');
var AuthStore = require('../stores/AuthStore');
var AuthActions = require('../actions/AuthActions');
var Reg = React.createClass({
    
    contextTypes: {
		router: React.PropTypes.func.isRequired
	},

	mixins: [FluxibleMixin],

	statics: {
		storeListeners: [AuthStore]
	},

	getInitialState: function(){
		return this.getStateFromStores();
	},

	getStateFromStores: function(){
		return {
			isSignIn: this.getStore(AuthStore).isSignIn(),
			isGoReg: this.getStore(AuthStore).isGoReg(),
      isRegSuc: this.getStore(AuthStore).isRegSuc(),
      error: this.getStore(AuthStore).isRegError()
		}
	},

	onChange: function(){
		this.setState(this.getStateFromStores());
	},

	render: function(){
        return (
            <div className="loginBody">
                <form onSubmit={this.locationReg}>
                   <p><label>Username:<input type="text" ref="username" placeholder="username" /></label></p>
                   {' '}
                   <p><label>Email:<input type="email" ref="email" placeholder="Email" /></label></p>
                   {' '}
                   <p><label>Password:<input type="password" ref="password" placeholder="password" /></label></p>
                   {' '}
                   <p><label>Repassword:<input type="password" ref="repassword" placeholder="Repassword" /></label></p>
                   {' '}
                   <p style={{color:'red'}}>{this.state.error}</p>
                   {' '}
                   <div className="loginBottom">
                   	  {this.regButton()}
                   </div>
                </form>
                {this.changInit()}
            </div>
        )
	},

	regButton: function(){
        var text = 'Sub', disabled;
        if(this.state.isGoReg){
        	disabled = true;
        	text = 'Subing...';
        }

		return (
               <input type="submit" value={text} disabled={disabled}  />
			)
	},

    locationReg: function(e){
         e.preventDefault();
         var username = React.findDOMNode(this.refs.username).value.replace(/(^\s+)|(\s+$)/g, "");
         var email = React.findDOMNode(this.refs.email).value.replace(/(^\s+)|(\s+$)/g, "");
         var password = React.findDOMNode(this.refs.password).value.replace(/(^\s+)|(\s+$)/g, "");
         var repassword = React.findDOMNode(this.refs.repassword).value.replace(/(^\s+)|(\s+$)/g, "");
         var a = false, b= false, c = false, d = false;
         var errors;
         
         username !== '' ? a = true : a = false;
         email !== '' ? b = true : b = false;
         password !== '' ? c = true : c = false;
         repassword !== '' && repassword == password ? d = true : d = false;
         !a ? errors = 'Please fill in your username.' : '';
         a && !b ? errors = 'Please fill in a valid email address.' : '';
         a && b && !c ? errors = 'Please fill in your password' : '';
         a && b && c && !d ? errors = 'Please fill in your password again (the two password must be the same).' : '';
         a && b && c && d ? errors = '' : '';
         
         this.setState({error:errors})
         a && b && c && d ? this.executeAction(AuthActions.regIng, {
              username : username,
              email : email,
              password : password
         }) : '';
    },

    changInit: function(){
       var classSuc, uname;
       this.state.isRegSuc ? classSuc = 'regOn' : classSuc = 'regOff';
       this.state.isRegSuc ? uname = this.state.isRegSuc : uname = '';
       return (
           <div className={classSuc}>
               <span  className="show">
                   <p>尊敬的<b style={{color:'red',margin:'0 10px'}} className="inline lh30">{uname}</b>用户!你已注册成功，3秒后会跳转到登录页面！</p>
               </span>
           </div>
        )
    }
})



module.exports = Reg;

































