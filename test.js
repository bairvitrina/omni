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
     // Находим элемент с классом .lbl внутри label для приоритета
    const $priorityLabel = $('label.rlt.select-lbl.case-priority-colorful span.lbl');
    
    // Добавляем span со звездочкой после текста "Приоритет" (но перед shortcut)
    if ($priorityLabel.length && !$priorityLabel.find('.star').length) {
        $priorityLabel.html(function(_, html) {
            // Вставляем звездочку после "Приоритет", но перед shortcut
            return html.replace('Приоритет', 'Приоритет<span class="star">*</span>');
        });
    }
    
    // Добавляем стили для звездочки (если их еще нет)
    if (!$('style:contains(".star")').length) {
        $('head').append('<style>.star { color: #f00; margin-left: 3px; }</style>');
    }











    const $select = $('#priority-select');
    if (!$select.length) return;
    
    // Добавляем "Не выбран" только если такой опции нет
    if (!$select.find('option[value=""]').length) {
        $select.prepend('<option value="" selected>Не выбран</option>');
    }
    
    // Обновляем Chosen, если он есть
    if ($select.data('chosen')) {
        $select.trigger('chosen:updated');
    } else {
        // Если Chosen появится позже — отслеживаем
        new MutationObserver(() => {
            if ($select.data('chosen')) {
                $select.trigger('chosen:updated');
                this.disconnect();
            }
        }).observe($select[0], { attributes: true });
    }


    // 1. Добавляем звездочку к label "Приоритет"
    const $priorityLabel = $('label.rlt.select-lbl.case-priority-colorful span.lbl');
    if ($priorityLabel.length && !$priorityLabel.find('.star').length) {
        $priorityLabel.prepend('<span class="star">*</span>');
        $('head').append('<style>.star { color: #f00; margin-right: 3px; }</style>');
    }

    // 2. Функция проверки приоритета и управления кнопками
    function checkPriority() {
        const isPrioritySelected = $('#priority-select').val() !== '';
        
        // Блокируем/разблокируем кнопки
        $('.case_update_button, .alpha3_btn_delay')
            .prop('disabled', !isPrioritySelected)
            .toggleClass('disabled', !isPrioritySelected);
        
        // Для ссылки (не button) дополнительно меняем pointer-events
        $('.alpha3_btn_delay').css('pointer-events', isPrioritySelected ? 'auto' : 'none');
        
        // Подсветка поля если не выбрано
        $('label.case-priority-colorful').toggleClass('error-field', !isPrioritySelected);
    }

    // 3. Проверяем при загрузке страницы
    checkPriority();
    
    // 4. Вешаем обработчик на изменение приоритета
    $('#priority-select').on('change', checkPriority);
    
    // 5. Для Chosen (если используется)
    if ($('#priority-select').data('chosen')) {
        $('#priority-select').on('chosen:updated', checkPriority);
    }
    
});