var Immutable = require('immutable');
var express = require('express');
var db = require('./db');

var ListService = {
    name: 'list',
    read: function(req, resource, params, config, callback){
        var cookie_uuid = req.cookies.uuid;
            if(!cookie_uuid){
        		callback(null, []);
        		return;
            }
            var data = [
                {text: '咨询-title1',id:2},
                {text: '咨询-title2',id:5},
                {text: '咨询-title3',id:6},
                {text: '咨询-title4',id:9}
            ]
            callback(null, data);
    }
}

module.exports = ListService;