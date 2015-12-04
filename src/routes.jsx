var React = require('react');
var Router = require('react-router');

var { Route, DefaultRoute, NotFoundRoute, Redirect } = Router;
// var components = require('./components');
// var { App, Login, List, NotFound } = components;
var App = require('./components/App');
var Login = require('./components/Login');
var List = require('./components/List');
var NotFound = require('./components/NotFound');
var IndexSlider=require('./components/UI/IndexSlider');
var Reg = require('./components/Reg');
var Detail = require('./components/Detail');

var routes = (
         <Route name="app" handler={App} path="/">
             <Route name="default" handler={IndexSlider} path="/" />
             <Route name="login" handler={Login} path="/login" />
             <Route name="list" handler={List}  path="/list" />
             <Route name="reg" handler={Reg}  path="/reg" />
             <Route name="detail" handler={Detail} path="/detail/:id" />
             <NotFoundRoute handler={NotFound} name="not-found" />
         </Route>
	)

module.exports = routes;
























