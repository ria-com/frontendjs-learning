Урок 1. Компонентный подход и Require.js
===================

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