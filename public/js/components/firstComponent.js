"use strict";

define(
    'components/firstComponent',
    [
        'library/jquery/dist/jquery',
        'library/flight/lib/component'
    ],
    function ($, defineComponent) {
        return defineComponent(FirstComponent);
        function FirstComponent() {
            this.attributes({
                modes: [0, 1, 2, 3, 4]
            });

            this.after('initialize', function () {
                /**
                 * Периодически генерим событие changeMode
                 */
                setInterval(function () {
                    this.trigger('changeMode', {
                        value: this.attr.modes[Math.floor(Math.random()*this.attr.modes.length) /* Вот столько элементов нам надо показать */
                    ]});
                }.bind(this), 2000);
            });
        }
    }
);