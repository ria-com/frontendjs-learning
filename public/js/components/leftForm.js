"use strict";

define(
    "components/leftForm",
    [
        "library/flight/lib/component",
        "library/flight/lib/utils",
        "library/async/lib/async",
        "components/data/categories",
        "components/data/marks",
        "components/data/models",
        "components/ui/select"
    ],
    function (definecomponent, utils, async, categoriesData, marksData, modelsData, select) {
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

            this.elementDependencies = {
                "model_id": ["category_id", "marka_id"],
                "marka_id": ["category_id"]
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
                });

                this.on('changeData', function(e, data){
                    var asyncFunctions = {},
                        _this = this;

                    /**
                     * Формируем массив функций
                     */
                    for(var paramName in data){
                        if(this.elementDependencies[paramName]){
                            /**
                             * Если элемент зависим, тогда внутри функции подписываемся на событие готовности данных
                             */
                            (function(paramName){
                                asyncFunctions[paramName] = _this.elementDependencies[paramName].concat(function(next){
                                    var select = _this.$node.find('[name="'+paramName+'"]');
                                    _this.on(select, 'dataChanged', function(){
                                        select.val(data[paramName]);
                                        _this.trigger(select, 'change');
                                        return next();
                                    });
                                });
                            }(paramName));
                        }else{
                            /**
                             * Если элемент независим, тогда просто усанавливаем ему нужное нам значение
                             */
                            (function(paramName){
                                asyncFunctions[paramName] = function(next){
                                    var select = _this.$node.find('[name="'+paramName+'"]');
                                    select.val(data[paramName]);
                                    _this.trigger(select, 'change');
                                    return next();
                                }
                            }(paramName));
                        }
                    }
                    /**
                     * Запускаем функции на выполнение
                     */
                    async.auto(asyncFunctions, function(err, results){
                        console.log('err --> ', err);
                    });
                });
            });
        }
    }
);