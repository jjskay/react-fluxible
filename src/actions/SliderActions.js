var SliderStore = require('../stores/SliderStore');


var SliderActions = {};

SliderActions.MouseEnter = function(context, payload, done){
	context.dispatch('MOUSE_ENTER', {});
}

SliderActions.MouseLeave = function(context, payload, done){
	context.dispatch('MOUSE_LEAVE', {});
}



module.exports = SliderActions;
































