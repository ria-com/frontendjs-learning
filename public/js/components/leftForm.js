"use strict";

define(
    "components/leftForm",
    [
        "library/flight/lib/component",
        "library/flight/lib/utils",
        "components/data/categories",
        "components/data/marks",
        "components/data/models",
        "components/ui/select"
    ],
    function (definecomponent, utils, categoriesData, marksData, modelsData, select) {
        return definecomponent(leftForm);

        function leftForm() {

            this.attributes({
                category: '#categorySelect',
                mark: '#markSelect',
                model: '#modelSelect'
            });

            this.onChange = function (e) {
                e.stopPropagation();
                this.trigger('change', {
                    marka_id: this.select('mark').val(),
                    category_id: this.select('category').val(),
                    model_id: this.select('model').val()
                });
            };

            this.after('initialize', function () {
                categoriesData.attachTo(this.select('category'));
                select.attachTo(this.select('category'));

                marksData.attachTo(this.select('mark'));
                select.attachTo(this.select('mark'));

                modelsData.attachTo(this.select('model'));
                select.attachTo(this.select('model'));

                this.on('change', {
                    category: utils.compose(this.onChange, function (e) {
                        this.trigger(this.select('mark'), 'changeData', {
                            value: $(e.target).val()
                        });
                        this.trigger(this.select('model'), 'changeData', {
                            category: $(e.target).val(),
                            mark: this.select('mark').val()
                        });
                        return e;
                    }),
                    mark: utils.compose(this.onChange, function (e) {
                        this.trigger(this.select('model'), 'changeData', {
                            category: this.select('category').val(),
                            mark: $(e.target).val()
                        });
                        return e;
                    }),
                    model: utils.compose(this.onChange, function(e){
                        return e;
                    })
                })
            });
        }
    }
);