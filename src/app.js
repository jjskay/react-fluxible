var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');

var app = new Fluxible({
    component: require('./routes')
});

app.plug(fetchrPlugin({
    xhrPath: '/api',
    xhrTimeout: 10000
}))

app.plug(require('./plugins/cookie'));
app.plug(require('./plugins/router')());
app.plug(require('./plugins/sessionStorage'));

app.registerStore(require('./stores/AuthStore'));
app.registerStore(require('./stores/SliderStore'));
app.registerStore(require('./stores/DataStore'));
app.registerStore(require('./stores/DetailStore'));
app.registerStore(require('./stores/TabStore'));
app.registerStore(require('./stores/EditStore'));

module.exports = app;

























