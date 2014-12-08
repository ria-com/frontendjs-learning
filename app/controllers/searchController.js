"use strict";

(function () {
    var config = require('config'),
        request = require('koa-request');

    module.exports = {
        getAction: function * getAction(next) {
            this.body = JSON.parse((yield request({
                url: [
                    'http://',
                    config.rest.search.host,
                    '/blocks_search_ajax/search/?countpage=16&',
                    this.request.querystring
                ].join('')
            })).body);
            yield next;
        }
    }
}());