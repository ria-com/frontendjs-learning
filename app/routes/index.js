"use strict";

(function () {
    module.exports = function routes(app, passport) {


        var Router = require('koa-router'),
            router = new Router();

        router
            .get('/categories', require('../controllers/categoriesController').getAction)
            .get('/categories/:category/marks', require('../controllers/markscontroller').getAction)
            .get('/categories/:category/marks/:mark/models', require('../controllers/modelsController').getAction)
            .get('/search', require('../controllers/searchController').getAction)
            .get('/view/:id', require('../controllers/viewController').getAction)
            .get('/suggest', require('../controllers/suggestController').getAction);

        app.use(router.middleware())

    }
}());