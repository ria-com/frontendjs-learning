"use strict";

define(
    'main',
    [
        'components/firstComponent'
    ],
    function (firstComponent, secondComponent) {

        /**
         * Этот компонент генерит событие и говорит всем, кто его слушает сколько элементов надо показывать
         */
        firstComponent.attachTo('#thumbnails');
    }
);