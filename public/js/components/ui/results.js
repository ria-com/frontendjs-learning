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

                /**
                 * @todo Взять под контроль этот процесс - грузить паралельно и в общем колбеке убирать/показывать спиннер
                 */
                data.results.forEach(function (item, index) {
                    this.getData(item).then(function(data){
                        this.$node.append('<div class="col-xs-6 col-md-3"><a href="#" class="thumbnail"><img width="180" height="171" src="'+data.photo+'" alt="..."></a></div>');
                    }.bind(this));
                }.bind(this));
            };
            this.after('initialize', function () {
                this.on('dataChanged', this.renderResults);
            });
        }
    }
);