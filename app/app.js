var koa = require('koa'),
    config = require('config');

var app = koa();

require('./routes')(app);

/**
 * @todo Написать правильный middleware, который позволит слать AJAX запросы на сервер
 */

app.listen(config.server.port, function () {
    console.log('%s listening at port %d', config.app.name, config.server.port);
});
