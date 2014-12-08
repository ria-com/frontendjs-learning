"use strict";

define(
    "components/data/marks",
    [
        "library/flight/lib/component",
        "library/q/q"
    ],
    function (defineComponent, Q) {
        return defineComponent(Marks);

        function Marks() {
            this.getData = function getData(e, data) {
                var category = (data?data.value:0) || 0,
                    url = [
                        "http://",
                        "127.0.0.1:2014",
                        "/categories/",
                        category,
                        "/marks"
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

            this.after('initialize', function () {
                this.on('changeData', this.getData);
            });
        }
    }
);