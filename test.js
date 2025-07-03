$(function() {/**
     * Добавляем падающий снег, если ваши сотрудники будут работать в Новый Год :)
     * Результат в коде Омнидеска https://www.dropbox.com/s/ilkkfmf81s63zjw/07_snow.png?dl=0
     * Результат на странице: https://www.dropbox.com/s/yp36vle7yu7vm38/07_2_snow.png?dl=0
     */
    $.get('https://cdnjs.cloudflare.com/ajax/libs/JQuery-Snowfall/1.7.4/snowfall.jquery.min.js', {

    }, function(jsLibCode) {
        $("body").append($("<script />", {
            html: jsLibCode + ' $(document).snowfall({flakeColor : "yellow", shadow: true});',
        }));
    });

    /**
     * Таким образом можно менять и добавлять любые кнопки, формы и код на странице обращения.
     */
});