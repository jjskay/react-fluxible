var EditAction = {}
// var AuthStore = require('../stores/AuthStore');


EditAction.GetContent = function(context, payload, done){
   var sessionId = 'detail' + payload.id;
   if(context.sessionStorage.get(sessionId)){
   	   context.dispatch('DATA_GET_DETAIL',context.sessionStorage.get(sessionId));
   	   done();
   	   return;
   }
   context.service.read('detail', payload, {}, function(err, data){
        context.dispatch('DATA_GET_DETAIL', data);
   	    var sId = 'detail' + data.id;
        context.sessionStorage.set(sId, data);
        done();
   })
}

EditAction.EditContent = function(context, payload, done){
   context.service.update('edit', payload, {text:payload.obj}, function(err, data){
   	   if(err){throw err};
   	   if(data){
   	   	  context.dispatch('Edit_SUCCESS',{});
   	   	  done();
   	   }
   })
}

module.exports = EditAction;









