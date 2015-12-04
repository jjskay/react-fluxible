var createStore = require('fluxible/addons/createStore');

var SliderStore = createStore({
    storeName: 'SliderStore',

    handlers: {
    	'MOUSE_ENTER': 'enter',
    	'MOUSE_LEAVE': 'leave'
    },

    initialize: function(){
    	this.isMouse = false;
    },

    enter: function(){
    	this.isMouse = true;
    	this.emitChange();
    },

    leave: function(){
    	this.isMouse = false;
    	this.emitChange();
    },

    isMouses: function(){
    	return this.isMouse;
    },

    dehydrate: function(){
    	return {isMouse: this.isMouse}
    },

    rehydrate: function(state){
    	this.isMouse = state.isMouse;
    }

})


module.exports = SliderStore;


































