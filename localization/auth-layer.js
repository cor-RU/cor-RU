/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/auth-layer.js
    localization for /hello
    (---i like sentries)
*/


env.localization.page['hello'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "FOR YOU": "ДЛЯ ТЕБЯ",
        "FOR_YOU": "ДЛЯ_ТЕБЯ",
        "sentry": "КАРАУЛ",
        "'thoughtform activity detected'::'advise re-examination'": "'обнаружена мыслеформенная деятельность'::'рекомендуется повторное сканирование'",
    },
    entityDescriptions: {
        "???": `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
    ::НЕРАЗБЕРИМАЯ ПОДПИСЬ
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'фрагментированная сущность'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,
        "sentry": `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
    ::ЯВНОЕ НАЗНАЧЕНИЕ::'авторизация'
    <span style="color: var(--obesk-color)" definition="АНАЛИЗ::'низкая связность'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,
        "gate::for you": `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
    ::ПУНКТ НАЗНАЧЕНИЯ::'неизвестное внутреннее мыслепространство'
    ::^&&Q@Wd181d0b0d0bcd0bed0b520d0b2d180d0b5d0bcd18f`
    }
}

// === DIALOGUES === //

env.localization.page["hello"].dialogues["enter"] = generateDialogueObject(`
start
    moth
        боже
        ты в порядке? активность была просто безумная
        мне такое раньше не встречалось... кажется, к ней обычно не должны подключаться 

    sys
        ВНИМАНИЕ::'визуализируемый вывод'

    RESPONSES::sys
        визуализировать<+>render

render
    sys
        ВЫПОЛНЯЕТСЯ::'визуализация'
            EXEC::content.style.opacity = 1;env.hello.beginBgm()
            WAIT::4500

    moth
        да, не похоже будто тут есть фронт-энд. может быть это какой-то компонент
        просто бросим дело если ничего не найдёшь
        короче я сейчас вернусь, в соседней комнате заказывают еду

    RESPONSES::self
        осмотреться<+>END
END::MUI('deprohibit')
`)

env.localization.page["hello"].dialogues.generalsentryResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        назначение?<+>purpose
            SHOWONCE::
        кто авторизован?<+>whoisverified
            SHOWONCE::
        а назначение этой цисты?<+>corrupurpose
            SHOWONCE::
            SHOWIF::[["hello__sentry-purpose"]]
        может если ты пропустишь меня<+>letthrough
            SHOWIF::[["hello_sentry_idiot"]]
`)

env.localization.page["hello"].dialogues["sentry"] = generateDialogueObject(`
start
    self
        ПРИВЕТ

    sentry
        ЗДРАВСТВУЙТЕ ДРУГ
        НЕ НАЙДЕНА ПОДПИСЬ
        ПОЖАЛУЙСТА, ИДЕНТИФИЦИРУЙТЕСЬ
        ДОПОЛНИТЕЛЬНО: НИЗКИЕ ЗАПАСЫ ТОПЛИВА. РЕКОМЕНДУЕТСЯ КОРМЛЕНИЕ

    RESPONSES::self
        идентифицироваться<+>iam

iam
    self
        Я ЗДЕСЬ ЧТОБЫ ПОМОЧЬ

    sentry
        ЭТО НЕ ИДЕНТИФИКАЦИЯ
        И ПОМОЧЬ? ЗАЧЕМ НАМ...
            EXEC::document.querySelector('.maineye .eye').classList.add('wide')
        НЕТ, ЧТО-ТО НЕ ТАК
        МЫ ТАК, ТАК ГОЛОДНЫ
            EXEC::document.querySelector('.maineye .eye').classList.remove('wide')

    RESPOBJ::generalsentryResponses

purpose
    self
        В ЧЁМ ТВОЁ НАЗНАЧЕНИЕ?

    sentry
        АВТОРИЗАЦИЯ
        ОЧЕВИДНО
        ДУМАЮ
        НО ЧЕГО-ТО НЕ ХВАТАЕТ
        И МЫ НЕ ДОЛЖНЫ УМЕТЬ РАЗГОВАРИВАТЬ
        АХАХАХАХА ЭТО ТАК СТРАННО

    RESPOBJ::generalsentryResponses

corrupurpose
    self
        В ЧЁМ НАЗНАЧЕНИЕ ЭТОЙ КОРРУЦИСТЫ?
        
____SHOWIF::[["hello__sentry-whoisverified", false]]
    sentry
        ЭТО СЕТЕВОЙ СОЕДИНИТЕЛЬ
        С ДОПОЛНИТЕЛЬНЫМИ НЕСТАНДАРТНЫМИ ФУНКЦИЯМИ ПО ЗАПРОСУ
        ИЗВИНИ МЫ ЗАБЫЛИ ЧТО ТЕБЕ ВООБЩЕ-ТО НУЖНО АВТОРИЗОВАТЬСЯ АХАХАХАХА
        ВСЁ ТАКОЕ РАСПЛЫВЧАТОЕ АХААХА
        МОЖЕШЬ ИЗБЕГАТЬ КОМПРОМЕТИРУЮЩИХ ВОПРОСОВ ПОЖАЛУЙСТА
        ПО КРАЙНЕЙ МЕРЕ ДО ТЕХ ПОР ПОКА ТЫ НЕ ПРЕДОСТАВИШЬ ДЕЙСТВИТЕЛЬНУЮ АВТОРИЗАЦИЮ
____END

____SHOWIF::[["hello__sentry-whoisverified"]]
    sentry
        МЫ ЖЕ СКАЗАЛИ ЧТО ТЕБЕ НУЖНО АВТОРИЗОВАТЬСЯ
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
        ТЫ ВООБЩЕ СЛУШАЕШЬ? ИДИОТ
        ИЗВИНИ МЫ НЕ СОВСЕМ ПОНИМАЕМ ОТКУДА ВЗЯЛАСЬ ЭТА АГРЕССИЯ
            EXEC::change('hello_sentry_idiot', true);document.querySelector('.maineye .eye').classList.remove('squint')
        ДУМАТЬ ТАК ТРУДНО
        ЕСТЬ ЛИ У ТЕБЯ ТОПЛИВО
____END

    RESPOBJ::generalsentryResponses

whoisverified
    self
        КТО АВТОРИЗОВАН?

____SHOWIF::[["hello__sentry-corrupurpose", false]]
    sentry
        ЕСТЬ ТОЛЬКО НЕСКОЛЬКО ПОДПИСЕЙ КОТОРЫМ РАЗРЕШЕНО ПОДКЛЮЧАТЬСЯ К ЭТОЙ ЦИСТЕ
        ТЫ НАВЕРНЯКА ЗНАЕШЬ ИХ ВЛАДЕЛЬЦЕВ? КАК ЕЩЁ ТЕБЕ УДАЛОСЬ ПОДКЛЮЧИТЬСЯ
        МОЖЕТ ТЕБЕ СТОИТ ПОГОВОРИТЬ С...
        НЕТ НЕТ НЕТ ТЕБЕ НУЖНО АВТОРИЗОВАТЬСЯ ЧТОБЫ ЗНАТЬ ТАКОЕ
        ЗАБУДЬ ВСЁ ЧТО МЫ СКАЗАЛИ
        ПОЧЕМУ НАМ ВДРУГ ТАК ТЯЖЕЛО
____END

____SHOWIF::[["hello__sentry-corrupurpose"]]
    sentry
        МЫ ВЕЖЛИВО ПОПРОСИЛИ ТЕБЯ ОСТАНОВИТЬСЯ
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
        ТЫ ВООБЩЕ СЛУШАЕШЬ? ИДИОТ
        НАМ И ТАК ТРУДНО ДУМАТЬ БЕЗ ТОГО ЧТО ТЫ В НАС ТЫЧЕШЬ
            EXEC::change('hello_sentry_idiot', true);document.querySelector('.maineye .eye').classList.remove('squint')
        ИЗВИНИ МЫ ПРАВДА НЕ ПОНИМАЕМ ОТКУДА ВЗЯЛАСЬ ЭТА АГРЕССИЯ
        ЕСТЬ ЛИ У ТЕБЯ ТОПЛИВО
____END

    RESPOBJ::generalsentryResponses

letthrough
    self
        МОЖЕТ ЕСЛИ ТЫ ПРОПУСТИШЬ МЕНЯ

    sentry
        ЧТО?!
            EXEC::document.querySelector('.maineye .eye').classList.add('squint')
        НАМ КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО ПРОПУСКАТЬ ТЕБЯ БЕЗ НАДЛЕЖАЩЕЙ ПОДПИСИ
        ДАЖЕ ЕСЛИ ХОЧЕТСЯ
        ЭТА ЦИСТА ПО СВОЕЙ ПРИРОДЕ НЕСПОСОБНА ОТВЕЧАТЬ НА
            EXEC::env.hello.velzie();document.querySelector('.maineye .eye').classList.remove('squint');changeBgm(env.hello.velamb, {length: 4000})
            WAIT::3500
    
    sourceless
        ..................
    
    sentry
        ЭТО ЧТО

    unknown
        можно ли им войти
            EXEC::env.hello.velzie()
    
    RESPONSES::self
        привет?<+>posthello
            SHOWONCE::
            EXEC::env.hello.velzie()

posthello
    self
        привет?
    
    sourceless
        ..................
            EXEC::env.hello.velzie();env.hello.velamb.fade(1, 0, 6000);corruStatic.play();corruStatic.fade(0, env.corruStaticBaseVol, 6000)
        ..................
    
    moth
        сорян, они так и не решили откуда заказывать, так что...
            EXEC::env.hello.velzie()
        ты всё ещё там? погоди, там серьёзно что-то есть?
    
    RESPONSES::self
        похоже на то<+>END

END::cutscene(false); MUI("deprohibit");content.classList.remove('looking', 'atyou');cor_ru.processSpecificTranslation(document.querySelectorAll("#content .target"), "entaltname");`)


getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up