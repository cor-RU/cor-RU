env.localization.page['localuncosm'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "the readout here is like... complete nonsense. is there even anything you can interact with? does it hurt?": "отсюда считывается просто... полный бред. ты хоть с чем-то можешь взаимодействовать? не больно?",

        "no no no no": "нет нет нет нет",
        "memory hole": "брешь памяти",
        "home": "дом"
    },

    entityDescriptions: {
        'no no no no': `::ВЫСКАЗЫВАЮЩАЯ МЫСЛЕФОРМА
::СОДЕРЖАНИЕ::'
<span>ОСТАНОВИСЬ ОСТАНОВИСЬ ОСТАНОВИСЬ</span>
<span>я знаю Я ЗНАЮ Я ЗНАЮ Я ЗНАЮ</span>
<span>ОСТАНОВИСЬ ОСТАНОВИСЬ Я ЗНАЮ ОСТАНОВИСЬ</span>
<span>ПРЕКРАТИ ПРЕКРАТИ</span>'`,
        'memory hole': `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
::ТОЧКА НАЗНАЧЕНИЯ::'недействительно';..ОШИБКА::Й̵Óэ̇=ОШИБКА::;;::-¼¯-ꙗН£«â
ОШИБКА::ªъõ„'(‚ôЦ̌д7÷ Ц̌e`,
        "home": `::СОЕДИНИТЕЛЬНАЯ МЫСЛЕФОРМА
::ТОЧКА НАЗНАЧЕНИЯ::'низкоразмерное мыслепространство';'внутреннее'
<span style="color: var(--obesk-color)" definition="АНАЛИЗ::'полный провал абстракции';'всё ещё визуализируемо'">::ОБНАРУЖЕНА БЕССВЯЗНОСТЬ</span>`,
    }
}

// - TRANSLATING DA BEECH - //

cor_ru.processWeirdTranslation(".loose-thought", "text")

document.querySelectorAll('#content .loose-thought .title').forEach(e=>{e.remove()})

document.querySelectorAll('#content .loose-thought').forEach(e=>{e.insertAdjacentHTML('beforeend', `<div class="title">${e.getAttribute('text')}</div>`)})

new Lettering('#content .loose-thought .title').letters()

document.querySelectorAll("#content .loose-thought .title > span").forEach((e, i) => e.style.animationDelay = `${-1 * (i * 0.25)}s`)