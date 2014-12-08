"use strict";

define(
    "components/textSearch",
    [
        "library/flight/lib/component",
        "library/typeahead.js/dist/typeahead.bundle"
    ],
    function (defineComponent) {
        return defineComponent(TextSearch);

        function TextSearch() {
            this.attributes({
                input: "input"
            });
            this.after('initialize', function(){

                var bestPictures = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    remote: 'http://127.0.0.1:2014/suggest?q=%QUERY'
                });

                bestPictures.initialize();

                this.select("input").typeahead(null, {
                    name: 'best-pictures',
                    displayKey: 'text',
                    source: bestPictures.ttAdapter()
                });

                this.on()
            });
        }
    }
);