var DetailAction = {}
// var AuthStore = require('../stores/AuthStore');


DetailAction.GetCont = function(context, payload, done){
   var sessionId = 'detail' + payload.id;
   if(context.sessionStorage.get(sessionId)){
   	   context.dispatch('DATA_GET_DETAIL',context.sessionStorage.get(sessionId));
   	   done();
   	   return;
   }
   context.service.read('detail', payload, {}, function(err, data){
        context.dispatch('DATA_GET_DETAIL', data);
   	    var sId = 'detail' + data.id;
        context.sessionStorage.set(sId, data)
        done();
   })
}


module.exports = DetailAction;









