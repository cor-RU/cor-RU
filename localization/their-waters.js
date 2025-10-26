/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/their-waters.js
    localization for /local/ocean
*/


env.localization.page['localocean'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "you can really tell this was a long time ago, jesus. look at how small their island is": "бож, и впрямь видно что это было очень давно. гляди какой у них мелкий остров",

        "stilted shore": cor_ru.entity_menu["stilted shore"].name,

        "dive": "нырнуть",
        "rise": "вынырнуть",
    }, 
    entityDescriptions: {
        'our dull vessel': cor_ru.entity_menu["our dull vessel"].desc,
        'their vessel': cor_ru.entity_menu["their vessel"].desc,
        "the embassy": cor_ru.entity_menu["the embassy"].desc,
        'gate::the depths': cor_ru.entity_menu["gate::the depths"].desc,
        'stilted shore': cor_ru.entity_menu["stilted shore"].desc
    }
}



getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up