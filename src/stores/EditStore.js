var createStore = require('fluxible/addons/createStore');

var EditStore = createStore({
	storeName: 'EditStore',
    handlers: {
    'DATA_GET_DETAIL': 'changDetail',
    'EDIT_DETAIL': 'editDetail',
    'Edit_SUCCESS': 'replaceTo' 
    },

    initialize: function(){
        this.cont = {title:'',text:'',id:''};
        this.edit = false;
        this.replace = false;
    },

    changDetail: function(cont){
    	this.cont = cont;
    	this.emitChange();
    },

    replaceTo: function(v){
    	this.replace = true;
    	this.emitChange();
    },

    editDetail: function(val){
        this.edit = val;
        this.emitChange();
    },

    getCont: function(){
    	return this.cont;
    },

    getEdit: function(){
        return this.edit;
    },

    getSuccStatus: function(){
        return this.replace;
    },

    dehydrate: function(){
		return {
            cont: this.cont,
            edit: this.edit,
            replace: this.replace
        }
    },

    rehydrate: function(state){
        this.cont = state.cont;
        this.edit = state.edit;
        this.replace = state.replace;
    }


})

module.exports = EditStore;