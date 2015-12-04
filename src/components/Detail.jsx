var React = require('react');
import Router,{Route, RouteHandler, Link, State, Navigation} from 'react-router';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';
import AuthMixin from '../mixins/AuthMixin';
import {concurrent} from 'contra';
import {IntlMixin,FormattedMessage} from 'react-intl';
import FluxibleMixin from 'fluxible/addons/FluxibleMixin';
import DetailAction from '../actions/DetailAction';
import DetailStore from '../stores/DetailStore';
import TabSelect from './UI/TabSelect';

var Detail = React.createClass({
    
    mixins: [State, Navigation, FluxibleMixin, IntlMixin, AuthMixin],

    statics:{
        storeListeners: [AuthStore, DetailStore],
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
       var dataStore = this.getStore(DetailStore);
       return{
       	    isLoginCookie: authStore.isLoginCookie(),
            cont: dataStore.getCont()
       }
    },

    onChange: function(){
       var states = this.getStateFromStores();
       if(!states.isLoginCookie){
       	  this.transitionTo('/login');
       }else{
       	  this.setState(this.getStateFromStores());
       }
    },

	render : function(){

        return (
            <div>
               <h3>{this.state.cont.title}</h3>
               <div>
                  <p>{this.state.cont.text}</p>
               </div>
               <p>
                  <Link to="/list">返回列表</Link>
               </p>
               <TabSelect />
            </div>
        )
  }
})

module.exports = Detail;