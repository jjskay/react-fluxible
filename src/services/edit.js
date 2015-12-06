var express = require('express');
var db = require('./db');

var EditService = {
    name: 'edit',
    update: function(req, resource, params, body, config, callback){
    	console.log(1)
        if(params){
        	callback(null, true);
        }else{
        	callback('Edit Fail!',null);
        }
    }
}

module.exports = EditService;