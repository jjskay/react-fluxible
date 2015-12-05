var express = require('express');
var db = require('./db');

var EditService = {
    name: 'edit',
    update: function(req, resource, params, body, config, callback){
        if(params){
        	callback(err, true);
        }else{
        	callback('Edit Fail!',null);
        }
    }
}

module.exports = EditService;