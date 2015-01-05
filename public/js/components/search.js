"use strict";

define(
    "components/search",
    [
        "library/flight/lib/component",
        "components/leftForm",
        "components/data/results",
        "components/ui/results",
        "components/textSearch"
    ],
    function (defineComponent, leftForm, resultsData, results, textSearch) {
        return defineComponent(Search);

        function Search() {
            this.attributes({
                leftForm: "#leftForm",
                results: "#results",
                textSearch: "#textSearch"
            });

            this.after('initialize', function () {
                textSearch.attachTo(this.select("textSearch"));
                leftForm.attachTo(this.select("leftForm"));
                resultsData.attachTo(this.select("results"));
                results.attachTo(this.select("results"));

                /**
                 * @todo Необходимо связать компоненту textSearch с leftForm так, чтобы при выборе вариантов в автокомплите заполнялась форма
                 */
                this.on('change', {
                    leftForm: function (e, data) {
                        this.trigger(this.select("results"), 'changeData', data);
                    },
                    textSearch: function (e, data) {
                        this.trigger(this.select("results"), 'changeData', data);
                        this.trigger(this.select('leftForm'), 'changeData', data);
                    }
                });

            });
        }
    }
);