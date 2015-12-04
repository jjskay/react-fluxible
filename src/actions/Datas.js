var Datas = {}
// var AuthStore = require('../stores/AuthStore');


Datas.List = function(context, payload, done){
   context.service.read('list', payload, {}, function(err, data){
        context.dispatch('DATA_GET_LIST', data);
        
        done();
   })
}


module.exports = Datas;









