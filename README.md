Чтобы стянуть данные примеры, необходимо у себя в консоли выполнить следующую комманду:
```bash
git clone https://github.com/ria-com/frontendjs-learning.git
```

Урок 1. Компонентный подход и Require.js
===================

Чтобы перейти к данному уроку, необходимо выполнить следующую команду в папке с проектом:
```bash
git checkout -f first_lesson
```

В примере, который находится в репозитории, есть скрипт:

```javascript
    <script>
        $(document).ready(function () {
            $('#firstTable').click(function (e) {
                e.preventDefault();
                if (e.target.tagName === 'TD') {
                    $('#secondTable tbody').append($(e.target.parentNode));
                }
            });
            $('#secondTable').click(function (e) {
                e.preventDefault();
                if (e.target.tagName === 'TD') {
                    $('#firstTable tbody').append($(e.target.parentNode));
                }
            });
        });
    </script>
```
Его надо вынести в отдельный модуль и подключить на страницку при помощи *require.js*.

Также, есть скрипт, подключающий *jquery* - его тоже необходимо подключить при помощи *require.js*. Как сделать это можно посмотреть [тут](http://requirejs.org/docs/api.html#config-shim)

Как подключить на страничку *require.js* можно почитать по [ссылке](http://requirejs.org/docs/start.html#get)

Если понадобится презентация - её можно посмотреть [тут](https://docs.google.com/a/ria.com/presentation/d/1tX7CKmrJ6ebHGyWIdbWsxoSzvK3gSGVA_mq-ArJPk-o/edit?usp=sharing)

[Тут](http://habrahabr.ru/post/152833/) неплохая статья о том, как начать работу require.js

Урок 2. Основы [Flight.js](https://github.com/flightjs/flight)
========================

Чтобы перейти к данному уроку, необходимо выполнить следующую команду в папке с проектом:
```bash
git checkout -f second_lesson
```

Простейший компонент, написанный для Flight.js выглядит следующим образом:

```javascript
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
            /* Параметры по умолчанию */
            this.attributes({
                children: '.child'
            });

            this.after('initialize', function () {
                /* Описываем тут, что необходимо сделать после инициализации */
                this.select('children').css('color', 'red');
            });
        }
    }
);
```

Зависимость от *jquery* является обязательной. Также, чтобы компонент мог привязываться к DOM элементам, его необходимо обвернуть специальной функцией. Она называется **component** и находится в дистрибутиве *flight.js*.

Соответственно, подключить его можно следующим образом:

```javascript
"use strict";

define(
    'main',
    [
        'components/firstComponent'
    ],
    function (firstComponent) {
        firstComponent.attachTo(document);
        /* или */
        firstComponent.attachTo('#some_css_selector');
        /* можно переопределить его атрибуты по умолчанию */
        firstComponent.attachTo('#some_css_selector', {
            children: '.other-child'
        });
    }
);
```

В примере, которые находится в репозитории есть **firstComponent** - он по определенному алгоритму генерирует событие *changeMode* и передает данные тому, кто на это событие подписался. В этих данных содержится число элементов, которые необходимо отобразить подписчикам.

Суть задания в следующем: необходимо описать **secondComponent** так, чтобы он слушал событие генерируемое **firstComponent** и в зависимости от того, какие данные он получит, - показывал определенное количество элементов *.thumbnail* внутри элемента *#thumbnails*.

Данные передаются в виде объекта. Например:

```javascript
{
    value: 2
}
```

Полученный **secondComponent** необходимо подключить в **main.js** файле данного проекта.
Ответы на многие вопросы можно получить [тут](https://github.com/flightjs/flight/blob/master/doc/README.md).
Если понадобится презентация - вот [ссылка](https://docs.google.com/a/ria.com/presentation/d/1HAVzKiqfnLg3Wmh0wsG6zGdhnZmZ0g-hj2kOLosItCA/edit?usp=sharing)

Урок 3. Bower и require.js - автоматизация сборки клиентского кода
==================================================================
Перечень ресурсов:
- [Презентация](https://docs.google.com/a/ria.com/presentation/d/1ZtigTbWKPJm5oj03Ce3yMJ56MDYxQ-CPkArZhxlvlHs/edit?usp=sharing)
- [Документация по npm](https://www.npmjs.org/doc/misc/npm-scripts.html)
- [Документация по require.js](http://requirejs.org/docs/optimization.html#wholeproject)

Домашнеее задание: 
- взять результат выполнения предыдущего задания
- настроить установку всех необходимых пакетов
- собрать весь код в один файл при помощи оптимизатора require.js


Урок 4. Обещания, async и CORS
==============================
Чтобы перейти к данному уроку, необходимо выполнить команду
```bash
git checkout -f fourth_lesson
```

Чтобы запустить данный пример, выполните команду:
```bash
npm install
```

Перечень ресурсов:
- [Презентация](https://docs.google.com/a/ria.com/presentation/d/1FJafavP32_W_-gyF9UX8o_6IyCnWmWTM1rv0JOoVT4Q/edit?usp=sharing)
- [Документация по Q](https://github.com/kriskowal/q)
- [Документация по async](https://github.com/caolan/async)
- [Что такое CORS?](https://ru.wikipedia.org/wiki/Cross-origin_resource_sharing)
- [Как писать middleware для koa.js?](http://koajs.com/#application)

Домашнее задание:
- На серверной части в файле **app/app.js** описать *middleware*, который будет отдавать правильный заголовок *Access-Control-Allow-Origin*
- На клиентской части в файле **public/js/components/ui/results.js** необходимо взять под контроль загрузку результатов поиска. Грузить их паралельно и в одном колбеке показывать/скрывать спиннер
- На клиентской части в файле **public/js/components/search.js** необходимо связать две компоненты: *textSearch* и *leftForm*, чтобы при выборе варианта из автокомплита заполнялась форма слева


Как надо и как не надо писать javascript
=============================

Избегайте конкатенации строк в критических местах:

```javascript
historyBlock.set("link", "/search/?view_type_id=1&" + item.query_str);
```

Упрощайте структуры **if-else**, если они отличаются всего одним параметром:

```javascript
this.on(this.select('agreement'), 'change', function(e){
    if($(e.target).is("":checked"")){
        $(e.target).removeClass('show-error');
        this.Agreement = true;
        $(this.select('submitForm')).removeClass('grey disabled').addClass('green');
    }else{
        this.Agreement = false;
        $(e.target).addClass('show-error');
        $(this.select('submitForm')).removeClass('green').addClass('grey disabled');
    }
}.bind(this));
```

```javascript
/* Клик ссылку ""Технические характеристики"" */
this.select('showTech').on('click', function(){
    $(this.select('techBlock')).slideToggle('', function() {
        if($(this).is("":hidden"")){
            $('#showTech').find('i').removeClass('icon-add__arru').addClass('icon-add__arrd');
        }else{
            $('#showTech').find('i').removeClass('icon-add__arrd').addClass('icon-add__arru');
        }
    });
}.bind(this));
```

Делегируйте обработку событий правильно:

```javascript
var categoryId = $(e.target).val();
this.trigger(this.select('markaId'), 'changeData', {
    value: categoryId
});
this.trigger(this.select('subCategory'), 'changeData', {
    value: categoryId
});
this.trigger(this.select('options'), 'changeData', {
    value: categoryId
});
this.trigger(this.select('driveId'), 'changeData', {
    value: categoryId
});
this.setCharacteristics(categoryId);
```

Сокращайте записи с логическим оператором **ИЛИ**:
```javascript
if (resp.result) {
    if (resp.response_code == 1 || resp.response_code == 2) {
        this._showVerificationCodeInput(data.phone);
    }
}
```

Избегайте прямого указания css-селекторов непосредственно в коде:

```javascript
/* Клик ссылку ""Технические характеристики"" */
this.select('showTech').on('click', function(){
    $(this.select('techBlock')).slideToggle('', function() {
        if($(this).is("":hidden"")){
            $('#showTech').find('i').removeClass('icon-add__arru').addClass('icon-add__arrd');
        }else{
            $('#showTech').find('i').removeClass('icon-add__arrd').addClass('icon-add__arru');
        }
    });
}.bind(this));
```

Не надо вешать обработчики событий при помощи конкатенации строк и свойства innerHTML:

```javascript
var rozdelName = "ЧЕРНОВИКИ";
var rozdelLink = "/user/menu/?section=active&viewType=draft";
var rozdelOnclick = "_gaq.push(['_trackEvent', 'Search_Gallery_Flight', 'Click_on_Draft', 'Block_Not_Published']);";
var payurl = "/user/buypoints/autoId/"+autoId+"/publish/1";
if(view_type === 'awaitingPayment'){
    rozdelName = "Ожидают оплаты";
    rozdelLink = "/user/menu/?section=active&viewType=awaitingPayment";
    rozdelOnclick = "_gaq.push(['_trackEvent', 'Search_Gallery_Flight', 'Click_on_Awaiting_Payment', 'Block_Not_Published']);";
    this.getOrderUrl(autoId).then(function (response){
        if (response && response.url) {
            payurl = response.url;
            payButton.click('click', function (e){
                this.newWindowOpen(payurl,1000,700);
            }.bind(this));
        }else{
            this.on(payButton, 'click', function (e){
                this.publicateAuto(autoId).then(function(status){
                    if(status == 0){
                        this._render();
                    }
                }.bind(this));
            });
        }
    }.bind(this), function (err){ console.warn(err);});
}else{
    this.on(payButton, 'click', function (){
        this.publicateAuto(autoId).then(function(status){
            if(status == 0){
                this._render();
            }
        }.bind(this));
    });
}
p_wrap.append('<strong class="red"><a class="red" onclick="'+rozdelOnclick+'" href="'+rozdelLink+'">'+rozdelName+'</a></strong>');
```