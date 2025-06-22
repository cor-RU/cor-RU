/* 
    cor-RU - a full russian adaptation mod for corru.observer
    by @dutokrisa and @bra1nslug_
    based on ENV.LOCALIZATION V1 EXAMPLE by @corruworks
    certain parts use code of vielk memory hole example by @adr_furret

    EP0 playtested by @akizetism

    all mentions are discord usernames

     - adaptation up until the end of EP1 currently availible

    thank you for using our mod

        ======

    cor-RU - мод на полную русскую адаптацию для corru.observer
    от @dutokrisa и @bra1nslug_
    на основе ENV.LOCALIZATION V1 EXAMPLE от @corruworks
    некоторые части используют код vielk memory hole example от @adr_furret

    EP0 протестировано @akizetism

    все упоминания - никнеймы в дискорде

     - в данный момент доступна полноценная адаптация до EP1

    спасибо за использование нашего мода
*/


console.log("hello world! - @cor-RU")

// temporary until corru.works fixes it
function generateDialogueObject(genString) {
	let split = genString.split('\n')
	let obj = {}
    let lastParent = { // used to track depth
        blockShowControl: false, // controls SHOWIF blocks that affect multiple dialogues
        blockShowOnceControl: false // ditto for SHOWONCE
    }

    function parseShowif(showif) {
        let finalShowIf = showif
            .replace('SHOWIF::', '')
            .replace(/'/g, '"')// removes the showif indicator and swaps single quotes for double (required for json parse for whatever reason)
            .replace(/</g, '\\u003c') //apparently < and > throw errors if they're used unescaped in JSON... weird
            .replace(/>/g, '\\u003e')

        try {
            return upgradeShowIf(JSON.parse(`{ "reasons":${finalShowIf}}`).reasons) 
        } catch(e) {console.log(showif, e)}
    }
	
	split.forEach(initialLine => {
        let line = initialLine.replace(/\s+$/, '') // remove trailing space on RIGHT SIDE only
        let tabs = (line.match(/    /g) || []).length // since left side matters for this
        var text

        //console.log(line)
        //console.log(tabs)
        switch(tabs) {
            // lv0 - branch name. if it starts with end, it's an end function
            // if it's a dialogue branch, just define the object for later and redef lastParent
            case 0: 
                if(line == "") return;

                //block handling
                else if(line.startsWith('____')) {
                    let block = line.replace('____', '')

                    if(block.startsWith('SHOWIF')) {
                        lastParent.blockShowControl = parseShowif(block)

                    } else if(block.startsWith('SHOWONCE')) {
                        lastParent.blockShowOnceControl = true

                    } else if(block == 'END') {
                        lastParent.blockShowControl = false
                        lastParent.blockShowOnceControl = false
                    }
                }


                //special handling
                else if(line.startsWith('END::')) { //this is a function to exec at the end of the dialogue
                    obj['end'] = Function(line.replace('END::', ''))
                    lastParent = {}
                } else if(line.startsWith('SKIPTIME::')) { //defaults to 1000
                    obj['skipTime'] = Number(line.replace('SKIPTIME::', ''))
                    lastParent = {}
                } else if(line.startsWith('SKIP::')) { //like END, but fired instantly when dialogue is skipped
                    obj['skip'] = Function(line.replace('SKIP::', ''))
                    lastParent = {}
                } else if(line.startsWith('SKIPNOTICE::')) { //adds a message to the skip warning
                    obj['skipNotice'] = line.replace('SKIPNOTICE::', '')
                    lastParent = {}
                } else if(line.startsWith('RESPOBJ::')) { //this is means it's just a reusable response list object definition, not a full dialogue tree
                    obj = {responses: []}
                    lastParent = {"0": obj}
                }

                //regular dialogue handling
                else {
                    obj[line] = { name: line, body: [], responses: [] }
                    lastParent = {"0": obj[line]}
                }
            break

            // lv1 - dialogue from an actor, or responses from an actor
            // if RESPONSES, simply mark that we're in the responses section via lastParent[1]
            // otherwise, it's an actor, so create a dialogue line object and add to lastParent[2]
            case 1:
                lastParent[1] = false 
                lastParent[2] = false // clears depth

                text = line.replace('    ', '')
                if(text == "") return
                if(text.includes("RESPONSES::")) { //actor for responses
                    let newResponses = { name: text.replace('RESPONSES::', ''), replies: [] }
                    lastParent[1] = newResponses
                    lastParent[0].responses.push(newResponses)

                } else if(text.includes("RESPOBJ::")) { //it's the name of a reusable response object, i.e. env.hello.generalReceptionistResponses
                    let respobj = text.replace('RESPOBJ::', '')

                    if (env.localization) {

                        let localization = {};

                        if(env.localization.dialogues) localization = env.localization.dialogues
                        if(env.localization.page) {
                            let values = Object.values(env.localization.page)
                            for (let i = 0; i < values.length; i++) {
                                if(values[i]['dialogues']) Object.assign(localization, values[i]['dialogues'])
                            }
                        }
                        lastParent[0].responses = localization[respobj] || env.dialogues[respobj]
                    }
                    else lastParent[0].responses = env.dialogues[respobj]

                    if(typeof lastParent[0].responses == "undefined") throw "the respobj you're trying to use doesn't exist (or hasn't been defined yet - remember these have to exist before your dialogue definition): " + respobj

                } else { //actor for dialogue
                    let newDialogue = { actor: text }
                    lastParent[1] = newDialogue
                    lastParent[0].body.push(newDialogue)
                }
            break

            // lv2 - dialogue text, OR name/destination for a response
            // if contains <+>, then response - split by that and assign relevant info to the lastParent[1]
            // otherwise, add as text to lastParent[1] - it's just dialogue text
            case 2:
                text = line.replace('        ', '')
                if(text == "") return
                if(!text.includes("<+>")) { //regular actor dialogue
                    lastParent[2] = false // clears depth

                    if(lastParent[1].text) { // if it already has text, make a new object with the same actor
                        let newDialogue = { 
                            actor: lastParent[1].actor,
                            "text": text
                        }
                        lastParent[1] = newDialogue
                        lastParent[0].body.push(newDialogue)
                    } else {
                        lastParent[1].text = text
                    }

                    try{
                        if(lastParent[1].text.includes('TEXEC::')) { //if it contains TEXEC, then that means it has a text exec - a function that returns a string to use when it appears
                            /* since this returns the first thing you give it, it should be either a oneliner or a function that executes and returns something */
                            lastParent[1].texec = Function(`return ${text.replace('TEXEC::', '')}`)
                        }
                    } catch(e) {console.log(e); console.log(lastParent, line)}
                    
                    //if there's a surrounding block control, we add the showIf condition to the dialogue object
                    //same for showonce
                    if(lastParent.blockShowControl) { lastParent[1].showIf = lastParent.blockShowControl; /*console.log(lastParent[1])*/ }
                    if(lastParent.blockShowOnceControl) { lastParent[1].showOnce = lastParent.blockShowOnceControl }
                    
                } else { //reply text and location
                    let replyInfo = text.split('<+>')
                    
                    var replyName = replyInfo[0]
                    var replyDest = replyInfo[1]
                    
                    let replyObj = {
                        name: replyName,
                        destination: replyDest
                    }

                    try{
                        if(replyName.includes('TEXEC::')) { //ditto to regular dialogue functionality
                            replyObj.texec = Function(`return ${replyName.replace('TEXEC::', '')}`)
                        }
                    } catch(e) {console.log(e); console.log(lastParent, line)}

                    lastParent[1].replies.push(replyObj)
                    lastParent[2] = replyObj
                    
                    //can be affected by block controls
                    if(lastParent.blockShowControl) { lastParent[2].showIf = lastParent.blockShowControl; /*console.log(lastParent[2])*/ }
                    if(lastParent.blockShowOnceControl) { lastParent[2].showOnce = lastParent.blockShowOnceControl }
                }
            break

            // lv3 - optional details like WAIT and EXEC - exec applies to both replies and dialogue lines
            // wait is only used by dialogue lines, but no harm in checking for it on reply anyway
            // uses lastParent[1] or lastParent[2] based on whether lastParent[2] is false or not (true means parent is reply)
            case 3: 
                var recipient = lastParent[1]
                if(lastParent[2]) recipient = lastParent[2]

                try {
                    text = line.replace('            ', '')
                    newReasons = false

                    if(text == "") return
                    if(text.startsWith("EXEC::")) recipient.exec = Function(line.replace('EXEC::', ''))
                    if(text.startsWith("WAIT::")) recipient.wait = line.replace('WAIT::', '') //applies only to dialogue
                    if(text.startsWith("THEN::")) recipient.then = Function(line.replace('THEN::', '')) //applies only to dialogue (js executed after a wait)
                    if(text.startsWith("AUTOADVANCE::")) recipient.autoAdvance = true //applies only to dialogue
                    if(text.startsWith("SHOWIF::")) newReasons = parseShowif(line)
                    if(text.startsWith("SHOWONCE::")) recipient.showOnce = true
                    if(text.startsWith("CLASS::")) recipient.class = text.replace('CLASS::', '') //adds specified text as classes (split by space) to the element rendered
                    if(text.startsWith("HIDEREAD::")) recipient.hideRead = true //applies only to replies
                    if(text.startsWith("UNREADCHECK::")) recipient.unreadCheck = Function(line.replace('UNREADCHECK::', '')) //applies only to replies. should return false (no unread), "within" or "unread"
                    if(text.startsWith("FAKEEND::")) recipient.fakeEnd = text.replace('FAKEEND::', '') || true //applies only to replies. takes either text to use or nothing

                    if(recipient.showIf && newReasons) {
                        recipient.showIf = recipient.showIf.concat(newReasons)
                    } else if(newReasons) {
                        recipient.showIf = newReasons
                    }
                } catch(e) {
                    console.log("dialogue parsing error, present line is: ", line)
                    throw (e)
                }
            break
        }
    })

    //return just the responses if the object has this - means it's a respobj definition
    //also marks it as such with a special ID for use with tracking 
    if(obj.responses) {
        obj.responses.respobj = Math.random() * 1000
        return obj.responses
    }

    //otherwise, return the full obj
    else return obj
}

function processDefinitionsInString(input, {force = false} = {}) {
    if(!input) return input;
    if(!input.includes) return input;
    if ((input.includes('definition=') && input.includes("::")) && !force) return input; //if there's a manual definition, we want to skip this

    //we alter this string as it's processed to avoid definition overlaps
    let scanningInput = input
    let finalInput = input

    //initialize the page definitions with any translation overrides if it isn't already set up
    if(!page.formedDefinitionStrings) {
        const localization = getLocalizationForPage()
        page.formedDefinitionStrings = {...env.definitions, ...localization.definitions }
    }
    
    //we want to prioritize phrases over words
    const sortedDefinitions = Object.entries(page.formedDefinitionStrings).sort((a, b) => b[0].length - a[0].length)
    sortedDefinitions.forEach(([phrase, definition]) => {
        if(phrase.length > scanningInput.length) return;

        const type = (typeof definition === "object") ? definition.type || "INHERITED CONTEXT" : "INHERITED CONTEXT";
        const text = (typeof definition === "object") ? definition.text || definition : definition;

        if(phrase[0] == "θ") { //theta definitions are prefixed so that they can be immediately replaced without scanning
            //used mostly for special/context sensitive ones
            finalInput = finalInput.replaceAll(phrase, `<span class="definition" definition="${type}::${text.replace("θ", "").replace('"', "'")}">${phrase.replace("θ", "")}</span>`)

        } else {
            //this regex looks literally insane but it's a faster way of looking up phrases in the string
            //it also prepares them to be replaced if they're found by surrounding them with () and handling the escaping of any special characters
            const phraseRegex = new RegExp(`(?<![0-9A-Z_a-zа-яА-Я])(${phrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})(?![0-9A-Z_a-zа-яА-Я])`, 'gi');

            // we check the scanningInput for matches
            while ((match = phraseRegex.exec(scanningInput)) !== null) {
                const replacement = `<span class="definition" definition="${type}::${text.replace("θ", "").replace('"', "'")}">${match[0]}</span>`;
                // replace the inputs - scanning to remove the match, finalInput to add the definition to the output
                scanningInput = scanningInput.replaceAll(match[0], "")

                //we do this to target replacements only outside of HTML
                finalInput = finalInput.replace(/(?<![0-9A-Z_a-zа-яА-Я])(<[^>]*>|[^<]+)(?![0-9A-Z_a-zа-яА-Я])/g, (innerMatch)=>{
                    if(innerMatch.includes("definition") || innerMatch.startsWith("<")) {
                        return innerMatch
                    } 
                    else {
                        return innerMatch.replace(new RegExp(match[0], 'g'), replacement)
                    }
                })
            }
        }
    })
    return finalInput
}

function processTranslation(container, force = false) {
    if(!env.localization.strings) return;
    let outerEl = container || content

    outerEl.querySelectorAll(force ?" *" : "*:not(.tskip, .tdone, script, style)").forEach(el=>{
        //translates definition hover regardless of children since that's safe
        let def = el.getAttribute("definition")
        if(def) { el.setAttribute("definition", processStringTranslation(def)) }

        //same with entity
        let ent = el.getAttribute("entity")
        if(ent) { el.setAttribute("entaltname", processStringTranslation(ent))}

        // if something has child elements, we want to process its text nodes separately from its children
        // this is because the querySelectorAll already grabs everything - no need to traverse
        for (const childNode of el.childNodes) {
            if (childNode.nodeType === Node.TEXT_NODE) {
                if(childNode.textContent.trim().length == 0) continue; // skip if functionally whitespace
              childNode.textContent = processStringTranslation(childNode.textContent)
            }
        }
        if(el.childNodes.length == 0) {console.log("skipped for", el); return el.classList.add('tskip')}
        el.classList.add("tdone")
    })
}

function readoutAdd({message, type = "", name, displayName, image = false, show = true, forceMini = false, sfx = true, actor = false, noStore = false}) {
    let readout = document.querySelector('#readout')
    let miniReadout = document.querySelector('#minireadout')
    let effectiveMessage = message
    // console.log("readoutAdd got displayName", displayName)

    if (!displayName && name) displayName = processStringTranslation(name)

    var addition
    if(actor) {
        // console.log("actor path")
        if(actor.name == "unknown") return
        let actorObj = getDialogueActor(actor)
        effectiveMessage = processStringTranslation(actorObj.noProcess ? effectiveMessage : processDefinitionsInString(effectiveMessage))
        addition = getReadoutMsg({message: effectiveMessage, image: actorObj.image, displayName: processStringTranslation(displayName), name: actor || displayName, type: actorObj.type, msgClass: actorObj.class})
    } else {
        //console.log("actorless path")
        addition = getReadoutMsg({message: processStringTranslation(name == "moth" || name == "sys" ? effectiveMessage : processDefinitionsInString(effectiveMessage)), type: type, name, displayName: processStringTranslation(displayName), image: image})
    }

    //add the message to the main readout
    readout.insertAdjacentHTML('beforeend', addition)
	readout.scrollTop = readout.scrollHeight //scroll to it on the readout too

    //if the readout isn't open and you aren't in dialogue... (unless forced to show)
    //add the message to the mini readout, with a timer to remove it after a few seconds
    if(show) {
        if((!body.classList.contains('mui-active') && !body.classList.contains('in-dialogue')) || forceMini) {
            miniReadout.insertAdjacentHTML('beforeend', addition)
            let newMessage = document.querySelector(`#minireadout .message-${env.totalMessages}`)
            setTimeout(() => {
                newMessage.classList.remove('active')
                setTimeout(()=>newMessage.remove(), 1000)
            }, 5000);
        }
    }

    //reveal all added stuff after a tiny delay
    let currentMessageNum = env.totalMessages
    setTimeout(()=>document.querySelectorAll(`.message-${currentMessageNum}`).forEach(e=>e.classList.add('active')), 50)
    env.totalMessages++
	
    //play readout add sound if not in dialogue, and also it should be shown
    if(!env.currentDialogue.active) {
        if(sfx == true) play('muiReadout') //no custom sound
        else if(typeof sfx == "function") sfx()
        else if(typeof sfx == "string") play(sfx)
        else if(typeof sfx == "object") {
            play(sfx.sound, sfx.pitch)
        }
    }

    //store message in session log in case of refreshes
    //not too many though cause it used to be 1000 and that's a ton LOL
    if(!noStore) {
        if(env.logStore.length > 80) env.logStore.shift();
        env.logStore.push(addition)
        sessionStorage['log'] = JSON.stringify(env.logStore)
    }

    //also limit number of log entries that can show - used to be limitless, but we need a limit
    if (readout.children.length > 80) {
        var elementsToRemove = readout.children.length - 80
    
        for (var i = 0; i < elementsToRemove; i++) {
            readout.removeChild(readout.children[0])
        }

        readout.insertAdjacentHTML('afterbegin', `<div class="message sourceless active">${processStringTranslation("internal log buffer cleared after reaching limit (80) due to attached external record device")}</div>`)
    }
}

env.localization = {
   dialogues: {},
   definitions: {}, 
   strings: {}, 
   entityDescriptions: {},
   page: {}
}

env.dialogueActors["corruru"] = {
    name: "cor-ru",
    image: "/img/textures/yeyetran.gif",
    type: "tdone corruru portrait-contain",
    voice: ()=>{play('talkcroak', 1.75)}
}

cor_ru = {
    css: `
@font-face {
    font-family: 'spacemono';
    src: url('https://raw.githubusercontent.com/cor-RU/cor-RU/main/fonts/modfont.woff2') format('woff2'),
        url('https://raw.githubusercontent.com/cor-RU/cor-RU/main/fonts/modfont.woff') format('woff');
    font-weight: normal; 
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'barcode';
    src: url('https://raw.githubusercontent.com/cor-RU/cor-RU/main/fonts/barc.woff2') format('woff2'),
        url('https://raw.githubusercontent.com/cor-RU/cor-RU/main/fonts/barc.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'barcodetext';
    src: url('https://raw.githubusercontent.com/cor-RU/cor-RU/main/fonts/barcode.woff2') format('woff2'),
        url('https://raw.githubusercontent.com/cor-RU/cor-RU/main/fonts/barcode.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'beech';
    src: url('https://raw.githubusercontent.com/cor-RU/cor-RU/main/fonts/beechy.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}



.ru {
    color: var(--bastard-color) !important;
}

body[state="corru-loaded"][menu="none"]:not(.in-dialogue)::before, body.loading::after, body.corru-refreshing::after {
    content: "ПРЕДУПРЕЖДЕНИЕ:'Использование мыслекола может вызвать приступы у людей с ФОТОСЕНСИТИВНОЙ ЭПИЛЕПСИЕЙ, в том числе из-за вспышек света.';\\A'Удостоверьтесь, что АППАРАТНОЕ УСКОРЕНИЕ включено во избежание временной несоосности.';\\A'Сторонние РАЗРЕШЕНИЯ могут мешать производительности.';\\A'Продолжение по усмотрению пользователя.'";
    font-family: spacemono;
    font-size: 0.75em;
    max-width: 600px;
    position: fixed;
    z-index: 1000;
    display: block;
    top: 10vh;
    background: var(--dark-color);
    padding: 0.25em;
    text-align: center;
    line-height: 1.25em;
    white-space: pre-wrap;
    pointer-events: none;
}

body.loading::after, body.corru-refreshing::after {
    content: "ВНИМАНИЕ::'очистка буфера мыслекола';'прогресс не будет потерян'";
    padding: 1em;
    top: 50%;
    transform: translateY(-100%);
    opacity: 1;
    display: block;
}

body.loading::after {
    content: "УВЕДОМЛЕНИЕ::'загрузка ресурсов';'пожалуйста, подождите'";
}

#meta-menu .moth-trigger:after,
#meta-menu .mask-trigger:after { 
    content: "МОЛЬ"  !important; 
    left: 0;
    right: 0;
    text-align: center;
    transition-delay: 0s;
}
#meta-menu .mask-trigger:after { content: "МАСК"  !important; }
#mui-links #meta-obs:after { content: "СУЩ"  !important; }
#mui-links #meta-sys:after { content: "СИС" !important; }
#mui-links #meta-hub:after { content: "НАВ" !important; }

#dialogue-box.dialogue-click-proceed::after {
    content: "VVV КЛИК/ENTER ДЛЯ ПРОДОЛЖЕНИЯ VVV";
    display: block;
    width: 100%;
    text-align: center;
    animation: click-to-proceed 1s linear infinite;
} 

#dialogue-box.can-skip::before {
    content: "ЛИНЕЙНЫЙ СЕГМЕНТ ПОТОКА - ПРОПУСК С ESC";
    display: block;
    text-align: center;
    padding: 0.5em;
    color: var(--neutral-color);
    font-size: 0.75rem;
    opacity: 0.5;
    position: sticky;
    top: 0;
    z-index: 2;
    background: var(--dark-color);
}

#dialogue-skip::before {
    content: "ПОДТВЕРЖДЕНИЕ::'пропуск сегмента потока'";
}

#skip-vfx::before {
    content: "ВЫПОЛНЯЕТСЯ::'продвижение сегмента'";
}

body:not(.mui-active) .target::after, body:not(.mui-active) #realgrid .target::before {
    content: "ПРАВАЯ КНОПКА МЫШИ";
}

.target.always-targeted,
.target.always-targeted::after,
#realgrid .target.always-targeted::before,
.always-targeted .target,
.always-targeted .target::after,
.always-targeted #realgrid .target::before {
    opacity: 1;
    content: attr(entaltname) !important;
    white-space: nowrap;
}


@media screen and (max-width: 799px), (max-height: 599px) {
	html:not(.mobile):after, html:not(.mobile):before {
		position: fixed;
		z-index: 1001231231231231230;
		top: 0;
		left: 0;
		height: 100%;
	}
	
	html:not(.mobile):after {
		content: "ОШИБКА::\\A'текущее устройство визуализации непригодно';\\a'требуется нейронный вывод не менее 800x600'";
		box-sizing: border-box;
		white-space: pre-wrap;
		width: 100vw;
		height: 100vh;
		max-width: 100%;
		display: flex;
		margin: auto;
		justify-content: center;
		align-items: center;
		font-family: 'barcodetext', sans-serif;
		font-size: 2rem;	
        line-height: 1.5em;
		letter-spacing: 2.5px;
		padding: 10px;
		color: var(--bright-color);
		text-align: center;
	}
	
	html:not(.mobile):before {
		content: "";
		position: fixed;
		background-color: var(--dark-color);
		width: 100%;
	}
}

#mindspike-scanner span.loose-thought::after {
    content: "..__НЕПОЛНОЦЕННАЯ_МЫСЛЕФОРМА__..";
    display: block;
    font-family: spacemono;
    letter-spacing: 0;
    font-size: 0.63rem;
    margin-top: -0.5em;
}

body[quality="regular"] .quality::after { content: "Качество: ОБЫЧНОЕ" }
body[quality="low"] .quality::after { content: "Качество: НИЗКОЕ" }

.dialogue-message.incoherenthello .dialogue-text, .readout-log .message.incoherenthello {
    background-image: url(/img/local/uncosm/hello.gif) !important;
}

.actor-corrurubonus .dialogue-text {
    text-transform: uppercase;
}

.dialogue-message.corruru.dialogue-text, 
.readout-log .message.corruru {
    background: url(/img/textures/fadein.gif), url(/img/textures/corruripplebastard.gif), url(/img/textures/badstatic.gif);
    background-size: 150%, auto;
    text-shadow: 1px 1px var(--neutral-color);
    font-size: 1.25em;
    letter-spacing: 0.25em;
}

.dialogue-message.corruru .dialogue-portrait::after {
    background-size: 125%;
    background-position: center;
}

.dialogue-message.corruru, .message.corruru {
    --bright-color: var(--bastard-color);
}

.dialogue-message.corruru .dialogue-text {
    padding: 0.3em;
}

.dialogue-message.corruru {
    --background: url(/img/textures/corruripplebastard.gif), url(/img/textures/badstatic.gif);
    --color: var(--bastard-color);
    text-shadow: 1px 1px var(--neutral-color);
    font-size: 1.25em;
    letter-spacing: 0.25em;
}
    
.dialogue-message.corruru .dialogue-portrait::before {
    width: 100%;
    right: 0;
    border-radius: 0;
    transform: translateX(100%);
}

.dialogue-message.corruru, .message.corruru {
    color: var(--bright-color);
}  
    
.message.corruru img {
    border-radius: 100%;
}`,

    // i like colors

    fancy: {
        general: 'color:rgb(229, 142, 22)',
        observed: 'color:rgb(229, 194, 22)',
        setobserver: 'color:rgb(227, 227, 0)'
    },

    // funky functions that help with translation

    processWeirdTranslation: function (selector, attribute = false) {
        if (selector == "mindpike") {
            document.querySelectorAll("#mindspike-examine").forEach(el=>{for (const childNode of el.childNodes) {childNode.textContent = "ИЗУЧ"}})
            document.querySelectorAll("#mindspike-act").forEach(el=>{for (const childNode of el.childNodes) {childNode.textContent = "ДЕЙСТ"}})
        } // i hate ACT and EXM strings bleeding into shit
        else if (attribute == false) {
            document.querySelectorAll(selector).forEach(el=>{
                for (const childNode of el.childNodes) {
                    if (childNode.nodeType === Node.TEXT_NODE) {
                        if (childNode.textContent != processStringTranslation(childNode.textContent)) childNode.textContent = processStringTranslation(childNode.textContent)
                    }
                }
            })
        }
        else {
            document.querySelectorAll(selector).forEach(el=>{
                if (el.getAttribute(attribute) != null) {
                    if (el.getAttribute(attribute) != processStringTranslation(el.getAttribute(attribute))) el.setAttribute(attribute, processStringTranslation(el.getAttribute(attribute)))
                }
            })
        }
        return
    },
    processStatic: function (force) {
        cor_ru.processWeirdTranslation('title');
        cor_ru.processWeirdTranslation(".enter", 'page');
        if (force) processTranslation(document.querySelector(`#static`), true);
        else processTranslation(document.querySelector(`#static`));
    },
    processWarning: function (force) {
        if (force) {
            processTranslation(document.querySelector(`.cryptowarn`), true);
            processTranslation(document.querySelector(`#mod-warning`), true);
            processTranslation(document.querySelector(`#gpu-warning`), true);
            processTranslation(document.querySelector(`#wide-warning`), true);
            processTranslation(document.querySelector(`#dialogue-skip`), true);
        } else {
            processTranslation(document.querySelector(`.cryptowarn`));
            processTranslation(document.querySelector(`#mod-warning`));
            processTranslation(document.querySelector(`#gpu-warning`));
            processTranslation(document.querySelector(`#wide-warning`));
            processTranslation(document.querySelector(`#dialogue-skip`));
        }
    },
    processMenu: function (force) {
        document.querySelectorAll(".fundfriend").forEach(el=>{el.classList.add('tskip')}) // we dont want to translate fundfriends (even tho it would be funny)
        cor_ru.processWeirdTranslation('.ci-masks', 'definition');
        cor_ru.processWeirdTranslation('.ozo-mask', 'definition');
        cor_ru.processWeirdTranslation('#savetext', 'placeholder');
        if (force) {
            processTranslation(document.querySelector("#meta-menu")), true;
            processTranslation(document.querySelector("#system-menu"), true);
            processTranslation(document.querySelector("#entity-menu"), true);
            processTranslation(document.querySelector(`#advance-notice`), true);
        } else {
            processTranslation(document.querySelector("#meta-menu"));
            processTranslation(document.querySelector("#system-menu"));
            processTranslation(document.querySelector("#entity-menu"));
            processTranslation(document.querySelector(`#advance-notice`));
        }
    },
    processReply: function () {
        cor_ru.processWeirdTranslation('.reply', 'name');
        cor_ru.processWeirdTranslation('.reply', 'definition');
        cor_ru.processWeirdTranslation('.reply', 'endtext');
    },
    processReadout: function (force) {
        processTranslation(document.querySelector("#minireadout"))

        readout = document.querySelector("#readout")
        messages = readout.querySelectorAll(".message")
        length = messages.length - 1

        messages.forEach(el=>{
            if (length > 0) {
                el.classList.add('tskip')
                el.querySelectorAll(" *").forEach(el=>{el.classList.add('tskip')})
            } // dont want it touching old readouts
            if (length == 1) {
              if (el.lastElementChild.textContent == "NOTE::'restored partial recent log'") processTranslation(el, true)
            } // touching the restored partial log note is fine tho
            length--})
        
        processTranslation(document.querySelector("#readout"))
    },

    // obserbor. the itself of them gets defined later

    observer: {
        /*template: {
            func: (consolething)=>{

                if (consolething != undefined) console.log(consolething[0], consolething[1]);
            },
            observe: ()=>{
                cor_ru.observer.template.itself.observe();

                console.log("%ctemplate observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
            }
        },*/
        common: {
            func: (consolething)=>{
                processTranslation();
                processTranslation(document.querySelector(`#mindspike-scanner`));
                processTranslation(document.querySelector(`#advance-notice`));
                cor_ru.processWeirdTranslation("#content .target", "entaltname"); // safeguard bc i noticed sometimes they just wont get translated correctly. wack

                if (consolething != undefined) console.log(consolething[0], consolething[1]);
            },
            observe: ()=>{
                cor_ru.observer.common.itself.observe(document.querySelector("#mindspike-scanner"), { childList: true, subtree: true });
                cor_ru.observer.common.itself.observe(document.querySelector("#content"), { childList: true, subtree: true });

                console.log("%ccommon observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
            }
        },
        entMenu: {
            func: (consolething)=>{
                document.querySelectorAll('#entity-menu .ent').forEach(e=>{
                    if(e.getAttribute('entname')) {
                        e.addEventListener('click', ()=>{
                            let entity = flags.detectedEntities[e.getAttribute('pagename')]['entities'][e.getAttribute('entname')]
                            let container = document.querySelector('#entcontent')
                            container.innerHTML = ""


                            let replay = getReadoutMsg({message: entity.text.replace(/\n/g, "<br>"), type: `examine ${entity.type}`, name: entity.displayName || entity.name, image: entity.image})

                            try {replay = getReadoutMsg({message: cor_ru.entity_menu.readouts[entity.name]['desc'], type: `examine ${entity.type}`, name: cor_ru.entity_menu.readouts[entity.name]['name'], image: entity.image})}
                            catch (error) {
                                console.warn("could not localize " + entity.name + " - @cor-RU")
                                console.error(error)
                            }

                            container.insertAdjacentHTML('beforeend', replay)
                            setTimeout(()=>container.querySelector('.message').classList.add('active'), 5)
                        })
                    }
                })
                processTranslation(document.querySelector("#entity-menu"))
                if (consolething != undefined) console.log(consolething[0], consolething[1]);
            },
            observe: ()=>{
                cor_ru.observer.entMenu.itself.observe(document.querySelector("#entity-menu"), { childList: true, subtree: true, attributes: true });

                console.log("%centMenu observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
            }
        },
        warning: {
            func: (consolething)=>{
                cor_ru.processWarning();

                if (consolething != undefined) console.log(consolething[0], consolething[1]);
            },
            observe: ()=>{
                cor_ru.observer.warning.itself.observe(body, {subtree: false, childList: true});

                console.log("%cwarning observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
            }
        },
        gad: {
            func: (consolething)=>{
                cor_ru.processWeirdTranslation(".mindsci-status", "definition");

                if (consolething != undefined) console.log(consolething[0], consolething[1]);
            },
            observe: ()=>{
                cor_ru.observer.gad.itself.observe(document.querySelector(".mindsci-status"), { childList: true, subtree: true, attributes: true });

                console.log("%cgad observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
            }
        },
        dialogue: {
            func: (consolething)=>{
                cor_ru.processReply();

                if (consolething != undefined) console.log(consolething[0], consolething[1]);
            },
            observe: ()=>{
                cor_ru.observer.dialogue.itself.observe(document.querySelector("#dialogue-box"), { childList: true });

                console.log("%cdialogue observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
            }
        },
        masks: {
            func: (consolething)=>{
                processTranslation(document.querySelector(`#ozo-mask-grid`))

                if (consolething != undefined) console.log(consolething[0], consolething[1]);
            },
            observe: ()=>{
                cor_ru.observer.masks.itself.observe(document.querySelector("#masks"), { childList: true });

                console.log("%cmasks observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
            }
        },
        page: {
            func: (consolething)=>{
                console.info("%cbeginning function - @cor-RU:page", cor_ru.fancy.general)
                new Promise((resolve) => {
                    console.log("%cpromise - @cor-RU:page", cor_ru.fancy.general)
                    if (consolething) cor_ru.updateResources()
                    resolve(getLocalizationForPage(true))
                })
                .then(()=>{
                    console.info("%cthen - @cor-RU:page", cor_ru.fancy.general)
                    if (document.getElementsByClassName("cor-rudev").length == 0) document.querySelector(".devs").insertAdjacentHTML('afterend', cor_ru.devElement)
                            
                    processTranslation();
                    console.info("%cprocess1 - @cor-RU:page", cor_ru.fancy.general)

                    cor_ru.processStatic(true);
                    cor_ru.processMenu();
                    cor_ru.processWarning();
                    console.info("%cprocess2 - @cor-RU:page", cor_ru.fancy.general)

                    processTranslation(document.querySelector(`#definition-box`));
                    processTranslation(document.querySelector(`#mindspike-scanner`));
                    processTranslation(document.querySelector(`#ozo-mask-grid`))
                    console.info("%cprocess3 - @cor-RU:page", cor_ru.fancy.general)

                    cor_ru.processWeirdTranslation("mindpike");
                    cor_ru.processWeirdTranslation(".mindsci-status", "definition");
                    cor_ru.processWeirdTranslation("#content .target", "entaltname") // safeguard bc i noticed sometimes they just wont get translated correctly. wack
                    console.info("%cprocess4 - @cor-RU:page", cor_ru.fancy.general)

                    cor_ru.observer.common.observe();
                    cor_ru.observer.entMenu.observe();
                    cor_ru.observer.warning.observe();
                    cor_ru.observer.gad.observe();
                    cor_ru.observer.dialogue.observe();
                    cor_ru.observer.masks.observe();
                    console.info("%cobservers - @cor-RU:page", cor_ru.fancy.general)

                    if (consolething) console.log(consolething[0], consolething[1])
                })
            },
            observe: ()=>{
                cor_ru.observer.page.itself.observe(body, {attributes: true, attributeFilter: ['page']});

                console.log("%cpage observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
            }
        },
    },

    /*observerWarn: new MutationObserver(()=>{
        cor_ru.processWarning();
        console.log("warnings observed! - @cor-RU", cor_ru.fancy.observed);
    }),
    observerWarnObserve: function () {cor_ru.observerWarn.observe("???", { childList: true })}, UNFINISHED*/

    // corru.works why

    embassyCoherent: function () {
        if (env.localization.page['localocean']) env.localization.page['localocean'].entityDescriptions['the embassy'] = `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>'выступление';'велзи гогочет от восторга'</span>`
        cor_ru.entity_menu.readouts['the embassy']['desc'] = `::ПРОСТРАНСТВЕННАЯ МЫСЛЕФОРМА<br>
::УНАСЛЕДОВАННЫЙ КОНТЕКСТ::<span style='color: var(--obesk-color)'>"'выступление';'${processDefinitionsInString("велзи")} гогочет от восторга"')}</span>`},

    // tehehe we are devs now

    devElement: `<div class="devs ulbox tdone cor-ru">
    <ul class="tdone">
        <h4 class="tdone">НЕОФИЦИАЛЬНАЯ КОМАНДА ПЕРЕВОДА</h4>
        <li class="tdone"><span class="tdone" definition="@dutokrisa в discord!" class="tdone">ООО "РОСРАЗУМ"</span></li>
        <li class="tdone"><span class="tdone" definition="таинственный человек о котором вы не узнаете">НАО "Млечный Путь"</span></li>
        <li class="tdone"><span class="tdone" definition="@bra1nslug_ в discord!" class="tdone">Фонд "ПЯТЁРОЧНЁК"</span></li>
    </ul>
</div>`,

    // loading and updating stuff as we go

    list: {
        everything: "https://cor-RU.github.io/cor-RU/localization/everystuff.js",
        page: {
            fbx: "https://cor-RU.github.io/cor-RU/localization/basement.js",

            hello: "https://cor-RU.github.io/cor-RU/localization/auth-layer.js",
            hub: "https://cor-RU.github.io/cor-RU/localization/hub.js",

            localcity: "https://cor-RU.github.io/cor-RU/localization/their-city.js",
            citystreet: "https://cor-RU.github.io/cor-RU/localization/city-surface.js",

            localorbit: "https://cor-RU.github.io/cor-RU/localization/the-void.js",
            dullvessel: "https://cor-RU.github.io/cor-RU/localization/our-dull-vessel.js",

            localocean: "https://cor-RU.github.io/cor-RU/localization/their-waters.js",
            localship: "https://cor-RU.github.io/cor-RU/localization/their-vessel.js",
            interview1: "https://cor-RU.github.io/cor-RU/localization/the-funny-little-room.js",

            localdepths: "https://cor-RU.github.io/cor-RU/localization/the-depths.js",

            localuncosm: "https://cor-RU.github.io/cor-RU/localization/uncosm.js",
            recosm: "https://cor-RU.github.io/cor-RU/localization/recosm.js",
            localuncosmwhere: "https://cor-RU.github.io/cor-RU/localization/memory-hole.js",
            sec: "https://cor-RU.github.io/cor-RU/localization/memory-hole.js",

            localship2: "https://cor-RU.github.io/cor-RU/localization/clemens-romanus.js",

            embassy: "https://cor-RU.github.io/cor-RU/localization/embassy.js",
            gol: "https://cor-RU.github.io/cor-RU/localization/golem-maintenance.js",
            ep4: "https://cor-RU.github.io/cor-RU/localization/pale-halls.js",

            abyss: "https://cor-RU.github.io/cor-RU/localization/beneath-abyss.js",
            parasite: "https://cor-RU.github.io/cor-RU/localization/beneath-parasite.js",
            beneathdepths: "https://cor-RU.github.io/cor-RU/localization/beneath-maze.js",

            e3a2: "https://cor-RU.github.io/cor-RU/localization/frame.js",

            cache: "https://cor-RU.github.io/cor-RU/localization/cache.js",
            ozo: "https://cor-RU.github.io/cor-RU/localization/jokzi-ozo.js"
        },
        combat: "https://cor-RU.github.io/cor-RU/localization/combat.js",
        entityMenu: "https://cor-RU.github.io/cor-RU/localization/entity-menu.js",
        load: "https://cor-RU.github.io/cor-RU/load.js",
    },

    updateResources: function (fresh = false) {
        let listArray = [];

        if (fresh == true) {
            listArray.push(cor_ru.list.everything);
            if (Object.hasOwn(cor_ru.list.page, page.dialoguePrefix)) listArray.push(cor_ru.list.page[page.dialoguePrefix])
                else console.warn("the page with dialoguePrefix " + page.dialoguePrefix + " does not have a localization! - @cor-RU")
            listArray.push(cor_ru.list.entityMenu);
            listArray.push(cor_ru.list.load);
            if (document.querySelectorAll(`script[src="/js/combat/combatActorsJson.js?v=${page.cacheval}"]`).length != 0);
        }
        else {
            if (Object.hasOwn(cor_ru.list.page, page.dialoguePrefix)) {if (document.querySelectorAll(`script[src="${cor_ru.list.page[page.dialoguePrefix]}?v=${page.cacheval}"]`).length == 0) {listArray.push(cor_ru.list.page[page.dialoguePrefix])}}
                else console.warn("the page with dialoguePrefix " + page.dialoguePrefix + " does not have a localization! - @cor-RU")
            if (document.querySelectorAll(`script[src="/js/combat/combatActorsJson.js?v=${page.cacheval}"]`).length != 0) {
                if (document.querySelectorAll(`script[src="${cor_ru.list.combat}?v=${page.cacheval}"]`).length == 0) {
                    combat = document.createElement('script')
                    combat.src = `${cor_ru.list.combat}?v=${page.cacheval}`
                    content.appendChild(combat)
                    console.log("%cadded combat as a resource update! - @cor-RU", cor_ru.fancy.general)
                }
            };
        }
        if (listArray.length != 0) {console.log("%cupdating resources! - @cor-RU", cor_ru.fancy.general); return addResources(listArray)}
        else console.log("%cno updates for resources needed! - @cor-RU", cor_ru.fancy.general)
    },
}

// yay! opbsbernr time

cor_ru.observer.common.itself = new MutationObserver(()=>{cor_ru.observer.common.func(["%ccommon observed! - @cor-RU", cor_ru.fancy.observed])})
cor_ru.observer.entMenu.itself = new MutationObserver(()=>{cor_ru.observer.entMenu.func(["%centMenu observed! - @cor-RU", cor_ru.fancy.observed])})
cor_ru.observer.warning.itself = new MutationObserver(()=>{cor_ru.observer.warning.func(["%cwarning observed! - @cor-RU", cor_ru.fancy.observed])})
cor_ru.observer.gad.itself = new MutationObserver(()=>{cor_ru.observer.gad.func(["%cgad observed! - @cor-RU", cor_ru.fancy.observed])})
cor_ru.observer.dialogue.itself = new MutationObserver(()=>{cor_ru.observer.dialogue.func(["%cdialogue observed! - @cor-RU", cor_ru.fancy.observed])})
cor_ru.observer.masks.itself = new MutationObserver(()=>{cor_ru.observer.masks.func(["%cmasks observed! - @cor-RU", cor_ru.fancy.observed])})
cor_ru.observer.page.itself = new MutationObserver(()=>{cor_ru.observer.page.func(["%cpage observed! - @cor-RU", cor_ru.fancy.observed])})

// advance log thingy
cor_ru['advance'] = function () {
    MUI('off'); flash(true); cutscene(true); exitMenu();
    if(env.bgm) env.bgm.fade(env.bgm.volume(), 0, 1000)
    corruStatic.play()
    corruStatic.fade(0, getModifiedVolume('music', 1), 1000)
                
    setTimeout(()=>{
        sessionStorage.clear()
        location.replace('/')
    }, 1000)
}
cor_ru['advancewarnclick'] = function () {
    document.body.insertAdjacentHTML('beforeend', `
        <div id="ru-warning" class="popup-warning">
            <div class="sysblock">
                <div class="sysbox ru">
                    <h3>!!__ПРЕДУПРЕЖДЕНИЕ__!!</h3>
                    <p class="sysinfo">СТОП! Вы достигли конца <em>полноценно переведённого контента cor-RU!</em></p>
                    <p class="sysinfo">Следующий эпизод будет состоять практически полностью из английского текста.</p>
                    <p class="sysinfo">Мы рекомендуем удалить cor-RU при дальнейшем прохождении игры, ибо поведение мода в непротестированных эпизодах непредсказуемо и может повлечь за собой баги или другие странности. (Сделать это можно, просто убрав ссылку на мод из url-листа модификаций в системном меню и перезагрузив страницу)</p>
                    <p class="sysinfo">Вы также можете отказаться от продвижения лога и приостановить игру на текущем эпизоде. Чтобы снова вызвать "продвинуть лог", ещё раз пройдите диалог с Гордоном в комнате высоко наверху до конца.</p>
                    <div class="buttons">
                        <span id="gpu-done" class="button" onclick="cor_ru.advance();document.querySelector('#ru-warning').remove()">продвинуть лог</span>
                        <span id="gpu-hide" class="button" onclick="change('ep1_end', false);document.querySelector('#ru-warning').remove();checkEpisodeProgress()">приостановить на текущем эпизоде</span>
                    </div>
                </div>
            </div>
        </div>
    `)
}
cor_ru['advancewarndialogue'] = function () {
    setTimeout(()=>{document.body.insertAdjacentHTML('beforeend', `
        <div id="ru-warning" class="popup-warning">
            <div class="sysblock">
                <div class="sysbox ru">
                    <h3>!!__ПРЕДУПРЕЖДЕНИЕ__!!</h3>
                    <p class="sysinfo">СТОП! Вы достигли конца <em>полноценно переведённого контента cor-RU!</em></p>
                    <p class="sysinfo">Следующий эпизод будет состоять практически полностью из английского текста. Имейте в виду, что лог продвигается автоматически при перезагрузке страницы.</p>
                    <p class="sysinfo">Мы рекомендуем удалить cor-RU при дальнейшем прохождении игры, ибо поведение мода в непротестированных эпизодах непредсказуемо и может повлечь за собой баги или другие странности. (Сделать это можно, просто убрав ссылку на мод из url-листа модификаций в системном меню и перезагрузив страницу)</p>
                    <p class="sysinfo">Вы также можете отказаться от продвижения лога и приостановить игру на текущем эпизоде. Чтобы снова вызвать "продвинуть лог", ещё раз пройдите диалог с Гордоном в комнате высоко наверху до конца.</p>
                    <div class="buttons">
                        <span id="gpu-done" class="button" onclick="document.querySelector('#ru-warning').remove()">оставить всё как есть</span>
                        <span id="gpu-hide" class="button" onclick="change('ep1_end', false);document.querySelector('#ru-warning').remove();checkEpisodeProgress()">приостановить на текущем эпизоде</span>
                    </div>
                </div>
            </div>
        </div>
    `)}, 16000)
}
env.entities['advance log'] = {
    hide: true,
    name: 'advance log',
    type: "system-component",
    image: "/img/textures/target.png",
    text: `::SYSTEM COMPONENT
    ::ALERT::<span style="color:var(--bright-color)">'current mindspike log procession concluded';'static environment sustained'</span>
    ::NOTE::'log state will advance on next visit';'utilize ACT:advance to immediately proceed to next state'`,
    actions: [
        {
            name: "advance",
            exec: ()=>{cor_ru.advance()},
            showIf: ()=>{
                if (check('ep1_end') && !check('fbx__ep2intro-end')) return false
                else return true
            },
        },
        {
            name: "advance",
            exec: ()=>{cor_ru.advancewarnclick()},
            showIf: ()=>{
                if (check('ep1_end') && !check('fbx__ep2intro-end')) return true
                else return false
            },
        }
    ]  
}

console.log("%ccontact @dutokrisa or @bra1nslug_ on discord if you have any questions, suggestions or bugs to report - @cor-RU", cor_ru.fancy.general)
console.log("%c(ru) свяжитесь с @dutokrisa или @bra1nslug_ в discord, если есть вопросы, предложения или надо зарепортить баг - @cor-RU", cor_ru.fancy.general)

document.head.appendChild(document.createElement('style').appendChild(document.createTextNode(cor_ru.css)).parentElement);

page.formedDefinitionStrings = undefined

cor_ru.updateResources(true)