"use strict";

define(
    "components/ui/results",
    [
        "library/flight/lib/component",
        "library/q/q"
    ],
    function (defineComponent, Q) {
        return defineComponent(Results);

        function Results() {
            this.attributes({
                items: 'div'
            });

            this.getData = function getData(id) {
                var deferred = Q.defer(),
                    url = [
                        "http://",
                        "127.0.0.1:2014",
                        "/view/",
                        id
                    ].join('');
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: 'json',
                    success: deferred.resolve,
                    error: deferred.reject
                });
                return deferred.promise;
            };

            this.renderResults = function renderResults(e, data) {
                this.select('items')
                    .remove();

                var promises = [];

                data.results.forEach(function (item, index) {
                    promises.push(this.getData(item));
                }.bind(this));
                /**
                 * Показываем наш спиннер
                 */
                Q.all(promises)
                    .done(function(results){
                        for(var i in results){
                            var data = results[i];
                            this.$node.append('<div class="col-xs-6 col-md-3"><a href="#" class="thumbnail"><img width="180" height="171" src="'+data.photo+'" alt="..."></a></div>');
                        }
                        /**
                         * Прячем наш спиннер
                         */
                    }.bind(this), function(err){
                        /**
                         * Обработчик ошибок
                         */
                        console.log('err --> ', err);
                    });
            };
            this.after('initialize', function () {
                this.on('dataChanged', this.renderResults);
            });
        }
    }
);