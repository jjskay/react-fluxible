var createStore = require('fluxible/addons/createStore');

var DetailStore = createStore({
	storeName: 'DetailStore',
    handlers: {
    'DATA_GET_DETAIL': 'changDetail',
    },

    initialize: function(){
        this.cont = {title:'',text:'',id:''};
    },

    changDetail: function(cont){
    	this.cont = cont;
    	this.emitChange();
    },

    getCont: function(){
    	return this.cont;
    },

    dehydrate: function(){
		return {
            cont: this.cont,
        }
    },

    rehydrate: function(state){
        this.cont = state.cont;
    }


})

module.exports = DetailStore;