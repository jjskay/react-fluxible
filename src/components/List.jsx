var React = require('react');
import Router,{Route, RouteHandler, Link, State, Navigation} from 'react-router';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';
import AuthMixin from '../mixins/AuthMixin';
import {concurrent} from 'contra';
import {IntlMixin,FormattedMessage} from 'react-intl';
import FluxibleMixin from 'fluxible/addons/FluxibleMixin';
import Datas from '../actions/Datas';
import DataStore from '../stores/DataStore';

var List = React.createClass({
    
    mixins: [State, Navigation, FluxibleMixin, IntlMixin, AuthMixin],

    statics:{
        storeListeners: [AuthStore, DataStore],
        fetchData: function (context, params, query, done) {
            concurrent([
                context.executeAction.bind(context, AuthActions.LoadSession, {}),
            ], function () {
                concurrent([
                    context.executeAction.bind(context, Datas.List, {})
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
       var dataStore = this.getStore(DataStore);
       return{
       	    isLoginCookie: authStore.isLoginCookie(),
            list: dataStore.getList()
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
               {
                 this.state.list.map(function(v,i){
                    return <p key={v.id} data-index={i+1}>
                               <span>{i+1}.</span>
                               <Link data-i={i} to="detail" params={{id:v.id}}>{v.id}{v.text}</Link>
                           </p>
                 })
               }
            </div>
        )
  }
})

module.exports = List;