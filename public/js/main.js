"use strict";


requirejs.config({
    urlArgs: 'v=' + (new Date().getTime()),
    shim   : {
        'library/q/q'                                   : {
            exports: 'Q'
        }
    }
});

define(
    "main",
    [
        "library/jquery/dist/jquery",
        "components/search"
    ],
    function ($, search) {
        search.attachTo(document);
    }
);