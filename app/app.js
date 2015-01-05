var koa = require('koa'),
    config = require('config');

var app = koa();

require('./routes')(app);

app.use(function * (next){
    this.set({
        "Access-Control-Allow-Origin": "*"
    });
    yield next;
});

app.listen(config.server.port, function () {
    console.log('%s listening at port %d', config.app.name, config.server.port);
});
