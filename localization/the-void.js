env.localization.page['localorbit'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "this thoughtspace is pretty damn big... i'm not seeing much of a reason for it either": "это мыслепространство чертовски огромное... даже не вижу этому особой причины",
        "don't forget you moved akizet's ship to the ocean thoughtspace! kinda wild it can just move like that": "не забывай что корабль акизет сейчас в мыслепространстве с океаном! дико что он может вот так вот просто двигаться",
        "about the void": "о пустоте",
    }, 
    entityDescriptions: {
        'proxyfriend?': `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'вспомогательное приложение';'подключён к центральному ассистенту'`,
        'gate::the dull contrivance': `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
::ТОЧКА НАЗНАЧЕНИЯ::ОШИБКА::'необрабатываемая сущность'::НЕВИЗУАЛИЗИРУЕМО
<span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>`
    }
}


// - DIALOGUES - //
env.localization.page['localorbit'].dialogues.fairyresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        что ты такое?<+>what
            SHOWIF::['localorbit__fairy-what', false]

____SHOWIF::['localorbit__fairy-what', true]
        что ты такое?<+>what2
        как я могу помочь?<+>help
        как ты поможешь мне?<+>helpme
____END

        пока<+>END
            EXEC::content.classList.remove('showfairy')
`)
env.localization.page['localorbit'].dialogues["fairy"] = generateDialogueObject(`
loop
    RESPOBJ::fairyresp

start
____SHOWIF::['localorbit__fairy-what', false]
    proxyfriend
        привет!
            EXEC::page.buddy_fairy.center()
        здесь всё выглядит хорошо!
        особенно после моих починок!
        починок!!
        хорошо! хорошо! хорошо!
    
____SHOWONCE::
    moth
        эй, сорян что перебиваю,
        но с вот этим всё нормально?
        выглядит как один из инструментов развледруга, но....
        мой вывод ведёт себя странно
    
    self
        за ним что-то есть
        или к нему присоединено
        подожди-ка
____END

____SHOWIF::['localorbit__fairy-what', true]
    proxyfriend
        привет лазутчик!
            EXEC::page.buddy_fairy.center()
        просто чиню штуки!
        хочешь мне помочь...?
____END
    
    RESPOBJ::fairyresp

what
    self
        что ты такое?
    
    proxyfriend
        я - проксидруг!
        я чиню мыслепространство!
        забавный вопрос! глупый!
        но вот что <em>ты</em> такое?
        и что у тебя с подписью...?
    
    self
        меня называют лазутчиком
        я исследую пропажу акизет
    
    proxyfriend
        о
        о!
        так значит мы можем помочь друг другу! да!!
    
    sys
        ВНИМАНИЕ::'обнаружена неопределённая мыслеформенная активность'
            EXEC::content.classList.add('showfairy')
        ПРЕДУПРЕЖДЕНИЕ::'обнаружена ошибка связности';'некритическая';'визуализация продолжается'
    
    fairy
        ты хочешь информацию, да? воспоминания?
        мне нужно вернуться к своим друзьям!
        и ты мне поможешь!
        и потом я бы помогла тебе!
        а затем мы будем праздновать!
        хорошо? хихихи

____SHOWONCE::
    moth
        поосторожнее тут
        возможно это какая-то странно проявляющаяся бессвязная мыслеформа
        ну, может у неё таки найдётся что-нибудь полезное
____END
    
    RESPONSES::self
        окей...<+>loop
            FAKEEND::(продолжить)

what2
    self
        ты мне не ответила
        что ты такое?
        почему ты здесь?
    
    fairy
        хихихи
            EXEC::content.classList.add('showfairy')
        помоги мне!
        помоги мне и я расскажу!
        обещаю! я обещаю!
    
    RESPONSES::self
        окей...?<+>loop
            FAKEEND::(назад)

help
    self
        как я могу помочь?
    
    fairy
        разыщи мой дом!
            EXEC::content.classList.add('showfairy')
        во тьме! в пробелах между!
        разыщи оружие и принеси его мне!
        и я стану свободна!
        ура!!
    
    self
        ок но где твой дом?
    
    fairy
        я не помню
            EXEC::content.classList.add('showfairy')
        я здесь взаперти!
        тиран меня похитил! тиран!
        он посадил меня сюда!
        а вся моя память до сих пор дома...
        так что найди его!
    
    RESPONSES::self
        отлично спасибо<+>loop
            FAKEEND::(назад)

helpme
    self
        как ты мне поможешь?
    
    fairy
        я знаю многое!
            EXEC::content.classList.add('showfairy')
        туннели... пробелы между! я помню их!
        ты ведь тоже хочешь знать, правда?
        о, столькое можно лицезреть!!
        но я прикована к этому месту!
        представь, как мы будем веселиться, когда я освобожусь!
        освобожусь!!
    
    RESPONSES::self
        звучит круто<+>loop
            FAKEEND::(назад)
`)
env.localization.page['localorbit'].dialogues["fairy_beacon"] = generateDialogueObject(`
start
    fairy
        о! сияние!
            EXEC::content.classList.add('showfairy');page.buddy_fairy.center()
        совет, совет, я тебя слышу!!
        я вырвусь на свободу! я вернусь!
        лазутчик--найди меня в моем пристанище
            SHOWIF::"localorbit__fairy"
        незнакомец--найди меня в моем пристанище
            SHOWIF::["localorbit__fairy", false]
        мы будем пировать! мы будем плясать в кронах вейльков!
        ахахаха!!! ура! ура!!
        в джокзи озо!!
    
    sourceless quiet
        ...
            EXEC::flash(true);forcePlay('criticalError', 1.5);

    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная деятельность'
        ВНИМАНИЕ::'удалены данные'
            EXEC::page.buddy_fairy.remove({removeEl: true, leaving: false});flash(false)

    RESPONSES::self
        ок пока<+>END

END::vfx({type: "beacon", state: false})
`)

env.localization.page['localorbit'].dialogues.mthvoidresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        открытие серое?<+>dull
            SHOWIF::[['EXEC::env.localization.page.localorbit.dialogues.mthvoidresp.scannedDull()']]

        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`)
env.localization.page.localorbit.dialogues.mthvoidresp.scannedDull = ()=>{
    try {
        if(flags.detectedEntities["..__THE_VOID__.."].entities["gate::the dull contrivance"].scanned) {
            return true
        } else {
            return false
        }
    } catch(e) {
        return false
    }
}
env.localization.page['localorbit'].dialogues["mth++localorbit"] = generateDialogueObject(`
start
    self
        у меня есть вопрос об этой мыслеформе

    moth
        давай, нападай
    
    RESPOBJ::mthvoidresp

dull
    self
        что ты знаешь об открытии серое?
    
    moth
        да не так уж много за исключением того что оно всё ещё там
        и что, оказывается, органическая жизнь не выживает проход через него, так что им могут пользоваться только куу
        по крайней мере, так они говорили в некоторых старых интервью
        а вот как по мне, я думаю они просто не хотят гостей в родном мире
        ...
        сорян я тут на логи смотрю
        по-видимому твой мыслекол говорит что это соединительная мыслеформа?
        может с помощью этой штуки мы сможем как следует рассмотреть обескию
        если починить её вообще получится

    RESPOBJ::mthvoidresp
`)