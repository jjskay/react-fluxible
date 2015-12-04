var createStore = require('fluxible/addons/createStore');

var DataStore = createStore({
	storeName: 'DataStore',
    handlers: {
    'DATA_GET_LIST': 'changList',
    },

    initialize: function(){
        this.list = [];
    },

    changList: function(list){
    	this.list = list;
    	this.emitChange();
    },

    getList: function(){
    	return this.list;
    },

    dehydrate: function(){
		return {
            list: this.list,
        }
    },

    rehydrate: function(state){
        this.list = state.list;
    }


})

module.exports = DataStore;