// var Immutable = require('immutable');
// var express = require('express');
// var db = require('./db');

var DetailService = {
    name: 'detail',
    read: function(req, resource, params, config, callback){
        var cookie_uuid = req.cookies.uuid;
        var detailId = params.id;
            if(!cookie_uuid){

        		callback(null, []);
        		return;
            }
            var data = [
                {id:'00'},
                {id:2,title:'咨询-title-1',text:'1、进入域名管理页面：域名管理页面是由购买域名时，域名提供商所提供的。如不清楚域名提供商，可先查询域名提供商。'},
                {id:5,title: '咨询-title-2',text:'2、找到cname记录设置的位置：'},
                {id:6,title: '咨询-title-3',text:'3、添加cname记录：'},
                {id:9,title: '咨询-title-4',text:'4、Cname：pop.域名          别名主机：pop.exmail.qq.com（海外用户别名主机请设置为：hwpop.exmail.qq.com ）'}
            ];
            var error = {title:'Not-Found!',text:'not-dound!'}
            var k = null;
            for( let i=0;i<data.length;i++){
            	detailId == data[i].id ? k = i : '';
            }
            var reslut ;
            
            k ? reslut = data[k] : reslut = error;
            callback(null, reslut);
    }
  
}


module.exports = DetailService;