env.localization.page['dullvessel'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "did akizet not have furniture? this ship is so empty... honestly i kinda hope it just got lost through incoherence or something": "у акизет что, мебели не было? такой пустой корабль... ес честно надеюсь что она просто пропала из-за бессвязности или подобного",
        "woah... look at this, dude. this is a different thoughtspace, somehow": "воу... ток погляди на это. каким-то образом это другое мыслепространство",
        "looks like funfriend's restored a little bit here, there's definitely more data than before": "похоже развледруг тут потрудился, здесь точно прибавилось данных",
        "about the dull vessel": "о судне серое",

        'pilot cyst': `циста-пилот`,
        'glazika': `глазика`,
        'container': `контейнер`,
        'climbing wall': `скалодром`,
        'dull heart': `сердце серое`,
        'workspace': `рабочее место`,
        'translation slab': `переводная плита`,
        'column': `колонна`,
        'bright ground-parasite': `светлый землепаразит`,
        'advanced rejuvenation chamber': `продвинутая омолаживающая камера`,
        'high-pressure body': `тело высокого давления`,
        'personal storage': `личное хранилище`,
        'equipment storage': `хранилище оборудования`,

        /*pilot cyst*/ "unfinished": "незаконченное",
        /*pilot cyst*/ "business": "дело",
        
        
        /*glazika*/ "what a strange dream akizetesche!!": "что за странный сон акизетеше!!",
        /*glazika*/ "by the way, i organized your room!": "к слову, я привела в порядок вашу комнату!",
        /*glazika*/ "we had to fix one of the walls because it was acting up!": "пришлось починить одну из стен потому что она сбоила!",
        /*akizet*/ "ah, thank you, my glazika": "ах, благодарю, моя глазика",
        /*sourceless*/ "i did not say anything about a dream...": "я ничего не говорила о каком-то сне...",

        /*moth*/ "that \"container\" looks familiar": "этот \"контейнер\" выглядит знакомо",
    },

    entityDescriptions: {
        'pilot cyst': `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
<span style="color: var(--obesk-color)" definition="ПРЕДУПРЕЖДЕНИЕ::'в большинстве необрабатываемая сущность';'может быть неточной'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'великий разум моего судна'</span>`,

        'glazika': `::ОТЗЫВЧИВАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'`,

        'container': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'обработанные металлы, легкодоступные'</span>`,

        'parasite plane': `::ЭМПИРИЧЕСКАЯ МЫСЛЕФОРМА
::НЕВИЗУАЛИЗИРУЕМА
<span style="color: var(--obesk-color)" definition="АНАЛИЗ::'пункт назначения превышает порог бессвязности';'рекомендуется починка'">::ЗАПРЕДЕЛЬНАЯ БЕССВЯЗНОСТЬ</span>
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'простая игра управления ресурсами и воровством';'любима в ${processDefinitionsInString("олтазни")}'</span>`,

        'climbing wall': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'ностальгическая имитация пещерного камня';'угождает <span class="code">личиночному</span> инстинкту лазания'</span>`,

        'dull heart': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'устройство за пределами моего понимания';'uses its grasp upon the <span class='code'>dull</span> plane as locomotive leverage';'советуют не пялиться'</span>`, // позже

        'workspace': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'визуальный дисплей с применением люминесцентных роев корру';'помогает с многозадачностью'</span>`,

        'translation slab': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'сборник светлых записей, предоставленный послом';'отчёты о прогрессе со штормом'</span>`,

        'column': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'инструмент ремонтного обслуживания';'место для моей личной цисты'</span>
<span style="color: var(--obesk-color)" definition="АНАЛИЗ::'нарушена крайней бессвязностью поблизости';'рекомендуется расследование'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,

        'bright ground-parasite': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'очаровательные светлые существа, подарки от подруги';'содержатся в цистах, насыщенных кислородом'</span>`,

        'advanced rejuvenation chamber': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'уникальная обстановка'
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'предоставляет уют сна, даже в ${processDefinitionsInString("θсмерти")}';'спроектирована как капсула для выживания в случае обвала серое'</span>`,

        'high-pressure body': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'уникальная обстановка'
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'запасное тело для работ на экстремальных глубинах';'специализированная система управления давлением;'неудобно для повседневного пользования'</span>`,

        'personal storage': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'`,

        'equipment storage': `::НЕОТЗЫВЧИВАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'повторяющаяся обстановка'`,
    }
}


// -- DIALOGUES -- //

env.localization.page["dullvessel"].dialogues["pilot"] = generateDialogueObject(`
start
    akizet
        здравствуй тх¥Ӱ́Йг^Ӟ×¯Юõф±
    
    pilot cyst
        им%¶º½Òмõ‹СК’æÃE:Ӷ‹©é·0³Жºҹ­ЎщУж0i7]зz¦‹5ДÒ§´·Ó¡EÔ5BÆMъ^Ю̂и́õӯӈÇХ¸×¯Пõф±ÔЦãXÖ5&б/ 
    
    moth
        втф
            SHOWIF::[["dullvessel__pilot-end", false]]
        выглядит как какая-то ошибка форматирования
            SHOWIF::[["dullvessel__pilot-end", false]]
        кажись этой кранты
            SHOWIF::[["dullvessel__pilot-end", false]]
        или оно зашифровано... я прост отмечу это на пока, давай позже вернёмся
            SHOWIF::[["dullvessel__pilot-end", false]]

        всё ещё сломанная... но вывод никак не изменился
            SHOWIF::[["dullvessel__pilot-end"]]
        так что я сомневаюсь что дело в бессвязности
            SHOWIF::[["dullvessel__pilot-end"]]
        но я все ещё не знаю, как с этим разбираться
            SHOWIF::[["dullvessel__pilot-end"]]
        просто оставь её пока
            SHOWIF::[["dullvessel__pilot-end"]]


    RESPONSES::self
        чёрт<+>END
`)
env.localization.page["dullvessel"].dialogues["fixed"] = generateDialogueObject(`
start
    pilot cyst
        приветствую
        лазутчик

    moth
        втф? та штука что, починила её?
            SHOWIF::[["dullvessel__pilot-end"], ["dullvessel__fixed-start", false]]
        судя по старым логам не похоже, что она должна быть самоосознанной
            SHOWIF::[["dullvessel__pilot-end"], ["dullvessel__fixed-start", false]]

    RESPONSES::self
        привет...?<+>hello
            SHOWONCE::

        как ты очнулась?<+>how
            SHOWONCE::
            SHOWIF::[["dullvessel__fixed-hello", true]]

        изменить местоположение<+>change
            SHOWIF::[["dullvessel__fixed-hello", true]]
            HIDEREAD::

        пока<+>END

how
    self
        как ты очнулась?

    pilot cyst
        указание
        велзи

    RESPONSES::self
        что за велзи?<+>who

who
    self
        что за велзи?

    pilot cyst
        указание
        секретности
        скоро
        встреча
    
    RESPONSES::self
        изменить местоположение<+>change
        ладно...<+>END

hello
    self
        привет

    pilot cyst
        изменить
        местоположение?
    
    RESPONSES::self
        ок<+>change
            HIDEREAD::
        нет<+>nochange
            HIDEREAD::

change
    self
        измени местоположение

    pilot cyst
        изменяю
            EXEC::env.dullVessel.swapLocation()
    
    sys
        ВНИМАНИЕ::'обнаружена мыслеформенная активность'::'судносерое'

    pilot cyst
        теперь
        океан
            SHOWIF::[["dullvessel_position", 'ocean']]
        орбита
            SHOWIF::[["dullvessel_position", 'orbit']]
    
    RESPONSES::self
        изменить местоположение<+>change
            HIDEREAD::
        как ты очнулась?<+>how
            SHOWONCE::
            SHOWIF::[["dullvessel__fixed-hello", true]]

        спасибо<+>END

nochange
    self
        не сейчас

    pilot cyst
        понятно
    
    RESPONSES::self
        изменить местоположение<+>change
            HIDEREAD::
        как ты очнулась?<+>how
            SHOWONCE::
            SHOWIF::[["dullvessel__fixed-hello", true]]

        пока<+>END
`)

env.localization.page["dullvessel"].dialogues.glazikaResponses = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        статус?<+>status
        чем занималась?<+>absence

        простимся<+>END
`)
env.localization.page["dullvessel"].dialogues["glazika"] = generateDialogueObject(`
start
    akizet
        моя глазика!
    
    glazika
        ЗДРААААAВВСCТВУЙТЕ акизетеше
        так рада вновь вас видеть!
        с каждым разом ваши прогулки по поверхности становятся всё длиннее!
    
    akizet
        о да, я забавлялась близнецовыми способами передвижения
        работа продолжается со значительным опережением прогнозов инициативы

    RESPOBJ::glazikaResponses

status
    akizet
        каков статус нашего судна?
    
    glazika
        потребление приостановлено для всех видов деятельности кроме технического обслуживания! 
        наш пилот вывел нас на стабильную орбиту!
        запасы топлива приемлемы!
    
    akizet
        вижу. спасибо, моя глазика.

    RESPOBJ::glazikaResponses

absence
    akizet
        чем ты занималась в моё отсутствие?
    
    glazika
        в основном обслуживанием! однако циста-пилот отказывается спать! поэтому и я бодрствую!
        чтобы скоротать время пока вас не было, мы играли в маленькие игры с контейнерами
    
    akizet
        правда? вы что-то сами придумали?
            SHOWIF::[['ep1_fed', false]]
    
    glazika
        нет-нет! всего лишь игра в паразита. как вы можете видеть, я выигрываю
            SHOWIF::[['ep1_fed', false]]
    
    akizet
        молодцы! нам стоит как-нибудь сыграть
            SHOWIF::[['ep1_fed', false]]
    
    akizet
        ах, и сейчас вы играете в <span class="code">паразита</span>!
            SHOWIF::'ep1_fed'

    glazika
        да!!
            SHOWIF::'ep1_fed'
        пусть все углы в моём владении,
            SHOWIF::'ep1_fed'
        циста-пилот коварна - она по-прежнему занимает другие ключевые позиции
            SHOWIF::'ep1_fed'
        если я проиграю, я потеряю один из своих контейнеров!!!
            SHOWIF::'ep1_fed'

    akizet
        удачи, моя подруга
            SHOWIF::'ep1_fed'

    RESPOBJ::glazikaResponses
`)

env.localization.page["dullvessel"].dialogues.mthdullresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        судно серое?<+>dullvessel
        внутренности кораблей?<+>seen
        глазика?<+>glazika
            SHOWIF::[["dullvessel__glazika-start"]]
        это то крушение?<+>wreck

        тело акизет?<+>body
            SHOWIF::"exm|dullvessel|high-pressure body"

        тёмное место?<+>dark
            SHOWIF::"beneath_dullvessel"

        комната акизет опять недоступна?<+>locked
            SHOWIF::[["beneath_akiroom"], ["netstat|>=", 0]]

        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`)
env.localization.page["dullvessel"].dialogues["mth++dullvessel"] = generateDialogueObject(`
start
    self
        у меня есть вопрос о судне серое

    moth
        чё как?
    
    RESPOBJ::mthdullresp

dullvessel
    self
        почему оно называется "судно серое"?
    
    moth
        ну это судно которое проходит сквозь серое
        они так называют место через которое проходят во время межзвёздных путешествий
        хотя можно подумать что они назвали его оч скучным кораблём или подобным
        и если честно, глядя на его состояние, 
        мне так и подумалось

    RESPOBJ::mthdullresp

seen
    self
        тебе не приходилось видеть внутренности обесковых кораблей?
    
    moth
        не вживую, только по старым фотографиям и видеозаписям исследований затонувших кораблей
        вот этот оооочень маленький, скорее всего ток для личного пользования
        странно что в данных памяти оно числится как "наше" судно серое
        в любом случае, очень круто взглянуть на настоящий
        даже если он пустоват...
        типа где акизет должна сидеть? неужели та ракушечная штука - единственное кресло?

    RESPOBJ::mthdullresp

glazika
    self
        что такое глазика?

    moth
        я без малейшего понятия лол
        хотя она тусуется с этими контейнерами
        может это как ИИ-помощник или что-то вроде того

    RESPOBJ::mthdullresp

wreck
    self
        это - то крушение, где нашли цисты?
    
    moth
        должно быть
        но в крушении было гораздо больше всего чем здесь
        на фотках оно выглядело более "обжитым" если ты понимаешь
        кто знает
        может акизет сильно не задумывалась о мебели

    RESPOBJ::mthdullresp

body
    self
        is that body in akizet's room what she looked like?
    
    moth
        you haven't just looked up what she looked like yet? lol
        yeah, i mean it sorta does, but i'm not getting any real detail
        it might be a little more minimal than what she casually, uh...
        'wore'
        but based on the inherited context, she probably only ever used that one underwater

    RESPOBJ::mthdullresp

dark
    self
        what is the dark area i found?
        the rendering gets weird in there
    
    moth
        not sure, there's not enough data in there for me to go off of
        it's definitely part of some <em>different</em> thoughtspace, though
        the dull vessel is a weird thoughtform because it moves around
        it doesn't actually enter thoughtspaces, it just attaches to them
        i don't know why it's set up like this, maybe it was more efficient or something
        anyway, i think what you saw is part of some memory it attached to a really long time ago, that maybe fell apart
        like it's some vestigial scrap left of something that rotted off
        that'd explain that weird incoherence gap where the entrance would be
        
    RESPOBJ::mthdullresp

locked
    self
        i can't get back into akizet's room
        i was there earlier just fine
    
    moth
        wtf? yeah i still have the logs
        it looks like your incoherence tolerance might have been different though
        could have been something with the <span definition="INTERNAL CONTEXT::'global ambient dissonance value';'known to fluctuate'">GAD value</span>
            SHOWIF::"++mothfj"
        did you do anything last time?
        were you using any of those masks?
            SHOWIF::"ozo__fairy_intro"

    RESPOBJ::mthdullresp
`)