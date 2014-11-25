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
- настроить установку всех необходимых пакетов 
- собрать весь код в один файл при помощи оптимизатора require.js