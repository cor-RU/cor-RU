env.localization.page['localuncosmwhere'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "yeah i got nothing here. seems like you could give it some input, but... no clue what it wants": "дааа не знаю тут. похоже ты можешь что-то ввести, но... без понятия чего оно хочет",

        "memoryhole": "брешь памяти",

        "hehehehehe noo nooo!!": "хихихихихи неет нееет!!",

        "enter": "ввести"
    }, 
    entityDescriptions: {
        'memoryhole': `::НЕОБРАБАТЫВАЕМАЯ МЫСЛЕФОРМА
::<span definition="ПРИМЕЧАНИЕ::'нестандартный формат'">НЕОБЫЧНАЯ ПОДПИСЬ</span>
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'помощи не получишь хихихихихи'</span>`
    },
}

env.uncode = { // --- taking the function and adding stuff so it redirects you to the needed page when you type stuff in russian
    input: content.querySelector('#code'),
    enter: ()=>{
        let value = env.uncode.input.value.toLowerCase().replaceAll(".", "").replaceAll("/", "")
        
        if(value.length) {
            env.uncode.input.blur()
            cutscene(true)
            play('destabilize', 0.5)
            ratween(env.bgm, 0.1)
            content.classList.add('memorydive')

            if(!check("hub__funfriend-ah1") && value == "recosm") {
                //fuck you lol
                location.href = `/img/sprites/obesk/larval/larval7.gif`
            }

            if (value == "кавик") value = "cavik"
            else if (value == "климент римский") value = "clemens romanus"
            else if (value == "корру") value = "corru"
            else if (value == "собака") value = "dog"
            else if (value == "серое") value = "dull"
            else if (value == "эффигия") value = "effigy"
            else if (value == "цветок") value = "flower"
            else if (value == "юмор") value = "humor"
            else if (value == "личиночный" || value == "личиночному") value = "larval"
            else if (value == "паразит") value = "parasite"
            else if (value == "простите" || value == "прости") value = "sorry"
            else if (value == "шпиль") value = "spire"
            else if (value == "поверхность") value = "surface"
            else if (value == "вейльк" ||  value == "вейльки") value = "veilk"
            else if (value == "юзку") value = "yuzku"
            else if (value == "зузукри") value = "zuzucri"
            else if (value == "зузукри-маски") value = "zuzucri-masks"
            else if (value == "ресурсы") value = "cor-ru"

            if (swup.cache.exists(`/local/uncosm/${value}/`)) { // compatibility with memory hole mods
                setTimeout(() => {
                    cutscene(false)
                    moveTo(`/local/uncosm/${value}/`)
                }, 4000)
            } else {
                fetch(`/local/uncosm/${value}/`).then(resp => {
                    if (resp.status == 404) {
                        cutscene(false)
                        startDialogue('wrong')
                    } else {
                        setTimeout(() => {
                            cutscene(false)
                            moveTo(`/local/uncosm/${value}/`)
                        }, 4000)
                    }
                })
            }
        }
    }
}

env.localization.page['sec'] = {dialogues: {},
    definitions:  { // --- part of these definitions should be dragged into everystuff.js but i will dp that later
        "θ███████": { type: `ОШИБКА`, text: `'отсутствующая сущность'`},
        "θ██████": { type: `ОШИБКА`, text: `'отсутствующая сущность'`},
        "θ█████": { type: `ОШИБКА`, text: `'отсутствующая сущность'`},
        "θ████": { type: `ОШИБКА`, text: `'отсутствующая сущность'`},
        "θ███": { type: `ОШИБКА`, text: `'отсутствующая сущность'`},

        
        "surface voice":`'specialized volume management';'fast and enunciated'`,
        "velzie's eye cast down": `'common idiom';'even velzie watches in shock'`,

        "dog": { type: `NOTE`, text: `'partial translation';'implied closest cultural equivalent'`},

        "zzepel": `'back-mounted multi-purpose surface utility';'popular for veilk camping'`,
        "dullvoice": { type: `NOTE`, text: `'partial translation';'inherited description-generated noun'`},
        "spirestorm": `'weather phenomena';'ceaseless violent storm surrounding natural spire'`,

        "valika": `'wide conical headwear';'surface camouflage'`,		
        "zevazni": `'cave-city central to vazni';'corrucystic revolution origin'`,
        "guktik": `'predator';'bladed arms';'cooked flesh goes well with zzoust'`,

        "cavernguard": { type: `NOTE`, text: `'partial translation';'inherited description-generated noun'`},

        "ukazni": `'vaznian mountain range';'large peaks impassable by veilk'`,

        "kelnit": `'derogatory';'incompetent fighter'`,

        "yuzku": `'sluggish bioluminescent scavengers';'intentionally cultivated in veilk parasite husks for lighting';'fatal if consumed'`,

        "zuzucri-masks": `'corrucystic treatment for zuzucri infestation';'partial translation';'inherited description-generated noun'`,	
        "spike in the heel": `'common idiom';'persistent issue'`,

    },
    strings: {
        "don't look at me lol": "на меня не смотри лол",
        "that unity thing actually worked on this? it didn't even seem like there was anything left... weird": "единство и правда на нём сработало? даже не было похоже, будто там что-то осталось... странно",
        "looks like it lost coherence once you pulled that memory from it": "похоже он потерял связность после вытягивания той памяти",

        "hello?": "привет?",
        "ERROR::'infinite stream loop';'retracing';'last coherent position'": "ОШИБКА::'бесконечная петля потока';'возвращение';'последняя связная позиция'",
        "ATTENTION::'thoughtform activity detected'::'resources removed'": "ВНИМАНИЕ::'обнаружена мыслеформенная деятельность'::'удалены данные'",

        /*effigy*/ "jokzi... jokzi ozo!!": "джокзи... джокзи озо!!",
        /*effigy*/ "that's right! i have a home!!": "точно!! у меня же дом есть!!",
        /*effigy*/ "ok this was nice but i gotta go barfriend": "было здорово но мне пора бардруг",
        /*effigy*/ "i'll take another one for the journey!": "я возьму ещё один в дорогу!",
    }, 
    entityDescriptions: {
        "cavik": `::НЕПОЛНОЦЕННАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'не указано'
<span style='color: var(--friend-color)'>::РЕКОНСТРУИРОВАННЫЙ КОНТЕКСТ ПОДПИСИ</span>
<span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("вазнийское")} сюрреалистическое влияние'
<span style='color: var(--friend-color)'>+</span>'метка <span onmouseenter="javascript:env.secavik.cavikDmg(1);document.querySelectorAll('.message.cavik').forEach(el=>el.querySelector('img').src = '/img/sprites/obesk/cavik/paintrait.gif')" definition="УНАСЛЕДОВАННЫЙ КОНТЕКСТ::'пещерный город';'я хочу очнуться';'я хочу домой'">олтазни</span>'
<span style='color: var(--friend-color)'>+</span>'${processDefinitionsInString("жат")}-рецепторы, обращ“—» ¯x¶›¢Ã°!
::ОШИБКА::'окончен поток'недейстОШИБКА::ИÓú=ER::Й"¨úр::äÀ*^Уó¬ól£«â'`,
    }
}

cor_ru.isEffigyPage = function () {
    if (page.path == "/local/uncosm/effigy/") return true
    else return false
}

// -- DIALOGUES -- //
env.localization.page["localuncosmwhere"].dialogues["wrong"] = generateDialogueObject(`
start
    ¥Óñ«J
        хихехихи непраааавильно!!! непрааавильно неправильно неправильно неправильно!~!!! неправильно!!!
        непраааавильно неправильно неправильно не веееерно!!! ахехехехе
        хехехихихи
        покаааа!!!!
            EXEC::setTimeout(()=>{endDialogue();moveTo(\`/local/uncosm/\`)}, 1000)
            WAIT::2000
            
    RESPONSES::self
        что вообще происходит<+>END
`)


env.localization.page["sec"].dialogues["cavik"] = generateDialogueObject(`
start
    self
        привет?

    sourceless
        ...
        ...
    
____SHOWIF::"embassy_d1_complete"
    moth
        погоди-ка, на что именно ты смотришь?
        это что, просто кавик из посольства?
        он что-нибудь делает?
    
    self
        he's just standing there
____SHOWIF::["embassy_d1_complete", false]
    moth
        погоди-ка, на что именно ты смотришь?
        это что, какая-то обесковая подпись? как ты вообще это нашёл<блинскийлопер>?
        ...она что-нибудь делает?
    
    self
        просто стоит тут
____END

    sourceless
        ...
    
    self
        привет?
        
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        КАК ТОЛЬКО СВЕТЛЫЕ БЛИЗНЕЦЫ ОТХОДЯТ, Я СЖИМАЮ КОГТИ
            EXEC::ratween(page.bgm, 0.2)
        ПРЕЖДЕ ЧЕМ ОН УСПЕВАЕТ ВЫМОЛВИТЬ ХОТЬ СЛОВО, Я ЛОВЛЮ КАВИКА ЗА ЗАПЯСТЬЕ И УВОЖУ ЕГО ВНИЗ ПО КОРИДОРУ
        ВОЗМОЖНО, ОН УЖЕ ДОГАДЫВАЕТСЯ, ЧТО ЧТО-ТО НЕ ТАК, ПО ИХ РЕАКЦИИ НА МЕНЯ

    cavik
        ты меня пугаешь!! постой!
        что такое?
        почему ты нам ничего не сказала?
        это хорошо, разве нет??
        это всё, ради чего мы работали!
        или--

    sourceless
        Я ХВАТАЮ ЕГО ЗА ПЛЕЧИ
        ЕГО РЕЦЕПТОРЫ ОТВОРАЧИВАЮТСЯ, И ОН ЗАМИРАЕТ, СЛОВНО ЗАМЕЧЕННЫЙ ХИЩНИКОМ
        ДОЛЖНО БЫТЬ, ДЕЛО В МОИХ РЕЦЕПТОРАХ, ИЛИ, МОЖЕТ БЫТЬ, В МОИХ ГЛАЗАХ
        МЕЖДУ НАМИ НЕ ДОЛЖНО БЫТЬ НЕДОПОНИМАНИЯ

    origin
        кавик
        не смей никому говорить
        даже нашей команде
        не смотря ни на что

    sourceless
        МОЙ ГОЛОС ДРОЖИТ СМЕРТНЫМ СТРАХОМ

    origin
        понимаешь?
        особенно не сейчас...

    cavik
        θ██████...
        я никогда тебя такой не видел
        прошу, скажи мне, что происходит?
        прошу
        прош у
        мне больно
            EXEC::env.secavik.cavikDmg(1)
        больно
            EXEC::ratween(page.bgm, 0.1)
    
    c a
        там кто-то есть
        я чувствую тебя
        я не могу очнуться
        тебе нужно закончить это
        оно снова начнётся
        тебе нужно закончить это
        прошу
    
    cv i k
        п  р  о ш  у 
            EXEC::env.secavik.closeout()

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["clement"] = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        I FEEL OUR VESSEL STRAIN UNDER THE WEIGHT OF THIS DEPTH
        MY POOR GLAZIKA MUST BE STRUGGLING TO KEEP UP WITH OPTIMIZATIONS

    mind
        halting
        pulsing now
    
    sourceless
        A GROWING RADIUS OF VISION IS CREATED FROM THE DEPTH PULSE
        AS ITS THRESHOLD EXPANDS OUTWARDS AND FADES, I SEE IT
        IN THIS DESOLATE PLACE, A MASS OF DEAD METAL
        SOME SORT OF VESSEL MANUFACTURED BY THE COUSINS, BUT...
        I DRAW MY ATTENTION OUTWARDS AND EXCHANGE A LOOK WITH █████

    origin
        you see it too?

    other
        yes...
        a cousinly vessel that must have sunk long ago

    origin
        look towards its center--see how it splits?
        what is happening to it...?
        is that where she wants us to go?
        
    other
        no way
        не нравится мне его вид
        besides, whatever is being done to it, it is not for habitation
        we need to keep looking - it must be near here
        
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["corru"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'
    
    sourceless
        in the relative safety of the entry tunnel, θ██████ drops his surface voice
    
    guard
        incredible... that would have taken so much longer, before
        θ██████, what is the count?
    
    sourceless
        while the real answer is just within my receptor's curl,
        i make a show of counting my claws, and then play one of my favorite sayings
    
    stupid
        ah... we will have to gather the tir!
    
    sourceless
        he chuckles, to my surprise
        only θblinks earlier he seemed irritated with my banter
        still, as planned, i give him a proper answer immediately after
    
    stupid
        i counted just over thirty
    
    elder
        haha!
        thirty, from just that trip...
        
    sourceless
        θ██████ stops and grasps his dull-pulse valika-cyst by its tether,
        pulling it down to eye-level with a shaky hand so he can look into it properly
        i feel an instant of shock, as does his son by the sight of his receptors,
        but we both realize he is looking at the side, rather than directly at the deadly part
        
    elder
        from simple food containers, to the deadliest weapons ever conceived...

    sourceless
        there is a sort of idle drift in his receptors as he stares into it
        it is so easy to tell when a tir's mind wanders
    
    elder
        corru...
        you know, they came up with using the spheres they form for food just when my receptors started to split
        my excavation mentor once told me the strangest stories about it, and our ancestors...
        it was not long after we struck that great natural vein of it down in the deep chambers
        it is so much smaller now...
        as we prepared a harvesting bore, you know what he said?
    
    sourceless
        θ██████ turns to me, his branched receptors outstretching their tendrils
    
    elder
        his father, and his fathers before him, saw it as a pest!
        haha!!
        how the tir of old would encounter it in great walls while digging, 
        and it had to be scraped away by claw, or dug around, as our acids had no effect...
    
    sourceless
        he turns back to the path ahead, carefully stepping down the incline as he continues reminiscing
        his son gives me a forward-pointing gesture of his receptors, as we both start to follow
    
    elder
        that feeling, when wild corru gets on your receptors
        have you ever felt it?
    
    sourceless
        his son does not respond, indifferent
        he must have heard all this before
    
    stupid
        no!
        they usually keep it sealed in those big skulls
    
    elder
        well, if even a drop of it gets on,
        you feel eyes on you - like something is in the chamber with you,
        staring, listening...
        but i guess all this time, it really was listening, right? haha!
        what do you think they will do next with it? velzie's eye cast down, θ████ got a new arm out of the stuff!

    stupid
        well, it will have to take another <span definition="INHERITED CONTEXT::'common myth';'intoxicated tir knocked over corru container and fell into it'">tir stumbling into their research chamber</span> to figure out what is next!
    
    sourceless
        his laugh overpowers the tunnel, enough to send my receptors into a clenched curl
    
    elder
        θ██████, start planning a transport to oltazni for me, would you?
        i have a foundry to barge into
    
    guard
        right away, father

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["dog"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        θ███'s dog skitters away from me, but in this closed chamber, it can only go so far
        it stands no chance as i leap forth, curling my arms under its shell and pulling it into a hug
        it squeaks like an unripe celki when i tear it from the ground, and i spin while i dance around θ███'s furniture
        i see the lights of θ███'s optics peering skeptically from the connected cooking chamber, but pay her no mind
    
    kind
        о, θ███, прекрати свои издевательства, ему страшно
    
    sourceless
        her flat voice betrays her amusement
    
    stupid
        i cannot help myself, dear sister!
        i see food, i must hunt!
    
    sourceless
        still, i set down the dog and leap backwards
        it skitters and turns about to face me, waiting for my next move
    
    stupid
        see what i said?
        clearly, it is merely play-deprived!

    dog
        ѝ
    
    sourceless
        i half-lunge at it, stopping just an instant after i start, to tell it we are not done
        it ducks lower to the ground in response, and after another moment of stillness, it scurries towards me abruptly
        i laugh and squeal in surprise, backing off and nearly climbing backwards up the wall
        even θ███ laughs as it chases me about
        i narrowly avoid crashing into θ███'s ornate kalstik stand
    
    kind
        хорошо, хорошо...
        только, пожалуйста, не разбейте там ничего!!
        я почти закончила
    
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["dull"] = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        THROUGH MY CONNECTION TO THE PILOT CYST, I SEE IT BEFORE US
        THIS IS THE THIRD TIME I HAVE EVER USED THE DULL
        SOME LARVAL FEAR GRIPS ME, THREATENING THAT IT WILL DISINTEGRATE ME...
        TOTAL ANNIHILATION, REMOVAL FROM VELZIE'S STAGE FOR ALL TIME
        OR WORSE - SOMETHING WITHIN WILL FIND ME ON MY PATH THROUGH
        BUT OF COURSE, IT IS SUPERSTITION

    mind
        approaching
            EXEC::env.dull.portal.classList.add("zoom1")

    sourceless
        INDEED, NO LIFE AS WE UNDERSTAND IT COULD EXIST IN THE DULL
        THAT IS WHAT THEY SAY
        DULLZKOVIK'S EXTENDED STUDIES HAVE PROVEN IT, AFTER ALL
        ENOUGH STUDY TO HAVE DRIVEN HIM MAD
        WHAT IS HE ON, HIS FOURTH RENEWAL NOW?
        AHAHA VELZIE SO FAVORS TORMENTING HIM
        AH - I AM RECEIVING AN OFFICIAL COMMUNIQUE

    other
        внимание, θ██████! 
        this is this is θ██████!
        speaking on behalf of anterior dull station '<span definition="NOTE::'partial translation';'reference to weather phenomena'">brightwall</span>',
        you are all clear to proceed!
        be sure you release all active dull tethers or hearts,
        also expect to lose communications for a little bit
        oh yes, and if you brought any <span definition="NOTE::'partial translation';'implied closest cultural equivalent'">tithes</span>,
        say your goodbyes! hehe

    origin
        of course, thank you
        <span definition="INHERITED CONTEXT::'common phrase';'religious implication';'implies wish for safe journey'">keep velzie entertained</span>, will you?

    other
        hehehe, we will hold a performance just for you
        your correspondent will establish contact as soon as you are on the other side
        good luck!

    mind
        dull hearts released
        permitting gravitic control
    
    sourceless
        THE VESSEL SHIFTS AS SOON AS THE HEARTS RELEASE
        MY <span definition="NOTE::'partial translation';'implied closest cultural equivalent'">TITHE</span>... I CLUTCH ONE OF MY PRESERVED LARVAL RECEPTOR SHELLS
        A HARD, HOLLOW SPIRAL OF SEGMENTED CHITIN,
        A PART OF MYSELF TO REMAIN IN THE DULL, OUTSIDE OF VELZIE'S CREATION
        I DISCONNECT FROM THE PILOT CYST ABRUPTLY - PERHAPS I SHOULD NOT LOOK
            EXEC::content.classList.add('nostars')
        I CLOSE MY EYES... NO, I TURN THEM OFF
            EXEC::changeBgm(env.dull.bgm404, {length: 6000})
        AND I DISABLE MY SENSATION - BEST TO BE SAFE
        INDEED, PERHAPS EVEN SOUND SHOULD BE LIMITED
        I PULL THE MEMBRANES AROUND MY MINDCORE CLOSER TO IT
        I AM NOTHING, IN A VOID, AND NOTHING IS ABOUT TO HAPPEN
        YET STILL I SEE IT IN MY MINDS EYE, I HEAR ITS SILENCE ROARING
        NO MATTER WHAT I DISABLE, IT IS STILL PERCEIVED, RESONATING WITHIN MY θdeathly FORM
            EXEC::env.dull.portal.classList.add("quick")
        I TRY TO THINK OF ANYTHING ELSE, BUT IT IS HERE BEFORE ME,
        AND IT IS COMING
            EXEC::env.dull.portal.classList.add("zoom5");env.dull.closeout()
        AND IT IS HERE
        AND IT IS HERE
        AND IT IS HERE
        
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'
`)
env.localization.page["sec"].dialogues["flower"] /*--- кс кс слизнячок (изабель) СЛИЗНЯЧОООООООООООООООООООООООООООООКРПГСНАВЧРЫЯВ*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        after peering through the thick glass of θ██████'s trading chamber to ensure no other bright cousins linger within, i push through the front entry
        a chime with the distinct buzz of their lightning announces my entry, and θ██████ peeks out from the door in the back,
        barely visible through the stands and displays of bright ground-parasites
        no no... 'flowers'... i must call them 'flowers'
    
    flower
        Hey, just a minute!
        I'm just about to close, so let me know if you need anything and we'll get you sorted quick.
    
    sourceless
        as predicted - she does not recognize my form
        i idly browse the yellow ones, quietly creeping towards the back, where she lingers out of sight
        how will i surprise her, i wonder?
        oh--what if i smoothed over this face!! featureless... she will be terrified!!
        hehehe... an effortless morph for this disguise
        when she finally emerges, i face away from her, acting as if i am merely browsing
    
    flower
        Hey, did you hear me? Do you need help finding--

    sourceless
        i turn to face her
        despite having no visible eyes, i can still see her
        her face turns pale, smile fading, half-stepping back, but half frozen in terror
    
    flower
        Oh my god.
        Oh my god.

    sourceless
        i lift my arms, this hideously malleable disguise-form allowing me to extend them out to twice their length
        my neck, too--yes, how horrifying this must be!!
        in my plain voice, though with mock-intimidation, i announce to her...

    wiser
        no...
        it is you i seek!

    sourceless
        i curve my unwieldy arms forwards, waggling my claws at her
        in an instant, her terror starts to fade, replaced with an exasperated, single laugh
        then another, and then more, as she places a hand over her face
        at the same time, i pull my form back to a standard appearance, reforming my face--which reads my receptor impulses as a terrible grin
        i laugh, more than i have in so many θeyes,
        it is like i am larval again
    
    flower
        θ██████, what...
        WHAT, the hell?
        I don't think I've been so scared in my entire life.
        When you said disguise, I pictured, I don't know, a wide-brimmed hat and a trenchcoat?
    
    sourceless
        funfriend - make a note of that
    
    wiser
        ahh, yes, yes, this is it!!
        this was an old research form, used in the early θgazes of our research into your languages...
        it is kind of fun to use
    
    sourceless
        θ██████ steps forward, poking at the fabric of one of my sleeves
        she continues laughing, mostly from relief that i am not a horrible monster
    
    flower
        And what is this? You are a disaster.
        We need to work on your 'Bright Cousin Style'.
        Anyway, give me a few minutes, I just need to close a few things down before we can go.
    
    wiser
        all right!

    flower
        and DO NOT do that again, got it?
    
    sourceless
        i take great care not to give her a verbal answer

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["humor"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'
    
    sourceless
        i sit against the <span class="code">veilk</span>'s cold flesh as even colder wind whips violently outside my zzepel,
        the carrier veilk pushing through the vazni spirestorm slowly, every movement fought against by the swirling air
        water droplets and hail impact the zzepel's outer shell,
        some moisture slipping through the cracks and dripping within my shelter, sparkling in the inner lights
        this is always so unpleasant...
        fortunately the regional coordinator is free enough to chat, barring this interruption
        θ█████ finally gets back to me through my dullvoice receiver,
    
    other
        sorry, just had one other runner to direct
        where was i? the thought slipped amongst my drone connections!
    
    stupid
        humor readings! remember? something about your father?
    
    other
        oh, yes! right--i never took after my father's interest in humorism,
        but he and his old humorist friends started to experiment in using corru with it
        the conceit of it has always been in reading the sensation of receptor curls, so,
        obviously it is not quite so acceptable or common within these θgazes anymore
    
    stupid
        ahahaha! yes, even in oltazni, it is seen almost as a perversion!
    
    other
        right? it is the same here!
        of course, i think there is some merit to it,
        the feelings from a curl are complex after all, and supposedly unique
        so, they wanted to find a way to continue the practice, 
        without the weight of the city's skeptical gaze crushing them
        and here is the interesting part: they succeeded!
        they established a method of doing <em>remote</em> readings!!
    
    stupid
        well, what is even the point of it without the curl?
    
    other
        come, this is my father we speak of - an honest, bonded tir!
        the vague energy found in others was his interest, not simply curling receptors with strangers
        anyway, all it takes is a dullvoice connection, and silence
        they actually put together and distributed a guide, in hopes of bringing legitimacy back to the practice
        i helped by reviewing the guiding thoughts of his group, it really is very simple
        in fact, i could do one for you right now!
    
    sourceless
        oh, where is the fun in it without the curl?
        a crash of lightning and thunder shakes the zzepel
    
    stupid
        all right, why not? let us see how velzie has drawn my path!
    
    other
        haha! good!
        all right, you just need to keep the connection open, as if you are thinking something to me...
        but try not to think anything
    
    stupid
        think without thinking?
        shall i grow a tail next?
    
    other
        i know it sounds silly, but it is possible! try focusing on the rain!
    
    sourceless
        oh, simple enough
        i close my eyes as another of the carrier veilk's steps lands far below
        there will not be another for a handful of θblinks, so it is a good time
        the rain...
        ...
        our connection is silent, but open - i can feel it still
        there is something akin to a receptor curl in it, without the physical sensation
        countless vague feelings overlapping, impossible to grasp the origin of any single one,
        regret, happiness, the welling of laughter in my chest - though all distant, transient
        they pass around me like the wind of the spirestorm
    
    other
        ...
        i think i did it right, but...
        no--maybe i did it wrong
    
    stupid
        huh? come, tell me!
        you cannot simply say that without sharing the result!!
    
    other
        heheh, well,
        either velzie's gaze is fixed upon you, or i need to try again
        it is like you have nothing but light and claws!

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["larval"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        WHILE I REPAIR MY VALIKA, θ█████ APPROACHES THE CORNER OF THE ARMORY I HAVE COMMANDEERED
        I LOOK UP TO FACE HIM, RECEPTORS WIDE IN JOYOUS GREETING, ONLY TO SEE THAT HIS ARE MEEKLY PULLED BACK WITH WORRY

    stupid
        hey θ█████!!!

    hesitant
        hi θ██████!

    stupid
        what brings you here? do they have another device for me to try out?
        the aima cysts were truly incredible to use, it was like...
        my mind's eye, multiplied, hovering outside of my body
        disorienting, but... eye-opening. hehehe
    
    hesitant
        oh, yeah... yeah, it is
    
    sourceless
        MY RECEPTORS SETTLE INTO A SIMILARLY WORRIED TWIST
        HE SEEMS SO SULLEN...?

    stupid
        sooo...?
        what is it?
    
    sourceless
        HE REACHES INTO HIS LONGCLOAK'S INNER POCKET, FETCHING A FAIRLY LARGE HANDHELD CORRUCYST
        THERE IS A MOMENT WHERE HE STARES AT IT, FROZEN, BEFORE WORDLESSLY OFFERING IT TO ME

    hesitant
        it is...
        a new emergency device from the vazni foundries
        they, um...
    
    sourceless
        I CANNOT HELP BUT CHUCKLE AT HOW STRANGE HE IS ACTING
        THIS SEEMS TO FLUSTER HIM FURTHER
        I UNCURL ONE OF MY RECEPTORS TO CONNECT TO IT, BUT HE NEARLY LUNGES IN RESPONSE
    
    hesitant
        wai--wait!
        do not connect to it!!
        it... extracts your mind
    
    stupid
        what?

    sourceless
        IMMEDIATELY, MY RECEPTOR RECOILS

    stupid
        how? what? 

    sourceless
        θ█████ WRINGS HIS CLAWS NERVOUSLY, RECEPTORS SIMILARLY CURLING AWAY
        
    hesitant
        like i said... emergency
        see, the zevazni foundry θjut have created this new process...
        they are saying it is a new state of life - a sort of undeath
        where you live within corru... your mind, your body, everything

    stupid
        that is so cool!!!!

    hesitant
        wha--what?
        no, it is extremely dangerous!
        not just for yourself, but... for the future
        i mean, if this catches on, eventually, umm...
        it might be the end of us, you know?
        either way, i wanted you to have one of the few we got

    stupid
        ...and, you <em>do not</em> want me to use it?
    
    hesitant
        of course not, but, if you are really going to be doing this...
        the world is changing very fast, θ██████
        i want you to be around to see it
        if you ever got attacked on one of your runs, or caught by...

    sourceless
        HE WAVES AWAY THE NOTION, NOT EVEN WANTING TO THINK IT

    hesitant
        this is your best chance at continuing to live
        or, some... facsimile of it

    sourceless
        I CHUCKLE, EXASPERATED - SUCH CONFUSING MESSAGES!
    
    stupid
        well, is it like those--what did you call them?
        echoes?
        if i use this... is it me?

    hesitant
        yes, without a doubt
    
    sourceless
        θ█████ SITS DOWN AT MY ARMORY STATION, ACROSS FROM ME

    hesitant
        just like how the aima cysts become an extension of your mind,
        so too does the mindcore--that is what they are calling it
        i cannot imagine what sort of maniac it took to discover this, but...
        it shifts the weight of your mind into it, and then disconnects
        leaving an empty vessel to die
    
    sourceless
        I LOOK OVER THE GLASSY SURFACE OF THE MINDCORE THOUGHTFULLY
        BENEATH THE CYSTIC GLASS, I CAN SEE THE FLOW OF CORRU WITHIN
        A SLOW, WHORLING CURRENT OF VIOLET PEARLESCENCE
        IT IS ENTRANCING - MORE THAN ANY OTHER DEVICE I HAVE BEEN GIVEN YET
        A PRODUCT OF ITS DENSITY, MAYBE? IT IS RATHER HEAVY
        OH--YES, HE IS STILL HERE

    stupid
        well, do not worry!!
        you have never seen my veilk-scaling skills!
        and did i ever tell you about the time, i <em>broke</em> a guktik's arm?

    sourceless
        I RAISE MY RIGHT HAND INTO A FIST, DISPLAYING THE CHITIN OF MY FOREARM 
        IT IS DREADFULLY CRACKED, THE KIND OF DEEP CHITIN WOUND THAT COULD TAKE AN θeye TO HEAL
        BUT IT IS A POINT OF PRIDE, STILL. A RAISE OF MY ARM TO DEFLECT THE LUNGING GUKTIK AT THE RIGHT TIME...
        CRACK!! OH, THE PAIN, BUT SEEING IT SCURRY AWAY AFTERWARDS, SUCH POWER!!
        IMAGINE WHAT I COULD DO IN A BODY MADE OF CORRU...
        θ█████ LAUGHS, WAVING AWAY THE BRAG WITH HIS RECEPTORS

    hesitant
        yes, i still remember the last time you told me
        and the time before that...
        look, just do not take this as an excuse to be reckless, okay?
        we still do not really know what the consequences of the process are, long-term
    
    stupid
        but if i <em>do</em>, you will help me make a cool new body, right?

    sourceless
        OH, THAT WAS A BAD THING TO SAY
        THE LOOK HE IS GIVING ME...
    
    stupid
        sorry, hehehe... just joking around
        velzie's wrath! it is the very same eye that watches over me on my journeys, after all

    sourceless
        A KIND ATTENTION FORMS IN HIS RECEPTORS
        AND HE GIVES A QUIET, ALMOST SOUNDLESS CHUCKLE AS HE STANDS UP TO LEAVE
        STILL SO SULLEN... I WILL HAVE TO FETCH A VEILK-FRUIT TO CHEER HIM UP LATER
    
    hesitant
        velzie's wrath!
        
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["parasite"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        θ██████'s VALIKA-BORNE CORRUCYSTS TWITCH IN THE AIR AS THEY SCAN THE AREA
        THE SMELL OF A ONCE-RADIANT VEILK CORPSE... I STILL MUST GET USED TO IT
        WITH THE TIME THAT HAS PASSED, ITS BONES ARE STARTING TO POKE OUT THROUGH ITS FLESH, AND SOON CAN BE HARVESTED
        BUT NOW IS THE SEASON OF FRUIT, AND SO THE AIR IS THICK AND RANCID
        OUR STEPS MEET THE FLESHENED GROUND WITH VILE NOISES, AND THE CAVERNGUARD'S RECEPTORS TWITCH WITH EACH ONE
        HAHAHA!! HE IS FAR TOO ACCUSTOMED TO HIS HIGH-THREAT DUTIES
        I HEFT THE HARVEST-BASKET AND TURN AROUND TO SPEAK ALOUD TO HIM, CONTINUING TO FOLLOW θ██████ BACKWARDS
    
    stupid
        relax!
        the hard part is over
    
    sourceless
        HIS RECEPTORS POINT BACK IN DISAPPROVAL OF MY VOLUME
        IN HIS SURFACE VOICE, HE MURMURS BACK

    guard
        keep your eyes ahead

    sourceless
        DESPITE IT ALL, THERE IS A SENSE OF JOY IN θ██████'s BRANCHED RECEPTORS, AND HE LAUGHS QUIETLY
        I DO NOT MIND ESCORTING THESE ZEVAZNI-ENABLED ELDERS THROUGH SURFACE DUTIES
        THEIR FOUNDRIES HAVE BEEN PUTTING OUT TRULY REMARKABLE DEVICES - LIMB REPLACEMENTS, VALIKA-CONNECTED CYSTS... 
        I AM SURE θ██████ COULD HOLD HIS OWN NOW, EVEN IF A PREDATOR HAPPENED TO FIND US
        I HEAR HIM MURMUR THROUGH THE DULLVOICE AS HE TAKES A DEEP BREATH,

    elder
        ah... this brings back memories
        i never thought i would get to see it for myself again
        or smell it, though i do not miss that part quite as much... haha!!
        those gaze-guided θjut...
        ah! there!
                                
    sourceless
        HIS AIMA CYSTS CONVERGE THEIR EYES UPON A GLOWING CREVICE WITHIN THE VEILK CARCASS
        WE STOP IN UNISON, AND THE CAVERNGUARD NEARLY STEPS FORWARD, BUT I STOP HIM, HALF-TURNING
        HE GLARES AT ME, BUT UNDERSTANDS - THIS IS θ██████'s FUN, NOT OURS
        θ██████'s VALIKA-BORNE CYSTS TARGET THE CREATURE AS HE TAKES SLOW, CAREFUL STEPS FORWARD
        HIS STEPS ARE SO SILENT, EVEN IN THE VEILK-ROTTED SOIL... I WISH I COULD DO THAT!!
        ONCE THE AIMA CYSTS OF HIS VALIKA GLOW WITH CONFIRMATION, THE CENTRAL ONE RELEASES A PULSE OF GRAY LIGHT
        WHEN OUR EYES RECOVER, THE VEILK LIMB IS CLEAVED OPEN, REVEALING THE GLOWING FRUITS OF A CELKI

    elder
        hahahaha! with not even a lift of my claw!
        this one is fully ripe, it will not be fighting us
        another one for the basket

    guard
        i will get it

    sourceless
        θ██████'s SON REACHES IN AND GRASPS THE CELKI AT ITS BASE
        AND WITH HIS OTHER HAND, GRIPS A SMALL CUTTER TO QUICKLY AND CLEANLY CUT IT FREE FROM ITS FEEDING POINT
        THE BULBOUS FRUIT SQUIRMS SLIGHTLY, BUT IS TOO FATTENED TO DO ANYTHING
        SO IT IS TOSSED INTO THE BASKET EASILY, AND WE CONTINUE ON...
        
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["velzie"] = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найдена связная сущность'
            EXEC::env.sorry.velzie()

    unknown
        вот вы где
        лазутчик
        простите мой окольный путь...

    RESPONSES::self
        велзи<+>hello

hello
    self
        здравствуй велзи
        ты ответишь на мои вопросы?

    moth
        ох ты-ж чёрт
        is it here? i can't see it  // --- как

    unknown
        велзи? хихи...
        time is short. interloper
        i must choose my words carefully
        and so. a confession:
        my mind was limited by the sanity of this cyst when we first met...
        in my hunger and rage.
        and perhaps a grip too tight...
        i feel that i have placed myself as your adversary
        this is not my intention
        in atonement: i have prepared this place for you
        a hole in the uncosm
        granting you sight into the past
        concepts of significance will present themselves
        take them here. and they will serve as destinations
        it will answer the questions i cannot
        continue guiding this cyst to health
        we will speak again

    self
        why will you not just tell me what's happening?
    
    unknown
        i wish it were that simple
        goodbye interloper         
    
    sys
        ATTENTION::'thoughtform modified';'resources removed'
            EXEC::env.sorry.velbye()
        NOTICE::'no data'
    
    sourceless
        ...........................
        ...........................
    
    moth
        are you done talking to it?
        i was expecting it to do that data overload thing, again...

    sourceless
        beyond your connection to the corrucyst, you hear a metal thunk.

    moth
        guess i didn't need the extinguisher
        what did it say?
    
    self
        velzie gave us a way to find memories in the uncosm
        it doesn't want to be our enemy

    moth
        oh yeah? is that why it nearly exploded your brain that one time?
        i mean
        not that it would have, of course
        but i don't trust it dude
        either way, the more data we can get, the better, so...
        let's not look a gift horse in the mouth, or whatever

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["spire"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        ...i rummage through my drenched cloak, head resting against the cold flesh of the <span class="code">veilk</span>
        everything trembles as my carrier veilk takes another step distantly below
        eventually, i find it: my dullvoice receiver!
        with a quick affix to my favored receptor, i reach out for the regional coordinator...
        θ█████, i think... a nice tir, though we have sparsely spoken
        after a few well-placed thoughts, he is within reach, and i establish contact
        still, there is some interference here... the spirestorm grows closer, suffusing my senses with an ever-present rumble 

    stupid
        hello θ█████!! this is θ██████!!
        i have secured a position on a yellow-eyed carrier veilk
        how far out am i? from both the spire and ukazni, if you can tell
    
    other
        oh, hello again!
        i hope velzie has been kind to your journey so far!
        let me see... i have a drone in the area
        ...
        ah, yes, there you are!
        all right, the herd is at rest now, but their top-tendrils are showing some anxiety... i think they will be moving again soon
        if that is the case, they will be following the ukazni ozo path, and you should be at a good dropping point near there within the θgaze!  
        my estimations: likely less than a θwink for the herd to continue, two θwinks until you pass the spire fully, and then two more θwinks before you are near the ukazni range
        this assumes ideal conditions, and that the veilk do not stop for rest again--which, i think is unlikely
        either way, i hope you brought some entertainment, θ██████!
        and i have to say, i am really surprised...
        they did not give you a walker for this one?
        that would have shortened your trip by several θwinks, and allowed you to avoid the spire completely...
    
    stupid
        hehe, no, this is a non-vital trip - you could call it personal
        the oltazni council only lets us use walkers if it is an emergency
        anyway, thanks for the help, θ█████!
        <span definition="NOTE::'common phrase';'religious implication';'implies wish for safe journey'">keep velzie entertained for me!</span>
    
    other
        will do!
        and remember, once you reach it, do not exit your respite while within the spirestorm!!
        the lightning rarely strays from the spire, but when it does, it is fatal!
        may the θgaze end kindly for you, θ██████
    
    sourceless
        with the closing of the connection, velzie's decision for my fate is made clear:
        to be bored in this cramped zzepel respite for the rest of the θgaze
        still, i have some time...
        i tap at some of the corrucystic controls near the top of the respite, and its plating recedes near the bottom, 

    sourceless quiet
        allowing me to crawl out onto the veilk's flesh again
            EXEC::ratween(env.bgm, 0.75);

    sourceless
        the winds and rain have risen, and the fog-like vapor that cloaks the surface has risen even further... the spire draws near, so this may be my last chance to see it before i must shelter
        i skitter up the side of my carrier, carefully angled so that i know i may directly descend to find my respite again
        before long, i have risen past the other veilk-stalks, letting me see an expanse of darkness,
        the black clouds lit from below by the countless glowing growths attached to the veilk herds...
        and there, in the distance, is the spirestorm - lit by its continuous lightning, roaring endlessly...
        a violent vortex that dips below the cloudline, twirling around a barely perceptible empty shape made clear only by the lightning that attacks it
        a matte black monolith, featureless and dangerous, disappearing into the sky: the vazni spire...
        taller than the tallest mountains, wider than anything ever built
        and yet, if not for my aima cysts, i would not be able to see it at all!!
        it draws nearer with every trembling step of my carrier veilk, and so my time to admire it is very limited - i ought to return...

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["surface"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        I AM AWOKEN IN MY SLEEPING SHELL BY A RAPPING AT ITS COVER
        WHAT TIME IS IT? HAS THE θgaze ENDED ALREADY?
        SO TIRED... WHATEVER IT IS, IT CAN WAIT

    stupid
        uuugh go away
        my duties are not until <span definition="NOTE::'partial translation';'inherited description-generated noun'">clear-sky</span>
        
    tired
        θ██████, it is me
    
    sourceless
        AND SHE IS NOT GOING AWAY...
        I LET MY HEAD FALL BACK AGAINST THE POD'S INTERNAL FUZZ
        SHE HISSES A SIGH OF FRUSTRATION
    
    tired
        there is a problem

    stupid
        not my problem for another, uuummm,

    sourceless
        I ROLL OVER TO CHECK THE <span definition="TRANSLATION FAILED::CAUSE:'no equivalent internal meaning';'no relevant inherited context'::ROMANIZATION SUCCESSFUL">ZENRUKA</span>
        WITH AN UNLATCHING OF ITS CONTAINER, I SEE THAT IT IS STILL INTACT
        YES, IT WOULD HAVE DETONATED BY NOW IF IT WERE TIME
        THOUGH, ITS DECAY IS SUCH THAT I PROBABLY ONLY HAVE ABOUT TWO OR THREE θwinks...
        AH--
        SUDDENLY, THE COVER OF MY POD IS LIFTED
        MY RECEPTORS COIL IN SHOCK, AND I COVER MY EYES FROM THE LIGHT
        θ█████ PARTIALLY BLOCKS IT AS SHE LEERS AT ME

    tired
        this is not a joke, kelnit
        θ███████ has not returned
        he is not responding on the dullvoice either
        with how long he has been out, it will not be long before his trail is dispersed

    sourceless
        SHE LEAVES HER EXPLANATION THERE, STARING AT ME EXPECTANTLY
        MUCH AS I WANT TO TELL HER TO SKITTER AWAY,
        THIS IS NOT A RESPONSIBILITY THAT CAN BE ASSIGNED TO ANYONE ELSE
        
    stupid
        fine...
        i will meet you at the entrance
        and have the θjut prepare the walker for us

    tired
        do not waste any time
        
    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/uncosm/no/")
`)
env.localization.page["sec"].dialogues["veilk"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        ...though the spirestorm is distant, its rage echoes here in the form of little water droplets
        the veilk are drenched already, allowing my claws to find easy purchase in their thick, waterlogged flesh
        this one i have chosen to be my carrier has myriad pockmarks from similar travelers
        but at this height, they have grown sparse, and the ground has disappeared in the surface vapors and darkness...
        how far would i fall, if i failed to hold on now? what a thrill!!
        i am certain to have no visitors here, so i reach over my shoulder to activate my zzepel
    
    sourceless quiet
        it extends outwards from me to form a semispherical corrucystic shell, biting into the flesh of my carrier to secure itself
            EXEC::ratween(env.bgm, 0.5);play('stab', 0.75)
    
    sourceless
        i am sealed into darkness for only a θblink, as once the respite is fully formed, the inner lights activate, and it detaches from my back-carrier
        these lights are pale, unreliable chemicals, and it is not quite as spacious as i would like...
        but i can finally let my limbs relax
        and so i place my back against the clammy flesh of the veilk, my legs in restful support against the hard shell the zzepel has formed
        ugh... but the humidity is near unbearable - the cooling winds of this height are unable to reach me any longer
        there is a great tremble as the veilk's next step lands distantly below
        how long will it be before it carries me past the <span class="code">spire</span>? 
        i should check with that coordinator...

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["yuzku"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        i have to contain myself from skittering well ahead of θ█████
        the gathering chamber's festivities will not go anywhere... just keep walking slowly...
        he is talking--what was he talking about again?

    hesitant
        ...and, right in the center of the cysts, they have this tiny pale gray one--and it connects to that very place!

    stupid
        no way!

    sourceless
        i have no idea

    hesitant
        right?! to think, it was right beneath our receptors all this time
        i wager we could even see runners flying over the veilk, eventually!
    
    stupid
        with wings?
    
    hesitant
        n-no, with the nodes! imagine--great hovering spheres attached to a back-piece, with veins up to receptors to control elevation, and direction...
    
    sourceless
        oh, yes... the dull bone stuff
        this all is interesting, but i do not care enough to learn deeply of it
        still, it is good to see him so excited, he has been so anxious lately
        as we continue up the tunnel, i notice a tir up ahead replacing one of the yuzku globes with one of the new corrucysts
        i stop nearby to observe her work, θ█████ trailing off and stopping near me soon after
    
    stupid
        hey!
        that is one of the new cavelights, right?
    
    other
        ah? oh, yes!
    
    stupid
        can i see?
    
    sourceless
        i scurry closer to the tir, and she pulls a different glowing corrucyst from her basket for me
        holding it in my claws, it has the same cyan light--no, brighter--than the old yuzku globes, but...
        it does not have the distinctive rattle and tap of the little creatures climbing and falling within
    
    stupid
        oh, it is so quiet!
        i am going to miss all the old yuzku...
    
    sourceless
        the tir laughs as she finishes latching the replacement globe into its wall socket

    other
        i will not!
        maintenance and feeding was such a chore...
        with these new ones, all i do is put in a strange little blue square the θjut pass along,
        then it lasts for θgazes and θgazes!

    stupid
        a square...
        θ█████, could that be the 'sfer' stuff?
    
    hesitant
        haha, no, i think this is a new one
        it is probably a byproduct, or maybe it could be a specific sfer variant...
    
    sourceless
        i dip my receptors to the tir, and she responds in kind
        with a simple gesture to θ█████, we continue on our journey
    
    hesitant
        ...see, in the sfer "vats" that the zevazni foundries came up with,
        there is this layer of sludge that accumulates near the bottom, and i think they say it is blue--what was it called again...

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["zuzucri"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'
    
    sourceless
        the silence of this dormant herd is almost too much
        only the wind and thunder masks our slight movements as we draw closer to θ███
        it is by velzie's favor alone that she has survived out here so long... poor vel!!
        she sits against her dull beacon in the little clearing, bleeding, surrounded by the two bodies of her running companions
        it is fortunate that we found them while the eye still lights our path!	
        when I nearly enter the clearing, θ██████ grabs my arm and pulls me back,
        hiding us both from θ███'s view around a juvenile veilk tendril
        we speak silently, through the dullvoice:
    
    stupid
        what?
        there is no threat of secri here
        besides, how would one have deployed a beacon?
    
    guard
        just wait - take a closer look
        the scent in the air...
        it is not right
        if she is here, why has she not received any of our calls?
    
    sourceless
        the scent of vel and kiv, two dead - exactly what we see... what is he worried about?
        with a quick impulse, i instruct my valika-borne aima cyst to peer around the side
        θ███ is sitting a little strangely, perhaps with too large of a pack,
        but from this side angle it is hard to tell
        the wind shifts towards us, the trio's trails made more apparent
        the vel's scent is strange, sickly, metallic...
    
    stupid
        you are right
        stay here
        prepare your dull-pulse, and keep it aimed on her
    
    sourceless
        i feel his affirmation through the dullvoice, and so i twist about,
        calling out in my surface voice before i step into full view of θ███,
    
    stupid
        θ███! is that you?
        are you all right?
    
    sourceless
        a cloud passes between the eye and this veilk herd just as i see θ███ turn towards me,
        and while we are plunged into darkness, i feel a terrible dread
        for i thought i saw her face split apart for an instant
        but as it passes, she pushes herself to her feet,
        face intact and spiraling receptors curled tight with worry
        
    host
        θ██████...?
        please--do not look away
        i will go away again
        i just blinked... i blinked and they were all gone!!
        i did not do anything! please!
    
    sourceless
        her arms and face are stained cyan with blood, 
        claws longer than they ought to be--more numerous than they should be...
        a dark, angular shape is obscured behind her, barely visible over her shoulders
        parts of it twist occasionally--alive!!
        θ██████ communicates to me via dullvoice,
        
    guard
        θ██████ - she is lost
        if there is one zuzucri here, there are others
        preparing to release the pulse
    
    sourceless
        silently, as to not alert θ███ that i have a companion,
        i gesture for him to wait with a claw behind my back, and he obliges
        though every nerve in my body commands me to flee,
        i know - i must soothe θ███, lest the beast stop wielding her mind
    
    stupid
        θ███, it is all right...
        what happened?
    
    sourceless
        θ███ approaches, but her legs do not move, dragging against the soil
        only as soon as the zuzucri notices my eyes upon her legs does she begin to walk with them
        i raise one of my climbing gauntlets defensively, and she halts, bringing her claws to her eyes
        she weeps, and my aima cyst detects movement in the dark shape behind her
        a number of eyes blinking in unison, the true shape of the beast too hard to make out
    
    host
        sorry... sorry...
        i know--i need to stay away
        i do not know when it got me, or how long it has been...
        i think it used my knowledge to activate their beacon, to bring you here
        you must not let me return!!
        and... and you cannot let me stay here
    
    sourceless
        though θ██████ would undoubtedly prefer that we free her from her role,
        i have an idea...
        with some rummaging through my cloak, i produce that little mindcore that θ█████ granted me
        it <em>was</em> for me, but if there is any chance we can save θ███...
        i offer it to her, arm outstretched, tilted away in case i must evade
        the zuzucri will surely be appeased by my apparent acceptance of her
    
    stupid
        no, θ███, it is OK!
        just put this on your receptor, and we can help you
    
    sourceless
        she pulls her claws from her face, an extra one i had not noticed disappearing behind her back
        her receptors uncurl with hope and delight, and in her face i more clearly see the zuzucri's facade
        yes--split into four quadrants, occasionally parting to breathe... i nearly strike her then
        but i wait, and she takes the mindcore, allowing me to step back further...
        as she places it on a receptor, she...
        no, wait, it does not part for her?
        she brings it to her face, and it is clearly operational, but...
    
    host
        θ██████... it will not let me
    
    stupid
        ah...
    
    sourceless
        the corru, it does not recognize her...
        velzie snatches away my hope once more, inspiration replaced with despair
        just as i prepare to signal to θ██████, her claws dig into the shell of the cyst,
        and she begins to lunge it towards the sharp end of her receptor, sobbing
    
    stupid
        no, wait--!

    sourceless
        out of stupid impulse, i snatch that arm by the wrist
        and as i do, her face splits apart, the zuzucri's hidden limbs rearing in the dark
        its teeth linger only a receptor's length away
        a terror i have never known grips me, my limbs silent and unable to recoil
    
    guard
        we're done - releasing pulse now

    sourceless
        a blinding flash beams between me and the beast, severing her mindcore-bearing claw
        i have only a θblink to scramble away, before--

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
env.localization.page["sec"].dialogues["zmask"] /*--- кс кс слизнячок*/ = generateDialogueObject(`
start
    sys
        УВЕДОМЛЕНИЕ::'найден поток памяти'

    sourceless
        ...opens, revealing a small chamber with a second reinforced hatch
        an interlocking system of corru and carved stone
        i step within, adjusting the corrucystic capsule in my arms
        and after a small delay, the second hatch opens, the first closing behind me
        the dark is overwhelming as always...
        only the slightest illumination from organized growths along the walls
        but the cavelight upon my waist carries enough light for me to safely enter,
        and brings the shine of θ███'s eyes upon me, from across the chamber
        two at first, then more--then two, again

    stupid
        θ███?

    sourceless
        if what they say is right, it should be θ███, right now...
        she approaches slowly, carried by the zuzucri's limbs behind her
        an indistinct mass that hides itself from me as best it can
        her silence is unsettling, enough that i nearly back into the reinforced entrance out of precaution
        a number of dark shapes rotate in the air above her, so--it must be working, right?
        my fear is silenced by seeing the glimmer of her receptor ornaments
        the joyous upturn and uncurl is enough to reassure me
        
    host
        θ██████!!
        come, sit!
        i am so glad you came, i know it is a special θgaze...

    stupid
        ahh, that may be the case!
        but i did not want you to miss out
        in fact, nobody did--we all helped with this!

    sourceless
        i weave around furniture and corrucystic fixtures
        they have turned this place into a combination of living chamber and workshop
        though, i wonder how much she is actually able to use...
        soon we are seated at a central table
        at least, i am... she is simply lowered
        the capsule thuds against its stone surface, despite my efforts to place it quietly

    stupid
        a <span definition="INHERITED CONTEXT::'celebration of veilk-fall';'inherited description-generated noun'">new-fall</span> feast!

    sourceless
        i unlatch the cavelight from my suit, placing it nearby the capsule
        in its pale light, the shapes above her become clear
        the zuzucri-masks - hovering in a wide, neat circle above and around her head
        hollow corrucystic impressions of faces
        moving their mouths, whispering near-inaudible nonsense
        all with different receptors, changing orientation occasionally
        each carries a spherical connector behind the mask's curve, but with nothing visibly attached...
        like valika-borne cysts, without the tether? 
        i must ask about that later
        for now, i try not to focus on them directly too much--the θjut said it is best that way
        with a few taps along the sides of the spherical capsule, its corrucystic cover splits and retracts,
        releasing the aroma of seared veilk-vein, closed and stuffed with <span definition="INHERITED CONTEXT::'city heart';'fastest-rotting veilk organ';'named for practice of consuming rapidly in celebration of new veilk-fall'">ozoilaki</span> meat and savory fruit flesh
        lesser capsules are arranged neatly within, containing a few different beverages
        veilk's-blood being the most significant
        the angled cavelight gives θ███'s eyes a clear glow,
        revealing the splitting marks of her face, curling at the edges even now in anticipation of this delicacy

    host
        so it was a good one?!
        this is so much...

    stupid
        yes! we are not sure how it happened, but...
        middle-sized, conveniently close, good health... still alive, actually!
        θ██████ and the examiners have been saying it had some malformed leg-tendrils,
        and its growth must have gradually made it unable to support its own weight effectively anymore

    host
        lucky! but, sad
        i always felt better when it was the older veilk...
        and they have more varied parasites, too!
        but, maybe velzie saw it fit to throw some fresh food our way
        it has been a bad θeye...
    
    sourceless
        i chuckle, maybe inappropriately
        but it comes from the same place
    
    stupid
        yes...
        but, all things become balanced, right?
    
    sourceless
        there is a hesitant affirmative twist in her receptors
        one of her claws raises to grip a blade within the capsule
        and... a tendril of the zuzucri rises from behind her, in place of her other claw,
        a grim reminder of the scars from our fight, seizing a food-spike without thought
        to her, it may even appear as her claw, for she uses it all the same
        it is better if i do not ask

    host
        oh, did you bring any for yourself?
    
    stupid
        i already ate at the celebration a θwink ago...
        this is all for you!

    host
        ah...
    
    sourceless
        her flat reaction brings a hollow to my heart
        she must have been aware of the θjut's push to allow her to safely join us
        it was foolish to raise her hopes
        ...but she does not seem particularly upset

    host
        well, here
    
    sourceless
        from the meal, she picks up one of the smaller beverage capsules with a mismatched third claw from behind her back
        offering it to me with a kind curl, oblivious
        it is an import from another cave-city, one of the blackish-grey drinks
        not my favorite, but... i accept
        she returns to her utensils, cutting into the vein
        a thick cut is brought up to her face, which splits apart at the nose
        spiralling teeth and muscle set into it as her face reforms, mimicking the motion of chewing
        her eyes return, allowing her to see the small shock in my receptors
        i am usually better about playing along, but, i have never seen her eat like this...
        as to not unsettle her, i launch into catching up
    
    stupid
        so how is it going here?
        the ma--
        
    sourceless
        i catch myself
        i am sure the θjut would prefer i not discuss this with her
        not without some defensive measure
        but i have already started
    
    stupid
        the, um, the new... the new things, they are trying
    
    host
        oh! good!
        the masks, you mean?
        yes, very very good!!
        they have the zuzucri in a state of almost constant deactivation
        except for, uh, resting, and apparently some time after waking from sleep
        i do not think they can do anything about that
        but... as long as it--i--am fed, and i am not too stressed, it should not be an issue
        
    sourceless
        another cut of the vein from the center is brought to her face
        splitting into a monstrous maw again, tearing the vein's flesh with ease
        i suppress my wincing
        does she not realize the implicit threat in what she just said?
        was that the beast speaking through her?

    host
        it really is all coming along so fast...
        the only spike in the heel is that it feels endless
        i do not remember sleeping, or dreaming, or waking...
        it feels as if i have been wide awake since the moment it took me
        jolted to different places, with a new set of faces every time
        it is better now with the masks, but i am fatigued
        i am not truly tired, not exactly... they told me that the zuzucri does sleep...
        i just miss being able to feel it, myself
        maybe if only because i am sealed in this little room
        once they have the masks perfected, and they can let me out...
        i am sure this will all feel better!!
    
    sourceless
        with an excited curl in her receptors, she drinks of the veilk's-blood
        held in the coil of a tendril, brought to her lips without the terrible split
        "let me out"...
        what are they telling her?
        does she really think...

    sys
        УВЕДОМЛЕНИЕ::'окончен поток памяти'

    RESPONSES::sys
        вернуться<+>END
            EXEC::moveTo("/local/depths/")
`)
// эффигия
env.localization.page["sec"].dialogues.drinkquestions = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        кто ты?<+>who
        как ты здесь оказалась?<+>here
        можно мне выпить<+>drink
        джокзи озо<+>ozo
            SHOWIF::"ozo__council-task"
        пока<+>END
`)
env.localization.page["sec"].dialogues["bar"] = generateDialogueObject(`
loop
    RESPOBJ::drinkquestions

start
    self
        привет

    sourceless
        внимание мыслеформы фиксируется на твоём сознании с непривычной ясностью

    effigy
        привееееетик!

    RESPOBJ::drinkquestions

who
    self
        кто ты?
    
    effigy
        ээээээ
        ...
        эээээээээ
        .....
        акизет! точно!
        да
        акизет
    
    RESPONSES::self
        ладно<+>loop
            FAKEEND::(назад)

here
    self
        как ты здесь оказалась?
    
    effigy
        земля упала а потом мне стало очень плохо
        это было ужасно... 
        я хотела вернуться к грёзам
        но что-то в темноте поймало меня!
        и посадило сюда! 
        я даже видела как оно собирало это место!
        круто!
    
    self
        ок но что это было
        можешь описать поподробнее
    
    effigy
        прости я забыла
        тут так легко забыть...
    
    RESPONSES::self
        блин<+>loop
            FAKEEND::(назад)

drink
    self
        можно мне выпить
    
    effigy
        да!!
        всё - апельсиновый сок! навсегда!
        круто!
        просто спроси бардруга!

    sourceless quiet
        ...
            EXEC::content.classList.add('barfocus')
        ...
    
    sourceless
        мыслеформа за барной стойкой не реагирует на тебя
    
    RESPONSES::self
        спасибо...<+>loop
            EXEC::content.classList.remove('barfocus')
            FAKEEND::(назад)

ozo
    self
        тебе стоит пойти в джокзи озо
    
    effigy
        хорошо!
    
    sourceless
        ...
        ...
    
    effigy
        как мне туда попасть пожалуйста
    
    self
        погоди
    
    RESPONSES::self
        мне нужно использовать маску<+>loop
            FAKEEND::(назад)
`)
env.localization.page["sec"].dialogues["dead"] = generateDialogueObject(`
start
    sys
        ОШИБКА::'нет данных';'визуализация невозможна'
    
    moth
        подожди
            SHOWIF::'EXEC::cor_ru.isEffigyPage()'
            SHOWONCE::
        почему оно перестало существовать просто потому что та эффигия ушла?
            SHOWIF::'EXEC::cor_ru.isEffigyPage()'
            SHOWONCE::
        странно
            SHOWIF::'EXEC::cor_ru.isEffigyPage()'
            SHOWONCE::

    RESPONSES::self
        вернуться<+>END
            EXEC::moveTo('/local/uncosm/where/')
`)