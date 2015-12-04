var createStore = require('fluxible/addons/createStore');

var AuthStore = createStore({
	storeName: 'AuthStore',

	handlers: {
		'LOAD_SESSION':'loadsession',
		'LOCATION_TO_SIGN': 'signLocationChange',
		'LOCATION_TO_INDEX': 'indexLocationChange',
		'LOCATION_TO_REG': 'regEnter',
		'LOCATION_LEAVE_REG': 'regLeave',
		'SIGN_IN_SUCCESS': 'signIn',
        'SIGN_OUT_SUCCESS': 'signOut',
        'SIGN_IN_FAID': 'signFaid',
        'REG_SUCCESS_START': 'regSucStart',
        'REG_SUCCESS_END': 'regSucEnd',
        'REG_FAIL': 'regFail'
	},

	initialize: function(){
        this.SignIn = false;
        this.SignOut = false;
        this.signLocation = false;
        this.GoReg = false;
        this.loginStatusCookie = '';
        this.errors = '';
        this.regSuc = false;
        this.regError = '';
	},

	loadsession:function(uid){
		this.loginStatusCookie = uid;
        this.emitChange();
	},

    regFail: function(){
        this.regError = 'Users have been registered.';
        this.emitChange();
    },

    isRegError: function(){
        return this.regError;
    },

    regEnter: function(){
         this.GoReg = true;
         this.errors = '';
         this.emitChange();
    },
    
    regSucStart: function(user){
         this.regSuc = user;
         this.regError = '';
         this.emitChange();
    },

    regSucEnd: function(user){
         this.regSuc = false;
         this.emitChange();
    },

    isRegSuc: function(){
        return this.regSuc;
    },

    regLeave: function(){
        this.GoReg = false;
        this.emitChange();
    },

    isError: function(){
        return this.errors;
    },
    
    signLocationChange: function(){
        this.signLocation = true;
        this.emitChange();
    },
    
    indexLocationChange: function(){
        this.signLocation = false;
        this.emitChange();
    },

    isSignIn: function(){
         return this.SignIn;
    },

    isSignLocation: function(){
         return this.signLocation;
    },
    
    signFaid: function(){
         this.errors = 'User name or password error!';
         this.emitChange();
    },

    signIn: function(user){
         user.id.uid ? this.loginStatusCookie = user.id.uid : this.loginStatusCookie = null  ;
         !user.id.uid ? this.errors = 'User name or password error!' : this.errors = '';
         this.emitChange();
    },

    signOut: function(){
         this.loginStatusCookie = null;
         this.emitChange();
    },

    isLoginCookie: function(){
         return this.loginStatusCookie 
    },

    isGoReg: function(){
         return this.GoReg;
    },

    isSignOut: function(){
         return this.SignOut;
    },

	dehydrate: function(){
		return {
            SignIn: this.SignIn,
            SignOut: this.SignOut,
            signLocation: this.signLocation,
            loginStatusCookie: this.loginStatusCookie,
            regSuc: this.regSuc
		}
	},

	rehydrate: function(state){
        this.SignIn = state.SignIn;
        this.SignOut = state.SignOut;
        this.signLocation = state.signLocation;
        this.loginStatusCookie = state.loginStatusCookie;
        this.regSuc = state.regSuc;
	}
})

module.exports = AuthStore;






































