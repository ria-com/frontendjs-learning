"use strict";

define(
    "components/data/models",
    [
        "library/flight/lib/component",
        "library/q/q"
    ],
    function(defineComponent, Q){
        return defineComponent(Models);

        function Models(){

            this.getData = function getData(category, mark){
                category = category || 0;
                mark = mark || 0;
                var url = [
                        "http://",
                        "127.0.0.1:2014",
                        "/categories/",
                        category,
                        "/marks/",
                        mark,
                        "/models"
                    ].join(''),
                    deferred = Q.defer();
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: 'json',
                    success: deferred.resolve,
                    error: deferred.reject
                });
                deferred.promise.then(function (options) {
                    this.trigger('dataChanged', {options: options});
                }.bind(this));
            };

            this.after('initialize', function(){
                this.on('changeData', function(e, data){
                    var args = [];
                    if(data){
                        for(var i in data){
                            args.push(data[i]);
                        }
                    }
                    this.getData.apply(this, args);
                });
            });
        }
    }
);