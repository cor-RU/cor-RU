env.localization.page['localcity'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "this is prettyyyy busted... but at least it's something": "довооольно поломанное... но хоть что-то",

        "glimmering spires mark their cities": "блистающие шпили обозначают их города",
        "these grand icons of their control": "эти величественные иконы их контроля",
        "they watch": "они смотрят",
    },
    entityDescriptions: {
        "glimmering spires mark their cities": `::ВЫСКАЗЫВАЮЩАЯ МЫСЛЕФОРМА
::СОДЕРЖАНИЕ::'
<span>блистающие шпили обозначают их города</span>
<span>все из мёртвого металла и стекла</span>
<span>такие высокие!!! выше, чем самые высокие <span class="code">вейльки</span>!</span>
<span>но они стоят в тишине...</span>
<span>однажды они задышат</span>
<span>и наши потерянные близнецы разделят с нами наши знания</span>'`,
        "these grand icons of their control": `::ВЫСКАЗЫВАЮЩАЯ МЫСЛЕФОРМА
::СОДЕРЖАНИЕ::'
<span>эти величественные иконы их контроля</span>
<span>пусть они не наши</span>
<span>я испытываю чувство гордости</span>
<span>как же наши светлые близнецы покорили свою <span class="code">поверхность</span>!</span>'`,
        "they watch": `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА
::ЯВНОЕ НАЗНАЧЕНИЕ::'вспоминание'
<span style="color: var(--obesk-color)" definition="АНАЛИЗ::'низкое разделение'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'в вечном скептицизме'</span>`
    }
}


// - DIALOGUES - //

env.localization.page['localcity'].dialogues.mthcityresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        что это за город<+>where
        неважно<+>CHANGE::++moth
            FAKEEND::(назад)
`)
env.localization.page['localcity'].dialogues["mth++localcity"] = generateDialogueObject(`
start
    self
        у меня есть вопрос об этой городо-мыслеформе
    moth
        ага-п?

    RESPOBJ::mthcityresp

where
    self
        что это за город?
    
    moth
        честн говоря не думаю, что это какой-то конкретный город
        выглядит как куча всего, смешанного вместе... типа как символы городов, а не их настоящие изображения
            SHOWIF::[['hub__funfriend-kickout', false]]
        раз эта циста голодает, может быть воспоминания акизетеше о наших городах сбились вместе чтобы выжить
            SHOWIF::[['hub__funfriend-kickout']]
        мы наблюдали такое поведение на физическом уровне в голодающих корруцистозных устройствах,
            SHOWIF::[['hub__funfriend-kickout']]
        так что могу поспорить что оно распространяется и на психический
            SHOWIF::[['hub__funfriend-kickout']]

    RESPOBJ::mthcityresp
`)

// - TRANSLATING DA BEECH - //

cor_ru.processWeirdTranslation(".loose-thought", "text")

document.querySelectorAll('#content .loose-thought .title').forEach(e=>{e.remove()})

document.querySelectorAll('#content .loose-thought').forEach(e=>{e.insertAdjacentHTML('beforeend', `<div class="title">${e.getAttribute('text')}</div>`)})

new Lettering('#content .loose-thought .title').letters()

document.querySelectorAll("#content .loose-thought .title > span").forEach((e, i) => e.style.animationDelay = `${-1 * (i * 0.25)}s`)