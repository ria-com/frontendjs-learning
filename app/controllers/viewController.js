"use strict";

(function(){
    var config = require('config'),
        request = require('koa-request');
    module.exports = {
        getAction: function * getAction(next){
            var data = JSON.parse((yield request({
                url: [
                    'http://',
                    config.rest.search.host,
                    '/blocks_search_ajax/view/auto/',
                    this.params.id,
                    '/?lang_id=2'
                ].join('')
            })).body);
            this.body = {
                photo: ['https://', 'cdn.riastatic.com/photosnew/', data.result.photo_data.photo.seo_link.replace('.jpg', 'bx.jpg')].join('')
            };
            yield next;
        }
    }
}());