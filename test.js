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


    const $prioritySelect = $('#priority-select');
    const $saveButton = $('.case_update_button'); // Кнопка "СОХРАНИТЬ"
    
    // Функция для проверки выбранного значения
    function updateSaveButtonState() {
        if ($prioritySelect.val() === '') {
            $saveButton.prop('disabled', true).addClass('disabled'); // Блокируем кнопку
        } else {
            $saveButton.prop('disabled', false).removeClass('disabled'); // Разблокируем
        }
    }
    
    // Проверяем при загрузке страницы
    updateSaveButtonState();
    
    // Проверяем при изменении выбора
    $prioritySelect.on('change', updateSaveButtonState);
});