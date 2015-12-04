var AuthStore = require('../stores/AuthStore');
var AuthStore = require('../stores/AuthStore');
var DataStore = require('../stores/DataStore');

var AuthActions = {};

AuthActions.LoadSession =  function(context, payload, done){

	var token = context.cookie.get('uuid')

	context.dispatch('LOAD_SESSION', token);
	
	done();
}

AuthActions.SignIn = function(context, payload, done){
	
	context.service.update('user', payload, {}, function(err, user){
        	if(user){
				context.dispatch('SIGN_IN_SUCCESS', user);
	        	user.id.uid ? context.cookie.set('uuid', user.id.uid) : '';
        		user = JSON.stringify(user);
	        	sessionStorage.setItem('user', user);
	        }else{
	        	context.dispatch('SIGN_IN_FAID', {});
	        }
	        done();
	})
	
}

AuthActions.regIng = function(context, payload, done){
	context.dispatch('LOCATION_TO_REG', {})
	setTimeout(function(){
		context.dispatch('LOCATION_LEAVE_REG', {})
		context.service.update('reg', payload, {}, function(err, data){
			if(data){
               context.dispatch('REG_SUCCESS_START', data)
               setTimeout(function(){
               	 context.dispatch('REG_SUCCESS_END', false)
                 context.getRouter().transitionTo('/login');
               },3000)
			}else{
               context.dispatch('REG_FAIL', {})
			}
			done();
		})
	},1000)
	
}

AuthActions.signOut = function(context, payload, done){
    context.cookie.clear('uuid');
	context.dispatch('SIGN_OUT_SUCCESS',{});
	context.sessionStorage.clear();
	done();
}

AuthActions.regEnter = function(context, payload, done){
	context.dispatch('LOCATION_TO_REG', {})
	setTimeout(function(){
		context.dispatch('LOCATION_LEAVE_REG', {})
		context.getRouter().transitionTo('/reg');
	},1000)
	done();
}

AuthActions.signTo = function(context, payload, done){
	context.dispatch('LOCATION_TO_SIGN', {});
	context.getRouter().transitionTo('/login');
}

AuthActions.backIndex = function(context, payload, done){
	context.dispatch('LOCATION_TO_INDEX', {});
	context.getRouter().transitionTo('/');
}





module.exports = AuthActions;






























