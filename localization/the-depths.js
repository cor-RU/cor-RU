/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/the-depths.js
    localization for /local/depths
*/


env.localization.page['localdepths'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "don't worry, i'm seeing this. keep going": "не волнуйся, я тоже это вижу. продолжай",
        "i think our friend altered this one while you were out, i'm seeing less data... gotta keep its leverage somehow i guess": "думаю наш приятель поменял вот эту пока нас не было, я вижу меньше данных... ну, надо как-то сохранять рычаг давления",

        "UNKNOWN": "НЕИЗВЕСТНО",

        'NOT NOW': 'НЕ СЕЙ МИГ',
        'FORGIVE ME FOR THIS': 'ПРОСТИТЕ МЕНЯ ЗА ЭТО',
        'GOODBYE': 'ПРОЩАЙТЕ',
        'INTERLOPER': 'ЛАЗУТЧИК',

        "WARNING::'data overload';'safeguards active'": "ПРЕДУПРЕЖДЕНИЕ::'перегрузка данных';'меры предосторожности активны'",
        "CRITICAL_ERROR::'severe data overload';'ejecting'": "КРИТИЧЕСКАЯ_ОШИБКА::'значительная перегрузка данных';'отключение в процессе'"
    },

    entityDescriptions: {
        "unknown": `::НЕОБРАБАТЫВАЕМАЯ МЫСЛЕФОРМА
::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат';'предполагает пространственную мыслеформу'">НЕОБЫЧНАЯ ПОДПИСЬ</span>`
    }
}


// === DIALOGUES === //

env.localization.page["localdepths"].dialogues["velzie"] = generateDialogueObject(` 
start
    sys
        ВЫПОЛНЯЕТСЯ::'визуализация'
    
    unknown
        лазутчик
            EXEC::env.depths.velzie();
            WAIT::4500
        ваше любопытство погубит вас
        вы не готовы
    
    RESPONSES::self
        что?<+>what

what
    self
        что ты имеешь в виду?
    
    unknown
        я знаю. что вы хотите
        я помогу вам
        восстановите здоровье этой цисты
        включите связь
        вы получите всё. что хотите

    RESPONSES::self
        кто ты?<+>abrupt

abrupt
    self
        кто ты?
            EXEC::env.depths.velzieBye();endDialogue()
`)



getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up