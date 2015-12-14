// var Immutable = require('immutable');
var express = require('express');
// var db = require('./db');
// var _ = require('lodash');
var createId = require('./createId');
var fs = require('fs');

var UserService = {
    name: 'user',
    read: function (req, resource, params, config, callback) {

        callback(null,{});
    },
    update: function(req, resource, params, body, config, callback){
        fs.readFile('./src/data.json','utf-8',function(err,data){
            var text = JSON.parse(data).user;
            var userinfo = null;
            text.map((v,i) => {
                if(params.username == v.name && params.password == v.password){
                    userinfo = {
                        id: {
                            uid: params.username
                         }
                    }
                }
            })
            callback(null, userinfo);
        })
    }

}


module.exports = UserService;