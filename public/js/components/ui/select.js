"use strict";

define(
    "components/ui/select",
    [
        "library/flight/lib/component"
    ],
    function (defineComponent) {
        return defineComponent(Select);
        function Select() {

            this.refreshOptions = function refreshOptions(e, data) {
                this.$node.find('option')
                    .remove();

                this.$node.append($('<option value="0">Выберите</option>'))
                data.options.forEach(function (item, index) {
                    this.$node.append($('<option value="' + item.value + '">' + item.name + '</option>'));
                }.bind(this));
            };

            this.after('initialize', function () {
                this.on('dataChanged', this.refreshOptions);
                this.trigger('changeData');
            });
        }
    }
);