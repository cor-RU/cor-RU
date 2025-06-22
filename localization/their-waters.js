env.localization.page['localocean'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "you can really tell this was a long time ago, jesus. look at how small their island is": "бож, и впрямь видно что это было очень давно. гляди какой мелкий у них остров",

        "stilted shore": "неестественный берег",

        "dive": "нырнуть",
        "rise": "вынырнуть",
    }, 
    entityDescriptions: {
        "the embassy": `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА
ОШИБКА::'необрабатываемая сущность'::НЕВИЗУАЛИЗИРУЕМО
<span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>`,
        'gate::the depths': `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
::ПУНКТ НАЗНАЧЕНИЯ::'низкоразмерное мыслепространство';'внутреннее'
<span style="color: var(--obesk-color)" definition="АНАЛИЗ::'частичное нарушение связности'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'почему ты здесь'</span>`,
        'stilted shore': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание';'символизм'
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'сцена нашего θтрёхглазого представления'</span>`,
    }
}

if(check('hub__funfriend-ep1fed')) cor_ru.embassyCoherent();