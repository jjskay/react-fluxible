var createStore = require('fluxible/addons/createStore');

var TabStore = createStore({
	storeName: 'TabStore',
    handlers: {
    'TAB_CHANGE_INDEX': 'changIndex',
    },

    initialize: function(){
        this._index = 0;
    },

    changIndex: function(cont){
    	this._index = cont.index;
    	this.emitChange();
    },

    getIndex: function(){
    	return this._index;
    },

    dehydrate: function(){
		return {
            _index: this._index,
        }
    },

    rehydrate: function(state){
        this._index = state._index;
    }


})

module.exports = TabStore;