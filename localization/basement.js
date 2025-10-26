/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/basement.js
    localization for /
    (---yes just /
    ---thats the starting page)
*/


env.localization.page['fbx'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "about this job": "об этой работе",

        "DENDRITIC CYST": "ДЕНДРИТНАЯ ЦИСТА",
        "touch": "потрогать",
        "lift": "поднять",
        "the notes I got say that there were apparently a ton of these on the ship": "в записях говорилось, что на корабле вот таких вот была просто куча",
        "all sorts of sizes too": "причём самых разных размеров",
        "but most were too heavy to retrieve... so we just got this small one": "но большинство были слишком тяжёлыми... так что захватили только одну маленькую",
        "the dendritic cyst has a rigid outer shell. it's unlikely that there's any way to connect to it": "у дендритной цисты жёсткая внешняя оболочка. не похоже, что к ней можно подключиться",
        "the dendritic cyst is surprisingly heavy. turning it in your hands produces a cascade of metallic clinking noises from within. when you set it back down, its tendrils find a new orientation to support itself on the table": "дендритная циста неожиданно тяжела. при повороте изнутри раздаётся каскад звенящих металлических звуков. когда ты ставишь её обратно, её отростки находят новый способ удержаться на столе",

        "FRACTALLINE CYST": "ФРАКТАЛЬНАЯ ЦИСТА", 
        "nobody knows what this one is.. pretty sure it's dead though": "никто не знает, что именно это такое.. но думаю она дохлая",
        "the fractalline cyst's outer shell is slimy and has some yield. if you squeezed it enough, it would probably turn to sludge... best to just leave this one alone": "оболочка фрактальной цисты склизкая и упругая. если ты сожмёшь её сильнее, она наверняка лопнет... лучше оставить её в покое",

        "CYST": "ЦИСТА", 
        "so this is the mystery piece": "а вот и гость программы",
        "it's in bizarrely good condition considering it was at the bottom of the ocean for however long it's been since, y'know": "в поразительно хорошем состоянии, учитывая сколько она провалялась на дне океана с тех пор как, ну знаешь",
        "no clue what it is aside from some similar internal structure to network cysts we've found before": "без малейшего понятия что она делает, но её внутренности напоминают ранее найденные сетевые цисты",
        "the cyst has a solid outer shell. a few circular points near the top are less firm than the rest. in your experience, these are usually connection points. you can definitely scan this point more thoroughly.": "у цисты твёрдая внешняя оболочка, однако несколько круглых точек наверху менее плотные, чем всё остальное. в твоём опыте это обычно точки соединения. ты определённо можешь просканировать их более тщательно.",
        "depth scan": "подробное сканирование",
        "ANALYSIS::'valid nerve point';'connection enabled'": "АНАЛИЗ::'действительная нервная точка';'доступно подключение'",
        "::CORRUCYSTIC ENTITY": "`::КОРРУЦИСТОЗНАЯ СУЩНОСТЬ",
        "::NO FUNCTION SIGNATURE": "::НЕТ ПОДПИСИ ФУКНЦИИ",
        "::CONNECTIVE MEMBRANE EXPOSED": "::ОБНАЖЁННАЯ СОЕДИНИТЕЛЬНАЯ МЕМБРАНА",

        "CYSTIC COLUMN": "ЦИСТОЗНАЯ КОЛОННА", 

        "CONNECTION POINT": "ТОЧКА ПОДКЛЮЧЕНИЯ",

        "attempt connection": "попытаться подключиться",
        "CONNECTION_POINT_LOCATED": "ОБНАРУЖЕНА_ТОЧКА_ПОДКЛЮЧЕНИЯ",
        "__COMMENCING__": "__ЗАПУСК_ПРОЦЕДУРЫ__",   
        
        "plastic box": "пластиковый ящик",
        "use to feed column": "покормить колонну",
        "empty plastic box": "пустой пластиковый ящик",

        "pistol": "пистолет",
        "kill dendritic cyst and feed column": "убить дендритную цисту и покормить колонну",

        "hey buddy": "эй дружище",
        "welcome back": "добро пожаловать",
        "you ready to feed this thing?": "ну что, накормим эту штуку?",
        "haven't heard back on the request yet": "со мной ещё не связались по поводу запроса",
        "so, still killing time here": "так что пока убиваем время"
    },
    entityDescriptions: {
        "dendritic cyst": `::КОРРУЦИСТОЗНАЯ СУЩНОСТЬ
::ПОДПИСЬ ФУКНЦИИ: КОНТЕЙНЕР
::НЕТ ОБНАЖЁННОЙ СОЕДИНИТЕЛЬНОЙ ТКАНИ`,
        "fractalline cyst": `::КОРРУЦИСТОЗНАЯ СУЩНОСТЬ
::ПОВРЕЖДЁННАЯ ПОДПИСЬ ФУКНЦИИ
::НЕТ ОБНАЖЁННОЙ СОЕДИНИТЕЛЬНОЙ ТКАНИ`,
        "cystic column": `::КОРРУЦИСТОЗНАЯ СУЩНОСТЬ
::ПОДПИСЬ ФУКНЦИИ: ОБСЛУЖИВАНИЕ КОРРУЦИСТЫ
::НЕТ ОБНАЖЁННОЙ СОЕДИНИТЕЛЬНОЙ ТКАНИ`,
        "cyst": `::КОРРУЦИСТОЗНАЯ СУЩНОСТЬ
::НЕТ ПОДПИСИ ФУКНЦИИ
::ОБНАЖЁННАЯ СОЕДИНИТЕЛЬНАЯ МЕМБРАНА`,
        "connection point": `::КОМПОНЕНТ КОРРУЦИСТОЗНОЙ СУЩНОСТИ
::ДЕЙСТВИТЕЛЬНАЯ ТОЧКА СОЕДИНЕНИЯ`,
        "plastic box": `::СИНТЕТИЧЕСКИЙ КОНТЕЙНЕР
::СОДЕРЖИТ ИНЕРТНЫЙ МЕТАЛЛ`,
        "empty plastic box": `::СИНТЕТИЧЕСКИЙ КОНТЕЙНЕР
::ПУСТОЙ`,
        "pistol": `::ПНЕВМАТИЧЕСКИЙ ПИСТОЛЕТ С ВЫДВИГАЮЩИМСЯ УДАРНЫМ СТЕРЖНЕМ
::МОДЕЛЬ 2052 Г.Е.Т.
::ОБНАРУЖЕНЫ НЕЗАКОННЫЕ МОДИФИКАЦИИ`,
    }
}

// === DIALOGUES === //
    // see everystuff.js for depthrecovery dialogue

    
// == MOTH == //

env.localization.page["fbx"].dialogues.mthhubresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        где нашли эти цисты?<+>where
        что делать с этим пистолетом<+>gun
            SHOWIF::[["ep1_showmaterials", "both"], ["ep1_fed", true]]
        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`)
env.localization.page['fbx'].dialogues["mth++fbx"] = generateDialogueObject(`
start
    self
        у меня есть вопрос

    moth
        ага?
    
    RESPOBJ::mthhubresp

gun
    self
        так что, мы просто оставим этот пистолет?

    moth
        о, ну
        знаешь, он может пригодиться
        если честно мне просто не хотелось его ну вот прям щас возвращать лол
        вроде НИОКР он не сильно нужен, им нечасто приходится что-то убивать
        я верну попозже
    
    RESPOBJ::mthhubresp

where
    self
        откуда это всё достали?
    
    moth
        с какого-то крушения на дне океана недалеко от новой зеландии
        и под "недалеко" я имею в виду, типа, километров так за тыщу от юго-восточного берега
        просто всё это нашли в такой жопе мира что...
        ну, мне показалось ничего ближе новой зеландии ты не узнаешь
        они считают что оно отплыло достаточно далеко от того места, где изначально упало
        по их оценкам, провалялось там внизу лет 20-30 если не больше

    RESPOBJ::mthhubresp
`)


env.localization.page['fbx'].dialogues["index"] = generateDialogueObject(`
start 
    moth
        эй, дружище, добро пожаловать 
        честно у меня были сомнения, что ты появишься на такой мелкий улов
        в последнее время находят столько кораблекрушений
        в любом случае сейчас я всё запущу, можешь пока осмотреться
        
    sourceless
        декодирующие машины включаются, бросая свет на паутину проводов.
            EXEC::document.querySelectorAll('.backwall').forEach(e=>e.classList.add('active'))
        
    RESPONSES::self
        что это<+>whatis
        сесть<+>sit
            SHOWIF::["PAGE!!intrositting", false]
            EXEC::change('PAGE!!intrositting', true)

whatis
    self
        что это?
    moth
        находка с обескового крушения недалеко от новой зеландии
        в записях говорится, почти всё расплавилось, что немного странно...
        во всяком случае... главная из них это вот эта большая
        пьедесталы обычно означают "важно", но этот непомеченный
        алекс сделал базовый скан, сказал напоминает сетевой узел
        мы даже не знаем наверняка, примет ли оно мыслекол
        ну, тебе платят так или иначе, так что... терзай
        
    RESPONSES::self
        сесть<+>sit
            SHOWIF::["PAGE!!intrositting", false]
            EXEC::change('PAGE!!intrositting', true)
        активировать мыслекол<+>END
            SHOWIF::"PAGE!!intrositting"
        
sit
    sourceless
        металлический стул царапает бетон. ты садишься.
            EXEC::env.introSit()
            WAIT::3500

    sourceless
        сиденье холодное и неудобное. свет от твоего защитного снаряжения рассеивается в перламутровых цистах.
        
    moth
        как по старинке - мыслекол на готове

    RESPONSES::self
        что это<+>whatis
            SHOWONCE::
        активировать мыслекол<+>END
        
END::env.enableSpikeCursor();MUI('deprohibit')
`)



getLocalizationForPage(true) // --- ensuring that Nothing Gets Fucked Up