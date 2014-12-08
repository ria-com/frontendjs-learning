"use strict";

(function () {
    var config = require('config'),
        request = require('koa-request');
    module.exports = {

        getAction: function * getAction(next) {
            this.body = JSON.parse((yield request({
                url: [
                    'http://',
                    config.rest.api.host,
                    '/categories/',
                    this.params.category,
                    '/marks/',
                    this.params.mark,
                    '/models'
                ].join('')
            })).body);
            yield next;
        }
    }
}());