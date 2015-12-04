var TabAction = {}
// var AuthStore = require('../stores/AuthStore');


TabAction.change = function(context, payload, done){
    context.dispatch('TAB_CHANGE_INDEX', payload);
}


module.exports = TabAction;