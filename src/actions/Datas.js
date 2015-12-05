var Datas = {}
// var AuthStore = require('../stores/AuthStore');


Datas.List = function(context, payload, done){
   if(context.sessionStorage.get('list')){
   	   context.dispatch('DATA_GET_DETAIL',context.sessionStorage.get('list'));
   	   done();
   	   return;
   }
   context.service.read('list', payload, {}, function(err, data){
        context.dispatch('DATA_GET_LIST', data);
        context.sessionStorage.set('list', data)
        done();
   })
}


module.exports = Datas;









