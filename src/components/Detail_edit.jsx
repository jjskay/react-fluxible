var React = require('react');
import Router,{Route, RouteHandler, Link, State, Navigation} from 'react-router';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';
import AuthMixin from '../mixins/AuthMixin';
import {concurrent} from 'contra';
import {IntlMixin,FormattedMessage} from 'react-intl';
import FluxibleMixin from 'fluxible/addons/FluxibleMixin';
import EditAction from '../actions/EditAction';
import EditStore from '../stores/EditStore';
import DetailAction from '../actions/DetailAction';
import DetailStore from '../stores/DetailStore';

var Detail_edit = React.createClass({

	mixins: [State, Navigation, IntlMixin, AuthMixin, FluxibleMixin],

	statics:{
		storeListeners: [AuthStore, EditStore, DetailStore],
		fetchData: function (context, params, query, done) {
            concurrent([
                context.executeAction.bind(context, AuthActions.LoadSession, {}),
            ], function () {
                concurrent([
                    context.executeAction.bind(context, DetailAction.GetCont, {id:params.id})
                ], done)
            })
        }
	},

	contextTypes: {
        getStore: React.PropTypes.func.isRequired
    },

	getInitialState: function(){
    	return this.getStateFromStores();
    },

    getStateFromStores: function(){
       var authStore = this.getStore(AuthStore);
       var editStore = this.getStore(EditStore);
       var detailStore = this.getStore(DetailStore);
       return{
       	    isLoginCookie: authStore.isLoginCookie(),
            detail: detailStore.getCont(),
            editDetail: editStore.getEdit(),
            editSucc: editStore.getSuccStatus()
       }
    },

    onChange: function(){
    	var states = this.getStateFromStores;
    	if(!states.isLoginCookie){
    	  console.log(states.isLoginCookie)
       	  // this.transitionTo('/login');
       }else{
       	  this.setState(this.getStateFromStores());
       }
    },

    render: function(){
    	return (
    		<div>
    			<p><input type="text" value={this.state.detail.title} /></p>
    			<div>
    				<textarea>{this.state.detail.text}</textarea>
    			</div>
    			{this.button()}
    		</div>
    	)
    },

    button: function(){
    	return (
    		<div>
    			<button onClick={this.editSub}>提交</button>
    			<Link to="/list">返回列表</Link>
    		</div>
    	)
    },

    editSub: function(){
    	console.log(1)
    }
})


module.exports = Detail_edit;









