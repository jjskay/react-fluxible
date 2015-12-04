var express = require('express');
var fs = require('fs');

var RegService = {
    name: 'reg',
    read: function (req, resource, params, config, callback) {
       
        callback(null,{});
    },
    update: function(req, resource, params, body, config, callback){
    	var fileText;
    	var obj = {};
        obj.name = params.username;
        obj.email = params.email;
        obj.password = params.password;
    	fs.readFile('./src/data.json','utf-8',function(err,data){
              var text = JSON.parse(data);
              var bl = false;
              fileText = text;
              text.user.map(v => {
                if(v.name == params.username){
                    bl = true;
                }
              })
        	  fileText.user.push(obj);
              bl ? callback(null,false) : fs.writeFile('./src/data.json',JSON.stringify(fileText),function(err){
	              if(err){console.log(err);callback(null,false);};
	              callback(null,params.username)
	          })
    	})
        

      
    }
  
}


module.exports = RegService;