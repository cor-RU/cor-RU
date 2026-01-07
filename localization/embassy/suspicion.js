/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > localization/suspicion.js
    localization for /local/ocean/embassy --- recollection::suspicion
*/
cor_ru.embassy["suspicion"] = {
definitions = {
    "шпилешторм": "'погодное явление';'мощнейший шторм вокруг естественного шпиля, не имеющий конца'",
    "θветви": "'взаимозаменяемо с отростком';'означает область с определённым назначением';'многочисленны в сегментах шпиля';'часто выходят наружу соединённой с осью центральной камеры';'менее формальный термин'",
    "θсегмента": "'подразумевается отдельный участок шпиля';'обычно отделяются по вертикали'",
    "θсегменте": "'подразумевается отдельный участок шпиля';'обычно отделяются по вертикали'",
    "секри": "'хищник';'заражение';'первобытный ужас'",
    "что во взоре": "'распространённая идиома';'религиозный подтекст';'что ты видишь во взоре велзи, когда он смотрит на тебя?'"
},
strings = {
    // echo chatter 1
    "hello akizet, i am glad it is you who connected": "привет, акизет. рад что подключилась именно ты",
    "as it is with worry for your well-being that this message finds you": "потому что сообщение это я отправлял с опасениями насчёт твоего благополучия",
    "it must be said immediately:": "самое важное в сообщении:",
    "information regarding our team's latest findings must not be shared with anyone at any point": "информацию касательно последних находок нашей команды ни в коем случае ни с кем нельзя обсуждать",

    "yes... as we had agreed": "да.. мы же ровно на этом и сошлись..",
    "what is the purpose of this message?": "в чём цель данного послания?",

    "we are in great danger, akizet": "мы в большой опасности, акизет",
    "though we agreed in work, there can be no casual hints of our knowledge": "мы согласились не делиться нашей находкой, тут всё верно",
    "no sharing with larval relations": "но я говорю тебе о том что на эту находку даже намекать нельзя.",
    "not anyone you think you can trust": "ни личиночным друзьям, ни близким людям, ни кому бы то ни было ещё",
    "no one": "вообще никому",

    "apprehension from the echo saturates the environment": "опасение от эха заполняет собой всю ложную среду",
    "i can feel that this delusional paranoia is not even its true message": "я чувствую, что эта сбивчивая паранойя даже не является истинным сообщением эха",
    "in my death, i have never had patience for such meandering exchanges": `в моей <span definition="ПРИМЕЧАНИЕ::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'подразумевается изменённое состояние проживания'">смерти</span>, у меня совсем кончилось терпение для столь пространных диалогов`,

    "why? do not waste my time, cease with this drama": "и почему же? не трать время попусту, кончай ломать трагедию",

    "i presumed you might react this way": "я знал что ты отреагируешь именно так",
    "but i had to place my warning first, out of precaution": "и всё же, на всякий случай я был обязан начать с предостережения",
    "you want to know why:": "почему, спрашиваешь?",
    "come and see": "подойди и увидишь сама",

    // echo chatter 2
    "yes, i understand": "да, понимаю",

    "thank you": "спасибо",
    "if only i could truly hear you agree": "если бы только я мог лично услышать эти слова..",
    "but i cannot risk any side knowing i have told you": "но к сожалению я не имею права давать ни одной из сторон конфликта даже намёка, что я с тобою связался",
    "so this cyst will erase its purpose shortly": "потому, данная циста вскоре сотрёт свое содержимое",
    "but trust that i will know your response based on your actions": "к счастью, определить твой ответ я смогу на основе твоих дальнейших действий",

    // post echo
    "there is no response - no thought, no meaning": "ответа нет - ни словесного, ни мысленного",
    "in reality, i feel a strange runoff near my cyst-bearing receptor": "внезапно я чувствую странное ощущение на рецепторе, к которому подключена циста",
    "it is destroying itself...": "она сама себя плавит...",

    "ruminate over cyst": "обдумать цисту"
},
entityDescriptions = {
}
}

// === DIALOGUES === //

// == SUSPICION --- DAY 2 == //

env.dialogues["d2_start"] = generateDialogueObject(` 
start
    sourceless
        Я ПРОБУЖДАЮСЬ ОТ ПОКОЯ КАМЕРЫ ВОССТАНОВЛЕНИЯ
        ЧРЕЗ ДАЛЁКОЕ ОТКРЫТИЕ СЕРОЕ Я ЧУВСТВУЮ, ЧТО НАЧАЛСЯ НОВЫЙ θвзор
            EXEC::env.embassy.slowCam()

        ЕДВА Я ВЫЛЕЗАЮ ИЗ КАМЕРЫ, Я ВСТРЕЧАЮ ВЗГЛЯДОМ КОЕ-ЧТО НОВОЕ...
            EXEC::specialCam('cystfocus')

        НА МОЁМ СТОЛЕ ЛЕЖИТ ЧУЖАЯ ЦИСТА
        МОЖЕТ ЭТО ТА, ЧТО Я ОДОЛЖИЛА КАВИКУ?
        МОЖЕТ АРХИВ ДИЗАЙНОВ ИЗ ДОМА, КОТОРЫЙ Я ПЕРЕДАЛА КАЗКИ...
        А! МОЖЕТ ЭТО ТА ИГРА ГАКВУ?
            SHOWIF::[["embassy__d1_gakvu-false"]]
        НАДО БЫ ПОСМОТРЕТЬ ЧТО ВНУТРИ
            EXEC::env.embassy.slowCam()

    RESPONSES::akizet
        интересно ведь<+>END
            EXEC::specialCam(false);pauseSwapCam(false)
`)

env.dialogues["cyst"] = generateDialogueObject(` 
start
    sourceless
        КАК СТРАННО...
            EXEC::pauseSwapCam(true)
        У ЦИСТЫ СЛОВНО НЕТ ОБОЛОЧКИ
        НА НЕЙ СТОИТ ЗНАК ПЫШНОЙ СПИРАЛИ... ЗНАТЬ БЫ ЕЩЁ ЧТО ЭТО ЗНАЧИТ
        ПОДКЛЮЧУСЬ - ВОТ И УЗНАЮ

    sys
        ОПОВЕЩЕНИЕ::"для продолжения потока требуется испытать событие";"пропустить?"
            SHOWIF::"embassy__echo3"
    
    RESPONSES::akizet
        подключиться<+>connection
        оставить<+>END
            EXEC::pauseSwapCam(false);

    RESPONSES::sys
        пропустить<+>END
            SHOWIF::"embassy__echo3"
            EXEC::change("PAGE!!akiroomunlocked", true);change("PAGE!!cystmelted", true);content.classList.add('cystmelted');step();pauseSwapCam(false);
            FAKEEND::(skip sequence)

connection
    sourceless
        Я ПОДНОШУ ЦИСТУ К РЕЦЕПТОРУ И ПОДКЛЮЧАЮСЬ
        ЧЕРЕЗ ПАРУ МГНОВЕНИЙ, СО МНОЙ СВЯЗЫВАЕТСЯ ЧУЖОЙ РАЗУМ
        ТОЧНЕЕ ЭХО, С ОСТАВЛЕННЫМ ДЛЯ МЕНЯ ПОСЛАНИЕМ...
            EXEC::vnp({echo: "show"})
        МЫ НАЧИНАЕМ БЕЗМОЛВНЫЙ ОБМЕН МЫСЛЯМИ, ФОРМИРУЮЩИЙ ДИАЛОГ
    
    echo
        ПРИВЕТ АКИЗЕТЕШЕ!
    
    sourceless
        ПРИВЕТ ДРУГ! КТО ТЫ?
    
    echo
        Я НЕ ЗНАЮ. МЕНЯ ЛИШИЛИ ВСЕЙ ПАМЯТИ, НЕ СВЯЗАННОЙ С ПОСЛАНИЕМ
        ПОХОЖЕ ОТПРАВИТЕЛЬ ЗАХОТЕЛ СДЕЛАТЬ СООБЩЕНИЕ ЧЁТКИМ И КРАТКИМ
            EXEC::content.classList.add('fade-stage')
        
    sourceless
        КАК ИНТЕРЕСНО! ПОВЕДАЙ ЖЕ ЕГО
        
    echo
        ХОРОШО
        Я ПОСТАРАЮСЬ ПЕРЕДАТЬ ПОСЛАНИЕ ТАК ТОЧНО, КАК СМОГУ
        В ДАЛЬНЕЙШЕМ - 'Я' БУДЕТ ОТНОСИТЬСЯ К АВТОРУ СООБЩЕНИЯ

    sourceless
        ПОСЛАНИЕ ЭХО СОСТОИТ ИЗ ЛОЖНОЙ СРЕДЫ, В КОТОРУЮ Я СРАЗУ ЖЕ ВХОЖУ
            EXEC::changeStage("echovision");vn.done()
        ОНО ДОВОЛЬНО ПРОСТОЕ.. ДОЛЖНО ЗАНЯТЬ ВСЕГО ДОЛЮ θмига
        ПОХОЖЕ ЭХО ЖДЁТ ПОКА Я НЕ ДОЙДУ ДО ЕЁ КОНЦА

    RESPONSES::akizet
        осмотреться<+>END
            FAKEEND::continue
            EXEC::pauseSwapCam(false);body.classList.add("pathstep0");env.stage.querySelectorAll(".mainpath.blocks.step0").forEach(el=>el.classList.remove("blocks"));env.embassy.echoChatter(1)
`)

env.dialogues["echo1"] = generateDialogueObject(` 
start
    echo
        всё дело в зове, акизет
            EXEC::content.setAttribute("ech", "call");forceSwapCam(true);specialCam("ecall");change("PAGE!!e1", true)
        инициатива исследования зова что здесь, что дома - точка интереса множества противоборствующих групп
            EXEC::content.setAttribute("ech", "calleye");specialCam("eclaw")
        лидеры этих групп уже знают что же является <em>источником зова</em>,
        и всеми силами пытаются информацию об этом скрыть
            EXEC::content.setAttribute("ech", "calleyeclaw")
        и пусть наше открытие напрямую не раскрывает природы зова
        пусть это лишь клочок сокрытой истины
        этот клочок может свести нас в могилу
        если мы хоть как-то намекнём что узнали нечто новое - нам трудно будет избежать окончательной смерти
            EXEC::content.setAttribute("ech", "calleyeclawcrush")
        
    sourceless
        сам факт этого предупреждения пробуждает во мне злость
        такие безосновательные теории заговора - удел страдающих паранойей кивов

    akizet
        если бы это было правдой - совет бы никогда не одобрил наших исследований
            EXEC::specialCam("eaki")
        зачем же ты зря сеешь подозрение и вражду? это угроза?
        или просто идиотский прикол, который ты исполнил в неподходящих для этого обстоятельствах?
        если второе - знай, что велзи тебе рассмешить не удалось

    echo
        прошу, выслушай - мы ещё много не знаем
            EXEC::specialCam("echoclose")
        наши исследования очень важны и полезны
        особенно если их направляют непогружённые в конфликт лица, вроде тебя
        но я серьёзно боюсь за тебя, акизет
        тебе в это погружаться не стоит
        как жаль что сей осколок истины заставляет нас участвовать в столь суровой игре
        игре, жестокой даже по меркам велзи

    akizet
        значит это от тебя на фокусе шло чувство ужаса

    echo
        определённая его часть
        я не единственный участник/участница этой игры
        мне кажется что в нашей команде достаточно посвящённых
        и как бы я их не любил/а,
        в этом напряжённом конфликте мы боремся за разные стороны
        и сдаваться никто из нас не готов
            EXEC::content.setAttribute("ech", "crowd");specialCam("ecrowd")
        сейчас по залам посольства бродит чужой и холодный ветер
        открытие же меток сырой мысли превратит этот ветер в шпилешторм
        никто из нас - и под 'нас', я имею ввиду даже наших 'врагов' - не хочет эскалировать конфликт
        потому прошу.. нет, умоляю тебя:
            EXEC::content.removeAttribute("ech")
        прими все необходимые меры чтобы скрыть наше открытие
        мы не можем рисковать - нельзя допустить утечки даже крупицы информации
        ты понимаешь?

    sourceless
        я смотрю на послание очень скептично
            EXEC::specialCam("eaki")
        но, тем не менее, чувствую что отправитель был искреннен, когда его записывал
        очень сложно подделать эмоции эхо
        в особенности эмоцию паники
        потому я отвечаю:
        
    RESPONSES::akizet
        да, понимаю<+>END
            FAKEEND::continue
            EXEC::forceSwapCam(false);specialCam("")

END::env.embassy.echoChatter(2)
`)

env.dialogues["echo2"] = generateDialogueObject(` 
start
    sourceless
        несмотря на своё согласие, я всё никак не могу раскрутить напряжённо свёрнутые рецепторы
            EXEC::pauseSwapCam(true)
        как подло передо мной только что помахали размытой угрозой...
        но что же я могу на это ответить?
        Неважно, имеет под собой смысл эта угроза или нет - я ведь всё равно собиралась держать открытие в тайне..
        возможно, они боятся что внимательно изучив нашу теорию, я смогу узнать что-то ещё?
        мне стоит продолжать со всем соглашаться - возможно я всё же смогу выйти на источник послания

    akizet
        и что же дальше?

    echo
        для тебя? ничего
        я всеми силами пытаюсь защитить от конфликта всю нашу команду
        даже тех её членов, что в тайне являются предателями
        я уже скрыл/а архивные записи фокуса
        я не буду выходить с тобой на связь, просить какой-то информации или раскрывать свою личность
        рано или поздно наши находки, конечно, придётся раскрыть
        но к тому моменту мы успеем подготовить сцену
        если проявить неосторожность, то все мы - включая светлых близнецов - испытаем непредвиденные последствия
        и невинные близнецы этих последствий заслуживают пожалуй меньше всего
        если только ты меня послушаешь--если доверишься посланию эхо, о чём я слёзно продолжаю молить велзи,
        то всё обойдётся
        большего я тебе сказать не могу
        прощай, акизет
            EXEC::content.setAttribute("ech", "bye")

    akizet
        постой
        ты можешь дать мне хоть какое-то доказательство?
        любое
        я хочу тебе довериться
        но чтобы довериться, я должна вначале тебе поверить
        что нам стоит делать если мы сделаем ещё какое-нибудь открытие?
        какой риск всё же несёт наша работа??
    
    RESPONSES::akizet
        ...<+>END
            FAKEEND::continue
            EXEC::pauseSwapCam(false)

END::env.embassy.echoChatter(3)
`)

env.dialogues["echo3"] = generateDialogueObject(` 
start
    sourceless quiet
        я срываю цисту с рецептора, пока она не расплавилась окончательно
            EXEC::pauseSwapCam(true);change("PAGE!!cystmelted", true);content.classList.add('cystmelted')

    sourceless
        эхо самоуничтожилось вместе с цистой...
        что с этим делать? что вообще <em>можно</em> с этим сделать?
        мне нужна помощь
        развледруг!! активируйся

    funfriend
        ПРИВЕТ АКИЗЕТ!!
        КАК ДЕЛА?
    
    sourceless
        мне вообще стоит спрашивать кто оставил эту цисту?
        что, если я ошибусь и начну не с того куу?
        стороны ещё эти.. не вздумается ли одной из них, что меня попытались завербовать их противники?
        вокруг чего строится конфликт?
        я лично ни о каком конфликте не слышала
    
    funfriend
        ПОСТОЙ, Я ЖЕ ДАЖЕ НЕ ЗНАЮ О ЧЁМ ТЫ ГОВОРИШЬ!
        ДАЙ, ПОЖАЛУЙСТА, ДОСТУП К КРАТКОСРОЧНОЙ ПАМЯТИ!
    
    sourceless
        я мгновенно выполняю запрос развледруга
        хотя смысла это наверное уже не имеет - я и так решила что буду делать
        да--точно!
        опрошу команду тет-а-тет, скрывая детали!
        скажу, мол, кто-то вернул одолжённую цисту, и я пытаюсь определить от кого она пришла
        отправитель послания не сможет на это...
    
    funfriend
        АКИЗЕТ. НЕ ПОХОЖЕ, ЧТОБЫ ОНИ ХОТЕЛИ ВОВЛЕКАТЬ ТЕБЯ В КОНФЛИКТ
        НЕ ЛУЧШЕ ЛИ ИХ ПОСЛУШАТЬСЯ И ОСТАВИТЬ ВСЁ В ТАЙНЕ?
        ТЫ ВЕДЬ И САМА С ЭТИМ СОГЛАСИЛАСЬ!
        ЕСЛИ ОНИ УЖЕ ПРИНЯЛИ ВСЕ НЕОБХОДИМЫЕ МЕРЫ
        ТО ЗАЧЕМ ИМ РАСКРЫВАТЬСЯ ПЕРЕД ТОБОЙ?

    sourceless
        я раскрою отправителя не по его словам, а по его реакции на моё заявление
        развледруг, пойми, я не могу оставить подобную угрозу без ответа
        об этом наверняка знает и отправитель
        тем более, если он находится внутри нашей команды
        главная опасность в том, что он внимательно наблюдает за всеми моими действиями..
        мне придётся внимательно следить за тем, что я говорю и как я это делаю...
        
    funfriend
        ОЧЕНЬ ПЛОХАЯ ИДЕЯ

    sourceless
        спасибо за мнение, развледруг
            EXEC::change("PAGE!!akiroomunlocked", true);step()

    RESPONSES::akizet
        придётся расследовать<+>END
            EXEC::pauseSwapCam(false)
`)

/* DAY 2 - ATTENDANT/GROUNDSMIND */
env.dialogues["d2_attendantresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        корруциста в комнате?<+>cyst
            SHOWIF::[['embassy__d2_attendant-personnel']]
        это всё<+>leave
            FAKEEND::(leave)
`)

env.dialogues["d2_attendant"] = generateDialogueObject(` 
start
    sourceless
        Я ПОДХОЖУ К ОБСЛУЖИВАЮЩЕМУ ДРОНУ
            EXEC::pauseSwapCam(true)
        СЕЙЧАС ОН БЕЗЛИК, А ПОТОМУ ПРОСТО СМОТРИТ В ПУСТОТУ

    RESPONSES::akizet
        ничего необычного не замечал?<+>personnel
            SHOWIF::[['stageroom', 'embassy_personnel']]
        поговорить со структуразумом<+>groundsmind
            SHOWIF::[['embassy__d2_attendant-personnel']]
        пока<+>END
            EXEC::pauseSwapCam(false)
    
personnel
    sourceless
        ПУСТЬ ДРОН И БЕЗЛИК...
        ПРОСТОЕ ЭХО ВНУТРИ НЕГО МОГЛО ЧТО-ТО ЗАМЕТИТЬ
    
    akizet
        привет! соединять ни с кем не надо
        ты не видел, случаем...
        чтобы кто-то входил в мою комнату?
    
    attendant
        ТОНКОНОГАЯ КОРРУЦИСТА ВХОДИЛА, ПАРУ θмигов НАЗАД
        ОНА БЫЛА ВОСПРИНЯТА КАК САМОДОСТАВЛЯЮЩЕЕСЯ УСТРОЙСТВО
    
    sourceless
        ИНТЕРЕСНО... ЗВУЧИТ ЛОГИЧНО
        ОТПРАВИТЕЛЬ ЗНАЛ, ЧТО ВХОД КАРАУЛИТ ОБСЛУЖИВАЮЩИЙ ДРОН
    
    attendant
        ВАМ ТРЕБУЕТСЯ ЧТО-ТО ЕЩЁ?

    RESPONSES::akizet
        ничего необычного не замечал?<+>personnel
            SHOWIF::[['stageroom', 'embassy_personnel']]
        поговорить со структуразумом<+>groundsmind
            SHOWIF::[['embassy__d2_attendant-personnel']]
        нет, спасибо<+>END
            EXEC::pauseSwapCam(false)

groundsmind
    akizet
        свяжи со структуразумом

    sourceless
        ДРОН ВЫПРЯМЛЯЕТСЯ. С ПОДКЛЮЧЕНИЕМ ЕГО ОБОЛОЧКА НАЧИНАЕТ ВИБРИРОВАТЬ
        НА ЕГО ЛИЦЕВОЙ ПЛАСТИНЕ ПРОЯВЛЯЕТСЯ СИГИЛ НАШЕГО СТРУКТУРАЗУМА
            EXEC::content.classList.add('groundsminded')
    
    groundsmind
        акизетеше. что нужно?

    RESPONSES::akizet
        циста<+>cyst
        не важно прощай у меня дела<+>leave
            FAKEEND::(leave)
    
cyst
    akizet
        на мой стол во время моего сна была доставлена самодоставляющаяся циста
        есть по ней какие-то записи?

    groundsmind
        в начале требуется определить эту цисту
        если она у тебя с собой - передай её дрону
        если нет - детально её опиши

    sourceless
        åAДÉ:!±(:
        ОНА ЖЕ САМОУНИЧТОЖИЛАСЬ...
        СТОИТ ЛИ УПОМИНАТЬ СПИРАЛЬ?
        НЕТ--ЧТО ЕСЛИ ЭТО КАКОЙ-ТО ИДЕНТИФИКАТОР?
        ГОВОРИТЬ О НЁМ ОПАСНО

    akizet
        э..
        если честно я не помню как она выглядела
        можешь там как-нибудь проверить с помощью других дронов?
        может она с помощью релокатора проходы делала?
    
    sourceless
        МГНОВЕНИЕ МЫ ОБА СТОИМ В МОЛЧАНИИ
        СТРУКТУРАЗУМ НЕ ПЕРЕДАЁТ СЛОВ, НО Я КАКИМ-ТО ОБРАЗОМ ЧУВСТВУЮ, ЧТО КО МНЕ ОТНОСЯТСЯ КАК К ЛИЧИНКЕ
    
    groundsmind
        акизетеше,
        я ничем не могу помочь без идентификации цисты
        каждый θвзор тысячи цист путешествуют в самые разные части посольства
        большинство из них не имеют каких-то выделяющих точку назначения меток.
        а что ты вообще хотела об этой цисте узнать?

    sourceless
        ОЙ-ОЙ

    akizet
        да я...
        ой, не важно - мне кажется я сама поняла, кто мне её отправил
        да, кажется это от кавика циста, ахахаха
        всё что надо у него и спрошу!
        пока, удачи, счастья и всех благ!

    sourceless
        Я ПЫТАЮСЬ НЕПРИНУЖДЁННО УЙТИ, СКРЫВАЯ БУШУЮЩУЮ ВНУТРИ ПАНИКУ
        ЧТО ЕСЛИ В КОНФЛИКТЕ ЗАМЕШАН СТРУКТУРАЗУМ?

    RESPONSES::akizet
        как же стыдно<+>END
            EXEC::pauseSwapCam(false)

leave
    akizet
        э.. да не важно!
        извини что побеспокоила
    
    groundsmind
        хорошо
        прощай
    
    sourceless
        ДРОН ОТСОЕДИНЯЕТСЯ ОТ СТРУКТУРАЗУМА И ВНОВЬ ЗАМИРАЕТ
            EXEC::content.classList.remove('groundsminded')
    
    RESPONSES::akizet
        уйти<+>END
            EXEC::pauseSwapCam(false)

END::content.classList.remove('groundsminded')
`)

/* DAY 2 - BOZKI + CAVIK */
env.dialogues["d2_bozkocavik"] = generateDialogueObject(` 
start
    sourceless
        КАВИК И БОЗКО ВЕСЕЛО О ЧЁМ-ТО РАЗГОВАРИВАЮТ ПОСРЕДИ КОРРИДОРА
            EXEC::pauseSwapCam(true)
        ИНТЕРЕСНО.. ОНИ ЖЕ ЖИВУТ НЕ В ЭТОЙ θветви
        Я ПОДХОЖУ БЛИЖЕ, ХОРОШО СКРЫВАЯ СВОЁ ПОДОЗРЕНИЕ
    
    akizet
        бозко! кавик! привет! благой взор!
            EXEC::vnp({hideStage: true, cavik: "show", bozko: "show"})

    bozko
        акизет
    
    cavik
        привет акизет!! 

    akizet
        что делаете в этой θветви θсегмента?

    cavik
        ждём мокку!
        сегодня участвуем в коротенькой экспедиции в марианскую впадину
    
    sourceless
        КОГО? МОККУ? 
        
    funfriend
        ЗАГРУЖЕННЫЙ УЧАСТОК ПАМЯТИ: МОККАНЕШЕ, ПО ОБМЕНУ С МАТЕРИАЛЬНОЙ ИНИЦИАТИВОЙ!
        
    sourceless
        А! ТОЧНО. Я И ЗАБЫЛА ЧТО ОНА ТОЖЕ ЖИВЁТ В ЭТОЙ θветви
        ДАВНЕНЬКО Я ЕЁ НЕ ВИДЕЛА... 
        ПО РАБОТЕ ПОЧТИ НЕ ПЕРЕСЕКАЕМСЯ
    
    akizet
        из материальной инициативы? а для чего?
    
    bozko
        ну, нам показалось что ей будет интересно
        да и на случай если найдём залежи необходимых металлов
        это бы ускорило постройку шпилей полигонации
    
    akizet
        точно

    RESPONSES::akizet
        никто из вас случаем цисту не возвращал?<+>cyst
        enjoy your trip<+>END
            EXEC::pauseSwapCam(false);vn.done()

cyst
    akizet
        друзья,
        никто из вас случаем цисту не возвращал?
        я проснулась от восстановления, и заметила что кто-то доставил мне цисту!
    
    cavik
        ого! не, это не от меня
        а что на ней было?
    
    sourceless
        РАЗВЛЕДРУГ: ПРИМИ НЕВЕРБАЛЬНЫЙ МОТОРНЫЙ КОНТРОЛЬ
        ЗАДАЧА: ВЕСТИ СЕБЯ ЕСТЕСТВЕННО
    
    funfriend
        ЛАДНО! АХАХАХА
        ИСПОЛЬЗУЮ ДВИЖЕНИЯ ИЗ АРХИВНЫХ ВОСПОМИНАНИЙ!
        ТЫ ТЕПЕРЬ ВЫГЛЯДИШЬ НАСТОЛЬКО ОБЫЧНО, НАСКОЛЬКО ЭТО ВОЗМОЖНО!

    akizet
        а, да просто..
        архивная циста
        по.. охотничьим привычкам.. секри
    
    sourceless
        МНЕ КАЖЕТСЯ, ИЛИ БОЗКО ЧТО-ТО ЗАПОДОЗРИЛ?
        Я ГДЕ-ТО ДОПУСТИЛА ОШИБКУ?
    
    funfriend
        СПОКОЙНО
        ОШИБКУ ТЫ ДОПУСТИЛА, КОНЕЧНО
        НО ОНИ СКОРЕЕ ВСЕГО ДУМАЮТ, ЧТО ТЫ ВРЁШЬ ПО ДРУГОЙ ПРИЧИНЕ
    
    cavik
        а!..
        ладно

    sourceless
        ...

    akizet
        бозко?
    
    sourceless
        ОН ОТРИЦАТЕЛЬНО КРИВИТ РЕЦЕПТОРЫ
    
    bozko
        меньше знаешь о секри - крепче спишь
        с чего-бы кому-то оставлять тебе подобную цисту?
    
    akizet
        а! ну.. она просто изначально была моей
        я просто когда-то кому-то её одолжила
        зачем мне циста с секри? а..э.. да просто у меня к ним нездоровая страсть
        ну, сами понимаете--я же наземнобежец...
    
    bozko
        яяясно...

    funfriend
        РЕКОМЕНДАЦИЯ: ПОПРОЩАЙСЯ И УЙДИ
    
    akizet
        в любом случае спасибо
        у меня куча дел
        приятной экспедиции
    
    cavik
        пока акизет!
            EXEC::env.embassy.d2progress('bozkocavik')
    
    RESPONSES::akizet
        пока..<+>END
            EXEC::pauseSwapCam(false);vn.done()
`)


/* DAY 2 - GAKVU */
env.dialogues["d2_gakvuresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        не возвращала случаем цисту?<+>cyst
            EXEC::env.embassy.d2progress('gakvu')
        как дела?<+>how
        пока<+>bye
            FAKEEND::(leave)
`)
env.dialogues["d2_gakvu"] = generateDialogueObject(` 
start
    sourceless
        ГАКВУ ССУТУЛИЛАСЬ НАД ОБЩЕСТВЕННОЙ ЦИСТОЙ. ОБА ЕЁ РЕЦЕПТОРА ПРИСОЕДИНЕНЫ
            EXEC::pauseSwapCam(true)
        ЕДВА Я ПОДХОЖУ К ЦИСТЕ, КО МНЕ НАЧИНАЕТ ПОЛЗТИ СТОЯЩИЙ НАПРОТИВ ГАКВУ СТУЛ
        ТОПОТ ЕГО ЛАПОК ПО СТЕКЛЯННОМУ ПОЛУ ПРИВЛЕКАЕТ ВНИМАНИЕ ГАКВУ
    
    gakvu
        о, акизет! привет! присаживайся!

    akizet
        не помешаю?
            EXEC::specialCam("gakvusit")
    
    gakvu
        неа, я сейчас просто смотрю интересные среды
        моя мне слегка надоела
        поверхность, конечно, ужасает и захватывает дух, но..
        после сотни смертей запал её исследовать слегка угасает!
    
    RESPOBJ::d2_gakvuresp

how
    akizet
        гакву,
        что во взоре?
    
    sourceless
        БЕЗОБИДНЫЙ, РАСПРОСТРАНЁННЫЙ ВОПРОС
        НО Я ЗАДАЛА ЕГО ТАКИМ ОБРАЗОМ, ЧТОБЫ ГАКВУ ПОНЯЛА ЧТО Я ИМЕЮ ВВИДУ
        ОНА ИЗДАЁТ СМЕШОК. В ЕЁ ГОЛОСЕ СЛЫШНО ЦИНИЧНОЕ РАЗОЧАРОВАНИЕ
    
    gakvu
        ну, моя работа оказалась бессмысленной
        к счастью, меня это заботит гораздо меньше, чем должно было бы
        может от того, что мы всё же получили какую-то новую информацию

    akizet
        даже если теория и окажется верна - открытие случилось лишь благодаря тебе с тозиком!
        помимо прочего, данные собирать нам предстоит ещё очень долго - кто знает что ты ещё успеешь открыть?
    
    gakvu
        да..

    akizet
        ну а если это наскучит - ты всегда можешь присоединиться к полевым работам бозко
        ну или реорганизуем график, чтобы вы с тозиком чаще встречались с близнецами?

    sourceless
        ЕЁ ГЛАЗА СМОТРЯТ ВДАЛЬ, ВНИМАНИЕ НАПРАВЛЕНО НА СОЕДИНЕНИЕ С ЦИСТОЙ
        И ВСЁ ЖЕ ОНА ОТВЕЧАЕТ - ЕЙ ВСЕГДА ЛЕГКО ДАВАЛОСЬ ОДНОВРЕМЕННОЕ ВЫПОЛНЕНИЕ ДЕЛ В РЕАЛЬНОСТИ И КОЛЛЕКТИВЕ
    
    gakvu
        акизет, а есть ли иной вариант?
        
    akizet
        конечно есть! над постройкой можно..

    gakvu
        нет-нет, я не про работу... я про зов

    sourceless
        ОНА АККУРАТНО ПОДБИРАЕТ СЛОВА, НА СЛУЧАЙ ЕСЛИ КТО-ТО ИЗ ОТДЫХАЮЩИХ НАС УСЛЫШИТ

    akizet
        честно говоря... не знаю
        велзи любит дразнить нас близкой, но всё же недосягаемой истиной
        ну или иллюзией.. чтобы не расслаблялись
        пока неопровержимых доказательств нет - я бы старалась ничему не верить
    
    sourceless
        ГАКВУ НАДОЛГО ЗАМОЛКАЕТ
        Я УЖ БЫЛО ПОВТОРЯЮ СКАЗАННОЕ, НА СЛУЧАЙ ЕСЛИ ОНА СЛИШКОМ ГЛУБОКО ПОГРУЗИЛАСЬ В КОЛЛЕКТИВ И МЕНЯ НЕ УСЛЫШАЛА
        НО ОНА УСМЕХАЯСЬ ОТВЕЧАЕТ
    
    gakvu
        ты из тех, кто считает что каждая стена - ложь, пока её не коснётся?
        не стоит переусложнять - иногда вещи настолько же просты, насколько простыми кажутся
        велзи не обязан ходить за тобой по пятам и во всём вредить
        и.. знаешь, если так подумать - мне всё равно что там будет с зовом
        меня вполне устраивает обработка сигнала вместе с тозиком
        если работы станет меньше - не беда, у меня просто появится больше времени для исследования ложных сред
    
    RESPOBJ::d2_gakvuresp
    
cyst
    akizet
        гакву, а ты случаем не отправляла мне самодоставляющуюся цисту?
    
    gakvu
        а?
    
    sourceless
        ВНИМАНИЕ ГАКВУ ЦЕЛИКОМ И ПОЛНОСТЬЮ СМЕЩАЕТСЯ НА МЕНЯ. ОНА ВСТРЕВОЖЕНА
        ВСТРЕВОЖЕННОЙ Я ГАКВУ РАНЬШЕ НИКОГДА НЕ ВИДЕЛА..
        ОНА, ПОХОЖЕ, ЗАМЕТИЛА ЧТО Я УДИВЛЕНА
        РАЗВЛЕДРУГ - ПРИНИМАЙ МОТОРНЫЙ КОНТРОЛЬ. СТАРАЙСЯ ВЫГЛЯДЕТЬ НОРМАЛЬНО
    
    funfriend
        ХОРОШО!
        ОНА ДАЖЕ НЕ ЗАМЕТИТ ЧТО ЧТО-ТО ПОМЕНЯЛОСЬ!

    gakvu
        нет.. а что было в этой цисте?
        когда она пришла?

    akizet
        а, да просто.. архивная циста. доставлена была пока я спала
        циста с охотничьими повадками секри
        я давно одолжила её кому-то.. не помню, правда, кому
        вот её и вернули! прямо на мой стол
        я уж было подумала, что послала её ты--учитывая что ты раньше работала на поверхности
    
    sourceless
        МНЕ КАЖЕТСЯ, ИЛИ ОНА ВСЁ ПОНЯЛА?
    
    funfriend
        Я НИЧЕГО НЕ ЗАМЕТИЛ - ОНА ВРОДЕ ВСЕГДА ТАК СМОТРИТ

    gakvu
        а.. нет, нет
        как интересно.. самодоставленная
        члену команды проще было бы лично передать тебе эту цисту
        очень, очень странно
    
    sourceless
        В ЕЁ ГОЛОСЕ ОТРАЖАЕТСЯ СЕРЬЁЗНАЯ ОБЕСПОКОЕННОСТЬ
    
    akizet
        хаха, ну да, немножко странно конечно
        ну, в конце концов это моя циста с секри..
    
    gakvu
        если я правильно помню, ты их смертельно боишься
        зачем же тебе циста с их охотничьими повадками?
        пытаешься перебороть страх?
    
    funfriend
        ТАК. Я ПРАКТИЧЕСКИ УВЕРЕН ЧТО ОНА СЧИТАЕТ ЧТО ТЫ ВРЁШЬ
    
    sourceless
        ПРЕДСТАВЛЯЮ ТВОЕМУ ВНИМАНИЮ - РЕТОРИЧЕСКИЙ МАНЁВР:
    
    akizet
        от кого слышу!!
        сама-то с ложными средами гоняешься!

    sourceless
        ОНА ТИХОНЬКО СМЕЁТСЯ. ПРОТИВОПОСТАВИТЬ ЕЙ ПОХОЖЕ НЕЧЕГО
        ЖЕЛАНИЕ ОБСУЖДАТЬ СЕКРИ, ПОХОЖЕ, ТОЖЕ ПРОПАЛО

    RESPOBJ::d2_gakvuresp

bye
    akizet
        у меня дела
        прощай, подруга
    
    sourceless
        ГАКВУ ОТСОЕДИНЯЕТ ОДИН ИЗ РЕЦЕПТОРОВ И МАШЕТ МНЕ НА ПРОЩАНИЕ
    
    RESPONSES::akizet
        уйти<+>END
            EXEC::pauseSwapCam(false)

END::specialCam(false)
`)

/* DAY 2 - TOZIK */
env.dialogues["d2_tozikresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        не возвращал, случаем, цисту?<+>cyst
            EXEC::env.embassy.d2progress('tozik')
        о чём думаешь?<+>thoughts
        пока<+>bye
            EXEC::vn.done()
            FAKEEND::(leave)
`)
env.dialogues["d2_tozik"] = generateDialogueObject(` 
start
    sourceless
        ТОЗИК СТОИТ У РАЗДАТЧИКА СИМУЛЯКР. В РУКАХ У НЕГО РЕПЛИКА АПЕЛЬСИНА
            EXEC::pauseSwapCam(true)
        СТРАННАЯ, КОНЕЧНО, ПРИВЫЧКА... Я ТАК И НЕ СМОГЛА ЕЁ ПОНЯТЬ
        ЕГО ВНИМАНИЕ НАПРАВЛЕНО ВНУТРЬ, ХОТЯ К КАКОЙ-ЛИБО ЦИСТЕ ОН НЕ ПОДКЛЮЧЕН
        МОЖЕТ ЗАДУМАЛСЯ?

    akizet
        привет тозик

    sourceless
        ОН ПОВОРАЧИВАЕТСЯ КО МНЕ И ПРИВЕТЛИВО СГИБАЕТ МОЩНЫЙ РЕЦЕПТОР
            EXEC::vnp({hideStage: true, tozik: "show"})
    
    tozik
        что-то нужно?
    
    RESPOBJ::d2_tozikresp

thoughts
    akizet
        о чём думаешь?
        серьёзный весь такой..
        в свете последних событий - полагаю не без основания..
    
    sourceless
        НАПРАВЛЕННЫЙ ВОПРОС - ЕСЛИ ТОЗИК КАК-ТО СВЯЗАН С ЦИСТОЙ, ТО НАВЕРНЯКА ОТРЕАГИРУЕТ
        ...
        ОН СПОКОЙНО ПРИКАСАЕТСЯ К СИМУЛЯКРУ
        ЕЛЕ ЗАМЕТНЫЕ ДВИЖЕНИЯ РЕЦЕПТОРОВ ВЫРАЖАЮТ ЕГО ИНДИФФЕРЕНТНОСТЬ
        ОН БЕЗ КАКОЙ-ТО ЗАМИНКИ ОТВЕЧАЕТ. ВИДИМО ЭТА ПРОВОКАЦИЯ ЕГО НИКАК НЕ ТРОНУЛА
    
    tozik
        да вот пытаюсь понять, увидели ли скачок на обескии
        дома зов слушают также хорошо, как и у нас, заполняем мы общий архив - должен же был в таком случае кто-то дойти до тех же выводов, что сделали мы?
        потому я начал искать в коллективе обсуждения этой темы.. и понял, что таких обсуждений попросту нет
        дома посчитали этот скачок в амплитуде простой ошибкой оборудования, вызванной близостью к открытию серое

    sourceless
        ТОЗИК ЗАМОЛКАЕТ И НЕЗАМЕТНО ОГЛЯДЫВАЕТСЯ ПО СТОРОНАМ
        ПОДОБНОЕ ВЫРАЖЕНИЕ РЕЦЕПТОРОВ Я ВИДЕЛА ЛИШЬ У ОТДЫХАЮЩИХ НА ВЕЙЛЬКАХ НАЗЕМНОБЕЖЦАХ
        ОН ЧТО, ТОЖЕ ПОЛУЧИЛ ПОСЛАНИЕ?
        ЧЕРЕЗ ПАРУ МГНОВЕНИЙ ТОЗИК ПРОДОЛЖАЕТ ГОВОРИТЬ, НО ТЕПЕРЬ НА ПОЛТОНА ТИШЕ
    
    tozik
        но ведь в коллективе есть вся информация. архивы, на основе которых мы построили нашу теорию, находились в свободном доступе
        я на всякий случай решил проверить и.. записи первого скачка в коллективе не оказалось
        точнее.. не так
        сама запись есть, просто она неправильная
        совсем неправильная
        в публичной версии нет скачка
        почему же есть в нашей?
    
    sourceless
        ОН ВНОВЬ ЗАМИРАЕТ, СМОТРЯ ВГЛУБЬ СИМУЛЯКРА
        Я ЖЕ НЕ ЗНАЮ ЧТО ОТВЕТИТЬ - КАК ЖЕ СЕРЬЁЗНО РАЗВИВАЮТСЯ СОБЫТИЯ..
        АРХИВЫ ОСНОВАНЫ НА ВАЗНИЙСКИХ СЛУШАТЕЛЯХ, САМЫХ СТАРЫХ И САМЫХ НАДЁЖНЫХ
        КАКОВЫ ШАНСЫ ТОГО, ЧТО В ТОЧНО ОБОЗНАЧЕННОЕ ВРЕМЯ ПРОИЗОЙДЁТ ОШИБКА ЗАПИСИ?
        ЕГО ВЗОР ВНОВЬ ОБРАЩАЕТСЯ КО МНЕ. ЕГО СЛОВНО ЗАБАВИТ МОЁ СМЯТЕНИЕ
    
    tozik
        ясно теперь?

    akizet
        да.. что же...
    
    tozik
        ошибка это или нет, мы пока можем лишь ждать развития событий

    sourceless
        ОН ВНОВЬ ПОДНОСИТ СИМУЛЯКР К ГУБАМ, ПОКАЗЫВАЯ ЧТО БОЛЬШЕ СКАЗАТЬ ЕМУ НЕЧЕГО
        КРАТКИЙ ВЗГЛЯД ВДАЛЬ И НЕБОЛЬШОЙ ВЗМАХ РЕЦЕПТОРОМ ЧЁТКО ГОВОРИТ: "ДАВАЙ БОЛЬШЕ НЕ БУДЕМ ОБСУЖДАТЬ ЭТУ ТЕМУ"

    RESPOBJ::d2_tozikresp
    
cyst
    akizet
        тозик, ты не возвращал ли мне, случаем, какой-то цисты?
        я просто когда проснулась - нашла какую-то цисту на своём столе
    
    tozik
        нет
    
    sourceless
        ЕГО ОТВЕТ ТВЁРД КАК КАМЕНЬ, ВНИМАНИЕ НАПРАВЛЕНО ВНУТРЬ. ОН ДАЖЕ НЕ СМОТРИТ НА МЕНЯ
        МНЕ ПО ДУШЕ, ЧТО ОН НЕ ПЫТАЕТСЯ ЛЕЗТЬ В ЧУЖИЕ ДЕЛА
        НО СЕЙЧАС Я БЫ ХОТЕЛА УЗНАТЬ ЕГО РЕАКЦИЮ
        
    funfriend
        АКИЗЕТ, ДЛЯ ПРОВАЛА ХВАТИТ ВСЕГО ОДНОЙ ОШИБКИ
        ЕСЛИ УЖ ХОЧЕШЬ ЕГО ПРОВЕРИТЬ - ПРОШУ, СДЕЛАЙ ЭТО ДЕЛИКАТНЕЕ

    akizet
        уверен?
    
    sourceless
        МОЙ ПОВТОРЁННЫЙ ВОПРОС ВОЗВРАЩАЕТ ТОЗИКА НАЗАД
        ОН ОТВЕЧАЕТ НА НЕГО ТИШИНОЙ. ИЗЛУЧАЕМОЕ ИМ БЕЗРАЗЛИЧИЕ СТАНОВИТСЯ ЕЩЁ БОЛЕЕ ЯВНЫМ
        ЧЕРЕЗ МГНОВЕНИЕ ГЛЯДЕЛОК, ВОЗМОЖНО ЧТОБЫ УЗНАТЬ ЧТО ЖЕ Я ИМЕЛА ВВИДУ, ОН ИЗЪЯВЛЯЕТ
    
    tozik
        да

    akizet
        хорошо
    
    sourceless
        ЕДВА Я ОТСТУПАЮ, ОН ВОЗВРАЩАЕТСЯ ВГЛУБЬ СЕБЯ
        ВРЯД-ЛИ ЭТО ОН.. А ЕСЛИ И ОН - ПОХОЖЕ Я ОТ НЕГО НИЧЕГО НЕ ДОБЬЮСЬ

    RESPOBJ::d2_tozikresp

bye
    akizet
        пока, тозик!

    sourceless
        ОН КИВАЕТ МНЕ РЕЦЕПТОРАМИ
    
    RESPONSES::akizet
        уйти<+>END
            EXEC::pauseSwapCam(false)
`)

/* DAY 2 - KAZKI */
env.dialogues["d2_kazkiresp"] = generateDialogueObject(`
RESPOBJ::
    RESPONSES::akizet
        не возвращала цисту?<+>cyst
            EXEC::env.embassy.d2progress('kazki')
        то существо<+>creature
        прощай<+>bye
            EXEC::vn.done()
            FAKEEND::(leave)
`)
env.dialogues["d2_kazki"] = generateDialogueObject(` 
start
    sourceless
        УДИВИТЕЛЬНО, ЧТО Я ВСТРЕТИЛАСЬ С КАЗКИ В ОДНОМ РЕЛОКАТОРЕ
            EXEC::pauseSwapCam(true)
        ШАНСЫ ПОДОБНОЙ ВСТРЕЧИ САМИ ПО СЕБЕ ДОЛЖНЫ БЫТЬ МАЛЫ.. ХОТЯ ОНА, ПОХОЖЕ, НЕ ПЫТАЕТСЯ КУДА-ТО ПЕРЕМЕЩАТЬСЯ
        КАЗКИ ПРОСТО ХОДИТ ИЗ УГЛА В УГОЛ, КОГО-ТО, ПОХОЖЕ, ОЖИДАЯ. ВОЗМОЖНО МЕНЯ?
        НА ОДНОМ ИЗ ОТРОСТКОВ ЕЁ ВЕТВЯЩИХСЯ РЕЦЕПТОРОВ СИДИТ КОММУНИКАЦИОННАЯ ЦИСТА
        ОНА ПРИВЕТСТВЕННО МАШЕТ МНЕ СВОБОДНЫМ РЕЦЕПТОРОМ
            EXEC::vnp({hideStage: true, kazki: "show"})
    
    kazki
        привеет акизет!
    
    akizet
        казки!
        какой сюрприз--нечасто тебя встречаю в этом θсегменте
        что делаешь?
    
    kazki
        жду команду!
        они отправляются в короткую экспедицию, 
        а мне надо бы добраться до островов чтобы <em>снова</em> обсуждать постройку шпилей полигонации
        жду их, потому что лететь нам по пути
    
    akizet
        ага, ясно

    RESPOBJ::d2_kazkiresp

creature
    akizet
        как там твоё существо поживает?

    kazki
        оно живо!!
        само двигается очень редко... но всегда резко отвечает на чужие движения!
        я тут говорила с моим контактным лицом

    sourceless
        ОНА СЛЕГКА ПОМАХИВАЕТ РЕЦЕПТОРОМ С КОММУНИКАТОРОМ

    kazki
        она говорит что это 'артропод'!
        потому--я решила, что назову его 'артур'!
        в честь контактного лица бюро по вопросам стройкиafter the bureau construction contact!

    sourceless
        AH--ARTHUR
        A JITTERY ONE...
        IF ONLY I COULD BE THERE WHEN SHE OPENS HER HEAD TO SHOW THE CREATURE WITHIN TO HIM
        WAIT--WHAT WAS THAT SHE SAID?
    
    akizet
        you are on casual speaking terms with a bright cousin?
    
    sourceless
        WITH HER LARGE RECEPTORS, HER BASHFUL EXPRESSION IS DIFFICULT TO HIDE
        SHE MUST THINK I WILL TAKE ISSUE--WHY DOES SHE ALWAYS ASSUME THIS?

    akizet
        kazki, you know it is not an issue if you are
        the silent veil has long been drawn
        but--how are you communicating? 
    
    kazki
        oh!!
        you have not heard?
        it is a new development by the θjut
        very recent! these new communicators...
        they allow a sort of connection to the human collective!
        the 'internet' they call it!
        it is very flat... and there are many problems with the connection
        but it is not so different from ours aside from that!

    sourceless
        HOW COULD THAT POSSIBLY WORK?
        THEIRS IS NOT DICTATED BY THOUGHT...
        AH, IT DOES NOT MATTER - SHE WOULD NOT KNOW ANYWAY

    akizet
        and you are using it to speak with a bright cousin?
    
    kazki
        yes!!
        is that not remarkable?? it is COOL!!!

    akizet
        fascinating...
        i must see about getting one of those

    RESPOBJ::d2_kazkiresp

cyst
    sourceless
        THIS SHOULD BE EASY
        KAZKI SIMPLY CANNOT HIDE ANY EMOTION

    akizet
        kazki, did you have a cyst delivered to my room recently?
    
    kazki
        huh? no!

    sourceless
        NOTHING... IT IS NOT HER

    kazki
        i have been so busy coordinating all of this!
        but i do have a few cysts i need to return to you...
        what was it?
    
    akizet
        ah, it was nothing of note, a mundane collection of memories
        
    kazki
        i can ask around for you!
    
    sourceless
        …¤,¿…¶¡Øn

    funfriend
        RECOMMENDATION: DEFINITELY STOP THAT NOW

    sourceless
        I HAD NOT CONSIDERED THIS POSSIBILITY...
        BUT SHE ALWAYS GETS INVOLVED
        IF WORD SPREADS, THE SPEAKER WILL SUSPECT SOMETHING STRANGE IS HAPPENING

    akizet
        ah--no, no no
        no no, it is all right
    
    kazki
        are you sure??
        i have my communicator on right now, i could help!
    
    sourceless
        I WAVE MY RECEPTORS NEGATIVELY WITH PERHAPS TOO MUCH EMPHASIS, AND SHE RELENTS
        SHE SMILES LIKE A BRIGHT COUSIN WOULD, HER RECEPTORS TAKING ON A TEASING POSTURE

    kazki
        oh, i think i get it
        it was one of <em>those</em> cysts

    akizet
        no!! no no no

    kazki
        uh-huh!!

    funfriend
        ACTUALLY MAYBE LET HER THINK THAT SO SHE WILL STAY QUIET
    
    sourceless
        UUGH
        YOU ARE RIGHT... FINE
        I WILL ABIDE THIS EMBARRASSMENT
    
    akizet
        ...
        ok, it was,
        but please do not tell anyone
        
    kazki
        do not worry!!
        it is between us and the arthropod!

    RESPOBJ::d2_kazkiresp

bye
    akizet
        bye kazki!

    kazki
        bye!!
    
    RESPONSES::akizet
        leave<+>END
            EXEC::pauseSwapCam(false)
`)

/* DAY 2 - END OF EMBASSY */
env.dialogues["realization"] = generateDialogueObject(` 
start
    sourceless
        FUNFRIEND
            EXEC::content.classList.add('showaki');

    funfriend
        hello akizet!!

    sourceless
        that is everyone...
    
    funfriend
        yes it was!

    sourceless
        and nothing. i surely spoke to the speaker at some point
        but they must be well-practiced in subterfuge
        and did you notice - no one else seemed concerned

    funfriend
        what about gakvu? she seemed surprised
        
    sourceless
        true, but it is a strange matter to begin with
        what if none of this is real to begin with, and the message was simply made to confuse me?
        no, no joke would ever be taken this far
        they would simply have cracked at my confrontration...
        and to that end - could i be the only one who received this message?
        why not cavik?! i would have seen it in his receptors if he was also contacted!
        and he is the greatest threat of all to any secrecy!!
        so what if he is a part of this conflict, too??
    
    funfriend
        akizet everything is fine
        i understand your worry but there is no urgency here

    sourceless
        ...yes, you are right
        thank you funfriend
        i must calm myself, approach this rationally
        but you understand: i cannot trust my own team
        nor any qou--here or home
        it is like i am in a city usurped by <span class="code" definition="INHERITED CONTEXT::'violent parasitic surface fauna';'hijacks mind of victim for use as social camouflage';'ekivik profanity';'not intended to be profane here'">zuzucri</span>
        anyone could be compromised, a part of this 'game'
        and even if we continue our research work,
        what if we find something else too close to the truth? 
        will we be under even greater threat?
        do i do anything? do i simply wait for the truth?
        it will be so long... so many θeyes
        funfriend you know i cannot simply stop my work
        especially if we are just beyond the threshold of understanding the call
        this is everything
    
    funfriend
        akizet, i cannot know what is right
        but you know what i will say already
        i feel that you should simply wait
        they said the team's research is still important
        and it sounds like they have this under control
        getting involved will probably not lead to anything good
        perhaps you could simply continue with your team,

    sourceless
        ah!
        i know!
        yes!
    
    funfriend
        akizet you really should probably not

    sourceless
        the bright cousins...
        the echo implied they know nothing!
        the envoy!
        yes, i must speak to him
        perhaps... if i place my words correctly,
        my research efforts could become two-fold
        one here, with my team, careful not to cross this invisible line...
        and another, more discreetly, with his bureau!
        where we may discover what these groups seek to hide
        yes, if i can simply know <em>what</em> it is, then...
    
    funfriend
        wait!!
        gordon has limited control, he is a part of a larger system!
        what of his leaders?
    
    sourceless
        he is...
        but our bright cousins are good with secrets
        they know so much that could raise concern already
        and not once has any of it ever hit their public mind
        indeed, they have very little correspondence outside of direct contacts
        and i am the only direct contact for the call research initiative
        though, there is kazki's construction contact...
        our cross-initiative ties will make for some sensitive matters to avoid

    funfriend
        they cannot detect the call with their own technology
        and they do not possess the biology to interact with ours
        how do you expect them to help you?
    
    sourceless
        perhaps we can share a few things...
        do you recall the murmurs of 'integrated bright technology'?
        since it was shelved...
        the technology division has stored much of the schematics plainly within embassy archives
        oh yes, this is coming together, is it not? how exciting

    funfriend
        akizet i do not like this idea! ahahaha
        but i will support you regardless

    sourceless
        excellent...
        to the vessel, then
        please contact him and tell him i am coming in person
        say that i have news of the call and that we must speak privately

    funfriend
        understood

    sys
        ATTENTION::'memory stream continues externally';'follow stream?'

____SHOWONCE::
    moth
        looks like this will take you to the street spatial thoughtform...
        i'm reading that it leads directly to something that's accessible there already
        weird... looks like it has more than before? specifically that chat with gordon
            SHOWIF::"citystreet__envoychat-start"
        i think funfriend fixed it? i didn't even know that part of it was busted
            SHOWIF::"citystreet__envoychat-start"
        or... maybe this thoughtform and the street are interwoven somehow.
            SHOWIF::"citystreet__envoychat-start"
        you said you hear music, right? does any of it sound familiar?
            SHOWIF::[["++mothglobal-why_music"],["citystreet__envoychat-start"]]
        because, it could be that when funfriend repaired this thoughtform, 
            SHOWIF::"citystreet__envoychat-start"
        he also repaired this memory stream into the city that had more data
            SHOWIF::"citystreet__envoychat-start"
        so if you don't follow the stream right now, you should still just be able to go there later and see it anyway
____END

    RESPONSES::sys
        follow stream<+>END
            EXEC::change("embassy_d2_complete", true);change("TEMP!!ep1_goingtogordon", true);moveTo("/local/city/street/")
        end recollection<+>END
            EXEC::change("embassy_d2_complete", true);env.bgm.pause();corruRefresh()
`)

