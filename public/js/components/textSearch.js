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

                var searchAutocomplete = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    remote: 'http://127.0.0.1:2014/suggest?q=%QUERY'
                });

                searchAutocomplete.initialize();

                this.select("input").typeahead(null, {
                    name: 'search-phrases',
                    displayKey: 'text',
                    source: searchAutocomplete.ttAdapter()
                });
                this.select("input").focus();

                this.on("typeahead:selected", function(e, data){
                    e.preventDefault();
                    this.trigger('change', data.payload);
                });
            });
        }
    }
);