"use strict";

define(
    "components/data/results",
    [
        "library/flight/lib/component",
        "library/q/q"
    ],
    function(defineComponent, Q){
        return defineComponent(Results);

        function Results(){
            this.getData = function getData(e, data){
                delete data.el;
                var url = [
                        "http://",
                        "127.0.0.1:2014",
                        "/search"
                    ].join(''),
                    deferred = Q.defer();
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: 'json',
                    data: data,
                    success: deferred.resolve,
                    error: deferred.reject
                });
                deferred.promise.then(function (data) {
                    this.trigger('dataChanged', {results: data.result.search_result.ids});
                }.bind(this));

            };
            this.after('initialize', function(){
                this.on('changeData', this.getData);
            });
        }
    }
);