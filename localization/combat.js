/* === HOW TO USE INFLECTION IN env.ACTIONS.usage === 


first make sure all actors have all the needed properties

properties of an actor template:
env.COMBAT_ACTORS.youractor['cor_ru'] = {
    name: {
        gen: "genitive/родительный",
        dat: "dative/дательный", 
        acc: "accusative/винительный", 
        ins: "instrumental/творительный", 
        pre: "prepositional/предложный"
    },
    gender: either 0 (masculine), 1 (feminine), 2 (neuter)
}
    

then write the action usage messages!!

inflection of names is simple: %CASE-ROLE, like %GEN-USER for user's genitive name or %DAT-TARGET for target's dative name

inflection of everything else is not simple! anyways
you take your word and then list all endings separately in the format of %US(masc/fem/neu)ER or %TAR(masc/fem/neu)GET
if there is no ending in one of the inflections, put "-"

examples:
we will take the adjective "крутой" and assume that it is referring to the target
you will get "крут%TAR(ой/ая/ое)GET"

we will take the verb "ударить" in past tense and assume that it is referring to the user
you will get "ударил%US(-/а/о)ER"

*/

cor_ru['combat'] = {}


cor_ru.combat['inflection'] = function (string, user, target) { // --- function for doing inflection in actionmessagestuffs. if this is ugly idc i made this at 1 am lol. also it works so i aint changing it
    if (user.cor_ru) {

        string = string.replaceAll("%GEN-USER", `<span class="${user.team.name}">${user.cor_ru.name.gen}</span>`)
        string = string.replaceAll("%DAT-USER", `<span class="${user.team.name}">${user.cor_ru.name.dat}</span>`)
        string = string.replaceAll("%ACC-USER", `<span class="${user.team.name}">${user.cor_ru.name.acc}</span>`)
        string = string.replaceAll("%INS-USER", `<span class="${user.team.name}">${user.cor_ru.name.ins}</span>`)
        string = string.replaceAll("%PRE-USER", `<span class="${user.team.name}">${user.cor_ru.name.pre}</span>`)

        const regex = new RegExp("%US", "g");
        let count = string.match(regex);

        if (count != null) {
            for (let i = 0; i < count.length; i++) {

                let stringTarget = string.substring(string.indexOf('%US(') + 4, string.indexOf(')ER'));
                let stringProcessed = "";

                let stringTargetSplit = stringTarget.split('/');

                if (stringTargetSplit.length == 3) {

                    try {stringProcessed = stringTargetSplit[user.cor_ru.gender]} catch {console.error("some shit going on with " + user.name + "'s gender tbh - @cor-RU")};

                }  else console.error("some shit going on with the stringTargetSplit tbh - @cor-RU " + stringTargetSplit);

                if (stringProcessed == "-") stringProcessed = "";

                string = string.replace('%US(' + stringTarget + ')ER', stringProcessed)
            }
        }
    } else console.log("%coh! user either does not exist or does not have a cor_ru property... - @cor-RU", 'color:rgb(229, 142, 22)')

    if (target.cor_ru) {

        string = string.replaceAll("%GEN-TARGET", `<span class="${target.team.name}">${target.cor_ru.name.gen}</span>`)
        string = string.replaceAll("%DAT-TARGET", `<span class="${target.team.name}">${target.cor_ru.name.dat}</span>`)
        string = string.replaceAll("%ACC-TARGET", `<span class="${target.team.name}">${target.cor_ru.name.acc}</span>`)
        string = string.replaceAll("%INS-TARGET", `<span class="${target.team.name}">${target.cor_ru.name.ins}</span>`)
        string = string.replaceAll("%PRE-TARGET", `<span class="${target.team.name}">${target.cor_ru.name.pre}</span>`)

        const regex = new RegExp("%TAR", "g");
        let count = string.match(regex);

        if (count != null) {
            for (let i = 0; i < count.length; i++) {

                let stringTarget = string.substring(string.indexOf('%TAR(') + 5, string.indexOf(')GET'));
                let stringProcessed = "";

                let stringTargetSplit = stringTarget.split('/');

                if (stringTargetSplit.length == 3) {

                    try {stringProcessed = stringTargetSplit[target.cor_ru.gender]} catch {console.error("some shit going on with" + target.name + "'s gender tbh - @cor-RU")};

                } else if (stringTargetSplit.length == 2) {

                    if (target.cor_ru.gender == 3) stringProcessed = stringTargetSplit[1];
                    else stringProcessed = stringTargetSplit[0];

                } else console.error("some shit going on with the stringTargetSplit tbh - @cor-RU " + stringTargetSplit);

                if (stringProcessed == "-") stringProcessed = "";

                string = string.replace('%TAR(' + stringTarget + ')GET', stringProcessed)
            }
        }
    } else console.log("%coh! target either does not exist or does not have a cor_ru property... - @cor-RU", 'color:rgb(229, 142, 22)')

    return string;
}
cor_ru.combat['translate'] = function (input) {return processStringTranslation(input)}

cor_ru.combat['eatingEffectMessage'] = function (time = 0) { // --- may this entertain velzie lol
    if (check("PAGE!!cor_ru_combat") != true) {
        try {
            cor_ru.createRPGeffectMessage = createRPGeffectMessage;
            createRPGeffectMessage = function() {
                cor_ru.createRPGeffectMessage();
                // grabbing the action thing
                env.rpg.effectMessage.action = function({user, action, target, hit, specialHitText, actionMessageIndex, reason, isMinor = false, force = false, initialize = true}) { 
                    if(env.rpg.stopMessages || !this.current && !initialize || env.currentDialogue.active) return -1 // we require this to be .initialize()d first, done in useAction
                    else if(initialize && !env.rpg.effectMessage.current) this.initialize();

                    let current = this.current

                    //control conditional text/formatting
                    let hitType = "none"
                    let hitText = false

                    switch(hit){
                        case "none": break

                        case "critbuff":
                        case "crit":
                            hitType = "crit"
                        break

                        case true:
                            hitType = "hit"
                        break

                        case false: 
                            hitType="miss"
                    }

                    let genUsageText = typeof action == "string" ? cor_ru.combat.translate(action) : action?.usage?.act // --- place where i actually insert stuff 
                    if(!genUsageText) return false;
                    if(action.usage) {
                        hitText = action.usage[hitType] || false //refer to action usage text for result 
                    } 
                    
                    if(force && !hitText && typeof action == "string") hitText = action

                    let actionText = (genUsageText)
                        .replaceAll("%USER", `<span class="${user?.team?.name}">${user?.name}</span>`)
                        .replaceAll("%TARGET", `<span class="${target?.team?.name}">${target?.name}</span>`)
                    
                    actionText = cor_ru.combat.inflection(actionText, user, target) // --- place where i actually insert stuff
                    
                    if(hitText || specialHitText) {
                        hitText = (hitText || specialHitText)
                            .replaceAll("%USER", `<span class="${user?.team?.name}">${user?.name}</span>`)
                            .replaceAll("%TARGET", `<span class="${target?.team?.name}">${target?.name}</span>`)
                        hitText = cor_ru.combat.inflection(hitText, user, target) // --- place where i actually insert stuff 2
                    }

                    //console.log("!!!!!!!!!!!! in add for action", hit, hitType, action, hitText, actionMessageIndex)
                    //the hit object - actionText is used as the "primary" text, so not used for subtext
                    let hitObj = {
                        target,
                        text: hitText,
                        result: hitType,
                        action,
                        count: 1
                    }

                    //determine if it's for an existing thing then push it
                    let finalIndex = 0
                    let effectiveIndex = actionMessageIndex
                    if(typeof actionMessageIndex == "object") effectiveIndex = actionMessageIndex?.i // cause we might just pass the action hit return which has the i

                    if(typeof effectiveIndex == "undefined") { 
                        // figure out if there's an identical action in the list
                        // it's way more efficient to just pass the index though so this is a fallback
                        effectiveIndex = env.rpg.effectMessage.current.actions.findIndex(action => (action.user == user) && ((!reason && !action.reason) || (action.reason == reason)))
                        if(effectiveIndex == -1) effectiveIndex = false
                    } 
                    
                    if(current.actions[effectiveIndex]) { //exists, so adding to this
                        let currentAction = current.actions[effectiveIndex]
                        if(!hitText && !force) {console.log("no hit text so returning"); return -1}; // no text = no action for subtext
                        finalIndex = effectiveIndex

                        //find if there's an identical message for this hit, and if so, increase the 'count'
                        let similarHit = current.actions[finalIndex].hits.find(h=>
                            h.action == action &&
                            h.target == target &&
                            h.result == hitObj.result &&
                            h.text == hitObj.text
                        )
                        if(similarHit) {
                            similarHit.count++
                        } else {
                            current.actions[finalIndex].hits.push(hitObj)

                            //crit, hit, miss, in order of 'best hit' priority
                            if(currentAction.bestHit != hitType) {
                                if(
                                    (hitType == "hit" && currentAction.bestHit == "miss") ||
                                    (hitType == "crit" && currentAction.bestHit != "crit")
                                ) currentAction.bestHit = hitType
                            }               
                        }

                    } else { //doesn't, so creating
                        current.incitingActor = user

                        let actionUse = {user, action, actionText, isMinor, reason, bestHit: hitType, hits: hitObj.text ? [hitObj] : []}

                        if(current.actions.length == 0) {
                            current.display.setAttribute("type", hitType)
                            current.display.setAttribute("team", user?.team?.name)
                        }
                        
                        if(current.actions.length && current?.actions[0]?.isMinor) { //avoid highlighting "minor actions", i.e. async that happen before others
                            //shouldn't happen super often, so probably won't end up scrambling expected indexes
                            current.actions.unshift(actionUse)
                            finalIndex = 0
                        } else {
                            current.actions.push(actionUse) 
                            finalIndex = current.actions.length - 1
                        }

                    }

                    //rerender
                    this.updateDisplay({actionIndex: finalIndex})

                    //return the action index
                    return finalIndex
                }
                
                // also redefine other shit cause why not
                actionMessage = function (origin, action, desiredTarget, hit = "none", duration = false, id = false) {
                    console.warn("you should probably not be using actionMessage anymore, use the new effectMessage system instead\nthis will be removed in a future update")
                    //control for optional or flexible parameters
                    var actionIsString = (typeof action == "string")
                    var target = desiredTarget;
                    if(typeof desiredTarget == "undefined") target = origin;

                    //figure out who's on what team
                    var originTeam, targetTeam;
                    env.rpg.teams.forEach((team, i) => {
                        team.members.forEach((actor, i) => {
                            if(actor.slug == origin.slug) {
                                originTeam = team.name
                            } //not 'else if' because it could be self-targeted

                            if(actor.slug == (target.slug || 0)) {
                                targetTeam = team.name
                            }
                        });
                    });

                    //control conditional text/formatting
                    var hitType = "none"
                    var hitText = false
                    var modClass = ""; //used to border if there's a crit
                    switch(hit){
                        case "none": break

                        case true:
                            hitType = "hit"
                        break

                        case "critbuff":
                        case "crit":
                            hitType = "crit"
                            modClass = "use-crit"
                        break

                        case false: 
                            hitType="miss"
                    }
                    if(action.usage) hitText = action.usage[hitType] || false //refer to action usage text for result

                    var actionText;
                    if(actionIsString) {
                        actionText = cor_ru.combat.translate(action) // --- place where i actually insert stuff 
                            .replaceAll("%USER", `<span class="${originTeam}">${origin.name}</span>`)
                            .replaceAll("%TARGET", `<span class="${targetTeam}">${target.name}</span>`);
                        actionText = cor_ru.combat.inflection(actionText, origin, target) // --- place where i actually insert stuff
                        
                    } else if(action.usage) {
                        actionText = action.usage.act
                            .replaceAll("%USER", `<span class="${originTeam}">${origin.name}</span>`)
                            .replaceAll("%TARGET", `<span class="${targetTeam}">${target.name}</span>`);
                        actionText = cor_ru.combat.inflection(actionText, origin, target) // --- place where i actually insert stuff
                    }
                        
                    if(hitText) {
                        hitText = cor_ru.combat.inflection(hitText, origin, target) // --- place where i actually insert stuff
                        hitText = 
                            `<br><div class="hit-text">` +
                            (hitText
                            .replaceAll("%USER", `<span class="${originTeam}">${origin.name}</span>`)
                            .replaceAll("%TARGET", `<span class="${targetTeam}">${target.name}</span>`)) +
                            `</div>`
                        ;
                    } else {
                        hitText = "";
                    }

                    let currentNum = messageNum++;
                    env.rpg.querySelector(`#${originTeam}-team .actor`).insertAdjacentHTML('beforebegin', `<div class="use-message ${modClass}" style="z-index: ${10 + (currentNum % 9)}" id="m-${currentNum}">${actionText}${hitText}</div>`);
                    let useMessage = env.rpg.querySelector(`#m-${currentNum}`)
                    setTimeout(()=>{
                        useMessage.classList.add('active')
                        var readoutMessage
                        if(actionIsString) {
                            readoutMessage = `<div class="action-text" definition="ANALYSIS::'UTILIZED INCOHERENT ACTION'::RESULT::'UNKNOWN'">${actionText}</div> ${hitText.replaceAll('<br>', '')}`
                        } else {
                            readoutMessage = `
                                <div class="action-text" 
                                    definition="ANALYSIS::'UTILIZED THOUGHTFORM ACTION'::'${action.name.toUpperCase()}'::RESULT::'${hit ? "SUCCESS" : "FAILED"}'"
                                >
                                    ${actionText}
                                </div>
                                
                                ${hitText.replaceAll('<br>', '')} 
                                
                                <br>
                                <div class="action-description" definition="ANALYSIS::${action.help}">COMMAND::${action.desc}</div>
                            `
                        }

                        readoutAdd({
                            message: readoutMessage, 
                            name: "sourceless", 
                            type: "sourceless combat", 
                            show: false,
                            sfx: false
                        })
                    }, 100);	
                                
                    setTimeout(function(){
                        useMessage.classList.add('shrink');
                        setTimeout(function(){useMessage.remove()}, 400);
                    }, duration ? duration : env.ADVANCE_RATE * 1.5);
                }
                actionChoice = function ({choiceText = "choice", options = [], choiceCallback, user, action}) {
                    if(action.choiceAnim) {user.sprite.classList.add(action.choiceAnim)}
                    let id = `${user.slug}-${action.slug}`

                    let choices = ""
                    options.forEach((option, i) => {
                        console.log(option)
                        if(option.text) choices += `<span choice="c${i}" class="button" definition="${cor_ru.combat.translate(option.definition)}">${cor_ru.combat.translate(option.text)}</span>` // --- place where i actually insert stuff 
                    })

                    console.log(choices)
                    env.rpg.insertAdjacentHTML('beforeend', `
                        <div id="${id}" class="choice-attack">
                            <div class="choice-title">${cor_ru.combat.translate(choiceText)}</div>
                            ${choices}
                        </div>
                    `)// --- place where i actually insert stuff 

                    env.rpg.querySelectorAll(`#${id}.choice-attack .button`).forEach(el=>{
                        el.addEventListener('click', ()=>{
                            let choice = el.getAttribute('choice')
                            document.querySelector(`#${id}`).remove()
                            if(action.choiceAnim) {user.sprite.classList.remove(action.choiceAnim)}

                            //so this happens after the fade back from the offer animation    
                            //the choice should be acted upon somehow, likely through a switch        
                            setTimeout(()=>choiceCallback(choice), action.choiceAnimDuration || 1)
                        })
                    })
                }

                // also make sure our party has adapted names cause yea
                cor_ru.combat.observer.party.func()
            }
            change("PAGE!!cor_ru_combat", true)
        } catch (error) {
            if (error instanceof ReferenceError) {
                if (time == 0) {
                    console.warn("redefining createRPGeffectMessage fucked up a little but worry not, i'll get it - @cor-RU");
                    setTimeout(()=>cor_ru.combat.eatingEffectMessage(time+1), 50)
                }
                else if (time < 10) {
                    console.warn(time + " try at redefining createRPGeffectMessage - @cor-RU");
                    setTimeout(()=>cor_ru.combat.eatingEffectMessage(time+1), 50)
                } else console.error("woah. couldn't redefine createRPGeffectMessage, sorry! reload the page and/or message @dutokrisa (discord) - @cor-RU")
                console.error(error)
            } else {
                console.warn("wtf this is not supposed to happen. help. you should probably message @dutokrisa (discord) about this - @cor-RU")
                console.error(error)
            }
        }
    }
}

/* === ACTIONS === */
cor_ru.combat['redefineActions'] = function () {
    /* - win - */

    env.ACTIONS.win.name = "Победить" // Win
    env.ACTIONS.win.desc = "'просто победа'" // 'just win'
    env.ACTIONS.win.help = "победа" // win
    env.ACTIONS.win.usage = {
        "act": "%USER ПОБЕДИЛ%US(-/а/о)ER ЛОЛ"
    }

    /* - nothing - */

    env.ACTIONS.nothing.name = "Ничего" // Nothing
    env.ACTIONS.nothing.desc = "'просто ничего'" // 'just nothing'
    env.ACTIONS.nothing.help = "НИЧЕГО" // NOTHING
    env.ACTIONS.nothing.usage = {
        "act": "%USER бездействует"
    }

    /* - cower - */

    env.ACTIONS.cower.name = "Выдержать" // Endure
    env.ACTIONS.cower.usage = {
        "act": "%USER ПРЕОДОЛЕВАЕТ СВОЙ УЖАС"
    }
    env.ACTIONS.cower.details = {
        "onUse": "'убрать [STATUS::fear]'",
        "flavor": "'сосредоточиться на главном'"
    }

    /* - truly_nothing - */

    env.ACTIONS.truly_nothing.name = "Ничего" // Nothing
    env.ACTIONS.truly_nothing.desc = "'просто ничего'" // 'just nothing'
    env.ACTIONS.truly_nothing.help = "НИЧЕГО" // NOTHING

    /* - evade - */

    env.ACTIONS.evade.name = "Сосредоточение" // Focus
    env.ACTIONS.evade.usage = {
        "act": "%USER ЖДЁТ ПОДХОДЯЩИЙ МОМЕНТ"
    }
    env.ACTIONS.evade.details = {
        onUse: () => `'получить [STATUS::focused] [STATUS::evasion]'`,
        "flavor": "'обдумать момент и его возможности'"
    }
    env.ACTIONS.evade.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - skitter - */

    env.ACTIONS.skitter.name = "Беготня" // Skitter
    env.ACTIONS.skitter.usage = {
        "act": "%USER БЕШЕНО НОСИТСЯ ПО КОМНАТЕ"
    }
    env.ACTIONS.skitter.details = {
        onUse: () => `'получить [STATUS::evasion]'`,
        "flavor": "'сосредоточиться на уклонении от входящих атак';'скрыть уязвимости'"
    }

    /* - malfunction - */

    env.ACTIONS.malfunction.name = "Неисправность" // Malfunction
    env.ACTIONS.malfunction.desc = "'страдать от внутреннего разложения'" // 'suffer from internal deterioration'
    env.ACTIONS.malfunction.help = "-1, +1Х:УЯЗВИМОСТЬ" // -1HP, +1T:VULNERABLE
    env.ACTIONS.malfunction.usage = {
        "act": "КОЖА %GEN-USER СЪЁЖИВАЕТСЯ"
    }

    /* - attack - */

    env.ACTIONS.attack.name = "Атаковать" // Attack
    env.ACTIONS.attack.usage = {
        "act": "%USER АТАКУЕТ %ACC-TARGET",
        "crit": "ПУГАЮЩИЙ УДАР",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.attack.details = {
        "flavor": "'импровизация'",
        "onHit": "'[STAT::amt]'"
    }

    /* - akizet_attack - */

    env.ACTIONS.akizet_attack.name = "Перебороть" // Overwhelm
    env.ACTIONS.akizet_attack.usage = {
        "act": "%USER НАБРАСЫВАЕТСЯ НА %ACC-TARGET",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.akizet_attack.details = {
        "onHit": "'дерзко атаковать на [STAT::amt]'",
        "onCrit": "'нанести тяжелые физические травмы';'[STATUS::stun]'"
    }

    /* - eviscerate - */

    env.ACTIONS.eviscerate.name = "Потрошить" // Eviscerate
    env.ACTIONS.eviscerate.usage = {
        "act": "%USER ВЦЕПЛЯЕТСЯ В %ACC-TARGET",
        "crit": "%TARGET РАСТЕРЗАН%TAR(-/А/О)GET",
        "hit": "%TARGET РАСТЕРЗАН%TAR(-/А/О)GET",
        "miss": "%TARGET ОТШАТЫВАЕТСЯ"
    }
    env.ACTIONS.eviscerate.details = {
        "flavor": "'смело атаковать цель';'целиться в ранее нанесенные раны для нанесения дополнительного урона'",
        "onHit": "'ударить на [STAT::amt]'",
        "conditional": "<em>ДОП::</em>'[STAT::amt] за [STATUS::puncture] у цели'"
    }

    /* - stab - */

    env.ACTIONS.stab.name = "Пронзить" // Stab
    env.ACTIONS.stab.usage = {
        "act": "%USER ПРОНЗАЕТ %ACC-TARGET",
        "crit": "%TARGET РАСПОТРОШ%TAR(ЁН/ЕНА/ЕНО)GET",
        "hit": "%TARGET ИСТЕКАЕТ СЛЯКОТНЫМ КОРРУ",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.stab.details = {
        "flavor": "'преобразовать руку в заострённый отросток';'пронзить цель'",
        "onHit": "'[STAT::amt] [STATUS::puncture]'",
    onCrit: ()=> `'пробить жизненно важный цистозный компонент на [STATUS::puncture]'${env?.rpg?.is2D ? ";'ОТДЧ::2'" : ''}`,
    }

    /* - frenzy - */

    env.ACTIONS.frenzy.name = "Лихорадка" // Frenzy
    env.ACTIONS.frenzy.name = "растерзать" // --- растерзать кого?
    env.ACTIONS.frenzy.usage = {
        "act": "%USER ПРОНЗАЕТ %ACC-TARGET",
        "crit": "%USER ПРОСТО НЕ ОСТАНАВЛИВАЕТСЯ",
        "hit": "%TARGET ИСТЕКАЕТ СЛЯКОТНЫМ КОРРУ",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.frenzy.details = {
        "flavor": "'пробить жизненно важный цистозный компонент';'может вдохновить на новые удары'",
        "onHit": "'[STAT::amt] [STATUS::puncture]'",
        "onCrit": "'использовать это действие снова'"
    }

    /* - gakvu_attack - */

    env.ACTIONS.gakvu_attack.name = "Переполох" // Scramble
    env.ACTIONS.gakvu_attack.verb = "переполошить"
    env.ACTIONS.gakvu_attack.usage = {
        "act": "%USER ДОТЯГИВАЕТСЯ ДО %ACC-TARGET",
        "crit": "КОМПОНЕНТЫ %GEN-TARGET ОБНАЖЕНЫ",
        "hit": "ПЛОТЬ %GEN-TARGET РАСПЛАВЛЯЕТСЯ",
        "miss": "%TARGET СОПРОТИВЛЯЕТСЯ КОНТРОЛЮ"
    }
    env.ACTIONS.gakvu_attack.details = {
        "flavor": "'плавить корруцистозную плоть';'может выявить слабость'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'нанести [STATUS::vulnerable]'"
    }

    /* - countercall - */

    env.ACTIONS.countercall.name = "Контрвызов" // Countercall
    env.ACTIONS.countercall.verb = "контрвызвать"
    env.ACTIONS.countercall.usage = {
        "act": "%USER ДОТЯГИВАЕТСЯ ДО %ACC-TARGET",
        "crit": "%TARGET РАЗВАЛИВАЕТСЯ НА ЧАСТИ",
        "hit": "ПЛОТЬ %GEN-TARGET РАСПЛАВЛЯЕТСЯ",
        "miss": "%TARGET СОПРОТИВЛЯЕТСЯ КОНТРОЛЮ"
    }
    env.ACTIONS.countercall.details = {
        "flavor": "'направить разрушительный сигнал'",
        "onHit": "'[STAT::amt] [STATUS::vulnerable]'",
        "conditional": "<em>VS ДЕСТАБИЛИЗАЦИЯ::</em>'дополнительные [STAT::amt]';'+[STAT::critBonus]КРИТ';'[STATUS::stun] при КРИТ'"
    }

    /* - destabilize - */
    // --- DO NOT GENDER THIS

    env.ACTIONS.destabilize.name = "дестабилизация" // destabilize
    env.ACTIONS.destabilize.verb = "дестабилизировать"
    env.ACTIONS.destabilize.usage = {
        "act": "%USER ДЕСТАБИЛИЗИРУЕТ %ACC-TARGET",
        "crit": "%TARGET НЕЕСТЕСТВЕННО РЯБИТСЯ",
        "hit": "ФОРМА %GEN-TARGET КОЛЕБЛЕТСЯ",
        "miss": "%TARGET СОХРАНЯЕТ СТАБИЛЬНОСТЬ"
    }
    env.ACTIONS.destabilize.details = {
        "flavor": "'применить незаконное землемыслие';'изменить строение цели'",
        "onHit": "'[STATUS::destabilized]'",
        "onCrit": "'дополнительная [STATUS::destabilized]'",
    conditional: ()=> checkItem("core_translation") && check("env!!embassy_day", 3.99) ? 
                `<em>ПРЕОБРАЗОВАТЕЛЬ СИГНАЛА::</em>'расширена функциональность'\n<em>VS ВРАГОВ</em>::'[STATUS::vulnerable]'\n<em>VS СОЮЗНИКОВ</em>::'[STATUS::evasion]'` : ``
    }

    /* - tozik_attack - */

    env.ACTIONS.tozik_attack.name = "коррускиви" // Corruskivi
    env.ACTIONS.tozik_attack.verb = "закоррускивить" // Corruskivi
    env.ACTIONS.tozik_attack.usage = {
        "act": "%USER ВЦЕПЛЯЕТСЯ В %ACC-TARGET",
        "crit": "ИЗ %ACC-TARGET ВЫСАСЫВАЕТСЯ ЖИЗНЬ",
        "hit": "%TARGET ИЗРЕЗАН%TAR(-/А/О)GET",
        "miss": "%TARGET УВОРАЧИВАЕТСЯ"
    }
    env.ACTIONS.tozik_attack.details = {
        "flavor": "'атаковать ремонтным инструментом';'выкачка жизненно важного корру'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'исцелить союзников поблизости на [STAT::healHP] [STATUS::regen]'"
    }

    /* - parasite - */
    // --- DO NOT GENDER THIS

    env.ACTIONS.parasite.name = "Паразит" // Parasite
    env.ACTIONS.parasite.verb = "паразитировать на ком?" // parasitize
    env.ACTIONS.parasite.usage = {
        "act": "%USER ХВАТАЕТСЯ ЗА %ACC-TARGET",
        "crit": "КОМАНДА %GEN-TARGET ЗАРАЖАЕТСЯ",
        "hit": "%TARGET ЗАРАЖАЕТСЯ",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.parasite.details = {
        "flavor": "'применить модифицированный ремонтный инструмент';'черпать жизненно важное корру врагов для исцеления союзников'",
        onHit: () => "'[STAT::amt] [STATUS::siphon]'",
        onCrit: () => "'заразить команду противника с [STATUS::siphon]'",
    }

    /* - mend - */

    env.ACTIONS.mend.name = "Подлатать" // Quick Mend
    env.ACTIONS.mend.usage = {
        "act": "%USER ПОДЛЕЧИВАЕТ %ACC-TARGET",
        "crit": "%TARGET ЧУВСТВУЕТ СЕБЯ КУДА ЛУЧШЕ",
        "hit": "%TARGET ЧУВСТВУЕТ СЕБЯ ЛУЧШЕ",
        "miss": "%TARGET СЛИШКОМ СКОЛЬЗК%TAR(ИЙ/АЯ/ОЕ)GET"
    }
    env.ACTIONS.mend.details = {
        "onHit": "'[STAT::amt] [STATUS::regen]'"
    }

    /* - optimize - */

    env.ACTIONS.optimize.name = "Оптимизировать" // Optimize
    env.ACTIONS.optimize.usage = {
        "act": "%USER ПОДЛЕЧИВАЕТ %ACC-TARGET",
        "crit": "%TARGET ЧУВСТВУЕТ ПРИЛИВ ЭНЕРГИИ",
        "hit": "%TARGET ГОТОВ%TAR(-/А/О)GET ДРАТЬСЯ",
        "miss": "%TARGET СЛИШКОМ СКОЛЬЗК%TAR(ИЙ/АЯ/ОЕ)GET"
    }
    env.ACTIONS.optimize.details = {
        onHit: () => "'[STAT::amt] [STATUS::regen] [STATUS::surge]'",
        "flavor": "'задействовать укузу восстановитель';'уменьшенный целебный эффект';'повысить энергию'"
    }

    /* - miltza_attack - */

    env.ACTIONS.miltza_attack.name = "Отвлечение" // Distraction
    env.ACTIONS.miltza_attack.verb = "отвлечь" // distract
    env.ACTIONS.miltza_attack.usage = {
        "act": "%USER ДЕЛАЕТ ЛОЖНЫЙ ВЫПАД И БЬЁТ %ACC-TARGET",
        "crit": "СОЮЗНИКИ %GEN-USER ВДОХНОВЛЕНЫ",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УВОРАЧИВАЕТСЯ"
    }
    env.ACTIONS.miltza_attack.details = {
        "flavor": "'ударить с хитрой уловкой';'может создать отвлечение'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::evasion] ближайшим союзникам'",
        "conditional": "<em>VS УЯЗВИМОСТЬ::</em>'дополнительный [STAT::amt]'"
    }

    /* - spy - */

    env.ACTIONS.spy.name = "слежка" // spy
    env.ACTIONS.spy.verb = "следить за кем?" // spy on
    env.ACTIONS.spy.usage = {
        "act": "%USER СЛЕДИТ ЗА %INS-TARGET",
        "crit": "%TARGET ОБРЕЧ%TAR(ЁН/ЕНА/ЕНО)GET НА ГИБЕЛЬ",
        "hit": "%TARGET ЧУВСТВУЕТ НА СЕБЕ ЧУЖОЙ ВЗГЛЯД",
        "miss": "%TARGET ПРЯЧЕТСЯ ЗА ЧЕМ-ТО"
    }
    env.ACTIONS.spy.details = {
        "onUse": "'[STATUS::vulnerable]'"
    }

    /* - ultra_spy - */

    env.ACTIONS.ultra_spy.name = "найти изъян" // Find Flaw
    env.ACTIONS.ultra_spy.verb = "найти изъян у" // find flaw in
    env.ACTIONS.ultra_spy.usage = {
        "act": "%USER СЛЕДИТ ЗА %INS-TARGET",
        "crit": "%TARGET ОБРЕЧ%TAR(ЁН/ЕНА/ЕНО)GET НА ГИБЕЛЬ",
        "hit": "%TARGET ОБРЕЧ%TAR(ЁН/ЕНА/ЕНО)GET НА ГИБЕЛЬ",
        "miss": "%TARGET ПРЯЧЕТСЯ ЗА ЧЕМ-ТО"
    }
    env.ACTIONS.ultra_spy.details = {
        "flavor": "'определить местоположение основных компонентов в цели'",
        "onHit": "'[STATUS::vulnerable] [STATUS::critical_flaw]'"
    }

    /* - subvert - */

    env.ACTIONS.subvert.name = "поставить под угрозу" // Subvert
    env.ACTIONS.subvert.desc = "'выявить крайнюю слабость';'увеличить шансы на удар и крит';'дополнительный шанс нанести серьёзный урон'"
    env.ACTIONS.subvert.usage = {
        "act": "%USER СЛЕДИТ ЗА %INS-TARGET",
        "crit": "%TARGET ОБРЕЧ%TAR(ЁН/ЕНА/ЕНО)GET НА ГИБЕЛЬ",
        "hit": "%TARGET ОБРЕЧ%TAR(ЁН/ЕНА/ЕНО)GET НА ГИБЕЛЬ",
        "miss": "%TARGET ПРЯЧЕТСЯ ЗА ЧЕМ-ТО"
    }
    env.ACTIONS.subvert.details = {
        "flavor": "'обмануть цель';'манипулируется внешним вмешательством'",
        "onHit": "'[STATUS::vulnerable] [STATUS::critical_flaw]'"
    }

    /* - spy_analyze - */

    env.ACTIONS.spy_analyze.name = "Анализ" // Analyze
    env.ACTIONS.spy_analyze.verb = "Анализировать" // Analyze
    env.ACTIONS.spy_analyze.desc = "'выявить слабость врага';'увеличить шансы на удар и крит'" // 'expose enemy weakness';'increase hit and crit chances'
    env.ACTIONS.spy_analyze.help = "80% +3Х:УЯЗВИМОСТЬ -УКЛОНЕНИЕ" // 80% +3T:VULNERABLE -EVASION
    env.ACTIONS.spy_analyze.usage = {
        "act": "%USER СКАНИРУЕТ %ACC-TARGET",
        "hit": "%TARGET ЧУВСТВУЕТ НА СЕБЕ ЧУЖОЙ ВЗГЛЯД",
        "miss": "%TARGET ПРЯЧЕТСЯ ЗА ЧЕМ-ТО"
    }

    /* - spy_target - */

    env.ACTIONS.spy_target.name = "нацелиться" // Target
    env.ACTIONS.spy_target.verb = "нацелиться на" // Target
    env.ACTIONS.spy_target.desc = "'выявить слабость врага';'увеличить шансы на удар и крит'" // 'expose enemy weakness';'increase hit and crit chances'
    env.ACTIONS.spy_target.help = "80% +3Х:УЯЗВИМОСТЬ -УКЛОНЕНИЕ" // 80% +3T:VULNERABLE -EVASION
    env.ACTIONS.spy_target.usage = {
        "act": "%USER УКАЗЫВАЕТ НА %ACC-TARGET",
        "hit": "%TARGET ЧУВСТВУЕТ НА СЕБЕ ЧУЖОЙ ВЗГЛЯД",
        "miss": "%TARGET ПРЯЧЕТСЯ ЗА ЧЕМ-ТО"
    }

    /* - drone_strike - */

    env.ACTIONS.drone_strike.name = "атака дроном" // Drone Strike
    env.ACTIONS.drone_strike.name = "атаковать дроном" // Drone Strike
    env.ACTIONS.drone_strike.desc = "'удар по проанализированной слабости'" // 'strike against analyzed weakness'
    env.ACTIONS.drone_strike.help = "АВТОУДАР -1ХП, 10%К x2" // AUTOHIT -1HP, 10%C x2
    env.ACTIONS.drone_strike.usage = {
        "act": "ДРОН %GEN-USER АТАКУЕТ %ACC-TARGET"
    }

    /* - cavik_attack - */

    env.ACTIONS.cavik_attack.name = "Взрывчатка" // IED
    env.ACTIONS.cavik_attack.verb = "бросить в" // throw at
    env.ACTIONS.cavik_attack.usage = {
        "act": "%USER ШВЫРЯЕТ СТРАННУЮ ЦИСТУ В %ACC-TARGET",
        "crit": "%TARGET ВЗРЫВАЕТСЯ",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УВОРАЧИВАЕТСЯ"
    }
    env.ACTIONS.cavik_attack.details = {
        "flavor": "'бросить наспех сделанную небольшую взрывчатку';'шанс на больший взрыв'",
        "onHit": "'[STAT::amt]'",
        onCrit: ()=> `'HIT all foes for [STAT::amt]'${env.name == "frame" ? `;'additional hits do not trigger on-hit effects'` : ``}`,
    }

    /* - bazruka - */

    env.ACTIONS.bazruka.name = "базрука" // Bazruka
    env.ACTIONS.bazruka.verb = "бросить в" // throw at
    env.ACTIONS.bazruka.usage = {
        "act": "%USER БРОСАЕТ ВЗРЫВЧАТКУ В %ACC-TARGET",
        "crit": "ШРАПНЕЛЬ РАЗЛЕТАЕТСЯ ПО ВСЕЙ КОМНАТЕ",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УВОРАЧИВАЕТСЯ"
    }
    env.ACTIONS.bazruka.details = {
        "flavor": "'utilize rapid-formed micro-explosive';'chance for greater shrapnel explosion'",
        "onHit": "'[STAT::amt]'",
        onCrit: () => `'HIT all foes for [STAT::amt] [STATUS::puncture]'${env.name == "frame" ? `;'additional hits trigger on-hit effects'` : ``}`,
    }

    /* - bozko_attack - */

    env.ACTIONS.bozko_attack.name = "Обезоружить" // Disable
    env.ACTIONS.bozko_attack.usage = {
        "act": "%USER БЬЁТ ПО ОРУЖИЮ %GEN-TARGET",
        "crit": "%TARGET ИСКАЛЕЧЕН%TAR(-/А/О)GET",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.bozko_attack.details = {
        "flavor": "'strike at offensive appendages of target';'attempt to weaken'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::weakened]'"
    }

    /* - cripple - */

    env.ACTIONS.cripple.name = "Искалечить" // Cripple
    env.ACTIONS.cripple.usage = {
        "act": "%USER БЬЁТ ПО ОРУЖИЮ %GEN-TARGET",
        "crit": "%TARGET ИСКАЛЕЧЕН%TAR(-/А/О)GET",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.cripple.details = {
        "flavor": "'ударить по нервному центру цели';'гарантированная дезориентация'",
        "onHit": "'[STAT::amt] [STATUS::stun]'",
        "onCrit": "'[STATUS::weakened]'"
    }

    /* - guard - */

    env.ACTIONS.guard.name = "Стража" // Guard
    env.ACTIONS.guard.verb = "сторожить" // Guard
    env.ACTIONS.guard.usage = {
        "act": "%USER ВСТАЁТ ПЕРЕД %INS-TARGET",
        "hit": "%TARGET ЗАЩИЩ%TAR(ЁН/ЕНА/ЕНО)GET %INS-USER"
    }
    env.ACTIONS.guard.details = {
        "flavor": "'использовать уникальные конечности для защиты цели';'перехватывать входящие атаки'",
        "onUse": "'[STATUS::redirection]'"
    }

    /* - special_guard_all - */

    env.ACTIONS.special_guard_all.name = "Линия Фронта" // Frontline
    env.ACTIONS.special_guard_all.usage = {
        "act": "%USER ВСТАЁТ ПЕРЕД СВОИМИ ВРАГАМИ"
    }
    env.ACTIONS.special_guard_all.details = {
        "flavor": "'attain hyper-awareness of proceedings';'intercept all attacks on allies'",
        "onUse": "'[STATUS::redirection] to all allies'"
    }

    /* - special_guard_all_bonus - */

    env.ACTIONS.special_guard_all_bonus.name = "" // Martyr
    env.ACTIONS.special_guard_all_bonus.desc = "" // 'intercept all attacks on allies';'prepare to take great damage'
    env.ACTIONS.special_guard_all_bonus.help = "" // ALLIES::+2T:REDIRECTION (TO USER), +2T:CARAPACE +2T:SPIKES -VULNERABLE
    env.ACTIONS.special_guard_all_bonus.usage = {
        "act": "%USER ВСТАЁТ ПЕРЕД СВОИМИ ВРАГАМИ"
    }
    env.ACTIONS.special_guard_all_bonus.details = {
        "flavor": "'intercept all attacks on allies';'prepare to take great damage'",
        "onUse": "'[STATUS::carapace] [STATUS::spikes]';'[STATUS::redirection] to all allies'"
    }

    /* - shell - */

    env.ACTIONS.shell.name = "Оболочка" // Shell
    env.ACTIONS.shell.usage = {
        "act": "%USER ГОТОВИТСЯ ПРИНЯТЬ УДАР"
    }
    env.ACTIONS.shell.details = {
        "flavor": "'занять оборонительную позицию'",
        "onUse": "'[STATUS::carapace] [STATUS::spikes]'"
    }

    /* - brawl_weak - */

    env.ACTIONS.brawl_weak.name = "Неуклюжая драка" // Clumsy Brawl
    env.ACTIONS.brawl_weak.desc = "'неуклюжий удар слабыми конечностями'" // 'unwieldy strike with weak limbs'
    env.ACTIONS.brawl_weak.verb = "драться с кем?" // brawl with
    env.ACTIONS.brawl_weak.help = "40% -1ХП, 10%К X2" // 40% -1HP, 10%C X2
    env.ACTIONS.brawl_weak.usage = {
        "act": "%USER НЕУКЛЮЖЕ АТАКУЕТ %ACC-TARGET",
        "crit": "%TARGET СБИТ%TAR(-/А/О)GET С НОГ",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }

    /* - brawl - */

    env.ACTIONS.brawl.name = "Драка" // Brawl
    env.ACTIONS.brawl.verb = "драться с кем?" // brawl with
    env.ACTIONS.brawl.usage = {
        "act": "%USER АТАКУЕТ %ACC-TARGET",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.brawl.details = {
        "flavor": "'грузный удар';'крайняя мера'",
        "onHit": "'[STAT::amt]'"
    }

    /* - ik_attack - */

    env.ACTIONS.ik_attack.name = "" // Veilksplitter
    env.ACTIONS.ik_attack.verb = "" // veilksplit
    env.ACTIONS.ik_attack.usage = {
        "act": "%USER BLASTS %ACC-TARGET", 
        "crit": "%TARGET АННИГИЛИРОВАН%TAR(-/А/О)GET",
        "hit": "%TARGET ОБОЖЖ%TAR(ЁН/ЕНА/ЕНО)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.ik_attack.details = {
        "flavor": "'utilize dull-enabled cutting beam'",
        onHit: ()=> `'[STAT::amt] [STATUS::stun]'${env?.rpg?.is2D ? ";'KB::4'" : ''}`,
    }

    /* - dullflare - */

    env.ACTIONS.dullflare.name = "" // Dull Flare
    env.ACTIONS.dullflare.usage = {
        "act": "%USER TEARS OPEN THE DULL"
    }
    env.ACTIONS.dullflare.details = {
        "flavor": "'wide directional release of rapidly decaying dull light';'deconstructs foes'",
        "onUse": "'HIT all foes'",
        "onHit": "'[STAT::amt]'"
    }

    /* - swipe - */

    env.ACTIONS.swipe.name = "" // Swipe
    env.ACTIONS.swipe.desc = "" // 'swipe blindly at target';'chance for persistent wound'
    env.ACTIONS.swipe.help = "" // 70% -1HP, 20%C x2 +1T:PUNCTURE -REGEN
    env.ACTIONS.swipe.usage = {
        "act": "%USER SWIPES AT %TARGET",
        "crit": "%TARGET IS STABBED",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET DUCKS OUT OF THE WAY"
    }

    /* - disabler_pulse - */

    env.ACTIONS.disabler_pulse.name = "Импульс Отключателя" // Disabler Pulse
    env.ACTIONS.disabler_pulse.verb = "отключить" // disable
    env.ACTIONS.disabler_pulse.usage = {
        "act": "%USER ВЫПУСКАЕТ ОТКЛЮЧАТЕЛЬ",
        "hit": "%TARGET АННИГИЛИРОВАН%TAR(-/А/О)GET"
    }
    env.ACTIONS.disabler_pulse.details = {
        "flavor": "'устройство аварийной безопасности';'внедряет саморазрушительную мыслеформу';'только для промышленного использования'",
        "onHit": "'[STAT::amt] [STATUS::stun]'"
    }

    /* - foe_stab - */

    env.ACTIONS.foe_stab.name = "пронзить" // stab
    env.ACTIONS.foe_stab.desc = "" // 'puncture vital cystic component';'damage over time';'stop regen'
    env.ACTIONS.foe_stab.help = "75% -1ХП +2Х:ПРОКОЛ -РЕГЕНЕРАЦИЯ, 10%К -1ХП" // 75% -1HP +2T:PUNCTURE -REGEN, 10%C -1HP --- wait what does the C even mean
    env.ACTIONS.foe_stab.usage = {
        "act": "%USER ПРОНЗАЕТ %ACC-TARGET",
        "crit": "%TARGET РАСПОТРОШ%TAR(ЁН/ЕНА/ЕНО)GET",
        "hit": "%TARGET ИСТЕКАЕТ СЛЯКОТНЫМ КОРРУ",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.foe_stab.details = {
        "flavor": "'преобразовать руку в заострённый отросток';'пронзить цель'",
        "onHit": "'[STAT::amt] [STATUS::puncture]'",
        onCrit: ()=> `'пробить жизненно важный цистозный компонент на [STATUS::puncture]'${env?.rpg?.is2D ? ";'ОТДЧ::2'" : ''}`,
    }

    /* - barrier - */

    env.ACTIONS.barrier.name = "" // Barrier
    env.ACTIONS.barrier.verb = "" // shield
    env.ACTIONS.barrier.usage = {
        "act": "%USER SHIELDS %TARGET",
        "crit": "%TARGET FEELS INVINCIBLE",
        "hit": "%TARGET GAINS A THIN BARRIER",
        "miss": "IT DOES NOT STICK"
    }
    env.ACTIONS.barrier.details = {
        "flavor": "apply ablative corru layer to target';'occasionally provide better shielding'",
        "onHit": "'[STAT::amtBP]'",
        "onCrit": "'additional [STAT::amtBP]'"
    }

    /* - special_limited_carapace - */

    env.ACTIONS.special_limited_carapace.name = "" // Expend carapace
    env.ACTIONS.special_limited_carapace.desc = "" // 'deploy shielding around target ally';'single-use'
    env.ACTIONS.special_limited_carapace.help = "" // AUTOHIT +3T:CARAPACE, ONE USE PER COMBAT
    env.ACTIONS.special_limited_carapace.usage = {
        "act": "%USER ATTACHES THEIR SHIELDS TO %TARGET",
        "crit": "%TARGET FEELS INVINCIBLE",
        "hit": "%TARGET LOOKS MORE HARDY",
        "miss": "SOMETHING BROKE LOL"
    }

    /* - enemy_shell - */

    env.ACTIONS.enemy_shell.name = "" // Shell
    env.ACTIONS.enemy_shell.desc = "" // 'form arms into defensive shell';'reduce incoming attacks'
    env.ACTIONS.enemy_shell.help = "" // +2T:CARAPACE -VULNERABLE
    env.ACTIONS.enemy_shell.usage = {
        "act": "%USER PREPARES TO TAKE A HIT"
    }

    /* - restore - */

    env.ACTIONS.restore.name = "" // Restore
    env.ACTIONS.restore.usage = {
        "act": "%USER FIXES UP %TARGET",
        "crit": "%TARGET FEELS WAY BETTER",
        "hit": "%TARGET FEELS BETTER",
        "miss": "%TARGET IS TOO SLIPPERY"
    }
    env.ACTIONS.restore.details = {
        "flavor": "'utilize quick-acting repair cyst'",
        "onHit": "'[STAT::amt] [STATUS::regen]'",
        "onCrit": "'additional [STAT::amt] [STATUS::regen]'",
        "conditional": "<em>VS DOWN::</em>'revive target';'[STATUS::evasion] [STATUS::regen]'"
    }

    /* - special_spy_all - */

    env.ACTIONS.special_spy_all.name = "" // Analyze Foes
    env.ACTIONS.special_spy_all.usage = {
        "act": "%USER SPIES UPON THEIR FOES"
    }
    env.ACTIONS.special_spy_all.details = {
        "flavor": "'utilize receptor-tied targeting cyst';'expose all weakness'",
        "onUse": "'[STATUS::vulnerable] to all foes'"
    }

    /* - special_attack_all - */

    env.ACTIONS.special_attack_all.name = "" // Explosive
    env.ACTIONS.special_attack_all.usage = {
        "act": "%USER DEPLOYS A KAVRUKA"
    }
    env.ACTIONS.special_attack_all.details = {
        "flavor": "'utilize volatile deconstruction tool'",
        "onUse": "'HIT all foes'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - special_barrier_allies - */

    env.ACTIONS.special_barrier_allies.name = "" // Cover
    env.ACTIONS.special_barrier_allies.usage = {
        "act": "%USER SHIELDS THEIR ALLIES"
    }
    env.ACTIONS.special_barrier_allies.details = {
        "flavor": "'utilize mobile applicators and inbuilt reserve';'apply ablative corru shielding'",
        onUse: () => `'[STAT::amtBP] ${env?.rpg?.is2D ? "[STATUS::repairs]" : ''} to nearby allies'`,
    }

    /* - special_strong_barrier_allies - */

    env.ACTIONS.special_strong_barrier_allies.name = "" // Responsive Armor
    env.ACTIONS.special_strong_barrier_allies.usage = {
        "act": "%USER SHIELDS THEIR ALLIES"
    }
    env.ACTIONS.special_strong_barrier_allies.details = {
        "flavor": "'break open satik cyst';'utilize rapid temporary ablative barrier applicators'",
        onUse: () => `'[STAT::amtBP] to nearby allies'`,
    }

    /* - special_restorative_barrier - */

    env.ACTIONS.special_restorative_barrier.name = "" // Mending Cover
    env.ACTIONS.special_restorative_barrier.usage = {
        "act": "%USER SHIELDS THEIR ALLIES"
    }
    env.ACTIONS.special_restorative_barrier.details = {
        "flavor": "'broadly apply ablative protection';'upgraded barrier mends wounds while active'",
        "onUse": "'[STAT::amtBP] [STATUS::repairs] to nearby allies'"
    }

    /* - incoherent_gundown - */

    env.ACTIONS.incoherent_gundown.name = "" // BSTRD BULLETS
    env.ACTIONS.incoherent_gundown.desc = "" // BATTLEFIELD 100% -1HP per hit
    env.localization.page[page.dialoguePrefix].strings["%USER AIMS AT %TARGET"] = ""

    /* - special_fullauto - */

    env.ACTIONS.special_fullauto.name = "" // Full Auto
    env.ACTIONS.special_fullauto.usage = {
        "act": "%USER OPENS FIRE"
    }
    env.ACTIONS.special_fullauto.details = {
        "flavor": "'utilize automatic rifle';'rapid inaccurate attacks'",
        "onUse": "'HIT random foes 6 times'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::vulnerable]'"
    }

    /* - special_fullauto_player - */

    env.ACTIONS.special_fullauto_player.name = "" // Full Auto
    env.ACTIONS.special_fullauto_player.usage = {
        "act": "%USER OPENS FIRE"
    }
    env.ACTIONS.special_fullauto_player.details = {
        "flavor": "'utilize symbotic rifle';'rapid inaccurate attacks';'consumes HP for munitions'",
        "onUse": "'HIT random foes 6 times';'[STAT::amt] to self'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::vulnerable]'"
    }

    /* - movefriend_attack - */

    env.ACTIONS.movefriend_attack.name = "" // Broadcast
    env.ACTIONS.movefriend_attack.desc = "" // 'directly seize control of corrucystic organs';'chance to utilize target as signal amplifier'
    env.ACTIONS.movefriend_attack.help = "" // 75% -2HP +1T:PUNCTURE, 30%C (FOES::-1HP +2T:VULNERABLE)
    env.ACTIONS.movefriend_attack.usage = {
        "act": "%USER'S SIGIL WARPS STRANGELY",
        "crit": "THE WHOLE TEAM FEELS ILL",
        "hit": "%TARGET'S FLESH REVOLTS",
        "miss": "%TARGET RECOILS SAFELY"
    }

    /* - special_mass_destabilize - */

    env.ACTIONS.special_mass_destabilize.name = "" // destabilize thoughtspace
    env.ACTIONS.special_mass_destabilize.usage = {
        "act": "THE THOUGHTSPACE GROWS VIOLENT"
    }
    env.ACTIONS.special_mass_destabilize.details = {
        "flavor": "'afflict all nearby entities with incoherence'",
        "onUse": "'[STATUS::destabilized] to all actors'"
    }

    /* - special_movefriend_annihilate - */

    env.ACTIONS.special_movefriend_annihilate.name = "" // Annihilation
    env.ACTIONS.special_movefriend_annihilate.desc = "" // 'utilize the walls to crush a target'
    env.ACTIONS.special_movefriend_annihilate.help = "" // CHOOSE::100% -2HP ::OR:: 50% -2HP 50%C -2HP +1T:STUN
    env.ACTIONS.special_movefriend_annihilate.usage = {
        "act": "THE WALLS GREW HOSTILE AROUND %TARGET",
        "crit": "%TARGET BARELY STANDS",
        "hit": "%TARGET DID THEIR BEST",
        "miss": "%TARGET ESCAPED BY A HAIR"
    }
    env.localization.page[page.dialoguePrefix].strings["THE WALLS SHIFT AROUND %TARGET"] = ""
    env.localization.page[page.dialoguePrefix].strings[`The walls close in around милтза`] = ""
    env.localization.page[page.dialoguePrefix].strings[`The walls close in around тозик`] = ""
    env.localization.page[page.dialoguePrefix].strings[`The walls close in around`] = ""
    env.localization.page[page.dialoguePrefix].strings["Withstand the attack"] = ""
    env.localization.page[page.dialoguePrefix].strings["NOTE::'100% -2HP'"] = ""
    env.localization.page[page.dialoguePrefix].strings["Try a risky dodge"] = ""
    env.localization.page[page.dialoguePrefix].strings["NOTE::'50% -2HP 50%C -2HP +1T:STUN'"] = ""

    /* - special_archiveshelf_annihilate - */

    env.ACTIONS.special_archiveshelf_annihilate.name = "" // Annihilation
    env.ACTIONS.special_archiveshelf_annihilate.desc = "" // 'utilize long limbs to eviscerate a target'
    env.ACTIONS.special_archiveshelf_annihilate.help = "" // CHOOSE::100% -3HP ::OR:: 50% -2HP 50%C -2HP +1T:STUN +2T:PUNCTURE
    env.ACTIONS.special_archiveshelf_annihilate.usage = {
        "act": "%USER LUNGES AT %TARGET",
        "crit": "%TARGET IS BRUTALLY STABBED",
        "hit": "%TARGET TAKES A SOLID HIT",
        "miss": "%TARGET ESCAPED BY A HAIR"
    }
    env.ACTIONS.special_archiveshelf_annihilate.details = {
        "onUse": "'present target foe a choice of outcome'",
        "conditional": "<em>HIT 1</em>::'HIT::[STAT::hit1ACC]% CRIT::0% [STAT::hit1HP]'\\n<em>HIT 2</em>::'HIT::[STAT::hit2ACC]% CRIT::[STAT::hit2CRIT]% [STAT::hit2HP]';'[STATUS::stun] [STATUS::puncture] on CRIT'"
    }
    env.localization.page[page.dialoguePrefix].strings[`The shelf lunges at тозик`] = ""
    env.localization.page[page.dialoguePrefix].strings[`The shelf lunges at`] = ""
    env.localization.page[page.dialoguePrefix].strings["NOTE::'100% -3HP'"] = ""
    env.localization.page[page.dialoguePrefix].strings["NOTE::'50% -2HP 50%C -2HP +1T:STUN +2T:PUNCTURE'"] = ""

    /* - incoherent_movefriend - */

    env.ACTIONS.incoherent_movefriend.name = "" // Wallspikes
    env.ACTIONS.incoherent_movefriend.desc = "" // 'k̶̡̇̄i̵͈͑̐̑̌̈́̇̾̕͝l̷̡͓̬̩̖̽̂̿̏͒̎̽̏̀̿̏̅̈l̵̯̦̪͠'
    env.ACTIONS.incoherent_movefriend.help = "" // BATTLEFIELD 300% -1HP
    env.localization.page[page.dialoguePrefix].strings["THE WALLS TWIST AROUND THE WHOLE TEAM"] = ""

    /* - windup - */

    env.ACTIONS.windup.name = "" // Preparation
    env.ACTIONS.windup.usage = {
        "act": "%USER ГОТОВИТСЯ К АТАКЕ..."
    }
    env.ACTIONS.windup.details = {
        "flavor": "'prepare a devastating attack'",
        "onUse": "'[STATUS::windup]'"
    }

    /* - windup_cover - */

    env.ACTIONS.windup_cover.name = "" // Take Aim
    env.ACTIONS.windup_cover.usage = {
        "act": "%USER ГОТОВИТСЯ К АТАКЕ..."
    }
    env.ACTIONS.windup_cover.details = {
        "flavor": "'prepare devastating attack';'stay low';'lose windup if attention diverted'",
        "onUse": "'[STATUS::windup] [STATUS::evasion]'"
    }

    /* - focused_windup - */

    env.ACTIONS.focused_windup.name = "" // Extra Preparation
    env.ACTIONS.focused_windup.usage = {
        "act": "%USER ЖДЁТ ПОДХОДЯЩИЙ МОМЕНТ..."
    }
    env.ACTIONS.focused_windup.details = {
        "onUse": "'[STATUS::windup] [STATUS::evasion] [STATUS::focused]'",
        "flavor": "'hold prepared attack';'look for opportunity'"
    }

    /* - hold_aim - */

    env.ACTIONS.hold_aim.name = "" // Hold Aim
    env.ACTIONS.hold_aim.usage = {
        "act": "%USER ЖДЁТ ПОДХОДЯЩИЙ МОМЕНТ..."
    }
    env.ACTIONS.hold_aim.details = {
        "onUse": "'[STATUS::windup] [STATUS::evasion] [STATUS::focused]'",
        "flavor": "'hold prepared attack';'look for opportunity'"
    }

    /* - archival_smash - */

    env.ACTIONS.archival_smash.name = "" // Calculated Strike
    env.ACTIONS.archival_smash.desc = "" // 'focused, deadly attack upon one target';'immense physical trauma'
    env.ACTIONS.archival_smash.help = "" // 100% -4HP, 40% X2 +1T:STUN
    env.ACTIONS.archival_smash.usage = {
        "act": "%USER НАБРАСЫВАЕТСЯ НА %ACC-TARGET",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.archival_smash.details = {
        "flavor": "'focused, deadly attack upon one target';'immense physical trauma'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - kivii_grasp - */

    env.ACTIONS.kivii_grasp.name = "" // Grasp
    env.ACTIONS.kivii_grasp.usage = {
        "act": "%USER GRASPS AT %TARGET",
        "crit": "%TARGET IS CRUSHED",
        "hit": "%TARGET IS CAUGHT",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.kivii_grasp.details = {
        "flavor": "'utilize gauntlet';'immobilize and crush target';'leave critically open to attack'",
        "onUse": "'[STAT::amt] [STAT::vulnerable]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - rez - */

    env.ACTIONS.rez.name = "" // Unfair Advantage
    env.ACTIONS.rez.usage = {
        "act": "%USER BRINGS %TARGET BACK TO THEIR FEET",
        "hit": "%TARGET IS READY TO FIGHT",
        "crit": "%TARGET GETS A SECOND WIND"
    }
    env.ACTIONS.rez.details = {
        "flavor": "'repair ally to fighting condition';'used only as last resort'",
        "onUse": "'revive target at [STAT::percentage]%HP'"
    }

    /* - husk_attack - */

    env.ACTIONS.husk_attack.name = "Знакомый Удар" // Familiar Strike
    env.ACTIONS.husk_attack.verb = "ударить" // Familiar Strike
    env.ACTIONS.husk_attack.usage = {
        "act": "%USER SPRINTS AT %TARGET",
        "crit": "%TARGET FACES THEIR MORTALITY",
        "hit": "%TARGET IS STRUCK WITH BROKEN LIMBS",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.husk_attack.details = {
        "flavor": "'utilized warped limbs to strike target';'occasionally terrifying'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::fear] to all foes'"
    }

    /* - husk_attack_weak - */

    env.ACTIONS.husk_attack_weak.name = "" // Psychosis
    env.ACTIONS.husk_attack_weak.desc = "" // 'manifest imagined attack directly in flesh';'occasionally terrifying'
    env.ACTIONS.husk_attack_weak.help = "" // 50% -1HP, 10%C x2 + (FOES::+2T:FEAR)
    env.ACTIONS.husk_attack_weak.usage = {
        "act": "%USER SPRINTS AT %TARGET",
        "crit": "%TARGET FACES THEIR MORTALITY",
        "hit": "%TARGET IS STRUCK, BUT BY WHAT?",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }

    /* - speak - */

    env.ACTIONS.speak.name = "Речь" // Speak
    env.ACTIONS.speak.verb = "говорить с кем?"
    env.ACTIONS.speak.usage = {
        "act": "%USER ПОДХОДИТ К %DAT-TARGET",
        "crit": "%TARGET ЗАМИРАЕТ ОТ СТРАХА",
        "hit": "%USER ШЕПЧЕТ ЧТО-ТО %DAT-TARGET",
        "miss": "%TARGET ОТШАТЫВАЕТСЯ"
    }
    env.ACTIONS.speak.details = {
        "flavor": "'utilize remains to speak';'express aggressor signal directly'",
        "onHit": "'[STATUS::fear]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - berserk - */

    env.ACTIONS.berserk.name = "" // Berserk
    env.ACTIONS.berserk.help = "" // +1T:DESTABILIZE +2T:SPIKES +2T:VULNERABLE
    env.ACTIONS.berserk.usage = {
        "act": "%USER MELTS INTO A MORE AGGRESSIVE SHAPE"
    }
    env.ACTIONS.berserk.details = {
        "flavor": "'self-modify for maximum offense';'destabilize form and react to attacks'",
        "onUse": "[STATUS::destabilized] [STATUS::spikes] [STATUS::vulnerable]"
    }

    /* - special_self_destruct - */

    env.ACTIONS.special_self_destruct.name = "" // Self Destruct
    env.ACTIONS.special_self_destruct.desc = "" // 'form shrapnel in body';'propel through unsustainable means'
    env.ACTIONS.special_self_destruct.help = "" // FOES::50% -1HP, 100% SELF -1HP
    env.ACTIONS.special_self_destruct.usage = {
        "act": "%USER ПРОСТО ВЗРЫВАЕТСЯ"
    }
    env.ACTIONS.special_self_destruct.details = {
        "flavor": "'form shrapnel in body';'propel through unsustainable means'",
        "onUse": "'HIT all foes';'[STAT::amt] to self'",
        "onHit": "'[STAT::amt]'"
    }

    /* - special_dullsummon - */

    env.ACTIONS.special_dullsummon.name = "" // Dull Portal
    env.ACTIONS.special_dullsummon.details = {
        "flavor": "'collect additional allies from elsewhere'",
        "conditional": "<em>SUMMON::</em>'summon 2 dull containers (max:7)'"
    }
    env.localization.page[page.dialoguePrefix].strings["%USER CONJURES CONTAINERS VIA THE DULL"] = ""

    /* - special_dullbuff - */

    env.ACTIONS.special_dullbuff.name = "" // Dull Overload
    env.ACTIONS.special_dullbuff.desc = "" // '
    env.ACTIONS.special_dullbuff.help = "" // ALLIES::+1T:DESTABILIZED, +1T:FOCUSED
    env.ACTIONS.special_dullbuff.usage = {
        "act": "%USER FLOODS THEIR ALLIES WITH DULL LIGHT"
    }
    env.ACTIONS.special_dullbuff.details = {
        "flavor": "'destabilize allies via dull exposure';'attain direct control and focus attack'",
        "onUse": "'[STATUS::destabilized] [STATUS::focused] to all allies'"
    }

    /* - special_chant - */

    env.ACTIONS.special_chant.name = "█████" // █████
    env.ACTIONS.special_chant.desc = "" // '██████ ███ █████';'convey malignant thoughtforms via speech'
    env.ACTIONS.special_chant.help = "" // FOES::80% -1HP, 30% x2 +1T:WEAKENED SUMMON::+1 HALLUCINATION (MAX:4)
    env.ACTIONS.special_chant.usage = {
        "act": "%USER ██████ ███ █████"
    }

    /* - incoherent_golemboss - */

    env.ACTIONS.incoherent_golemboss.name = "" // GOLEM BRAWL
    env.ACTIONS.incoherent_golemboss.desc = "" // MELEE FOE_KO::'-20HP' ALLY_KO::'-3HP'
    env.localization.page[page.dialoguePrefix].strings["%USER RAISES ITS GAUNTLETS"] = ""
    env.localization.page[page.dialoguePrefix].strings["IS STRUCK DOWN"] = ""
    env.localization.page[page.dialoguePrefix].strings["%TARGET IS HURT IN THE CHAOS"] = ""
    env.localization.page[page.dialoguePrefix].strings["%TARGET AND %USER ARE BOTH HURT IN THE CHAOS"] = ""
    env.localization.page[page.dialoguePrefix].strings[`keep fighting!!`] = ""
    env.localization.page[page.dialoguePrefix].strings[`you can do this`] = ""
    env.localization.page[page.dialoguePrefix].strings[`it is falling apart! just one more time!`] = ""

    /* - special_steerleft - */

    env.ACTIONS.special_steerleft.name = "" // Steer Left
    env.ACTIONS.special_steerleft.usage = {
        "act": "%USER STEERS THE VESSEL LEFT"
    }
    env.ACTIONS.special_steerleft.details = {
        "flavor": "'direct vessel to the left of current direction';'beware of momentum';'cannot exceed frame bounds'",
        "conditional": "<em>VESSEL</em>::STEER LEFT"
    }

    /* - special_steerright - */

    env.ACTIONS.special_steerright.name = "" // Steer Right
    env.ACTIONS.special_steerright.usage = {
        "act": "%USER STEERS THE VESSEL RIGHT"
    }
    env.ACTIONS.special_steerright.details = {
        "flavor": "'direct vessel to the right of current direction';'beware of momentum';'cannot exceed frame bounds'",
        "conditional": "<em>VESSEL</em>::STEER RIGHT"
    }

    /* - special_floorit - */

    env.ACTIONS.special_floorit.name = "" // Floor It
    env.ACTIONS.special_floorit.usage = {
        "act": "%USER FLOORS IT"
    }
    env.ACTIONS.special_floorit.details = {
        "flavor": "'direct vessel to move further instead of attacking'",
        "conditional": "<em>VESSEL</em>::GO FASTER"
    }

    /* - sidearm - */
    // --- DO NOT GENDER THIS - LOPER ACTION

    env.ACTIONS.sidearm.name = "" // Sidearm
    env.ACTIONS.sidearm.verb = "" // shoot
    env.ACTIONS.sidearm.usage = {
        "act": "%USER СТРЕЛЯЕТ В %ACC-TARGET",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "ВЫСТРЕЛ ПОПАДАЕТ ПО %DAT-TARGET",
        "miss": "%USER ПРОМАХИВАЕТСЯ"
    }
    env.ACTIONS.sidearm.details = {
        "flavor": "'utilize high-caliber sidearm';'chance for immense physical trauma'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - unfocused_shot - */
    // --- DO NOT GENDER THIS

    env.ACTIONS.unfocused_shot.name = "" // Hip Shot
    env.ACTIONS.unfocused_shot.verb = "" // shoot
    env.ACTIONS.unfocused_shot.usage = {
        "act": "%USER СТРЕЛЯЕТ В %ACC-TARGET",
        "crit": "%TARGET ПОЛУЧАЕТ БОЛЬШУЮ РАНУ",
        "hit": "ВЫСТРЕЛ ПОПАДАЕТ ПО %DAT-TARGET",
        "miss": "%USER ПРОМАХИВАЕТСЯ"
    }
    env.ACTIONS.unfocused_shot.details = {
        "flavor": "'fire without intense aim';'could hit';'a gamble'",
        "onHit": "'[STAT::amt]'"
    }

    /* - focused_shot - */
    // --- DO NOT GENDER THIS

    env.ACTIONS.focused_shot.name = "" // Focused Shot
    env.ACTIONS.focused_shot.verb = "" // shoot
    env.ACTIONS.focused_shot.usage = {
        "act": "%USER СТРЕЛЯЕТ В %ACC-TARGET",
        "crit": "%TARGET РАЗРЫВАЕТСЯ НА ЧАСТИ",
        "hit": "%TARGET ПОЛУЧАЕТ БОЛЬШУЮ РАНУ",
        "miss": "%USER ПРОМАХИВАЕТСЯ"
    }
    env.ACTIONS.focused_shot.details = {
        "flavor": "'well-placed high-caliber shot';'immense physical trauma'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::vulnerable] [STATUS::stun] [STATUS::critical_flaw]'"
    }

    /* - primary - */

    env.ACTIONS.primary.name = "" // Attack
    env.ACTIONS.primary.usage = {
        "act": "%USER ATTACKS %TARGET",
        "crit": "ПУГАЮЩИЙ УДАР",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.primary.details = {
        "flavor": "'improvised attack using scenery';'may accidentally cause effective trauma'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'inflict one of following';'[STATUS::puncture]';'[STATUS::weakened]';'[STATUS::vulnerable]'"
    }

    /* - secondary - */

    env.ACTIONS.secondary.name = "" // Daze
    env.ACTIONS.secondary.usage = {
        "act": "%USER LEAPS AT %TARGET",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.secondary.details = {
        "flavor": "'a crude and unpracticed strike';'attempt to disorient target'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - daze_lastresort - */

    env.ACTIONS.daze_lastresort.name = "" // Bash
    env.ACTIONS.daze_lastresort.usage = {
        "act": "%USER SWINGS AT %TARGET",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.daze_lastresort.details = {
        "flavor": "'last resort attack';'swing self'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - daze_good - */

    env.ACTIONS.daze_good.name = "" // Throw It
    env.ACTIONS.daze_good.verb = "" // throw at
    env.ACTIONS.daze_good.help = "" // 80% -1HP, 60%C x2 +1T:STUN
    env.ACTIONS.daze_good.usage = {
        "act": "%USER THROWS SOMETHING AT %TARGET",
        "crit": "%TARGET IS KNOCKED DOWN",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.daze_good.details = {
        "flavor": "'a spirited overhead throw';'likely to stun target with item weight'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - sacrifice - */

    env.ACTIONS.sacrifice.name = "" // Offering
    env.ACTIONS.sacrifice.usage = {
        "act": "%USER PREPARES FOR DESPERATE MEASURES"
    }
    env.ACTIONS.sacrifice.details = {
        "flavor": "'empowers next move greatly';'optionally use HP for revival'",
        "onUse": "'[STATUS::sacrifice] [STATUS::evasion]'"
    }

    /* - special_final_sacrifice - */

    env.ACTIONS.special_final_sacrifice.name = "" // Final Offering
    env.ACTIONS.special_final_sacrifice.usage = {
        "act": "%USER GOES IN A BLAZE OF GLORY"
    }
    env.ACTIONS.special_final_sacrifice.details = {
        "flavor": "'extend self beyond limits';'spend own health for total destruction'",
        "onUse": "'[STATUS::evasion] [STATUS::sacrifice]';'[STATUS::empowered] to all allies';'HIT all foes via SPECIAL'",
        "conditional": "<em>SPECIAL::</em>'reduce user HP to 1, dealing 200% lost HP as damage split over living foes (min:1)'"
    }

    /* - sacrifice_restore - */

    env.ACTIONS.sacrifice_restore.name = "" // Sacrifice
    env.ACTIONS.sacrifice_restore.verb = "" // sacrifice for
    env.ACTIONS.sacrifice_restore.usage = {
        "act": "%USER FIXES UP %TARGET",
        "crit": "%TARGET FEELS WAY BETTER",
        "hit": "%TARGET FEELS BETTER",
        "miss": "%TARGET IS TOO SLIPPERY"
    }
    env.ACTIONS.sacrifice_restore.details = {
        "flavor": "'consume health to restore target';'requires offering'",
        "onUse": "'[STAT::selfHP] to self'",
        "onHit": "'[STAT::amt] [STATUS::regen]'",
        "onCrit": "'additional [STAT::amt] [STATUS::regen]'",
        "conditional": "<em>VS DOWN::</em>'revive target';'[STATUS::evasion] [STATUS::regen]'"
    }

    /* - ichor_passive_restore - */

    env.ACTIONS.ichor_passive_restore.name = "" // Our Last Stand
    env.ACTIONS.ichor_passive_restore.usage = {
        "act": "%USER PULLS %TARGET BACK UP",
        "hit": "%TARGET HAS ONE MORE CHANCE"
    }
    env.ACTIONS.ichor_passive_restore.details = {
        "flavor": "'not over yet'",
        "onUse": "'revive target';'[STAT::amt] [STAT::amtBP] [STATUS::evasion] to target'"
    }

    /* - surge - */

    env.ACTIONS.surge.name = "" // Surge
    env.ACTIONS.surge.usage = {
        "act": "%USER IS ENERGIZED"
    }
    env.ACTIONS.surge.details = {
        onUse: () => `'[STATUS::focused] [STATUS::surge]'`,
        "flavor": "'charge forward without worry'"
    }
    env.ACTIONS.surge.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - wild_surge - */

    env.ACTIONS.wild_surge.name = "" // Wild Surge
    env.ACTIONS.wild_surge.usage = {
        "act": "%USER IS ENERGIZED"
    }
    env.ACTIONS.wild_surge.details = {
        "onUse": "'получить [STATUS::focused] [STATUS::wild_surge]'",
        "flavor": "'overexert self for extreme effectiveness';'next targeted action is used across entire team';'exertion causes short stun'"
    }
    env.ACTIONS.wild_surge.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - exploit - */

    env.ACTIONS.exploit.name = "" // Exploit
    env.ACTIONS.exploit.usage = {
        "act": "%USER REACHES TOWARDS %TARGET",
        "crit": "%TARGET FALLS APART",
        "hit": "%TARGET'S FLESH MELTS AWAY",
        "miss": "%TARGET RESISTS CONTROL"
    }
    env.ACTIONS.exploit.details = {
        "flavor": "'locate or take advantage of vulnerability in foe'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::vulnerable]'",
        "conditional": "<em>VS VULNERABLE::</em>'additional [STAT::amt]'"
    }

    /* - coordination - */

    env.ACTIONS.coordination.name = "" // Coordination
    env.ACTIONS.coordination.usage = {
        "act": "%USER CALLS OUT DIRECTIONS"
    }
    env.ACTIONS.coordination.details = {
        "flavor": "'back off';'guide entire team'",
        "onUse": "'[STATUS::evasion] to self';'[STATUS::focused] to all allies'"
    }
    env.ACTIONS.coordination.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - plot - */

    env.ACTIONS.plot.name = "" // Plan
    env.ACTIONS.plot.usage = {
        "act": "%USER WATCHES CAREFULLY"
    }
    env.ACTIONS.plot.details = {
        "flavor": "'hide vulnerability';'prepare great opportunity'",
        "onUse": "'[STATUS::evasion] [STATUS::focused]'"
    }
    env.ACTIONS.plot.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - special_enact - */

    env.ACTIONS.special_enact.name = "" // Enact
    env.ACTIONS.special_enact.verb = "" // enact upon
    env.ACTIONS.special_enact.details = {
        "flavor": "'enact plan';'unleash flurry of strikes upon foes'",
        "onUse": "'use primary action on random foes per T:[STATUS::evasion]';'lose all [STATUS::evasion]'"
    }
    env.localization.page[page.dialoguePrefix].strings["%USER LAUNCHES THEIR ATTACK"] = ""
    env.ACTIONS.special_enact.disableIf = (actor)=>{ if(!hasStatus(actor,"evasion")) return "REQUIRES EVASION" }

    /* - mad_claw - */

    env.ACTIONS.mad_claw.name = "" // Mad Claw
    env.ACTIONS.mad_claw.verb = "" // claw at
    env.ACTIONS.mad_claw.usage = {
        "act": "%USER ATTACKS %TARGET",
        "crit": "ПУГАЮЩИЙ УДАР",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.mad_claw.details = {
        "flavor": "'utilize unpredictable weaponry';'guarantee of trauma'",
        "onHit": "'[STAT::amt]';'inflict one of following';'[STATUS::destabilized]';'[STATUS::fear]';'[STATUS::stun]'"
    }

    /* - revise - */

    env.ACTIONS.revise.name = "" // Revise
    env.ACTIONS.revise.usage = {
        "act": "%USER GRASPS BEYOND %TARGET",
        "crit": "ПУГАЮЩИЙ УДАР",
        "hit": "%TARGET FEELS SOMETHING TORN AWAY",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.revise.details = {
        "flavor": "'strike at foes and grasp beyond flesh'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'<em>invert target's beneficial statuses</em>'"
    }

    /* - bone_break - */

    env.ACTIONS.bone_break.name = "" // Bone Break
    env.ACTIONS.bone_break.usage = {
        "act": "%USER JABS AT %TARGET'S WEAPONRY",
        "crit": "%TARGET IS CRIPPLED",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.bone_break.details = {
        "flavor": "'strike offensive appendages of target';'chance to briefly weaken attacks and disorient'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::weakened] [STATUS::stun]'"
    }

    /* - special_invite_storm - */

    env.ACTIONS.special_invite_storm.name = "" // Invite Storm
    env.ACTIONS.special_invite_storm.usage = {
        "act": "%USER SPEAKS MADNESS"
    }
    env.ACTIONS.special_invite_storm.details = {
        "flavor": "'reveal a terrible truth';'mark self for death'",
        "onUse": "'[STATUS::destabilized] [STATUS::vulnerable]';'HIT all foes'",
        "onHit": "'inflict one of following';'[STATUS::destabilized]';'[STATUS::fear]';'[STATUS::stun]'",
        "conditional": "<em>SPECIAL::</em>'5% chance to reduce foe HP by 75%'"
    }
    env.localization.page[page.dialoguePrefix].strings["PERISH"] = ""

    /* - special_invoke_madness - */

    env.ACTIONS.special_invoke_madness.name = "" // Invoke Madness
    env.ACTIONS.special_invoke_madness.usage = {
        "act": "%USER SPEAKS MADNESS"
    }
    env.ACTIONS.special_invoke_madness.details = {
        "flavor": "'impart horrific knowledge';'afflict foes with fear and madness'",
        "onUse": "'[STATUS::destabilized]';'HIT all foes'",
        "onHit": "'[STATUS::fear] [STATUS::madness]'",
        "conditional": "<em>SPECIAL::</em>'5% chance to reduce foe HP by 75%'"
    }

    /* - special_inversion - */

    env.ACTIONS.special_inversion.name = "" // Inversion
    env.ACTIONS.special_inversion.usage = {
        "act": "%USER PUSHES AGAINST THEIR REALITY"
    }
    env.ACTIONS.special_inversion.details = {
        "flavor": "'grasp the nature of this place';'recognize and exploit framing device'",
        "onUse": "'[STATUS::incoherent]';'invert all statuses currently in play'"
    }

    /* - attack_weak - */
    // --- DO NOT GENDER THIS

    env.ACTIONS.attack_weak.name = "" // Weak Attack
    env.ACTIONS.attack_weak.usage = {
        "act": "%USER АТАКУЕТ %ACC-TARGET",
        "hit": "ПОПАДАЕТ ПО %DAT-TARGET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.attack_weak.details = {
        "flavor": "'unskilled strike'",
        "onHit": "'[STAT::amt]'"
    }

    /* - enforce - */

    env.ACTIONS.enforce.name = "" // Enforcement
    env.ACTIONS.enforce.usage = {
        "act": "%USER ПРОНЗАЕТ %ACC-TARGET",
        "crit": "%USER JUST KEEPS GOING",
        "hit": "%TARGET ИСТЕКАЕТ СЛЯКОТНЫМ КОРРУ",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.enforce.details = {
        "flavor": "'relentless assault with positioning appendages';'may inspire additional smashing'",
        "onHit": "'[STAT::amt] [STATUS::puncture] [STATUS::open_wound]'",
        "onCrit": "'use this action again'"
    }

    /* - focused_guard - */

    env.ACTIONS.focused_guard.name = "" // Intervene
    env.ACTIONS.focused_guard.usage = {
        "act": "%USER STANDS BEFORE %TARGET",
        "hit": "%TARGET IS SHIELDED BY %USER"
    }
    env.ACTIONS.focused_guard.details = {
        "flavor": "'stand in the way of target';'intercept incoming attack';'prepare to deliver destructive assault'",
        "onUse": "'[STATUS::focused]';'[STATUS::redirection] to target'"
    }
    env.ACTIONS.focused_guard.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - spikes - */

    env.ACTIONS.spikes.name = "" // Spikes
    env.ACTIONS.spikes.usage = {
        "act": "%USER PREPARES TO TAKE A HIT"
    }
    env.ACTIONS.spikes.details = {
        "onUse": "'modify form defensively';'[STATUS::spikes]'"
    }
    env.ACTIONS.spikes.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - siphon - */

    env.ACTIONS.siphon.name = "" // Siphon
    env.ACTIONS.siphon.usage = {
        "act": "%USER GRASPS AT %TARGET",
        "crit": "%TARGET'S TEAM IS INFESTED",
        "hit": "%TARGET IS INFESTED",
        "miss": "%TARGET УВОРАЧИВАЕТСЯ"
    }
    env.ACTIONS.siphon.details = {
        "flavor": "'tap vital corru of target to sustain allies'",
        "onHit": "'[STATUS::siphon]'"
    }
    env.ACTIONS.siphon.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - bite - */

    env.ACTIONS.bite.name = "" // Bite
    env.ACTIONS.bite.usage = {
        "act": "%USER BITES %TARGET",
        "hit": "%TARGET FEELS HORRIBLE"
    }
    env.ACTIONS.bite.details = {
        "flavor": "'become unreasonable';'transfer illness'",
        "onHit": "'[STAT::amt] [STATUS::rot]';'tranafer accumulated rot to target'"
    }

    /* - empower - */

    env.ACTIONS.empower.name = "" // Empower
    env.ACTIONS.empower.usage = {
        "act": "%USER AFFIXES SOMETHING TO %TARGET",
        "hit": "%TARGET FEELS STRONGER",
        "miss": "%TARGET IS TOO SLIPPERY"
    }
    env.ACTIONS.empower.details = {
        "flavor": "'grant short-lived performance applicator';'fragile adaptive device'",
        "onHit": "'[STATUS::empowered]'"
    }
    env.ACTIONS.empower.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - distraction_weak - */

    env.ACTIONS.distraction_weak.name = "" // Distraction
    env.ACTIONS.distraction_weak.usage = {
        "act": "%USER FEINTS AND STRIKES %TARGET",
        "crit": "%USER'S ALLIES ARE INSPIRED",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УВОРАЧИВАЕТСЯ"
    }
    env.ACTIONS.distraction_weak.details = {
        "flavor": "'strike with clever feint';'may create distraction'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::evasion] to all allies'"
    }

    /* - lesser_wound - */

    env.ACTIONS.lesser_wound.name = "" // Wound
    env.ACTIONS.lesser_wound.usage = {
        "act": "%USER НАБРАСЫВАЕТСЯ НА %ACC-TARGET",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.lesser_wound.details = {
        "flavor": "'focused attack on vitals';'increase pain of target'",
        "onHit": "'[STAT::amt] [STATUS::open_wound]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - wound - */

    env.ACTIONS.wound.name = "" // Greater Wound
    env.ACTIONS.wound.usage = {
        "act": "%USER НАБРАСЫВАЕТСЯ НА %ACC-TARGET",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.wound.details = {
        "flavor": "'focused attack on vitals';'increase pain of target'",
        "onHit": "'[STAT::amt] [STATUS::open_wound]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - wound_lastresort - */
    // --- DO NOT GENDER THIS

    env.ACTIONS.wound_lastresort.name = "" // Greater Wound
    env.ACTIONS.wound_lastresort.usage = {
        "act": "%USER НАБРАСЫВАЕТСЯ НА %ACC-TARGET",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "ПОПАДАЕТ ПО %DAT-TARGET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.wound_lastresort.details = {
        "flavor": "'focused attack on vitals';'increase pain of target';'last resort attack'",
        "onHit": "'[STAT::amt] [STATUS::open_wound]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - special_barrier_allies_weak - */

    env.ACTIONS.special_barrier_allies_weak.name = "" // Quick Cover
    env.ACTIONS.special_barrier_allies_weak.usage = {
        "act": "%USER SHIELDS THEIR ALLIES"
    }
    env.ACTIONS.special_barrier_allies_weak.details = {
        "flavor": "'apply ablative protection'",
        onUse: () => `'[STAT::amtBP] to nearby allies'`,
    }
    env.ACTIONS.special_barrier_allies_weak.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" }

    /* - special_carapace_allies - */

    env.ACTIONS.special_carapace_allies.name = "" // Reinforce
    env.ACTIONS.special_carapace_allies.usage = {
        "act": "%USER ARMORS THEIR ALLIES"
    }
    env.ACTIONS.special_carapace_allies.details = {
        "flavor": "'adapt allies to incoming attacks'",
        "onUse": "'[STATUS::carapace] to all allies'"
    }

    /* - special_judgement - */

    env.ACTIONS.special_judgement.name = "" // Continuous Rewrite
    env.ACTIONS.special_judgement.usage = {
        "act": "%USER НАСТРАИВАЕТ ВОСПОМИНАНИЕ ПРОТИВ ВАС"
    }
    env.ACTIONS.special_judgement.details = {
        "flavor": "'utilize thoughtspace influence to empower massive strike'",
        "onUse": "'[STATUS::windup]';'HIT all foes'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::destabilized] [STATUS::fear]"
    }
    env.localization.page[page.dialoguePrefix].strings[`stays wound up!`] = ""

    /* - special_rule - */

    env.ACTIONS.special_rule.name = "" // Continuous Adjustment
    env.ACTIONS.special_rule.usage = {
        "act": "%USER SHIFTS THE BALANCE"
    }
    env.ACTIONS.special_rule.details = {
        "flavor": "'utilize status control to empower and repair team';'afflict opponents with critical vulnerability'",
        "conditional": "<em>SELF::'</em>[STATUS::windup]'\n<em>ALLIES::</em>'[STAT::amtBP] [STATUS::repairs] [STATUS::empowered]'\n<em>FOES::</em>'[STAT::amt] [STATUS::vulnerable] [STATUS::critical_flaw]'"
    }

    /* - special_chant_mega - */

    env.ACTIONS.special_chant_mega.name = "" // New Process
    env.ACTIONS.special_chant_mega.usage = {
        "act": "%USER DRAWS IN RESOURCES"
    }
    env.ACTIONS.special_chant_mega.details = {
        "flavor": "'remove resources from foes to create new daemon processes'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::weakened]'",
        "conditional": "<em>SUMMON::</em>'+1 hallucination (max:4)'"
    }

    /* - husk_attack_rot - */

    env.ACTIONS.husk_attack_rot.name = "" // Psychosis
    env.ACTIONS.husk_attack_rot.usage = {
        "act": "%USER STINGS %TARGET",
        "crit": "%TARGET BLEEDS A STRANGE COLOR",
        "hit": "%TARGET FEELS STRANGE",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.husk_attack_rot.details = {
        "flavor": "'inject memory with destructive thoughts';'eat away at foes from inside'",
        "onHit": "'[STAT::amt] [STATUS::rot]'",
        "onCrit": "'additional [STATUS::rot]';'[STATUS::fear] to all foes'"
    }

    /* - special_sillyspawn - */

    env.ACTIONS.special_sillyspawn.name = "" // Entertainment
    env.ACTIONS.special_sillyspawn.details = {
        "flavor": "'fetch actors from elsewhere to fight';'strength affected by tension'",
        "conditional": "<em>SUMMON::</em>'+1 random foe (max:6), +1 if user HP <50% max'"
    }
    env.localization.page[page.dialoguePrefix].strings["%USER CALLS ACTORS TO THE STAGE"] = ""

    /* - special_sillybuff - */

    env.ACTIONS.special_sillybuff.name = "" // Entertainment
    env.ACTIONS.special_sillybuff.desc = "" // 'destabilize allies';'attain direct control and focus attack'
    env.ACTIONS.special_sillybuff.help = "" // ALLIES::+1T:DESTABILIZED, +1T:FOCUSED
    env.ACTIONS.special_sillybuff.usage = {
        "act": "%USER RAISES THE STAKES"
    }
    env.ACTIONS.special_sillybuff.details = {
        "flavor": "'destabilize allies';'attain direct control and focus attack'",
        "onUse": "'[STATUS::destabilized] [STATUS::focused] to all allies'"
    }

    /* - special_wallspawn - */

    env.ACTIONS.special_wallspawn.name = "" // Antithesis
    env.ACTIONS.special_wallspawn.details = {
        "flavor": "'fetch actors from elsewhere to fight';'strength affected by tension'",
        "conditional": "<em>SUMMON::</em>'+2 random foes (max:6)'"
    }
        env.localization.page[page.dialoguePrefix].strings["%USER WEAKLY CALLS FOR HELP"] = ""

    /* - special_wallspawn_boat - */

    env.ACTIONS.special_wallspawn_boat.name = "" // Antithesis
    env.ACTIONS.special_wallspawn_boat.details = {
        "flavor": "'call daemons to assist'",
        "conditional": "<em>SUMMON::</em>'+2 daemons (max:6)'"
    }

    /* - boat_clw_windup - */

    env.ACTIONS.boat_clw_windup.name = "" // Dive
    env.ACTIONS.boat_clw_windup.desc = "" // 'prepare to go for the wheel'
    env.ACTIONS.boat_clw_windup.help = "" // +WINDUP
    env.ACTIONS.boat_clw_windup.usage = {
        "act": "%USER CLAWS AT THE CONTROLS!!"
    }
    env.localization.page[page.dialoguePrefix].strings["DONT LET THAT FC*K GET THE WHEEL"] = "НЕ ПУСКАЙТЕ ЭТГО У*БКА ЗА ШТУРВАЛ"
    env.localization.page[page.dialoguePrefix].strings["interloper! USE PISTOL!"] = "лазучик! СТРЕЛЯЙ!"

    /* - special_boat_clw_grab - */

    env.ACTIONS.special_boat_clw_grab.name = "" // Grab Wheel
    env.ACTIONS.special_boat_clw_grab.desc = "" // 'direct vessel in random direction'
    env.ACTIONS.special_boat_clw_grab.help = "" // VESSEL::RANDOM MOVEMENT
    env.localization.page[page.dialoguePrefix].strings["%USER GRABS THE WHEEL AND STEERS LEFT"] = "%USER ХВАТАЕТ ШТУРВАЛ И ПОВОРАЧИВАЕТ НАЛЕВО"
    env.localization.page[page.dialoguePrefix].strings["%USER GRABS THE WHEEL AND STEERS RIGHT"] = "%USER ХВАТАЕТ ШТУРВАЛ И ПОВОРАЧИВАЕТ НАПРАВО"
    env.localization.page[page.dialoguePrefix].strings[`%USER FORCES THE BOAT FORWARDS`] = "%USER НАПРАВЛЯЕТ ЛОДКУ ВПЕРЁД"

    /* - special_boat_waveattack - */

    env.ACTIONS.special_boat_waveattack.name = "" // Grab Wheel
    env.ACTIONS.special_boat_waveattack.desc = "" // 'direct vessel in random direction'
    env.ACTIONS.special_boat_waveattack.help = "" // VESSEL::RANDOM MOVEMENT
    env.localization.page[page.dialoguePrefix].strings[`%USER CREATES TURBULENCE!!`] = ""
    env.localization.page[page.dialoguePrefix].strings[`%USER REWRITES THE OCEAN...`] = ""

    /* - special_malware_drill - */

    env.ACTIONS.special_malware_drill.name = "" // CMD::DRILL
    env.ACTIONS.special_malware_drill.usage = {
        "act": "THE THOUGHTSPACE FEELS FLIMSY"
    }
    env.ACTIONS.special_malware_drill.details = {
        "flavor": "'alters framing structure'",
        "onUse": "'[STATUS::malware_drill] to all actors'"
    }

    /* - special_malware_rot - */

    env.ACTIONS.special_malware_rot.name = "" // CMD::ROT
    env.ACTIONS.special_malware_rot.usage = {
        "act": "THE THOUGHTSPACE WRITHES"
    }
    env.ACTIONS.special_malware_rot.details = {
        "flavor": "'alters framing structure'",
        "onUse": "'[STATUS::malware_rot] to all actors'"
    }

    /* - special_malware_rewrite - */

    env.ACTIONS.special_malware_rewrite.name = "" // CMD::REWRITE
    env.ACTIONS.special_malware_rewrite.desc = "" // 'invert negative statuses of allies';'invert positive statuses of foes'
    env.ACTIONS.special_malware_rewrite.help = "" // ALL::CONDITIONAL STATUS INVERSION
    env.ACTIONS.special_malware_rewrite.usage = {
        "act": "THE THOUGHTSPACE SEEMS BRIGHTER"
    }
    env.ACTIONS.special_malware_rewrite.details = {
        "flavor": "'alters framing structure'",
        "onUse": "'invert all beneficial statuses of foes';'invert all negative statuses of allies'"
    }

    /* - special_malware_empower - */

    env.ACTIONS.special_malware_empower.name = "" // CMD::EMPOWER
    env.ACTIONS.special_malware_empower.desc = "" // 'imbue allies with empowering thoughts'
    env.ACTIONS.special_malware_empower.help = "" // ALLIES::+3T:EMPOWERED +1T:FOCUSED +1T:EVASION
    env.ACTIONS.special_malware_empower.usage = {
        "act": "THE THOUGHTSPACE COWERS BEFORE YOU"
    }
    env.ACTIONS.special_malware_empower.details = {
        "flavor": "'alters framing structure'",
        "onUse": "'[STATUS::empowered] [STATUS::focused] [STATUS::evasion] to all allies'"
    }

    /* - intrusive_smash - */

    env.ACTIONS.intrusive_smash.name = "" // Unnatural Strike
    env.ACTIONS.intrusive_smash.help = "" // 100% -4HP, 40% X2 +1T:STUN +2T:OPEN WOUND +3T:VULNERABLE +CRITICAL FLAW
    env.ACTIONS.intrusive_smash.usage = {
        "act": "%USER НАБРАСЫВАЕТСЯ НА %ACC-TARGET",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.intrusive_smash.details = {
        "flavor": "'focused, deadly attack upon one target';'immense physical trauma'",
        "onHit": "'[STAT::amt] [STATUS::stun] [STATUS::open_wound] [STATUS::vulnerable] [STATUS::critical_flaw]'"
    }

    /* - special_intrusive - */

    env.ACTIONS.special_intrusive.name = "" // Intrude
    env.ACTIONS.special_intrusive.usage = {
        "act": "A GRIM GAMBLE IS MADE"
    }
    env.ACTIONS.special_intrusive.details = {
        "flavor": "'â«§âª¶ã¥¥ã³'",
        "onUse": "'SSP IN  THE WHEE L LL LL'"
    }
    env.localization.page[page.dialoguePrefix].strings["LUCKY! CHA CHA"] = ""
    env.localization.page[page.dialoguePrefix].strings["BAD TIM!::E NO,W!"] = ""
    env.localization.page[page.dialoguePrefix].strings["BOOM :=)"] = ""
    env.localization.page[page.dialoguePrefix].strings["THINK AGAIN"] = ""

    /* - special_intrusive_ally - */

    env.ACTIONS.special_intrusive_ally.name = "" // Gamble
    env.ACTIONS.special_intrusive_ally.usage = {
        "act": "A GRIM GAMBLE IS MADE"
    }
    env.ACTIONS.special_intrusive_ally.details = {
        "flavor": "'â«§âª¶ã¥¥ã³'",
        "onUse": "'SSP IN  THE WHEE L LL LL'"
    }

    /* - detonate - */

    env.ACTIONS.detonate.name = "" // Detonate
    env.ACTIONS.detonate.usage = {
        "act": "%USER EXPLODES NEAR %TARGET",
        "hit": "%TARGET IS DESTROYED"
    }
    env.ACTIONS.detonate.details = {
        "flavor": "'detonate to instantly destroy target'",
        "onHit": "'[STAT::amt]';'DOWN SELF'",
        "conditional": "<em>ONCE PER COMBAT</em>"
    }
    env.ACTIONS.detonate.disableIf = (actor)=>{ if(actor.detonated) return "ONCE PER COMBAT" }

    /* - incoherent_mimic - */

    env.ACTIONS.incoherent_mimic.name = "" // Mimic
    env.ACTIONS.incoherent_mimic.usage = {
        "act": "%USER MIMICS %TARGET",
        "hit": "%TARGET IS FLATTERED"
    }
    env.ACTIONS.incoherent_mimic.details = {
        "onUse": "'copy actions of target';'persists after combat';'some actions cannot be mimicked'"
    }
    env.localization.page[page.dialoguePrefix].strings["MIMIC FAILED!"] = ""
    env.localization.page[page.dialoguePrefix].strings["MIMIC SUCCESS!"] = ""

    /* - bomb_plant - */

    env.ACTIONS.bomb_plant.name = "" // Plant
    env.ACTIONS.bomb_plant.usage = {
        "act": "%USER ATTACHES SOMETHING TO %TARGET",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.bomb_plant.details = {
        "flavor": "'utilize explosives at close range';'but safely'",
        "onUse": "'[STATUS::bomb_planted] to target';'utilize TRIGGER to detonate and HIT actors within radius'",
        "onHit": "'[STAT::amt] [STATUS::stun] [STATUS::puncture] [STAT::kb] from explosive host'",
        "conditional": "<em>VS DESTRUCTIBLE</em>::'additional [STAT::megaHP]';'hits large targets multiple times'\\n<em>VS PLANTED</em>::'increase radius'"
    }

    /* - special_bomb_detonate - */

    env.ACTIONS.special_bomb_detonate.name = "" // Trigger
    env.ACTIONS.special_bomb_detonate.usage = {
        "act": "%USER DETONATES THE CHARGE!",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.special_bomb_detonate.details = {
        "flavor": "'utilize explosives at close range';'but safely'",
        "onUse": "'[STATUS::bomb_planted] to target';'utilize TRIGGER to detonate and HIT actors within radius'",
        "onHit": "'[STAT::amt] [STATUS::stun] [STATUS::puncture] [STAT::kb] from explosive host'",
        "conditional": "<em>VS DESTRUCTIBLE</em>::'additional [STAT::megaHP]';'hits large targets multiple times'\\n<em>VS PLANTED</em>::'increase radius'"
    }
    env.ACTIONS.special_bomb_detonate.disableIf = (actor)=>{ if(!actor?.trackedBombs?.size) return "NO ACTIVE CHARGES" }

    /* - special_bomb_detonate_victim - */

    env.ACTIONS.special_bomb_detonate_victim.name = "" // Exploding
    env.ACTIONS.special_bomb_detonate_victim.usage = {
        "act": "%USER EXPLODES",
        "crit": "%TARGET EXPLODES",
        "hit": "%TARGET IS CAUGHT IN THE EXPLOSION",
        "miss": "%TARGET УВОРАЧИВАЕТСЯ"
    }
    env.ACTIONS.special_bomb_detonate_victim.details = {
        "onUse": "'explode'"
    }
    env.localization.page[page.dialoguePrefix].strings["`%TARGET seems weaker..."] = ""

    /* - scene_evade - */

    env.ACTIONS.scene_evade.name = "" // Dash
    env.ACTIONS.scene_evade.usage = {
        "act": "%USER LOOKS FOR AN OPENING"
    }
    env.ACTIONS.scene_evade.details = {
        onUse: () => `'[STATUS::focused] [STATUS::evasion]';'move to target location';'select current tile to avoid movement'`,
        "flavor": "'move quickly';'deliberate on the moment and its opportunities'"
    }

    /* - scene_akizet_attack - */

    env.ACTIONS.scene_akizet_attack.name = "" // Overwhelm
    env.ACTIONS.scene_akizet_attack.usage = {
        "act": "%USER CHARGES",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.scene_akizet_attack.details = {
        "flavor": "'a bold assault';'chance for immense physical trauma'",
        "onUse": "'move to location';'assault targets ahead'",
        "onHit": "'[STAT::rangeHP] [STAT::kb]';'increased by 1 per tile traversed'",
        "onCrit": "'[STATUS::stun]'",
        "conditional": "<em>NOTICE::</em>'hits allies';'exercise caution"
    }

    /* - scene_frenzy - */

    env.ACTIONS.scene_frenzy.name = "" // Frenzy
    env.ACTIONS.scene_frenzy.usage = {
        "act": "%USER ПРОНЗАЕТ %ACC-TARGET",
        "crit": "%USER JUST KEEPS GOING",
        "hit": "%TARGET ИСТЕКАЕТ СЛЯКОТНЫМ КОРРУ",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.scene_frenzy.details = {
        "flavor": "'puncture vital cystic component';'may inspire additional stabbing'",
        "onHit": "'[STAT::amt] [STATUS::puncture]';'100% base crit on first hit'",
        "onCrit": "'use this action again on random foe in range'"
    }

    /* - scene_gakvu_attack - */

    env.ACTIONS.scene_gakvu_attack.name = "" // Scramble
    env.ACTIONS.scene_gakvu_attack.usage = {
        "act": "%USER TWISTS THE OVERLAP"
    }
    env.ACTIONS.scene_gakvu_attack.details = {
        "flavor": "'disrupt multiple targets with enhanced groundsmindry';'more illegal than before'",
        "onUse": "'create persistent area effect';'HIT foes who end turn within';'HIT foes who are knocked within'",
        "onHit": "'[STAT::amt]'",
        "onCrit": "'[STATUS::vulnerable]'"
    }

    /* - scene_parasite - */

    env.ACTIONS.scene_parasite.name = "" // Parasite
    env.ACTIONS.scene_parasite.verb = "" // parasitize
    env.ACTIONS.scene_parasite.usage = {
        "act": "%USER GRASPS AT %TARGET",
        "crit": "%TARGET IS INFESTED",
        "hit": "%TARGET IS INFESTED",
        "miss": "%TARGET УВОРАЧИВАЕТСЯ"
    }
    env.ACTIONS.scene_parasite.details = {
        onHit: () => "'[STAT::amt] [STATUS::siphon]'",
        onCrit: () => "'infest nearby foes with [STATUS::siphon]'",
        "flavor": "'utilize modified repair tool';'tap vital corru of foes to sustain allies'"
    }

    /* - scene_mend - */

    env.ACTIONS.scene_mend.name = "" // Urgent Mend
    env.ACTIONS.scene_mend.usage = {
        "act": "%USER RUSHES TO HELP",
        "crit": "%TARGET FEELS WAY BETTER",
        "hit": "%TARGET FEELS BETTER"
    }
    env.ACTIONS.scene_mend.details = {
        "flavor": "'mend allies through use of enhanced tools';'often inspiring'",
        "onUse": "'move to location';'HIT allies around target tile'",
        "onHit": "'[STAT::amt] [STATUS::regen]'",
        "onCrit": "'[STATUS::focused]'"
    }

    /* - scene_spy - */

    env.ACTIONS.scene_spy.name = "" // Observe
    env.ACTIONS.scene_spy.usage = {
        "act": "%USER PROVIDES OPPORTUNITY"
    }
    env.ACTIONS.scene_spy.details = {
        "flavor": "'utilize enhanced spatial awareness';'rapidly analyze local opportunities'",
        "onUse": "'create persisting area of observation';'inflict statuses on creation and turn end'",
        "conditional": "<em>VS FOE::</em>'inflict [STATUS::vulnerable]'\\n<em>VS ALLY::</em>'inflict [STATUS::focused]'"
    }

    /* - scene_bozko_attack - */

    env.ACTIONS.scene_bozko_attack.name = "" // Throw Punch
    env.ACTIONS.scene_bozko_attack.verb = "" // jab at
    env.ACTIONS.scene_bozko_attack.usage = {
        "act": "%USER SWINGS",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.scene_bozko_attack.details = {
        "flavor": "'strike with full momentum';'shatter offensive appendages'",
        "onUse": "'move to location';'HIT up to 2 foes ahead'",
        "onHit": "'[STAT::amt] [STATUS::weakened] [STAT::kb]",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - scene_guard - */

    env.ACTIONS.scene_guard.name = "" // Protect
    env.ACTIONS.scene_guard.usage = {
        "act": "%USER STANDS GUARD"
    }
    env.ACTIONS.scene_guard.details = {
        "onUse": "'получить [STATUS::carapace] [STATUS::spikes]';'create area of safety'",
        "onHit": "'grant allies within effect [STATUS::redirection]';'remove [STATUS::vulnerable]'"
    }

    /* - scene_pull - */

    env.ACTIONS.scene_pull.name = "" // Pull
    env.ACTIONS.scene_pull.usage = {
        "act": "%USER GRABS AT %TARGET",
        "hit": "%TARGET IS PULLED",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.scene_pull.details = {
        onHit: ()=> `'[STAT::kb] towards current location';'increased by 1 per tile distance'`,
        conditional: () => "<em>VS ALLY</em>::'guaranteed hit'</em>\n<em>NOTICE</em>::'align in cardinal direction with target for accurate result'",
    }

    /* - scene_cavik_attack - */

    env.ACTIONS.scene_cavik_attack.name = "" // IED
    env.ACTIONS.scene_cavik_attack.verb = "" // throw at
    env.ACTIONS.scene_cavik_attack.usage = {
        "act": "%USER THROWS A WEIRD CYST AT %TARGET",
        "crit": "%TARGET EXPLODES",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УВОРАЧИВАЕТСЯ"
    }
    env.ACTIONS.scene_cavik_attack.details = {
        "flavor": "'utilize micro-explosive rapidly formed from scavenged dull organs'",
        "onHit": "'[STAT::amt] [STAT::kb] from selected tile'",
        "onCrit": "'[STATUS::puncture]'",
        "conditional": "<em>NOTICE::</em>'hits allies';'exercise caution\\n<em>SPECIAL</em>::'if no targets in range, remains on ground';'detonates before next turn'"
    }

    /* - scene_miltza_attack - */

    env.ACTIONS.scene_miltza_attack.name = "" // Guide Drone
    env.ACTIONS.scene_miltza_attack.verb = "" // strike
    env.ACTIONS.scene_miltza_attack.usage = {
        "act": "%USER guides a small drone to %TARGET!"
    }
    env.ACTIONS.scene_miltza_attack.details = {
        "flavor": "'utilize short range drone to support or suppress target'",
        "onUse": "'[STATUS::drone_haunt] to target ally or foe'",
        "conditional": "<em>VS FOE</em>::'[STAT::amt] to host and nearby [STATUS::vulnerable] foes'\\n<em>VS ALLY</em>::'50% chance for [STATUS::evasion] to host and nearby allies'"
    }

    /* - scene_dullflare - */

    env.ACTIONS.scene_dullflare.name = "" // Dull Flare
    env.ACTIONS.scene_dullflare.verb = "" // blast
    env.ACTIONS.scene_dullflare.usage = {
        "act": "%USER TEARS OPEN THE DULL",
        "crit": "%TARGET IS ANNIHILATED",
        "hit": "%TARGET IS SEARED",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.scene_dullflare.details = {
        "flavor": "'wide directional release of rapidly decaying dull light';'deconstructs foes'",
        "onHit": "[STAT::amt] KB::2'"
    }

    /* - scene_kavruka - */

    env.ACTIONS.scene_kavruka.name = "" // Explosive
    env.ACTIONS.scene_kavruka.verb = "" // throw at
    env.ACTIONS.scene_kavruka.usage = {
        "act": "%USER THROWS A WEIRD CYST AT %TARGET",
        "crit": "%TARGET EXPLODES",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УВОРАЧИВАЕТСЯ"
    }
    env.ACTIONS.scene_kavruka.details = {
        "flavor": "'utilize deconstruction tool offensively';'may disorient those nearby'",
        "onHit": "'[STAT::amt] [STAT::kb] from selected tile'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - scene_satik - */

    env.ACTIONS.scene_satik.name = "" // Emergency Break
    env.ACTIONS.scene_satik.verb = "" // throw at
    env.ACTIONS.scene_satik.usage = {
        "act": "%USER THROWS A WEIRD CYST AT %TARGET",
        "crit": "%TARGET EXPLODES",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УВОРАЧИВАЕТСЯ"
    }
    env.ACTIONS.scene_satik.details = {
        "flavor": "'break satik shell due to emergency';'release many small ablative barrier applicators'",
        "onHit": "'[STAT::amtBP] to allies'"
    }

    /* - scene_arm_rifle - */

    env.ACTIONS.scene_arm_rifle.name = "" // LOCK N LOAD
    env.ACTIONS.scene_arm_rifle.usage = {
        "act": "%USER wields the symbiotic rifle!"
    }
    env.ACTIONS.scene_arm_rifle.details = {
        "flavor": "'prepare to use symbiotic rifle'",
        "onUse": "'[STATUS::rifle_bearer]'",
        "conditional": "<em>SLUDGE VOLLEY</em>::\\n<em>USE</em>::'[STAT::selfHP] to self';'prepare wide projectile attack in specified direction';'fires on start of next turn'\\n<em>HIT</em>::'[STAT::amt] [STAT::kb] [STATUS::vulnerable] [STATUS::puncture]'"
    }

    /* - scene_rifle - */

    env.ACTIONS.scene_rifle.name = "" // Sludge Volley
    env.ACTIONS.scene_rifle.usage = {
        "act": "%USER prepares to fire..."
    }
    env.ACTIONS.scene_rifle.details = {
        "flavor": "'utilize symbiotic rifle';'draw from self for munitions'",
        "onUse": "'[STAT::selfHP] to self';'prepare wide projectile attack in specified direction';'fires on start of next turn'",
        "onHit": "'[STAT::amt] [STAT::kb] [STATUS::vulnerable] [STATUS::puncture]'"
    }
    env.ACTIONS.scene_rifle.disableIf = (actor)=>{ if(actor.hp < 3 && actor.bp < 2) return "HP TOO LOW" },

    /* - arch_whelm - */

    env.ACTIONS.arch_whelm.name = "" // Formless Swipe
    env.ACTIONS.arch_whelm.usage = {
        "act": "%USER CHARGES AT %TARGET",
        "crit": "%TARGET IS KNOCKED BACK",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }

    /* - special_arch_support - */

    env.ACTIONS.special_arch_support.name = "" // Coil
    env.localization.page[page.dialoguePrefix].strings["%USER coils around %TARGET!"] = ""
    env.localization.page[page.dialoguePrefix].strings["%USER lashes out at %TARGET!"] = ""

    /* - special_arch_harasser_stab - */

    env.ACTIONS.special_arch_harasser_stab.name = "" // Flicker Stab
    env.localization.page[page.dialoguePrefix].strings["%USER prepares to strike %TARGET"] = ""

    /* - arch_harasser_stab - */

    env.ACTIONS.arch_harasser_stab.name = "" // stab
    env.ACTIONS.arch_harasser_stab.usage = {
        "act": "%USER flickers towards %TARGET",
        "crit": "%TARGET IS EVISCERATED",
        "hit": "%TARGET ИСТЕКАЕТ СЛЯКОТНЫМ КОРРУ",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.localization.page[page.dialoguePrefix].strings["%USER flickers towards %TARGET"] = ""
    env.localization.page[page.dialoguePrefix].strings["%USER is thrown off balance by their miss!"] = ""

    /* - arch_punch - */

    env.ACTIONS.arch_punch.name = "" // Big Punch
    env.ACTIONS.arch_punch.usage = {
        "act": "%USER SWINGS AT %TARGET",
        "crit": "%TARGET IS KNOCKED BACK",
        "hit": "%TARGET STAGGERS BACK",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.localization.page[page.dialoguePrefix].strings["%TARGET is stunned by the impact!"] = ""

    /* - arch_bomb - */

    env.ACTIONS.arch_bomb.name = "" // Dullbomb
    env.ACTIONS.arch_bomb.verb = "" // throw at
    env.ACTIONS.arch_bomb.usage = {
        "act": "%USER WARPS THE GROUND OMINOUSLY"
    }
    env.ACTIONS.arch_bomb.aoe.effect =  ({user, tiles, selectedTile}) => {
        let effect = env.rpg.grid.createTileEffect({
            tiles, 
            effect: "telegraph", 
            length: 1,
            origin: user,
            telegraphAnim: "telegraph",
            telegraphFor: "arch_bomb_hit",
            specialClass: "iedtime",
            specialName: "Patient Bomb",
            specialHelp: "Detonates for -1HP & KB::2 on next origin turn",
            originTile: selectedTile
        })
    }

    /* - arch_bomb_hit - */

    env.ACTIONS.arch_bomb_hit.name = "" // IED
    env.ACTIONS.arch_bomb_hit.verb = "" // throw at
    env.ACTIONS.arch_bomb_hit.usage = {
        "act": "AN EXPLOSIVE DETONATES!",
        "crit": "%TARGET EXPLODES",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УВОРАЧИВАЕТСЯ"
    }
    env.ACTIONS.arch_bomb_hit.details = {
        "onHit": "'[STAT::amt] [STAT::kb] from selected tile'",
        "onCrit": "'[STATUS::puncture]'",
        "conditional": "<em>NOTICE::</em>'hits allies';'exercise caution\\n<em>SPECIAL</em>::'if no targets in range, remains on ground';'detonates before next turn'"
    }

    /* - special_arch_tele_channel - */

    env.ACTIONS.special_arch_tele_channel.name = "" // Channel
    env.ACTIONS.special_arch_tele_channel.usage = {
        "act": "%USER BENDS THE OVERLAP"
    }
    env.localization.page[page.dialoguePrefix].strings["%TARGET feels watched..."] = ""
    env.localization.page[page.dialoguePrefix].strings["%TARGET's skin writhes"] = ""

    /* - arch_tele_sweep - */

    env.ACTIONS.arch_tele_sweep.name = "" // Formless Swipe
    env.ACTIONS.arch_tele_sweep.usage = {
        "act": "%USER RUSHES TOWARDS %TARGET"
    }

    /* - tele_arch_hulk_rampage - */

    env.ACTIONS.tele_arch_hulk_rampage.name = "" // Formless Swipe
    env.ACTIONS.tele_arch_hulk_rampage.usage = {
        "act": "%USER PREPARES TO CHARGE AT %TARGET"
    }
    env.localization.page[page.dialoguePrefix].strings["%USER charges towards %TARGET!"] = ""

    /* - arch_hulk_rampage - */

    env.ACTIONS.arch_hulk_rampage.name = "" // Wild Strike
    env.ACTIONS.arch_hulk_rampage.usage = {
        "act": "%USER CHARGES!",
        "crit": "%TARGET IS KNOCKED BACK",
        "hit": "%TARGET STAGGERS BACK",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }

    /* - arch_pull - */

    env.ACTIONS.arch_pull.name = "" // Pull
    env.ACTIONS.arch_pull.usage = {
        "act": "%USER GRABS AT %TARGET",
        "hit": "%TARGET IS PULLED",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }

    /* - special_archivist - */

    env.ACTIONS.special_archivist.name = "" // Manipulate
    // ---- ujcgjlb господи. вернуться к жттому тут ссаные эффекты
    env.localization.page[page.dialoguePrefix].strings["the air shimmers ominously"] = ""
    env.localization.page[page.dialoguePrefix].strings["%TARGET is briefly empowered by %USER!"] = ""
    env.localization.page[page.dialoguePrefix].strings["more golem-like shapes appear..."] = ""

    /* - tele_archivist_rampage - */

    env.ACTIONS.tele_archivist_rampage.name = "" // Last Invitation
    env.ACTIONS.tele_archivist_rampage.usage = {
        "act": "%USER PREPARES TO CHARGE AT %TARGET"
    }

    /* - archivist_charge - */

    env.ACTIONS.archivist_charge.name = "" // Desperate Charge
    env.ACTIONS.archivist_charge.usage = {
        "act": "%USER STRIKES %TARGET",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }

    /* - miltza_charge - */

    env.ACTIONS.miltza_charge.name = "" // Desperate Charge
    env.ACTIONS.miltza_charge.usage = {
        "act": "%USER STRIKES %TARGET",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }

    /* - spine_golem_lunge - */

    env.ACTIONS.spine_golem_lunge.name = "" // Ethereal Lunge
    env.ACTIONS.spine_golem_lunge.usage = {
        "act": "%USER LUNGES AT %TARGET",
        "crit": "%TARGET IS THROWN AWAY",
        "hit": "%TARGET IS KNOCKED BACK",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }

    /* - special_tele_splitbeam - */

    env.ACTIONS.special_tele_splitbeam.name = "" // Eyebeam
    env.ACTIONS.special_tele_splitbeam.usage = {
        "act": "the ground shimmers ominously..."
    }

    /* - splitbeam_hit - */

    env.ACTIONS.splitbeam_hit.name = "" // splitbeam
    env.ACTIONS.splitbeam_hit.usage = {
        "act": "the space writhes with hostility!"
    }

    /* - special_heartwall - */

    env.ACTIONS.special_heartwall.name = "" // Flood
    env.ACTIONS.special_heartwall.usage = {
        "act": "formless shapes emerge from the tendril!"
    }

    /* - tele_dullflare_evil - */

    env.ACTIONS.tele_dullflare_evil.name = "" // Dull Combo
    env.ACTIONS.tele_dullflare_evil.verb = "" // blast
    env.ACTIONS.tele_dullflare_evil.usage = {
        "act": "%USER SWINGS AT %TARGET",
        "crit": "%TARGET IS STAGGERED",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    // --- u[[ 'эффекты]]
    env.localization.page[page.dialoguePrefix].strings["%USER fires a destabilizing sphere!"] = ""

    /* - scene_dullflare_evil - */

    env.ACTIONS.scene_dullflare_evil.name = "" // Dull Flare
    env.ACTIONS.scene_dullflare_evil.verb = "" // blast
    env.ACTIONS.scene_dullflare_evil.usage = {
        "act": "%USER TEARS OPEN THE DULL",
        "crit": "%TARGET IS ANNIHILATED",
        "hit": "%TARGET IS SEARED",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.scene_dullflare_evil.details = {
        onHit: ()=> `'wide directional release of rapidly decaying dull light';'inflicts [STAT::amt]';'KB::2'`
    }
    env.localization.page[page.dialoguePrefix].strings["The golem's blast is diminished across multiple targets..."] = ""

    /* - scene_kivii_grasp - */

    env.ACTIONS.scene_kivii_grasp.name = "" // Grasp
    env.ACTIONS.scene_kivii_grasp.usage = {
        "act": "%USER GRABS AT %TARGET",
        "crit": "%TARGET IS THROWN",
        "hit": "%TARGET IS CRUSHED",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }

    /* - tele_kivii_grasp - */

    env.ACTIONS.tele_kivii_grasp.name = "" // Target
    env.ACTIONS.tele_kivii_grasp.usage = {
        "act": "%TARGET FEELS A LOOMING THREAT"
    }
    // --- эффекьы
    env.localization.page[page.dialoguePrefix].strings["%USER focuses, but is left open..."] = ""

    /* - special_tele_itzil - */

    env.ACTIONS.special_tele_itzil.name = "" // Huge Pulse
    env.ACTIONS.special_tele_itzil.usage = {
        "act": "%USER's gauntlets glow brightly..."
    }
    // --- эффекьы

    /* - special_tele_kivii - */

    env.ACTIONS.special_tele_kivii.name = "" // Multislam
    env.ACTIONS.special_tele_kivii.usage = {
        "act": "%USER readies two claws..."
    }
    // --- эффекьы

    /* - scene_kivii_smash - */

    env.ACTIONS.scene_kivii_smash.name = "" // Assault
    env.ACTIONS.scene_kivii_smash.usage = {
        "act": "%USER SMASHES %TARGET",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }

    /* - special_itzka - */

    env.ACTIONS.special_itzka.name = "" // Overlap Collapse
    env.ACTIONS.special_itzka.usage = {
        "act": "The overlap bends inwards!!"
    }
    env.localization.page[page.dialoguePrefix].strings["velzie's stage grows smaller..."] = ""

    /* - scene_bozko_attack_desperation - */

    env.ACTIONS.scene_bozko_attack_desperation.name = "" // Sweep
    env.ACTIONS.scene_bozko_attack_desperation.verb = "" // swing at
    env.ACTIONS.scene_bozko_attack_desperation.usage = {
        "act": "%USER SWINGS",
        "crit": "%TARGET IS THROWN AWAY",
        "hit": "%TARGET IS STAGGERED",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.scene_bozko_attack_desperation.details = {
        "flavor": "'strike with full momentum';'shatter offensive appendages'",
        "onUse": "'move to location';'HIT foes in wide area ahead'",
        "onHit": "'[STAT::amt] [STATUS::weakened] [STAT::kb]",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - scene_cavik_attack_desperation - */

    env.ACTIONS.scene_cavik_attack_desperation.name = "" // Dull Beam
    env.ACTIONS.scene_cavik_attack_desperation.usage = {
        "act": "%USER prepares to fire..."
    }
    env.ACTIONS.scene_cavik_attack_desperation.details = {
        "flavor": "'utilize modified and twisted dull golem claw';'fire wave of destabilizing dull light after delay'",
        "onUse": "'prepare attack in specified direction';'fires on start of next turn'",
        "onHit": "'[STAT::amt] [STAT::kb] [STATUS::destabilized]'"
    }

    // --- эффекты

    /* - scene_gakvu_attack_desperation - */

    env.ACTIONS.scene_gakvu_attack_desperation.name = "" // Scramble
    env.ACTIONS.scene_gakvu_attack_desperation.usage = {
        "act": "%USER TWISTS THE OVERLAP"
    }
    env.ACTIONS.scene_gakvu_attack_desperation.details = {
        "flavor": "disrupt overlap with groundsmindry",
        "onUse": "'create persistent area effect';'HIT foes who enter or are knocked within'",
        "onHit": "'distort corrucystic flesh for [STAT::amt]'",
        "onCrit": "'reveal weakness';'inflict [STATUS::vulnerable]'"
    }

    /* - tele_tendril_swipe - */

    env.ACTIONS.tele_tendril_swipe.name = "" // swipe
    env.ACTIONS.tele_tendril_swipe.usage = {
        "act": "%USER rears back..."
    }

    /* - special_tendril_slam - */

    env.ACTIONS.special_tendril_slam.name = "" // Tendril Slam
    env.ACTIONS.special_tendril_slam.usage = {
        "act": "%USER stretches up into the overlap..."
    }

    /* - special_wall_undulate - */

    env.ACTIONS.special_wall_undulate.name = "" // undulate
    env.ACTIONS.special_wall_undulate.usage = {
        "act": "%USER splits off offensive limbs..."
    }

    /* - special_tele_golemblast - */

    env.ACTIONS.special_tele_golemblast.name = "" // Aimed Blast
    env.ACTIONS.special_tele_golemblast.usage = {
        "act": "%USER takes aim..."
    }
    // --- эффекьы юоже

    /* - tele_enraged_rampage - */

    env.ACTIONS.tele_enraged_rampage.name = "" // Enraged Charge
    env.ACTIONS.tele_enraged_rampage.usage = {
        "act": "%USER PREPARES TO CHARGE AT %TARGET"
    }

    /* - vekfight_assault - */

    env.ACTIONS.vekfight_assault.name = "" // Assault
    env.ACTIONS.vekfight_assault.usage = {
        "act": "%USER НАБРАСЫВАЕТСЯ НА %ACC-TARGET",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }
    env.ACTIONS.vekfight_assault.details = {
        "flavor": "'strike with mutual ferocity'",
        "onUse": "'move to closest open tile near target if not adjacent'",
        "onHit": "'[STAT::amt] [STAT::kb]'",
        "onCrit": "'[STATUS::stun]'"
    }

    /* - vekfight_rush - */

    env.ACTIONS.vekfight_rush.name = "" // Rush
    env.ACTIONS.vekfight_rush.usage = {
        "act": "%USER LOOKS FOR AN OPENING"
    }
    env.ACTIONS.vekfight_rush.details = {
        "flavor": "'move quickly';'overexert cognitive facilities';'consider all immediate possibilities'",
        "onUse": "'[STATUS::hyperfocus]';'move to target location';'select current tile to avoid movement'"
    }

    /* - special_eye_boss - */

    env.ACTIONS.special_eye_boss.name = "" // Epicenter
    env.ACTIONS.special_eye_boss.usage = {
        "act": "The epicenter pulses chaotically..."
    }

    /* - eyeboss_hit - */

    env.ACTIONS.eyeboss_hit.name = "" // Dull Pillar
    env.ACTIONS.eyeboss_hit.usage = {
        "act": "%TARGET is struck by stray dull light!"
    }

    /* - special_epicenter - */

    env.ACTIONS.special_epicenter.name = "" // projtest
    env.ACTIONS.special_epicenter.desc = "" // 'projectile test'
    env.ACTIONS.special_epicenter.usage = {
        "act": "bewewaaawaaaaweawa!!!!"
    }

    /* - vekoa_swipe - */

    env.ACTIONS.vekoa_swipe.name = "" // Assault
    env.ACTIONS.vekoa_swipe.usage = {
        "act": "%USER НАБРАСЫВАЕТСЯ НА %ACC-TARGET",
        "crit": "%TARGET ПОШАТЫВАЕТСЯ ОТ УДАРА",
        "hit": "%TARGET РАНЕН%TAR(-/А/О)GET",
        "miss": "%TARGET УКЛОНЯЕТСЯ"
    }

    /* - special_vekoa_rush - */

    env.ACTIONS.special_vekoa_rush.name = "" // Rush
    env.ACTIONS.special_vekoa_rush.usage = {
        "act": "%USER LOOKS FOR AN OPENING"
    }
    env.ACTIONS.special_vekoa_rush.details = {
        "flavor": "'move quickly';'overexert cognitive facilities';'consider all immediate possibilities'",
        "onUse": "'[STATUS::hyperfocus]';'move to target location';'select current tile to avoid movement'"
    }
    env.ACTIONS.special_vekoa_rush.disableIf = (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },

    /* - tele_vekoa_rampage - */

    env.ACTIONS.tele_vekoa_rampage.name = "" // Last Invitation
    env.ACTIONS.tele_vekoa_rampage.usage = {
        "act": "%USER PREPARES TO CHARGE AT %TARGET"
    }
}
/* === STATUS_EFFECTS === */
cor_ru.combat['redefineEffects'] = function () {
    /* - Puncture - */

    env.STATUS_EFFECTS.puncture.name = "Прокол" // Puncture
    env.STATUS_EFFECTS.puncture.help = "-10% ХП/ход (мин:1)" // -10% hp/turn (min:1)

    /* - Rot - */

    env.STATUS_EFFECTS.rot.name = "Гниль" // Rot
    env.STATUS_EFFECTS.rot.help = "-(Х:ГНИЛЬ)% ХП/ход (мин:1), макс: 90%HP\nТ.Е. 4Х:ГНИЛЬ = -4% ХП" // -(T:ROT)% HP/turn (min:1), max: 90%HP\nI.E. 4T:ROT = -4% HP

    /* - Regen - */

    env.STATUS_EFFECTS.regen.name = "Регенерация" // Regen
    env.STATUS_EFFECTS.regen.help = "+1 ХП/ход" // +1 HP/turn

    /* - Repairs - */

    env.STATUS_EFFECTS.repairs.name = "Починка" // Repairs
    env.STATUS_EFFECTS.repairs.help = "+1 ХП/ход пока БП > 0, предотвращает прокол, снимается при потере барьера" // +1 HP/turn while BP > 0, prevents puncture, removed upon barrier loss

    /* - Million Teeth - */

    env.STATUS_EFFECTS.million_teeth.name = "Миллион Зубов" // Million Teeth
    env.STATUS_EFFECTS.million_teeth.help = "+2Х:ПРОКОЛ/ход пока БП > 0, снимается при потере барьера" // +2T:PUNCTURE/turn while BP > 0, removed upon barrier loss

    /* - Destabilized - */

    env.STATUS_EFFECTS.destabilized.name = "Дестабилизация" // Destabilized
    env.STATUS_EFFECTS.destabilized.help = "+100% входящего/исходящего урона/лечения" // +100% incoming/outgoing damage/heal

    /* - Vulnerable - */

    env.STATUS_EFFECTS.vulnerable.name = "Уязвимость" // Vulnerable
    env.STATUS_EFFECTS.vulnerable.help = "+100% ВХОД:УДАР%, +200% ВХОД:КРИТ%" // +100% IN:HIT%, +200% IN:CRIT%

    /* - Critical Flaw - */

    env.STATUS_EFFECTS.critical_flaw.name = "Критический Изъян" // Critical Flaw
    env.STATUS_EFFECTS.critical_flaw.help = "при получении крита также теряет 10% текущего ХП (мин:1), снимается при потере уязвимости" // when struck with a crit, also lose 10% of current HP (min:1), removed upon vulnerable loss

    /* - Focused - */

    env.STATUS_EFFECTS.focused.name = "Сосредоточение" // Focused
    env.STATUS_EFFECTS.focused.help = "+100% УДАР%, +400% КРИТ%" // +100% HIT%, +400% CRIT%

    /* - Weakened - */

    env.STATUS_EFFECTS.weakened.name = "Слабость" // Weakened
    env.STATUS_EFFECTS.weakened.help = "-50% исходящего урона, -100% КРИТ%" // -50% outgoing damage, -100% CRIT%

    /* - Empowered - */

    env.STATUS_EFFECTS.empowered.name = "Усиление" // Empowered
    env.STATUS_EFFECTS.empowered.help = "+1 к базовому исходящему урону/лечению" // +1 base outgoing damage/heal

    /* - Carapace - */

    env.STATUS_EFFECTS.carapace.name = "Панцирь" // Carapace
    env.STATUS_EFFECTS.carapace.help = "-1 к базовому входящему урону" // -1 base incoming damage

    /* - Open Wound - */

    env.STATUS_EFFECTS.open_wound.name = "Открытая Рана" // Open Wound
    env.STATUS_EFFECTS.open_wound.help = "+1 к базовому входящему урону" // +1 base incoming damage

    /* - Evasion - */

    env.STATUS_EFFECTS.evasion.name = "Уклонение" // Evasion
    env.STATUS_EFFECTS.evasion.help = "-75% ВХОД:УДАР% И ВХОД:КРИТ%" // -75% IN:HIT% & IN:CRIT%

    /* - Stun - */

    env.STATUS_EFFECTS.stun.name = "Оглушение" // Stun
    env.STATUS_EFFECTS.stun.help = "пропустить ход" // skip turn

    /* - Immobile - */

    env.STATUS_EFFECTS.immobile.name = "Неподвижность" // Immobile
    env.STATUS_EFFECTS.immobile.help = "пропустить ход" // skip turn

    /* - Immobile - */

    env.STATUS_EFFECTS.immobile_hardskip.name = "Неподвижность" // Immobile
    env.STATUS_EFFECTS.immobile_hardskip.help = "пропустить ход" // skip turn

    /* - Invisible - */

    env.STATUS_EFFECTS.invisible.name = "Невидимость" // Invisible
    env.STATUS_EFFECTS.invisible.help = "нет актёрской панели, в основном для фоновых объектов" // no actor panel, used for background entities mainly

    /* - Incoherent - */

    env.STATUS_EFFECTS.incoherent.name = "Бессвязность" // Incoherent
    env.STATUS_EFFECTS.incoherent.help = "игнорирует требования мыслепространства" // ignoring thoughtspace specifications

    /* - Windup - */

    env.STATUS_EFFECTS.windup.name = "Подготовка" // Windup
    env.STATUS_EFFECTS.windup.help = "+100% входящего крита, подготовка мощного действия, прерывается оглушением" // +100% incoming crit, preparing powerful action, interrupted by stun

    /* - Fear - */

    env.STATUS_EFFECTS.fear.name = "Страх" // Fear
    env.STATUS_EFFECTS.fear.help = ()=> `еле двигается от ужаса,${env?.rpg?.is2D ? " -1 ДВИЖ," : ''} некоторые действия недоступны\nубирается КРИТОМ союзника${env?.rpg?.is2D ? " или действием ВЫДЕРЖАТЬ" : ''}` // ()=> `paralyzed by terror,${env?.rpg?.is2D ? " -1 MOVE," : ''} some actions prohibited\nremoved by ally CRIT${env?.rpg?.is2D ? " or ENDURE action" : ''}`

    /* - Madness - */

    env.STATUS_EFFECTS.madness.name = "Безумие" // Madness
    env.STATUS_EFFECTS.madness.help = "50% шанс перенаправить исходящее нацеленное действие на случайного актера\nубирается при потере страха" // outgoing targeted actions have a 50% chance to be redirected to a random actor\nremoved upon fear loss

    /* - Spikes - */

    env.STATUS_EFFECTS.spikes.name = "Шипы" // Spikes
    env.STATUS_EFFECTS.spikes.help = "возвращает 50% входящего урона атакующему (мин:1)" // return 50% incoming damage to attacker (min:1)

    /* - siphon - */

    env.STATUS_EFFECTS.siphon.name = "" // siphon --- надо обсудить. предложения: выкачка, поглощение, вампиризм (знают ли куу о вампирах (мозг лазутчика всё странно переводит)) --- да
    env.STATUS_EFFECTS.siphon.help = "атакующий получает +1ХП +1Х:РЕГЕНЕРАЦИЯ" // attacker receives +1HP +1T:REGEN

    /* - Redirection - */

    env.STATUS_EFFECTS.redirection.name = "Перенаправление" // Redirection
    env.STATUS_EFFECTS.redirection.help = ()=> `[[ORIGIN]] перехватывает входящие атаки${env?.rpg?.is2D ? ", +ОТДЧ устойчивость" : ''}` // ()=> `[[ORIGIN]] intercepting incoming attacks${env?.rpg?.is2D ? ", +KB resistance" : ''}`

    /* - Redirector - */

    env.STATUS_EFFECTS.redirector.name = "Перенаправитель" // Redirector
    env.STATUS_EFFECTS.redirector.help = ()=> `перехватывает атаки поблизости${env?.rpg?.is2D ? ", +ОТДЧ устойчивость" : ''}` // ()=> `intercepting nearby attacks${env?.rpg?.is2D ? ", +KB resistance" : ''}`

    /* - Conjoined - */

    env.STATUS_EFFECTS.conjoined.name = "Сросшиеся" // Conjoined
    env.STATUS_EFFECTS.conjoined.help = "разделяет ХП со всеми остальными сросшимися сущностями" // share HP with all other conjoined entities

    /* - Conjoined - */

    env.STATUS_EFFECTS.conjoined_baseslug.name = "Сросшиеся" // Conjoined
    env.STATUS_EFFECTS.conjoined_baseslug.help = "разделяет ХП со всеми похожими сущностями" // share HP with all similar entities

    /* - Ethereal - */

    env.STATUS_EFFECTS.ethereal.name = "Бесплотность" // Ethereal
    env.STATUS_EFFECTS.ethereal.help = "пропадает при смерти" // disappear on death

    /* - Ethereal - */

    env.STATUS_EFFECTS.ethereal_passive.name = "Бесплотность" // Ethereal
    env.STATUS_EFFECTS.ethereal_passive.help = "пропадает при смерти" // disappear on death

    /* - Untargetable - */

    env.STATUS_EFFECTS.untargetable.name = "Ненацеливаемость" // Untargetable
    env.STATUS_EFFECTS.untargetable.help = "не может быть атакован напрямую, обратитесь к другим методам" // cannot directly attack, seek other means

    /* - Sacrifice - */

    env.STATUS_EFFECTS.sacrifice.name = "Жертвоприношение" // Sacrifice
    env.STATUS_EFFECTS.sacrifice.help = "+2 базового исходящего урона/лечения, +200% УДАР% и КРИТ%, поглощается следующим действием" // +2 base outgoing damage/heal, +200% HIT% & CRIT%, consumed by next action

    /* - Surge - */

    env.STATUS_EFFECTS.surge.name = "Рывок" // Surge
    env.STATUS_EFFECTS.surge.help = "использовать следующее действие дважды" // use next active action twice

    /* - Wild Surge - */

    env.STATUS_EFFECTS.wild_surge.name = "Перенапряжение" // Wild Surge --- ну дикий рывок звучит. меее
    env.STATUS_EFFECTS.wild_surge.help = "при следующем активном нацеленном действии получить 1Х:ОГЛУШЕНИЕ и использовать действие на всей команде цели\nесли положительное, действие используется на всех союзниках\nесли атакующее, действие используется на всех врагах" // on next active targeted action, gain 1T:STUN, and use across the entire target team\nif beneficial, action used on all allies\nif offensive, action used on all foes

    /* - Attack Drone - */

    env.STATUS_EFFECTS.attack_drone.name = "" // Attack Drone
    env.STATUS_EFFECTS.attack_drone.help = "" // if alive, attack all vulnerable foes on turn for -1HP 10%CRT

    /* - ACTION::Retaliate - */

    env.STATUS_EFFECTS.retaliation.name = "" // ACTION::Retaliate
    env.STATUS_EFFECTS.retaliation.help = "" // if alive, on ally evade, retaliate against attacker with primary (1st) action

    /* - ACTION::Last Stand - */

    env.STATUS_EFFECTS.ichor_last_stand.name = "" // ACTION::Last Stand
    env.STATUS_EFFECTS.ichor_last_stand.help = "" // on ally down, automatically revive them once per combat with 1HP and 5BP.

    /* - ACTION::Impatient - */

    env.STATUS_EFFECTS.impatient.name = "" // ACTION::Impatient
    env.STATUS_EFFECTS.impatient.help = "" // when another ally critically strikes a foe, use primary on that foe

    /* - ACTION::Active Support - */

    env.STATUS_EFFECTS.active_support.name = "" // ACTION::Active Support
    env.STATUS_EFFECTS.active_support.help = "" // if alive, when an ally crits a foe, use secondary\nif secondary is beneficial, used on ally\nif secondary is offensive, used on foe

    /* - ACTION::Visionary - */

    env.STATUS_EFFECTS.visionary.name = "" // ACTION::Visionary
    env.STATUS_EFFECTS.visionary.help = "" // when critting a foe, use utility

    /* - Visionary (Sniper) - */

    env.STATUS_EFFECTS.visionary_geli.name = "" // Visionary (Sniper)
    env.STATUS_EFFECTS.visionary_geli.help = "" // when critting a foe, use utility action

    /* - Spotter - */

    env.STATUS_EFFECTS.spotter.name = "" // Spotter
    env.STATUS_EFFECTS.spotter.help = "" // if alive, when an ally misses a foe, +2T:VULNERABLE on that foe

    /* - Chitin Deformation - */

    env.STATUS_EFFECTS.claws_chitin.name = "" // Chitin Deformation
    env.STATUS_EFFECTS.claws_chitin.help = "" // when hitting a foe, inflict 1T:PUNCTURE

    /* - Dancer - */

    env.STATUS_EFFECTS.eyes_dancer.name = "" // Dancer
    env.STATUS_EFFECTS.eyes_dancer.help = "" // when evading an offensive strike, gain 1T:EVASION

    /* - Finisher - */

    env.STATUS_EFFECTS.ichor_finisher.name = "" // Finisher
    env.STATUS_EFFECTS.ichor_finisher.help = "" // on foe down, receive +3T:EMPOWERED

    /* - Adaptive - */

    env.STATUS_EFFECTS.bone_adaptive.name = "" // Adaptive
    env.STATUS_EFFECTS.bone_adaptive.help = "" // when struck offensively, gain 2T:SPIKES

    /* - Parii Shield - */

    env.STATUS_EFFECTS.bone_shield.name = "" // Parii Shield
    env.STATUS_EFFECTS.bone_shield.help = "" // on foe down, receive +4BP

    /* - Humorist - */

    env.STATUS_EFFECTS.light_humorist.name = "" // Humorist
    env.STATUS_EFFECTS.light_humorist.help = "" // when hitting a foe, laugh\nunknown additional effect

    /* - Veilkdrop - */

    env.STATUS_EFFECTS.light_veilkdrop.name = "" // Veilkdrop
    env.STATUS_EFFECTS.light_veilkdrop.help = "" // when critting a foe, 25% chance to inflict 1T:STUN

    /* - FATED::Claws - */

    env.STATUS_EFFECTS.fated_claws.name = "" // FATED::Claws
    env.STATUS_EFFECTS.fated_claws.help = "" // per humor of claws in this shell::\n+1T:PUNCTURE on all attacks\n+1.5% base crit% (before bonuses)

    /* - FATED::Eyes - */

    env.STATUS_EFFECTS.fated_eyes.name = "" // FATED::Eyes
    env.STATUS_EFFECTS.fated_eyes.help = "" // per humor of eyes in this shell::\n+10% chance to give 2T:EMPOWERED when giving allies FOCUSED\n+10% chance on hit to inflict +2T:VULNERABLE and +CRITICAL FLAW

    /* - FATED::Ichor - */

    env.STATUS_EFFECTS.fated_ichor.name = "" // FATED::Ichor
    env.STATUS_EFFECTS.fated_ichor.help = "" // per humor of ichor in this shell::\nallies receive +1BP when healing from any source

    /* - FATED::Bone - */

    env.STATUS_EFFECTS.fated_bone.name = "" // FATED::Bone
    env.STATUS_EFFECTS.fated_bone.help = "" // per humor of bone in this shell::\n+1 base SPIKES damage\n+10% chance to use primary action on attacker when receiving a redirected attack

    /* - FATED::Light - */

    env.STATUS_EFFECTS.fated_light.name = "" // FATED::Light
    env.STATUS_EFFECTS.fated_light.help = "" // per humor of light in this shell::\n+10% chance for (2T:FEAR/2T:DESTABILIZED/1T:STUN) on hit\n+5% INVITE STORM/INVOKE MADNESS special effect chance

    /* - Heavy Chitin - */

    env.STATUS_EFFECTS.bone_spikes.name = "Тяжёлый Хитин" // Heavy Chitin
    env.STATUS_EFFECTS.bone_spikes.help = "уклонение превращается в шипы" // evasion becomes spikes

    /* - Ablative Mending - */

    env.STATUS_EFFECTS.bone_ablative.name = "Аблятивная Починка" // Ablative Mending
    env.STATUS_EFFECTS.bone_ablative.help = "прямое лечение удваивается и становится барьерами" // direct heals are doubled and become barriers

    /* - Collectivism - */

    env.STATUS_EFFECTS.bone_collective.name = "Коллективизм" // Collectivism
    env.STATUS_EFFECTS.bone_collective.help = "" // gain +100% outgoing damage/heal while covered by REDIRECTION\nall actors gain GUARD (AUTOHIT +2T:REDIRECTION (TO USER))

    /* - Adull's Sacrifice - */

    env.STATUS_EFFECTS.ichor_sacrifice.name = "" // Adull's Sacrifice
    env.STATUS_EFFECTS.ichor_sacrifice.help = "" // half of damage taken is given to a random actor as HP (rounded down)

    /* - Full Strength - */

    env.STATUS_EFFECTS.ichor_strength.name = "В Полную Силу" // Full Strength
    env.STATUS_EFFECTS.ichor_strength.help = "+100% исходящего урона/лечения при >75% ХП" // +100% outgoing damage/heal at >75% HP

    /* - Rotten Supplies - */

    env.STATUS_EFFECTS.ichor_rotten.name = "Гнилые Припасы" // Rotten Supplies
    env.STATUS_EFFECTS.ichor_rotten.help = "получить 3Х:ГНИЛЬ при потере РЕГЕНЕРАЦИИ" // gain 3T:ROT when REGEN is removed

    /* - Infection - */

    env.STATUS_EFFECTS.claws_infection.name = "Инфекция" // Infection
    env.STATUS_EFFECTS.claws_infection.help = "" // +20% damage per T:PUNCTURE of attacked target

    /* - Desperation - */

    env.STATUS_EFFECTS.claws_desperation.name = "Отчаяние" // Desperation
    env.STATUS_EFFECTS.claws_desperation.help = "" // +50% outgoing crit and hit chance if HP < 50%

    /* - Rabid - */

    env.STATUS_EFFECTS.claws_rabid.name = "Бешенство" // Rabid
    env.STATUS_EFFECTS.claws_rabid.help = "" // all targeted actions have a 25% + (1%*T:ROT) chance to become BITE\nBITE::(-2HP, +3T:ROT, transfer ROT to target)

    /* - Hypercritical - */

    env.STATUS_EFFECTS.eyes_hypercritical.name = "Гиперкритичность" // Hypercritical
    env.STATUS_EFFECTS.eyes_hypercritical.help = "" // vulnerability has infinite duration

    /* - Wounded Ego - */

    env.STATUS_EFFECTS.eyes_woundedego.name = "Уязвлённое Эго" // Wounded Ego
    env.STATUS_EFFECTS.eyes_woundedego.help = "" // grant 1T:FOCUSED and 1T:EMPOWERED when vulnerability is removed

    /* - Betrayal - */

    env.STATUS_EFFECTS.eyes_betrayal.name = "Предательство" // Betrayal
    env.STATUS_EFFECTS.eyes_betrayal.help = "" // Beneficial actions have a 20% chance to become SUBVERT\nSUBVERT::(+2T:VULNERABLE, +CRITICAL FLAW, -EVASION)

    /* - Laughterhouse - */

    env.STATUS_EFFECTS.light_laughterhouse.name = "Смехобойня" // Laughterhouse
    env.STATUS_EFFECTS.light_laughterhouse.help = "большинство действий имеют 20% шанс повторить свои эффекты" // most actions have a 20% chance to repeat effects

    /* - Velzie's Glee - */

    env.STATUS_EFFECTS.light_glee.name = "Упоение Велзи" // Velzie's Glee
    env.STATUS_EFFECTS.light_glee.help = "" // incoming status effect application has a 50% chance to become opposite status\nmay be altered by other effects

    /* - Dark Eye - */

    env.STATUS_EFFECTS.light_dark.name = "Мрачный Глаз" // Dark Eye
    env.STATUS_EFFECTS.light_dark.help = "" // gain +100% outgoing damage/heal when afflicted by FEAR\nwhen critting a foe, inflict 1T:FEAR 

    /* - Lone Daemon - */

    env.STATUS_EFFECTS.fish_solo.name = "" // Lone Daemon
    env.STATUS_EFFECTS.fish_solo.help = "" // +30HP base HP, grants immunity to stun/fear, +WILD SURGE on turn, negates WILD SURGE stun effect

    /* - Deceiving Bulb - */

    env.STATUS_EFFECTS.fish_angler.name = "" // Deceiving Bulb
    env.STATUS_EFFECTS.fish_angler.help = "" // prioritized as target over other allies

    /* - Mimic - */

    env.STATUS_EFFECTS.fish_mimic.name = "" // Mimic
    env.STATUS_EFFECTS.fish_mimic.help = "" // keep mimicked actions between fights

    /* - Gambling Adddiction - */

    env.STATUS_EFFECTS.fish_trusive.name = "" // Gambling Adddiction
    env.STATUS_EFFECTS.fish_trusive.help = "" // spin the wheel on turn

    /* - Escalation - */

    env.STATUS_EFFECTS.global_escalation.name = "" // Escalation
    env.STATUS_EFFECTS.global_escalation.help = "" // most negative statuses have enhanced effect

    /* - Into Madness - */

    env.STATUS_EFFECTS.global_impulse_bonus.name = "" // Into Madness
    env.STATUS_EFFECTS.global_impulse_bonus.help = "" // this actor receives a random impulse per stack of Into Madness

    /* - Appeasement - */

    env.STATUS_EFFECTS.appeasement.name = "" // Appeasement
    env.STATUS_EFFECTS.appeasement.help = "" // when an ally dies, take their max HP * 2 in damage\nwhen defeated, also defeat all other allies

    /* - Spawner - */

    env.STATUS_EFFECTS.spawner.name = "" // Spawner
    env.STATUS_EFFECTS.spawner.help = "" // when struck with direct damage, summon minor ally\nnot triggered by statuses or non-harmful actions

    /* - Mimic - */

    env.STATUS_EFFECTS.mimic.name = "" // Mimic
    env.STATUS_EFFECTS.mimic.help = "" // will use last action used by foe in same party slot\ncannot copy items or actions requiring certain statuses

    /* - Partial Participant - */

    env.STATUS_EFFECTS.permanent_hp.name = "" // Partial Participant
    env.STATUS_EFFECTS.permanent_hp.help = "" // unable to be reset, damage dealt is kept through iterations\nfear is enhanced and has alternate function

    /* - Ruleset Paradox - */

    env.STATUS_EFFECTS.imperfect_reset.name = "" // Ruleset Paradox
    env.STATUS_EFFECTS.imperfect_reset.help = "" // upon status expiry, end combat and reset iteration with more hostile parameters\ncurrent party will persist

    /* - DRILL - */

    env.STATUS_EFFECTS.malware_drill.name = "" // DRILL
    env.STATUS_EFFECTS.malware_drill.help = "" // doubles effect of puncture on this actor

    /* - ROTTING - */

    env.STATUS_EFFECTS.malware_rot.name = "" // ROTTING
    env.STATUS_EFFECTS.malware_rot.help = "" // upon receiving REGEN, instead turn it into ROT

    /* - Driver - */

    env.STATUS_EFFECTS.driver.name = "" // Driver
    env.STATUS_EFFECTS.driver.help = "" // can pilot the vessel. on turn, advance vessel position forward

    /* - Invincible - */

    env.STATUS_EFFECTS.invincible.name = "" // Invincible
    env.STATUS_EFFECTS.invincible.help = "" // cannot be defeated by any means\nsystem interruption to maintain disabled gameplay

    /* - Weak Point - */

    env.STATUS_EFFECTS.weak_point.name = "" // Weak Point
    env.STATUS_EFFECTS.weak_point.help = "" // receive +1000% incoming damage/heal while stunned

    /* - Weak Point Exposed - */

    env.STATUS_EFFECTS.hyperstun.name = "" // Weak Point Exposed
    env.STATUS_EFFECTS.hyperstun.help = "" // skip turn, +1000% incoming damage/heal

    /* - Ominous Timer - */

    env.STATUS_EFFECTS.ominous_timer.name = "" // Ominous Timer
    env.STATUS_EFFECTS.ominous_timer.help = "" // unknown, asynchronous effect

    /* - Item Carrier - */

    env.STATUS_EFFECTS.lootbox.name = "" // Item Carrier
    env.STATUS_EFFECTS.lootbox.help = "" // dropping item on death

    /* - Armed - */

    env.STATUS_EFFECTS.rifle_bearer.name = "" // Armed
    env.STATUS_EFFECTS.rifle_bearer.help = "" // wielding symbiotic rifle, grants action SLUDGE VOLLEY\nremoved if other ally is armed

    /* - Immovable - */

    env.STATUS_EFFECTS.kb_immune.name = "" // Immovable
    env.STATUS_EFFECTS.kb_immune.help = "" // ignores knockback

    /* - Unnatural Speed - */

    env.STATUS_EFFECTS.unnatural_speed.name = "" // Unnatural Speed
    env.STATUS_EFFECTS.unnatural_speed.help = "" // 'instant relocation on turn start if not near foe'

    /* - coiling - */

    env.STATUS_EFFECTS.coiling.name = "" // coiling
    env.STATUS_EFFECTS.coiling.help = "" // providing continuous beneficial statuses\nsevered by stun or death

    /* - Coiled - */

    env.STATUS_EFFECTS.coiled.name = "" // Coiled
    env.STATUS_EFFECTS.coiled.help = "" // [[ORIGIN]] providing continuous beneficial statuses

    /* - Watching - */

    env.STATUS_EFFECTS.channeling.name = "" // Watching
    env.STATUS_EFFECTS.channeling.help = "" // channeling continuous negative effect upon distant target, severed by any hit or stun

    /* - Seen - */

    env.STATUS_EFFECTS.channeledUpon.name = "" // Seen
    env.STATUS_EFFECTS.channeledUpon.help = "" // [[ORIGIN]] continuously attacking and inflicting negative status

    /* - Drone Strike - */

    env.STATUS_EFFECTS.drone_haunt.name = "" // Drone Strike
    env.STATUS_EFFECTS.drone_haunt.help = "" // persistent area from [[ORIGIN]]. -2HP/turn to foe host and vulnerable foes, 25% chance for +1T:EVASION to allies. removed if [[ORIGIN]] is downed

    /* - Shroud - */

    env.STATUS_EFFECTS.shroud_vekoa.name = "" // Shroud
    env.STATUS_EFFECTS.shroud_vekoa.help = "" // 'unable to affect by any means'

    /* - Shroud - */

    env.STATUS_EFFECTS.shroud.name = "" // Shroud
    env.STATUS_EFFECTS.shroud.help = "" // 'unable to affect by any means'

    /* - Split Focus - */

    env.STATUS_EFFECTS.archivist_split_focus.name = "" // Split Focus
    env.STATUS_EFFECTS.archivist_split_focus.help = "" // 'suffer max HP of allies as damage upon their defeat'

    /* - Flickering - */

    env.STATUS_EFFECTS.unstable_position.name = "" // Flickering
    env.STATUS_EFFECTS.unstable_position.help = "" // 'relocate to random tile on turn start'

    /* - Evasive - */

    env.STATUS_EFFECTS.blur_evasive.name = "" // Evasive
    env.STATUS_EFFECTS.blur_evasive.help = "" // -25% IN:HIT%

    /* - Windup - */

    env.STATUS_EFFECTS.windup_telegraph.name = "" // Windup
    env.STATUS_EFFECTS.windup_telegraph.help = "" // +100% incoming crit, preparing powerful telegraphed action, interrupted only by stun

    /* - Interruptible - */

    env.STATUS_EFFECTS.telegraph.name = "" // Interruptible
    env.STATUS_EFFECTS.telegraph.help = "" // using telegraphed action on next turn, interrupted by any hit or stun

    /* - Obstacle - */

    env.STATUS_EFFECTS.destructible_cross.name = "" // Obstacle
    env.STATUS_EFFECTS.destructible_cross.help = "" // stands in da way :P

    /* - Wall - */

    env.STATUS_EFFECTS.destructible_wall.name = "Стена" // Wall

    /* - Planted - */

    env.STATUS_EFFECTS.bomb_planted.name = "" // Planted
    env.STATUS_EFFECTS.bomb_planted.help = "" // delayed explosive attached, detonates on activation, drops on death

    /* - Spinal Root - */

    env.STATUS_EFFECTS.destructible_spinalroot.name = "" // Spinal Root

    /* - miltzone - */

    env.STATUS_EFFECTS.boss_miltza.name = "милтзона" // miltzone

    /* - Unnatural Carapace - */

    env.STATUS_EFFECTS.unnatural_carapace.name = "" // Unnatural Carapace
    env.STATUS_EFFECTS.unnatural_carapace.help = "" // -2 base incoming damage, +2KB resistance, puncture immunity\ncreate dangerous area around self\nreduced by notable explosion

    /* - Pod Distortion - */

    env.STATUS_EFFECTS.destructible_lesserpod.name = "" // Pod Distortion

    /* - Reunited - */

    env.STATUS_EFFECTS.lesserboss_alternating.name = "" // Reunited
    env.STATUS_EFFECTS.lesserboss_alternating.help = "" // shares HP with other foes\nchanges actions after 100HP lost\nimmune to edge distortion

    /* - Overlap Collapse - */

    env.STATUS_EFFECTS.lesserboss_overlap_collapse.name = "" // Overlap Collapse
    env.STATUS_EFFECTS.lesserboss_overlap_collapse.help = "" // slowly collapsing combat stage

    /* - Last Stand - */

    env.STATUS_EFFECTS.desperation.name = "" // Last Stand
    env.STATUS_EFFECTS.desperation.help = "вот и всё.\nстатус сосредоточения бесконечен\nзначительно увеличивает силу\nавтоматическое самовозрождение, единожды" // this is it.\nfocused status is infinite\nbroadly increases strength\nautomatically revive self, once

    /* - Ceremony Vein - */

    env.STATUS_EFFECTS.destructible_epicenter_vein.name = "" // Ceremony Vein

    /* - Protector - */

    env.STATUS_EFFECTS.vekoa_golem.name = "" // Protector
    env.STATUS_EFFECTS.vekoa_golem.help = "" // keeping veins incorporeal

    /* - vekoaaaa - */

    env.STATUS_EFFECTS.boss_vekoa.name = "векоаааа" // vekoaaaa

    /* - Hyperfocus - */

    env.STATUS_EFFECTS.hyperfocus.name = "" // Hyperfocus
    env.STATUS_EFFECTS.hyperfocus.help = "" // -80% IN:HIT% & IN:CRIT%, +100% HIT%, +400% CRIT%, +1 MOVE, STUN IMMUNITY

    /* - Disconnected - */

    env.STATUS_EFFECTS.autoplay_telyu.name = "Отключённая" // Disconnected
    env.STATUS_EFFECTS.autoplay_telyu.help = "действует по собственной воле" // acting of her own volition

    /* - Disconnected - */

    env.STATUS_EFFECTS.autoplay_tozik.name = "Отключённый" // Disconnected
    env.STATUS_EFFECTS.autoplay_tozik.help = "действует по собственной воле" // acting of his own volition

    /* - Knockback - */

    env.STATUS_EFFECTS.kb.name = "Отдача" // Knockback
    env.STATUS_EFFECTS.kb.help = "немедленное принудительное движение, переносится при ударе" // immediate forced movement, transfers on impact

    /* - Barrier - */

    env.STATUS_EFFECTS.bp.name = "Барьер" // Barrier
    env.STATUS_EFFECTS.bp.help = "временное здоровье, ограничено до 1/2 макс ХП" // temporary HP, limited to 1/2 max HP

    /* - aiming - */

    env.STATUS_EFFECTS.aiming_indicator.name = "целица" // aiming
    env.STATUS_EFFECTS.aiming_indicator.help = "вы этого видеть не должны" // you should never see this
}
/* === ITEMS === */
cor_ru.combat['redefineItems'] = function () {
    /* - Restorative Cyst - */

    env.ITEM_LIST.restorative.name = "Восстановительная Циста" // Restorative Cyst
    env.ITEM_LIST.restorative.description = "" // 'quick-acting repair cyst';'best used away from danger'
    env.ITEM_LIST.restorative.oocnote = "'восстанавливает цель до полного здоровья'" // 'restores target to full health'

    /* - Satik Cyst - */

    env.ITEM_LIST.satik_cyst.name = "Сатик-Циста" // Satik Cyst
    env.ITEM_LIST.satik_cyst.description = "" // 'contains rapid temporary ablative barrier applicators';'named after hardy veilk parasite';'break in case of emergency'

    /* - Aima Cyst - */

    env.ITEM_LIST.aima_cyst.name = "Айма-Циста" // Aima Cyst
    env.ITEM_LIST.aima_cyst.description = "" // 'receptor-tied targeting cyst';'traditional hunting implement';'useful for multitasking'

    /* - Kavruka - */

    env.ITEM_LIST.kavruka.name = "Каврука" // Kavruka
    env.ITEM_LIST.kavruka.description = "" // 'deconstruction tool';'named after non-corrucystic surface fauna';'notoriously explosive'

    /* - Disabler - */

    env.ITEM_LIST.disabler.name = "Отключитель" // Disabler
    env.ITEM_LIST.disabler.description = "" // 'emergency security device';'injects self-destructive thoughtform';'for industrial use only';'quite rare'

    /* - CMD::DRILL - */

    env.ITEM_LIST.drill.name = "" // CMD::DRILL --- как переводить cmd?
    env.ITEM_LIST.drill.description = "" // 'single-use thoughtspace modification';'enforces harsher ruleset'

    /* - CMD::ROT - */

    env.ITEM_LIST.rot.name = "" // CMD::ROT
    env.ITEM_LIST.rot.description = "" // 'single-use thoughtspace modification';'enforces harsher ruleset'

    /* - CMD::REWRITE - */

    env.ITEM_LIST.rewrite.name = "" // CMD::REWRITE
    env.ITEM_LIST.rewrite.description = "" // 'single-use thoughtspace processor';'alter combat for more favorable outcome'

    /* - CMD::EMPOWER - */

    env.ITEM_LIST.empower.name = "" // CMD::EMPOWER
    env.ITEM_LIST.empower.description = "" // 'single-use thoughtspace processor';'alter combat for more favorable outcome'

    /* - Sfer Cube - */

    env.ITEM_LIST.sfer_cube.name = "Куб Сфера" // Sfer Cube --- господи
    env.ITEM_LIST.sfer_cube.description = "" // 'condensed corrucystic fuel';'valid currency';'the foundation of all things'

    /* - Cool Orb Thingy - */

    env.ITEM_LIST.cool_orb_thingy.name = "Клёвая Шароштучка" // Cool Orb Thingy
    env.ITEM_LIST.cool_orb_thingy.description = "" // 'labelled "ON THE USE OF BRIGHT WEAPONRY"';'receptor-locked'

    /* - Scary Black Box - */

    env.ITEM_LIST.scary_black_box.name = "Криповая Чёрная Коробочка" // Scary Black Box
    env.ITEM_LIST.scary_black_box.description = "" // 'cousinly container made from tough dead material'

    /* - Sorry Cyst - */

    env.ITEM_LIST.sorry_cyst.name = "" // Sorry Cyst
    env.ITEM_LIST.sorry_cyst.description = "" // 'a damaged golem weapon schematic';'the inscription reads, "<span class='code' definition="INHERITED CONTEXT::'meet me in the uncosm'">sorry</span>"'

    /* - Golem Sfer - */

    env.ITEM_LIST.golem_sfer.name = "" // Golem Sfer
    env.ITEM_LIST.golem_sfer.description = "" // 'dense segmented sfer used in golem body creation';'knowledge of location';'feasibly used to create a new body for itzil and karik'

    /* - Golem Parts - */

    env.ITEM_LIST.golem_parts.name = "" // Golem Parts
    env.ITEM_LIST.golem_parts.description = "" // 'large number of golem components';'knowledge of location';'feasibly used to create a new body for itzil and karik'

    /* - Signal Export - */

    env.ITEM_LIST.core_translation.name = "" // Signal Export
    env.ITEM_LIST.core_translation.description = "" // 'a dangerously incoherent knowledge corrucyst';'contains some sort of interpretation of the signal';'gakvu can weaponize this'
    env.ITEM_LIST.core_translation.oocnote = "" // ()=> check("env!!embassy_day", 3.99) ? `'empowers DESTABILIZE action for party member';'gakvu'` : `'enables creation of SIGNAL INVERTER augment for party member';'gakvu'`

    /* - Weird Black Box - */

    env.ITEM_LIST.error.name = "Странная Чёрная Коробочка" // Weird Black Box
    env.ITEM_LIST.error.description = "" // 'cannot open';'why are we still carrying it';'quite heavy...'

    /* - Stray IDEA - */

    env.ITEM_LIST.fish_order.name = "" // Stray IDEA
    env.ITEM_LIST.fish_order.description = "" // 'stray daemon instructor';'may be activated and thrown to alter structure'
    env.ITEM_LIST.fish_order.oocnote = "" // 'unifies all map nodes into using a single random modifier'

    /* - Lone Daemon - */

    env.ITEM_LIST.fish_lone.name = "" // Lone Daemon
    env.ITEM_LIST.fish_lone.description = "" // 'minor daemon rendered incoherent by unusual structure'
    env.ITEM_LIST.fish_lone.oocnote = "" // '<strong>PERMANENT</strong>';'select shell';'all other shells are removed';'chosen shell receives stun and fear immunity';'permanent wild surge';'+30HP'

    /* - ??? - */

    env.ITEM_LIST.fish_wheel.name = "???" // ???
    env.ITEM_LIST.fish_wheel.description = "" // 'intrusive species'
    env.ITEM_LIST.fish_wheel.oocnote = "" // '<strong>PERMANENT</strong>';'select shell';'imbue with gambling addiction'

    /* - Decorated Burstlet - */

    env.ITEM_LIST.fish_ruka.name = "" // Decorated Burstlet
    env.ITEM_LIST.fish_ruka.description = "" // 'volatile parasitic fish';'intrusive species'
    env.ITEM_LIST.fish_ruka.oocnote = "" // '<strong>PERMANENT</strong>';'select shell';'grants detonate action'

    /* - FiiF - */

    env.ITEM_LIST.fish_mimic.name = "РыыР" // FiiF
    env.ITEM_LIST.fish_mimic.description = "" // 'fish native to these waters';'sretaw eseht ot evitan hsif'
    env.ITEM_LIST.fish_mimic.oocnote = "" // '<strong>PERMANENT</strong>';'select shell';'removes ability to be modified';'replaces actions with mimic'

    /* - Sniper Fish - */

    env.ITEM_LIST.fish_sniper.name = "Рыба-Стрелок" // Sniper Fish
    env.ITEM_LIST.fish_sniper.description = "" // 'fish native to these waters';'doubles as powerful sniper rifle'
    env.ITEM_LIST.fish_sniper.oocnote = "" // '<strong>PERMANENT</strong>';'select shell';'removes ability to be modified';'replaces actions with powerful firearm'

    /* - Normal Fish - */

    env.ITEM_LIST.fish_normal.name = "Нормальная Рыба" // Normal Fish
    env.ITEM_LIST.fish_normal.description = "'ыбка'" // 'fishey'
    env.ITEM_LIST.fish_normal.oocnote = "" // 'select shell';'removes any special classes';'re-enables modification'

    /* - Deceiving Bulb - */

    env.ITEM_LIST.fish_angler.name = "" // Deceiving Bulb
    env.ITEM_LIST.fish_angler.description = "" // 'violent surface river fauna';'imitates mature celki glow'
    env.ITEM_LIST.fish_angler.oocnote = "" // 'select shell';'enemies will prioritize over other targets'

    /* - Fairy Eye - */

    env.ITEM_LIST.fish_glee.name = "" // Fairy Eye
    env.ITEM_LIST.fish_glee.description = "" // 'veilktop parasite';'shells rarely found in riverbeds';'purported sign of imminent chaos'
    env.ITEM_LIST.fish_glee.oocnote = "" // 'permanently improves modifier'::VELZIE'S GLEE

    /* - BSTRDBOOT - */

    env.ITEM_LIST.fish_boot.name = "СВЛЧСАПОГ" // BSTRDBOOT
    env.ITEM_LIST.fish_boot.description = "'СОРЯН НИЧЕВО'" // 'SORRY NOTHING'

    /* - Symbiotic Rifle - */

    env.ITEM_LIST.symbiotic_rifle.name = "Симбиотическая Винтовка" // Symbiotic Rifle
    env.ITEM_LIST.symbiotic_rifle.description = "" // 'adapted bright weaponry created via lesser vats and strange cyst';'connects to internal ammunition generator';'use at cost of HP'

}
/* === HUMORS === */
cor_ru.combat['redefineHumors'] = function () {
    /* - Ichor - */

    env.COMBAT_COMPONENTS.ichor.name = "Ихор" // Ichor
    env.COMBAT_COMPONENTS.ichor.description = "'забота и жертвенность'" // 'care and sacrifice'
    env.COMBAT_COMPONENTS.ichor.help = "'лечение';'регенерация';'оживление'" // 'healing';'regen';'revival'

    /* - Eyes - */

    env.COMBAT_COMPONENTS.eyes.name = "Глаза" // Eyes
    env.COMBAT_COMPONENTS.eyes.description = "'любопытство и критика'" // 'curiosity and critique'
    env.COMBAT_COMPONENTS.eyes.help = "'уязвимость';'уклонение';'сосредоточение'" // 'vulnerability';'evasion';'focus'

    /* - Claws - */

    env.COMBAT_COMPONENTS.claws.name = "Когти" // Claws
    env.COMBAT_COMPONENTS.claws.description = "'амбиции, зачастую слепые'" // 'ambition, often blind'
    env.COMBAT_COMPONENTS.claws.help = "'совместный урон';'прокол';'двойные действия'" // 'team damage';'puncture';'double-action'

    /* - Bone - */

    env.COMBAT_COMPONENTS.bone.name = "Кость" // Bone
    env.COMBAT_COMPONENTS.bone.description = "'стойкость и паранойя'" // 'resilience and paranoia'
    env.COMBAT_COMPONENTS.bone.help = "'слабость';'оглушение';'защита';'шипы'" // 'weakness';'stun';'guard';'spiked'

    /* - Light - */

    env.COMBAT_COMPONENTS.light.name = "Свет" // Light
    env.COMBAT_COMPONENTS.light.description = "'судьба и последствия'" // 'fate and consequence'
    env.COMBAT_COMPONENTS.light.help = "'дестабилизация';'страх';'оглушение'" // 'destabilized';'fear';'stun'

    /* - Empty - */

    env.COMBAT_COMPONENTS.empty.name = "Пустой" // Empty
    env.COMBAT_COMPONENTS.empty.description = "'импровизация';'отсутствие направления'" // 'improvisation';'lacking direction'
    env.COMBAT_COMPONENTS.empty.help = "'базовые действия'" // 'basic actions'
}
/* === MODIFIERS === */
cor_ru.combat['redefineModifiers'] = function () {
    /* - Heavy Chitin - */

    env.MODIFIERS.bone_spikes.name = "Тяжелый Хитин" // Heavy Chitin
    env.MODIFIERS.bone_spikes.getHelp = ()=> { return env.STATUS_EFFECTS.bone_spikes.help }

    /* - Ablative Mending - */

    env.MODIFIERS.bone_ablative.name = "Аблятивная Починка" // Ablative Mending
    env.MODIFIERS.bone_ablative.getHelp = ()=> { return env.STATUS_EFFECTS.bone_ablative.help }

    /* - Collectivism - */

    env.MODIFIERS.bone_collective.name = "Коллективизм" // Collectivism
    env.MODIFIERS.bone_collective.getHelp = ()=> { return env.STATUS_EFFECTS.bone_collective.help }

    /* - Adull's Sacrifice - */

    env.MODIFIERS.ichor_sacrifice.name = "" // Adull's Sacrifice --- мы вроде корруворкс спрашивали об adull но. слушайте. я задумлся может они не поняли нас верно
    env.MODIFIERS.ichor_sacrifice.getHelp = ()=> { return env.STATUS_EFFECTS.ichor_sacrifice.help }

    /* - Full Strength - */

    env.MODIFIERS.ichor_strength.name = "В Полную Силу" // Full Strength
    env.MODIFIERS.ichor_strength.getHelp = ()=> { return env.STATUS_EFFECTS.ichor_strength.help }

    /* - Rotten Supplies - */

    env.MODIFIERS.ichor_rotten.name = "Гнилые Припасы" // Rotten Supplies
    env.MODIFIERS.ichor_rotten.getHelp = ()=> { return env.STATUS_EFFECTS.ichor_rotten.help }

    /* - Infection - */

    env.MODIFIERS.claws_infection.name = "Инфекция" // Infection
    env.MODIFIERS.claws_infection.getHelp = ()=> { return env.STATUS_EFFECTS.claws_infection.help }

    /* - Desperation - */

    env.MODIFIERS.claws_desperation.name = "Отчаяние" // Desperation
    env.MODIFIERS.claws_desperation.getHelp = ()=> { return env.STATUS_EFFECTS.claws_desperation.help }

    /* - Rabid - */

    env.MODIFIERS.claws_rabid.name = "Бешенство" // Rabid
    env.MODIFIERS.claws_rabid.getHelp = ()=> { return env.STATUS_EFFECTS.claws_rabid.help }

    /* - Hypercritical - */

    env.MODIFIERS.eyes_hypercritical.name = "Гиперкритичность" // Hypercritical
    env.MODIFIERS.eyes_hypercritical.getHelp = ()=> { return env.STATUS_EFFECTS.eyes_hypercritical.help }

    /* - Wounded Ego - */

    env.MODIFIERS.eyes_woundedego.name = "Уязвлённое Эго" // Wounded Ego
    env.MODIFIERS.eyes_woundedego.getHelp = ()=> { return env.STATUS_EFFECTS.eyes_woundedego.help }

    /* - Betrayal - */

    env.MODIFIERS.eyes_betrayal.name = "Предательство" // Betrayal
    env.MODIFIERS.eyes_betrayal.getHelp = ()=> { return env.STATUS_EFFECTS.eyes_betrayal.help }

    /* - Laughterhouse - */

    env.MODIFIERS.light_laughterhouse.name = "Смехобойня" // Laughterhouse --- полагаю тут игра слов мол slaughterhouse. как переведем? смехобойня? хиханьки-хахоньки?
    env.MODIFIERS.light_laughterhouse.getHelp = ()=> { return env.STATUS_EFFECTS.light_laughterhouse.help }

    /* - Velzie's Glee - */

    env.MODIFIERS.light_glee.name = "Упоение Велзи" // Velzie's Glee
    env.MODIFIERS.light_glee.getHelp = ()=> { return env.STATUS_EFFECTS.light_glee.help }

    /* - Dark Eye - */

    env.MODIFIERS.light_dark.name = "Мрачный Глаз" // Dark Eye
    env.MODIFIERS.light_dark.getHelp = ()=> { return env.STATUS_EFFECTS.light_dark.help }

    /* - Abundance - */

    env.MODIFIERS.global_anti.name = "Избыток" // Abundance
    env.MODIFIERS.global_anti.getHelp = (withCurrent)=> {
                let help = `<span class='obesk-color'>FOES::+20% chance for daemon-inhabited shells to appear in place of lesser foes</span>\n<span class='bastard-color'>TEAM::+5 max HP</span>`

                if(withCurrent) {
                    let currentEffects = ""
                    let qty = env.crittaMap.getModQty("global_anti")
                    let effects = [
                        `${qty * 20}% ANTISHELL CHANCE`,
                        qty > 5 ? `+${qty - 5} ANTISHELL IMPULSE` : false,
                        `+${qty * 5} ALLY HP`,
                        `+${qty} TENSION`
                    ]

                    for (const effectString of effects) {
                        if(!effectString) continue;
                        if(currentEffects) currentEffects += ", ";
                        else currentEffects = "CURRENT EFFECT::";

                        currentEffects += effectString
                    }
                    
                    help = help + `\n${currentEffects}`
                }

                return help
            }

    /* - Welcome Storm - */

    env.MODIFIERS.global_megaglee.name = "" // Welcome Storm
    env.MODIFIERS.global_megaglee.getHelp = (withCurrent)=> {
                let help = `<span class='bastard-color'>VELZIE'S GLEE::+50% chance to trigger</span>`

                if(withCurrent) {
                    let currentEffects = ""
                    let qty = env.crittaMap.getModQty("global_megaglee")
                    let effects = [
                        `+50% VELZIE'S GLEE EFFECT CHANCE`,
                        qty > 1 ? `+${qty - 1} STATUS DURATION` : false,
                    ]

                    for (const effectString of effects) {
                        if(!effectString) continue;
                        if(currentEffects) currentEffects += ", ";
                        else currentEffects = "CURRENT EFFECT::";

                        currentEffects += effectString
                    }
                    
                    help = help + `\n${currentEffects}`
                }

                return help
            }

    /* - Escalation - */

    env.MODIFIERS.global_escalation.name = "" // Escalation
    env.MODIFIERS.global_escalation.getHelp = (withCurrent)=> {
                let help = `<span class='obesk-color'>FOES::+50% max HP</span>, but <span class='bastard-color'>most negative statuses inflicted on them have their effects drastically increased</span>`

                if(withCurrent) {
                    let currentEffects = ""
                    let qty = env.crittaMap.getModQty("global_escalation")
                    let effects = [
                        `+${qty * 50}% FOE HP`,
                        `${'+'.repeat(qty)}NEGATIVE STATUS ENHANCEMENT`
                    ]

                    for (const effectString of effects) {
                        if(!effectString) continue;
                        if(currentEffects) currentEffects += ", ";
                        else currentEffects = "CURRENT EFFECT::";

                        currentEffects += effectString
                    }
                    
                    help = help + `\n${currentEffects}`
                }

                return help
            }

    /* - Into Madness - */

    env.MODIFIERS.global_impulse_bonus.name = "" // Into Madness
    env.MODIFIERS.global_impulse_bonus.getHelp = (withCurrent)=> {
                let help = `<span class="bastard-color">impulse caches are +50% more likely,</span> but <span class="obesk-color">foes receive +1 random impulse</span>`

                if(withCurrent) {
                    let currentEffects = ""
                    let qty = env.crittaMap.getModQty("global_impulse_bonus")
                    let effects = [
                        `+${qty * 50}% IMPULSE CACHE CHANCE`,
                        `+${qty} ENEMY IMPULSE`,
                    ]

                    for (const effectString of effects) {
                        if(!effectString) continue;
                        if(currentEffects) currentEffects += ", ";
                        else currentEffects = "CURRENT EFFECT::";

                        currentEffects += effectString
                    }
                    
                    help = help + `\n${currentEffects}`
                }

                return help
            }

    /* - MANIFEST - */

    env.MODIFIERS.global_intrusive.name = "" // MANIFEST
    env.MODIFIERS.global_intrusive.getHelp = ()=> `<span class="neutral-color">øÿ°ÞÜÿ›ËÅÿ¥ÔËÿ«×Ïÿ®ØÏÿ«ÛÑÿ¦ÔÉÿ—Á¶ÿ–À´ÿ«ÖÊÿ Ì¿ÿ’½´ÿ¤ÔÏÿ¤ÙÑÿ”ËÃÿu0090ÉÄÿ¨°u008dÿu009dl</span>`
}
/* === STATS === */
cor_ru.combat['redefineStats'] = function () {
    /* - HP - */

    env.STATDATA.maxhp.display = "ХП" // HP
    env.STATDATA.maxhp.description = "'количество урона до поражения'" // 'damage taken before defeat'

    /* - OUT::x(HP) - */

    env.STATDATA.outgoingMult.display = "OUT::x(HP)" // OUT::x(HP)
    env.STATDATA.outgoingMult.description = "еще не переведено ибо я понятия не имею где оно используется" // 'multiplies all HP changes inflicted upon others'

    /* - OUT::HP - */

    env.STATDATA.outgoingFlat.display = "OUT::HP" // OUT::HP
    env.STATDATA.outgoingFlat.description = "еще не переведено ибо я понятия не имею где оно используется" // 'flat modifier to HP changes on others';'before modifiers'

    /* - OUT::x(HIT) - */

    env.STATDATA.outgoingToHit.display = "OUT::x(HIT)" // OUT::x(HIT)
    env.STATDATA.outgoingToHit.description = "еще не переведено ибо я понятия не имею где оно используется" // 'multiplies chance to hit others'

    /* - OUT::x(CRIT) - */

    env.STATDATA.outgoingCrit.display = "OUT::x(CRIT)" // OUT::x(CRIT)
    env.STATDATA.outgoingCrit.description = "еще не переведено ибо я понятия не имею где оно используется" // 'multiplies chance to crit others'

    /* - OUT::CRIT - */

    env.STATDATA.outgoingFlatCrit.display = "OUT::CRIT" // OUT::CRIT
    env.STATDATA.outgoingFlatCrit.description = "еще не переведено ибо я понятия не имею где оно используется" // 'added to base crit chance on others';'before modifiers'

    /* - IN::x(HP) - */

    env.STATDATA.incomingMult.display = "IN::x(HP)" // IN::x(HP)
    env.STATDATA.incomingMult.description = "еще не переведено ибо я понятия не имею где оно используется" // 'multiplies all HP changes inflicted upon this entity'

    /* - IN::HP - */

    env.STATDATA.incomingFlat.display = "IN::HP" // IN::HP
    env.STATDATA.incomingFlat.description = "еще не переведено ибо я понятия не имею где оно используется" // 'flat modifier to HP changes on this entity';'before modifiers'

    /* - IN::x(HIT) - */

    env.STATDATA.incomingToHit.display = "IN::x(HIT)" // IN::x(HIT)
    env.STATDATA.incomingToHit.description = "еще не переведено ибо я понятия не имею где оно используется" // 'multiplies chance to hit this entity'

    /* - IN::x(CRIT) - */

    env.STATDATA.incomingCrit.display = "IN::x(CRIT)" // IN::x(CRIT)
    env.STATDATA.incomingCrit.description = "еще не переведено ибо я понятия не имею где оно используется" // 'multiplies chance to crit this entity'

    /* - IN::CRIT - */

    env.STATDATA.incomingFlatCrit.display = "IN::CRIT" // IN::CRIT
    env.STATDATA.incomingFlatCrit.description = "еще не переведено ибо я понятия не имею где оно используется" // 'added to base crit chance against this entity';'before modifiers'
}
/* === ACTORS === */
cor_ru.combat['redefineActors'] = function () {
    /* - GENERATED - */

    env.COMBAT_ACTORS.generic.name = "GENERATED" // GENERATED
    env.COMBAT_ACTORS.generic.reactions = {
        evade: ['мимо', 'близко', 'аа'],
        crit: ['ха', 'отлично', 'получай'],
        crit_buff: ['легкотня', 'хорошо'],
        miss: ['о нет', 'я промахнулась', 'прости'],
        dead: ['...'],
        puncture: ['кровь течёт'],
        regen: ['ахх', 'приятно'],
        destabilized: ['…'],
        stun: ['ооуаа', 'ээоу'],
        laugh: ['ехехе', 'хихи', 'хаха', 'ахаха'],
        receive_hit: ['ай', 'ауч'],
        receive_crit: ['ай!', 'ауч!'],
        receive_puncture: ['меня порезало'],
        receive_buff: ['спасибо', 'очень круто'],
        receive_destabilized: ['всё расплывается'],
        receive_rez: ['я чуть не умерла?'],
        receive_carapace: ['о, броня', 'пригодится'],
        receive_repairs: ['я чувствую себя лучше', 'спасибо'],
        receive_fear: ['что это такое?', 'что оно сказало?', 'так неестественно', 'всё кажется неправильным'],
        receive_redirection: ['ох, спасибо', 'я не подведу тебя']
    }
    env.COMBAT_ACTORS.generic.reactionPersonalities.ichor = {
        evade: ["осторожно!!"],
        crit: [ "да!!", "ребята, за мной!"],
        crit_buff: [ "тебе лучше?", "тебе нужно ещё?", "я прикрою тебя!"],
        miss: ["ой!! извините... я промахнулась...", "я опять облажалась...", "àœœм!!"],
        dead: ["..."],
        puncture: ["не найдётся лишний хил?", "что? я в порядке!"],
        regen: ["чувствую себя прекрасно!!"],
        destabilized: ["..."],
        stun: ["мои руки..."],
        laugh: ["хихихихи", "ахаха!", "хиихии!", "ехехехе!"],
        sacrifice: ["так суждено..."],
        receive_hit: ["Åӣ£"],
        receive_crit: ["aꙑÓӲ=ý!!"],
        receive_puncture: ["это пустяки...", "хорошо, что это была я!"],
        receive_buff: ["мне? правда?", "что ты, не стоит!", "аа, я отплачу!"],
        receive_destabilized: ["я могу всё исправить...."],
        receive_rez: ["я вернулась? мы можем всё исправить!!"],
        receive_carapace: ["нет, я в порядке!", "щит для меня?"],
        receive_repairs: ["вот бы у нас всегда это было..."],
        receive_fear: ["это правда...?"],
        receive_redirection: ["что ты делаешь?", "но они тебя ранят!"],
    }
    env.COMBAT_ACTORS.generic.reactionPersonalities.eyes = {
        evade: ["хорошая попытка","слишком медленно"],
        crit: ["это было неизбежно","ты долго не продержишься"],
        crit_buff: ["вот, держи","не трать впустую"],
        miss: ["мне нужно сосредоточиться","мне не хватило скорости"],
        dead: ["..."],
        puncture: ["мне нужно избавиться от этого","вы слишком долго тянете","помогите мне прямо сейчас"],
        regen: ["медленное восстановление"],
        destabilized: ["..."],
        stun: ["а..."],
        laugh: ["ха ха ха ха", "хех хех", "охохо", "хмхмхм"],
        give_vulnerable: ["вон там!", "подходящий момент"],
        receive_hit: ["aaҊ","€ԐÀaa"],
        receive_crit: ["Ӭ̄ Ã¼ꙋԙeÈ"],
        receive_puncture: ["это потребует внимания","не медлите с моим лечением"],
        receive_buff: ["лучше нельзя было?","сойдёт, на пока что"],
        receive_destabilized: ["это снова происходит"],
        receive_rez: ["отлично"],
        receive_carapace: ["не продержится долго","мне понадобится дальнейшая защита"],
        receive_repairs: ["лучше, чем ничего"],
        receive_fear: ["я...","что...","но...",],
        receive_redirection: ["прекрати тратить время и бей их","по тебе всё ещё будут попадать"],
    }
    env.COMBAT_ACTORS.generic.reactionPersonalities.claws = {
        evade: ["ха! ХА ХА!!","ХА! идиот!!"],
        crit: ["ГОРИ! КРОВОТОЧЬ! УМРИ УМРИ УМРИ!","РЕЗНЯ!","УМРИУМРИУМРИУМРИУМРИУМРИ","СДОХНИ!"],
        crit_buff: ["всегда ПОЖАЛУЙСТА!","теперь УБЕЙ ИХ!"],
        miss: ["ПОМРИ УЖЕ!","ԣÔœþ}Ó !","ºЄÄЭ’Є×!!!","БЕСПОЛЕЗНО!!"],
        dead: ["..."],
        puncture: ["я не могу так драться!!!","помогите мне! СЕЙЧАС СЕЙЧАС СЕЙЧАС!"],
        regen: ["лучше чем раньше..!","заживает СЛИШКОМ ДОЛГО!"],
        destabilized: ["...","...","...","хихеôíхôехе"],
        stun: ["эåэаааåауу"],
        laugh: ["эхехехихихХИХЕХАХАХАХА!!","ААХАХАХАА!!","ХАА! ахаха!!","ихихИИХехех!!"],
        receive_hit: ["eåe!"],
        receive_crit: ["€EÙÓь#Ы̃Ã¼Ө","ÃЍáӬ!!"],
        receive_puncture: ["АЙ!","ты РАСПЛАТИШЬСЯ за это!","ты-- Я ТЕБЯ ГРОХНУ!"],
        receive_buff: ["превосходно!", "они РАСПЛАВЯТСЯ под нами!!", "ну НАКОНЕЦ-ТО!"],
        receive_destabilized: ["СДОХНИ!! СДОХНИ СДОХНИ сдохни СДОХНИ сдохни сдохни СДОХНИ!","ХИХИХӤХæ æАА!!!!"],
        receive_rez: ["НИЧТО меня не остановит! НИЧТО!","время УМИРАТЬ!"],
        receive_carapace: ["на мне не оставят ни царапины!!"],
        receive_repairs: ["отлично! ещё, СЕЙЧАС!","тьфу!! наконец-то!!"],
        receive_fear: ["это... НИЧЕГО не меняет...!","фу...","эууехх"],
        receive_redirection: ["лучше ТЕБЯ чем МЕНЯ!"],
    }
    env.COMBAT_ACTORS.generic.reactionPersonalities.bone = { 
        evade: ["ты правда думал, что это меня заденет?", "не так просто"],
        crit: [ "ты не пройдёшь", "я разобью тебя вдребезги" ],
        crit_buff: [ "не дай мне пожалеть об этом"],
        miss: ["ßԬщ"],
        dead: ["..."],
        puncture: ["я займусь этим", "должно же у меня быть что-то от кровотечений"],
        regen: ["неплохо..."],
        destabilized: ["..."],
        stun: ["что--?"],
        laugh: ["хех", "хах", "охо", "хмх"],
        receive_crit: ["злая шутка", "теперь я тебя вижу"],
        receive_puncture: ["меня это не остановит"],
        receive_buff: ["чувствую себя нормально"],
        receive_destabilized: ["вы все такие хрупкие...", "вам никогда не пройти через меня"],
        receive_rez: ["снова здесь...", "по крайней мере я могу вам доверять"],
        receive_carapace: ["tони не пробьют это", "замечательно"],
        receive_fear: ["нет--они мне друзья!!", "они бы никогда..."],
        give_redirection: ["держись за мной", "смотрите на меня!"],
        receive_redirection: ["мне не нужна твоя помощь"],
    }
    env.COMBAT_ACTORS.generic.reactionPersonalities.light = {
        evade: ["я всё видела!!","а я здеЁ́есь ихихи","мимо мимо мимо ахахаха!!!","безмозглая штука!"],
        crit: ["AХAХA", "Д«¶¾ңК!!!", "это ⱵĀ̱Ш¬¶ мир!"],
        crit_buff: ["жизнь буквальн¬о так проста", "я вижу ÷ú*¼клетки...!", "не волнуйся, подруга!!", "доверьсся мнеÉe"],
        miss: ["ихихиХАХА", "оо нееет ахаха!!", "глупый! глуп½ый!!", "что!! нечестно!!!", "используй сосредоточение тупица!!"],
        dead: ["хахаå÷ӱ́*¼-- ...","ХA«¶¾ß-- ...","«хихи-- ...","хa®½-- ..."],
        puncture: ["айй хахаа", "помогите! помог&5«ите мнeœ пºQôuгите мНÆ!", "алооооо?? ПОМОГИТЕ!!", "у меня есть кровь??", "ооо хаха вот эт̌ о нԙ оҹенҍ¯љ хорøш+¤"],
        regen: ["даа¬"],
        destabilized: ["у мæ¬îV°0ня голос смешной", "хахааå¬¬х#±ааахаха", "поч*¼u-„увствуҋ ӭ́„то¤"],
        stun: ["тяжелоо","я хочу свою очередььь","скỾкотеǶьь[Œÿ:ä‘","та к т упо","с кучно",],
        laugh: ["ахаАХȺȀ","ээ́э͏̆хехихихɇ","aХAХAaхУС§“&И‘Ì¥‹гµӟ={ӳa","хии хии²<®¿хии!!","ԕԕихихиӽихиӣ","ХẴӾ̊ Ẫ¬"],
        receive_crit: ["уааа сильно", "хахаа б ам","н не смш нно",],
        receive_puncture: ["прошло ‰на®скво¢зь”¨","%—ХÀÀ ä̌й Ɐй",],
        receive_buff: ["даа@¼±¬АА","хa/¯qхaœ'хa",],
        receive_destabilized: ["•±ТЕПЕРЬ я сделаю им БОЛЬНО>!", "я зн¨аю ˜с¥троки","ХОРОШО","сте¼на ҭрЕ°скӓеˆ.тся̄",],
        receive_rez: ["в новом теле!! а старое?","ахахааа спасибо тебе подруга","прямикӫм иЗ моря!¡!",],
        receive_carapace: ["круто!! круто!!","так круто смотрится на мнее",],
        receive_repairs: ["пприятно"],
        receive_fear: ["фальшь... фальши¤’*вые чувства всё фальшивое","это всё ч¬то есть на св/ете?¢¤?", "я не хочу возвращать¢я","помоꙩги̃те мне помоӺи‡те", "где мы??","я н‰е хочӱ́®¼ так җ‡!¦ить",],
        receive_redirection: ["будто одно тело!! хаха!!", "смело! ты мне нравишься!!"],
    }
    env.COMBAT_ACTORS.generic.cor_ru = {
        gender: 1
    }

    /* - Container - */

    env.COMBAT_ACTORS.container.name = "Контейнер" // Container
    env.COMBAT_ACTORS.container.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.container.cor_ru = {
        name: {
            gen: "Контейнера",
            dat: "Контейнеру", 
            acc: "Контейнер", 
            ins: "Контейнером", 
            pre: "Контейнере"
        },
        gender: 0
    }

    /* - Spire Attendant - */

    env.COMBAT_ACTORS.attendant.name = "Слуга Шпиля" // Spire Attendant
    env.COMBAT_ACTORS.attendant.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.attendant.cor_ru = {
        name: {
            gen: "Слуги Шпиля",
            dat: "Слуге Шпиля", 
            acc: "Слугу Шпиля", 
            ins: "Слугой Шпиля", 
            pre: "Слуге Шпиля"
        },
        gender: 0
    }

    /* - Tendril - */

    env.COMBAT_ACTORS.tendrils.name = "Отросток" // Tendril
    env.COMBAT_ACTORS.tendrils.cor_ru = {
        name: {
            gen: "Отростка",
            dat: "Отростку", 
            acc: "Отростка", 
            ins: "Отростком", 
            pre: "Отростке"
        },
        gender: 0
    }

    /* - Veilklight - */

    env.COMBAT_ACTORS.veilklight.name = "Вейлькосвет" // Veilklight
    env.COMBAT_ACTORS.veilklight.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.veilklight.cor_ru = {
        name: {
            gen: "Вейлькосвета",
            dat: "Вейлькосвету", 
            acc: "Вейлькосвет", 
            ins: "Вейлькосветом", 
            pre: "Вейлькосвете"
        },
        gender: 0
    }

    /* - Golem - */

    env.COMBAT_ACTORS.tutorial_golem.name = "Голем" // Golem
    env.COMBAT_ACTORS.tutorial_golem.cor_ru = {
        name: {
            gen: "Голема",
            dat: "Голему", 
            acc: "Голема", 
            ins: "Големом", 
            pre: "Големе"
        },
        gender: 0
    }

    /* - Movefoe - */

    env.COMBAT_ACTORS.enemy_movefriend.name = "Движевраг" // Movefoe
    env.COMBAT_ACTORS.enemy_movefriend.cor_ru = {
        name: {
            gen: "Движеврага",
            dat: "Движеврагу", 
            acc: "Движеврага", 
            ins: "Движеврагом", 
            pre: "Движевраге"
        },
        gender: 0
    }

    /* - Movefoe - */

    env.COMBAT_ACTORS.enemy_movefriend_lowintensity.name = "Движевраг" // Movefoe
    env.COMBAT_ACTORS.enemy_movefriend_lowintensity.cor_ru = {
        name: {
            gen: "Движеврага",
            dat: "Движеврагу", 
            acc: "Движеврага", 
            ins: "Движеврагом", 
            pre: "Движевраге"
        },
        gender: 0
    }

    /* - Archival Golem - */

    env.COMBAT_ACTORS.archival_golem.name = "Архивный голем" // Archival Golem
    env.COMBAT_ACTORS.archival_golem.cor_ru = {
        name: {
            gen: "Архивного голема",
            dat: "Архивному голему", 
            acc: "Архивного голема", 
            ins: "Архивным големом", 
            pre: "Архивном големе"
        },
        gender: 0
    }

    /* - BSTRDlight - */

    env.COMBAT_ACTORS.bstrdlight.name = "СВЛЧсвет" // BSTRDlight
    env.COMBAT_ACTORS.bstrdlight.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.bstrdlight.cor_ru = {
        name: {
            gen: "СВЛЧсвета",
            dat: "СВЛЧсвету", 
            acc: "СВЛЧсвет", 
            ins: "СВЛЧсветом", 
            pre: "СВЛЧсвете"
        },
        gender: 0
    }

    /* - Jutskin - */

    env.COMBAT_ACTORS.maintcloak.name = "Жаткожец" // Jutskin
    env.COMBAT_ACTORS.maintcloak.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.maintcloak.cor_ru = {
        name: {
            gen: "Жаткожца",
            dat: "Жаткожцу", 
            acc: "Жаткожца", 
            ins: "Жаткожцем", 
            pre: "Жаткожце"
        },
        gender: 0
    }

    /* - BSTRD Golem - */

    env.COMBAT_ACTORS.bstrdboss.name = "СВЛЧЬ Голем" // BSTRD Golem
    env.COMBAT_ACTORS.bstrdboss.reactions = {
        receive_destabilized: ['ВOаoOАУ'],
        receive_rez: ['АХАХА :^) GOT U'], // ---
        puncture: ['OOУУЭУ'],
        destabilized: ['ДВОЙНЫЕ ПУЛИ !!']
    }
    env.COMBAT_ACTORS.bstrdboss.cor_ru = {
        name: {
            gen: "СВЛЧЬ голема",
            dat: "СВЛЧЬ голему", 
            acc: "СВЛЧЬ голема", 
            ins: "СВЛЧЬ големом", 
            pre: "СВЛЧЬ големе"
        },
        gender: 0
    }

    /* - BSTRD Golem - */

    env.COMBAT_ACTORS.bstrdboss.name = "СВЛЧЬ Голем" // BSTRD Golem
    env.COMBAT_ACTORS.bstrdboss.reactions = {
        receive_destabilized: ['ВOаoOАУ'],
        receive_rez: ['АХАХА :^) GOT U'], // ---
        puncture: ['OOУУЭУ'],
        destabilized: ['ДВОЙНЫЕ ПУЛИ !!']
    }
    env.COMBAT_ACTORS.bstrdboss.cor_ru = {
        name: {
            gen: "СВЛЧЬ голема",
            dat: "СВЛЧЬ голему", 
            acc: "СВЛЧЬ голема", 
            ins: "СВЛЧЬ големом", 
            pre: "СВЛЧЬ големе"
        },
        gender: 0
    }

    /* - Pain Shelf - */

    env.COMBAT_ACTORS.bstrdshelf.name = "Шкаф Боли" // Pain Shelf
    env.COMBAT_ACTORS.bstrdshelf.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.bstrdshelf.cor_ru = {
        name: {
            gen: "Шкафа Боли",
            dat: "Шкафу Боли", 
            acc: "Шкаф Боли", 
            ins: "Шкафом Боли", 
            pre: "Шкафе Боли"
        },
        gender: 0
    }

    /* - Akizet - */

    env.COMBAT_ACTORS.akizet.name = "Акизет" // Akizet
    env.COMBAT_ACTORS.akizet.reactions = {
        evade: ['чуть не попало', 'oaa!', 'почти...'],
        crit: [()=>env.combat.has('husk') || env.rpg.is2D ? "прочь!" : "превосходно!"],
        crit_buff: [()=>env.combat.has('husk') || env.rpg.is2D ? "отлично" : "легко!"],
        miss: ['œ¦êA'],
        dead: ['...'],
        receive_hit: ['@#Æ$Ж'],
        receive_crit: ['ЬÃÆМ!!'],
        receive_puncture: ['бывало и хуже', 'знакомое ощущение'],
        receive_buff: ['спасибо', 'мы неостановимы'],
        receive_destabilized: ['каждая клетка... пробуждённая...'],
        receive_rez: ['было близко...'],
        puncture: ['мне нужно заделать это', ()=>env.combat.has('tozik') ? "тозик!" : "мне нужна помощь!", ()=>env.combat.has('cavik') ? "кавик!" : "восстановители?!"],
        regen: ['пойдёт', 'лучше...'],
        destabilized: ['...'],
        stun: ['мои руки...'],
        receive_carapace: ['эта броня...!', 'очень хорошо'],
        receive_repairs: ['спасибо, кавик', 'лучше!'],
        receive_fear: ['нет, нет...', 'глаза...', 'да простит меня велзи'],
        receive_redirection: ['вместе!', 'спасибо, друг мой', 'мы уничтожим их']
    }
    env.COMBAT_ACTORS.akizet.cor_ru = {
        name: {
            gen: "Акизет",
            dat: "Акизет", 
            acc: "Акизет", 
            ins: "Акизет", 
            pre: "Акизет"
        },
        gender: 1
    }

    /* - Gakvu - */

    env.COMBAT_ACTORS.gakvu.name = "Гакву" // Gakvu --- ????why was she ГаквуГакву
    env.COMBAT_ACTORS.gakvu.reactions = {
        evade: [()=>env.combat.has('husk') || env.rpg.is2D ? "ах!" : "хаха!", ()=>env.combat.has('husk') || env.rpg.is2D ? "нет!!" : "воуу!!"],
        crit: [()=>env.combat.has('husk') || env.rpg.is2D ? "чисто..." : "вот так вот просто", ()=>env.combat.has('husk') || env.rpg.is2D ? "ещё парочку таких..." : "вот повезло"],
        crit_buff: ['вот это идёт вон туда...'],
        miss: [()=>env.combat.has('husk') || env.rpg.is2D ? "€Öä!" : "ой...", ()=>env.combat.has('husk') || env.rpg.is2D ? "оно слишком быстрое!!" : "как жаль"],
        dead: ['...'],
        receive_crit: ['Æ!!'],
        receive_puncture: ['у меня... кровь идёт...?', 'ай!! что...'],
        receive_buff: ['спасибо'],
        receive_destabilized: ['да отвернётся же велзи'],
        receive_rez: [()=>env.combat.has('husk') || env.rpg.is2D ? "благодарю" : "мой спаситель"],
        puncture: ['такое странное чувство', 'остановите это'],
        regen: [()=>env.combat.has('husk') || env.rpg.is2D ? "уже лучше" : "как хорошо"],
        destabilized: ['...'],
        stun: ['куда делись мои глаза?!'],
        receive_carapace: ['такой тяжёлый'],
        receive_repairs: ['спасибо кавик'],
        receive_fear: ['прекрати на меня пялиться!!', 'отстань от меня!', 'нет, нет нет нет', 'что оно сказало??'],
        receive_redirection: ['бозко??']
    }
    env.COMBAT_ACTORS.gakvu.cor_ru = {
        name: {
            gen: "Гакву",
            dat: "Гакву", 
            acc: "Гакву", 
            ins: "Гакву", 
            pre: "Гакву"
        },
        gender: 1
    }

    /* - Tozik - */

    env.COMBAT_ACTORS.tozik.name = "Тозик" // Tozik
    env.COMBAT_ACTORS.tozik.reactions = {
        crit: [()=>env.combat.has('husk') || env.rpg.is2D ? "сойдёт" : "хихи"],
        crit_buff: ['держись'],
        dead: ['...'],
        receive_destabilized: ['я слышу его зов'],
        receive_rez: ['покончим с этим'],
        puncture: ['это нужно заделать'],
        destabilized: ['...'],
        stun: ['где...'],
        receive_carapace: ['спасибо'],
        receive_repairs: ['это лучше'],
        receive_fear: [()=> env.rpg.is2D ? "здесь ничего нет" : "опустошённое...", 'и всё же оно двигается', ()=> env.rpg.is2D ? "где ты?" : "что с тобой случилось?", 'не может быть', '...'],
        receive_redirection: ['я возвращу эту услугу']
    }
    env.COMBAT_ACTORS.tozik.cor_ru = {
        name: {
            gen: "Тозика",
            dat: "Тозику", 
            acc: "Тозика", 
            ins: "Тозиком", 
            pre: "Тозике"
        },
        gender: 0
    }

    /* - Tozik - */

    env.COMBAT_ACTORS.tozik_npc.name = "Тозик" // Tozik
    env.COMBAT_ACTORS.tozik_npc.reactions = {
        crit: [()=>env.combat.has('husk') || env.rpg.is2D ? "сойдёт" : "хихи"],
        crit_buff: ['держись'],
        dead: ['...'],
        receive_destabilized: ['я слышу его зов'],
        receive_rez: ['покончим с этим'],
        puncture: ['это нужно заделать'],
        destabilized: ['...'],
        stun: ['где...'],
        receive_carapace: ['спасибо'],
        receive_repairs: ['это лучше'],
        receive_fear: [()=> env.rpg.is2D ? "здесь ничего нет" : "опустошённое...", 'и всё же оно двигается', ()=> env.rpg.is2D ? "где ты?" : "что с тобой случилось?", 'не может быть', '...'],
        receive_redirection: ['я возвращу эту услугу']
    }
    env.COMBAT_ACTORS.tozik_npc.cor_ru = {
        name: {
            gen: "Тозика",
            dat: "Тозику", 
            acc: "Тозика", 
            ins: "Тозиком", 
            pre: "Тозике"
        },
        gender: 0
    }

    /* - Miltza - */

    env.COMBAT_ACTORS.miltza.name = "Милтза" // Miltza
    env.COMBAT_ACTORS.miltza.reactions = {
        evade: [()=>env.combat.has('husk') || env.rpg.is2D ? "уаа!!" : "получилось!"],
        crit: ['умри!! умри!!'],
        crit_buff: ['так лучше??'],
        miss: [()=>env.combat.has('husk') || env.rpg.is2D ? "как оно так двигается?!" : "в следующий раз"],
        dead: ['...'],
        receive_crit: ['Æöö!!'],
        receive_puncture: ['восстановители, быстрее!'],
        receive_buff: ['спасибо!'],
        receive_destabilized: ['умри УМРИ!! УМРИ!! УМРИ!!!'],
        puncture: ['я теряю целостность!'],
        stun: ['оаауууау'],
        receive_carapace: ['панцирь!'],
        receive_repairs: ['спасибо, спасибо!', 'гораздо лучше'],
        receive_fear: [()=> env.rpg.is2D ? "это не может быть реально" : "эта выглядит как...!", 'перестань...', 'велзи забери меня отсюда', 'не подходи! нет!!'],
        receive_redirection: ['что??', 'ох, спасибо!']
    }
    env.COMBAT_ACTORS.miltza.cor_ru = {
        name: {
            gen: "Милтзы",
            dat: "Милтзе", 
            acc: "Милтзу", 
            ins: "Милтзой", 
            pre: "Милтзе"
        },
        gender: 1
    }

    /* - Bozko - */

    env.COMBAT_ACTORS.bozko.name = "бозко" // Bozko
    env.COMBAT_ACTORS.bozko.reactions = {
        regen: ['...'],
        evade: ['не-а', 'не так просто'],
        crit: ['прочь от них', 'вдребезги'],
        crit_buff: ['возьми это'],
        miss: ['ßӼф'],
        destabilized: ['...'],
        dead: ['...'],
        receive_rez: ['поднимайся...'],
        receive_crit: ['ты!'],
        receive_puncture: [()=>env.combat.has('cavik') ? "кавик!" : "прошло насквозь..."],
        receive_buff: ['продолжай в том же духе'],
        receive_destabilized: ['снова слышу их...'],
        puncture: ['кровь повсюду'],
        stun: ['что--'],
        receive_carapace: ['славно'],
        receive_repairs: ['...'],
        receive_fear: ['нет...', 'не приближайся!', '...', ()=> env.rpg.is2D ? "так много погибших" : "это действительно ты...?"],
        receive_spikes: ['вперёд', 'попробуй ударить теперь...'],
        give_redirection: ['держись за мной', 'смотрите на меня!']
    }
    env.COMBAT_ACTORS.bozko.cor_ru = {
        name: {
            gen: "бозко",
            dat: "бозко", 
            acc: "бозко", 
            ins: "бозко", 
            pre: "бозко"
        },
        gender: 0
    }

    /* - Cavik - */

    env.COMBAT_ACTORS.cavik.name = "кавик" // Cavik
    env.COMBAT_ACTORS.cavik.reactions = {
        receive_hit: ['ой!!'],
        regen: ['собираюсь с силами!'],
        evade: ['о!!', 'чего?!'],
        crit: ['получай!', 'лови!'],
        crit_buff: ['должно помочь!'],
        miss: ['а!'],
        destabilized: ['...'],
        dead: ['...'],
        receive_rez: ['что случилось?!', 'я снова здесь..?'],
        receive_crit: ['ой, ай!!!'],
        receive_puncture: ['о нет...'],
        receive_buff: ['спасибо!'],
        receive_destabilized: ['мне больно', 'больно', 'кто-то здесь', 'я чувствую тебя', 'я не могу очнуться'],
        puncture: ['это нужно подлатать!'],
        stun: ['уааахх'],
        receive_fear: ['акизет!!', ()=> env.rpg.is2D ? "не говори больше! прошу!" : "я... я помню тебя...", 'держите это от меня подальше!!', 'п--помогите!', 'нет, нет нет нет'],
        receive_redirection: ['спасибо, бозко!', 'я прикрою тебя!']
    }
    env.COMBAT_ACTORS.cavik.cor_ru = {
        name: {
            gen: "кавика",
            dat: "кавику", 
            acc: "кавика", 
            ins: "кавиком", 
            pre: "кавике"
        },
        gender: 0
    }

    /* - IK Golem - */

    env.COMBAT_ACTORS.ikgolem.name = "ИК Голем" // IK Golem
    env.COMBAT_ACTORS.ikgolem.reactions = {
        receive_rez: ['ах, снова работает!'],
        regen: ['куда лучше'],
        evade: ['прекрати!', 'отражено!'],
        crit: ['ахаха...', 'невероятно!'],
        crit_buff: ['надеюсь поможет!'],
        miss: ['÷°ò!!'],
        destabilized: ['...'],
        dead: ['нет! вставай, вставай!', 'тело не отвечает!!'],
        receive_crit: ['как--?!'],
        receive_puncture: ['наш корпус!!'],
        receive_buff: ['великолепно'],
        receive_destabilized: ['что-то серьёзно не так...'],
        puncture: ['мы теряем связность!'],
        stun: ['оно не отвечает!!'],
        receive_carapace: ['больше брони! ура!'],
        receive_repairs: ['спасибо, спасибо'],
        receive_fear: ['что с тобой такое?!', 'меня тошнит...'],
        receive_redirection: ['что?', 'не стоило, но спасибо']
    }
    env.COMBAT_ACTORS.ikgolem.cor_ru = {
        name: {
            gen: "ИК голема",
            dat: "ИК голему", 
            acc: "ИК голема", 
            ins: "ИК големом", 
            pre: "ИК големе"
        },
        gender: 0
    }

    /* - Telyu - */

    env.COMBAT_ACTORS.telyu.name = "телью" // Telyu
    env.COMBAT_ACTORS.telyu.cor_ru = {
        name: {
            gen: "телью",
            dat: "телью", 
            acc: "телью", 
            ins: "телью", 
            pre: "телью"
        },
        gender: 1
    }

    /* - Husk - */

    env.COMBAT_ACTORS.husk.name = "" // Husk
    env.COMBAT_ACTORS.husk.reactions = {
        evade: ['нỄ  п˶ри Ҕሎижẳй сԙ', 'ни н а ша г', '', '', '', '', '', ''],
        crit: ['Ӱ� дi¢ö1€Oe И́', 'В Е РН ИСЬ', '', '', '', '', '', ''],
        receive_crit: ['бо ль но', '', '', '', '', '', ''],
        receive_puncture: ['г¿оሌ (‰оˇꙣ', '}&всӪª', '%�ŦЫҌ≀', '', '', '', '', '', ''],
        puncture: ['г¿оሌ (‰оˇꙣ', '}&всӪª', '%�ŦЫҌ≀', '', '', '', '', '', ''],
        receive_buff: ['µÿÁиK�ҏ%Н', '', '', '', '', '', ''],
        receive_destabilized: ['âª¥лé§ИéýÁ', 'отÆc ое дин ԙй', '', '', '', '', '', ''],
        receive_vulnerable: ['врꙗГ=ҕ¶', 'в ид и шь', '', '', '', '', '', ''],
        receive_carapace: ['MËºУ¾Ӥ', '', '', '', '', '', ''],
        receive_redirection: ['на к кон ец-то   п росн ули сь', '', '', '', '', '', ''],
        stun: ['н ар у жу на р ужу', 'н ар уж у нар уж у', '', '', '', '', '', ''],
        regen: ['м оя  пл о ть', 'бሌи ½ж ®±…е', 'б¿ ó+ Ꮑь ш.е', '', '', '', '', '', ''],
        give_fear: ['ǾТᵽ₱®Ê ±₭…นсь 0Ŧ½ÿ С%еЬჰ', '₮Ø Ƕ ꙋ ', 'Г±О̆ሎОԬНꙨ─', 'Т1Ꙑ͋̅̕  Ҫ ₸∀Нº₿ ‰ ИꚖ̆Ѣ̈СЯ̄', 'иɔтȭ ҹ€ҥиĶ ҧоˇ—Ḿоӻи м̂͒͝н∬ иĉ₮ɵԭӈ̛̄̄¿ᶄ', 'ԥО̃МøГ̄ӣ ӎҥœ пởwȣ˶ӺИ̂ ꙧԣḝ  ҦҨМѻГ̣N ӍНŒ', 'ҦꚚM̆ ӇЍ', '', '', '', '', '', '']
    }
    env.COMBAT_ACTORS.husk.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Constructor - */

    env.COMBAT_ACTORS.constructor_golem.name = "" // Constructor
    env.COMBAT_ACTORS.constructor_golem.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.constructor_golem.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Kivskin - */

    env.COMBAT_ACTORS.pressure_golem.name = "Кивкожец" // Kivskin
    env.COMBAT_ACTORS.pressure_golem.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.pressure_golem.cor_ru = {
        name: {
            gen: "Кивкожца",
            dat: "Кивкожцу", 
            acc: "Кивкожца", 
            ins: "Кивкожцем", 
            pre: "Кивкожце"
        },
        gender: 0
    }

    /* - Dullfriend - */

    env.COMBAT_ACTORS.dull_golem.name = "Сероедруг" // Dullfriend
    env.COMBAT_ACTORS.dull_golem.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.dull_golem.cor_ru = {
        name: {
            gen: "Сероедруга",
            dat: "Сероедругу", 
            acc: "Сероедруга", 
            ins: "Сероедругом", 
            pre: "Сероедруге"
        },
        gender: 0
    }

    /* - Repairfriend - */

    env.COMBAT_ACTORS.surgeon_golem.name = "" // Repairfriend
    env.COMBAT_ACTORS.surgeon_golem.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.surgeon_golem.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Golem - */

    env.COMBAT_ACTORS.basic_golem.name = "Голем" // Golem
    env.COMBAT_ACTORS.basic_golem.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.basic_golem.cor_ru = {
        name: {
            gen: "Голема",
            dat: "Голему", 
            acc: "Голема", 
            ins: "Големом", 
            pre: "Големе"
        },
        gender: 0
    }

    /* - Dozkallvi - */

    env.COMBAT_ACTORS.kivii.name = "дозкалльви" // Dozkallvi
    env.COMBAT_ACTORS.kivii.reactions = {
        evade: ['нỄ  п˶ри Ҕሎижẳй сԙ', 'ни н а ша г', '', '', '', '', '', ''],
        crit: ['Ӱ� дi¢ö1€Oe И́', 'В Е РН ИСЬ', '', '', '', '', '', ''],
        receive_crit: ['бо ль но', '', '', '', '', '', ''],
        receive_puncture: ['г¿оሌ (‰оˇꙣ', '}&всӪª', '%�ŦЫҌ≀', '', '', '', '', '', ''],
        puncture: ['г¿оሌ (‰оˇꙣ', '}&всӪª', '%�ŦЫҌ≀', '', '', '', '', '', ''],
        receive_buff: ['µÿÁиK�ҏ%Н', '', '', '', '', '', ''],
        receive_destabilized: ['âª¥лé§ИéýÁ', 'отÆc ое дин ԙй', '', '', '', '', '', ''],
        receive_vulnerable: ['врꙗГ=ҕ¶', 'в ид и шь', '', '', '', '', '', ''],
        receive_carapace: ['MËºУ¾Ӥ', '', '', '', '', '', ''],
        receive_redirection: ['на к кон ец-то   п росн ули сь', '', '', '', '', '', ''],
        stun: ['н ар у жу на р ужу', 'н ар уж у нар уж у', '', '', '', '', '', ''],
        regen: ['м оя  пл о ть', 'бሌи ½ж ®±…е', 'б¿ ó+ Ꮑь ш.е', '', '', '', '', '', ''],
        give_fear: ['ǾТᵽ₱®Ê ±₭…นсь 0Ŧ½ÿ С%еЬჰ', '₮Ø Ƕ ꙋ ', 'Г±О̆ሎОԬНꙨ─', 'Т1Ꙑ͋̅̕  Ҫ ₸∀Нº₿ ‰ ИꚖ̆Ѣ̈СЯ̄', 'иɔтȭ ҹ€ҥиĶ ҧоˇ—Ḿоӻи м̂͒͝н∬ иĉ₮ɵԭӈ̛̄̄¿ᶄ', 'ԥО̃МøГ̄ӣ ӎҥœ пởwȣ˶ӺИ̂ ꙧԣḝ  ҦҨМѻГ̣N ӍНŒ', 'ҦꚚM̆ ӇЍ', '', '', '', '', '', '']
    }
    env.COMBAT_ACTORS.kivii.cor_ru = {
        name: {
            gen: "дозкалльви",
            dat: "дозкалльви", 
            acc: "дозкалльви", 
            ins: "дозкалльви", 
            pre: "дозкалльви"
        },
        gender: 1
    }

    /* - Gauntlet - */

    env.COMBAT_ACTORS.kivii_gauntlet.name = "Перчатка" // Gauntlet
    env.COMBAT_ACTORS.kivii_gauntlet.cor_ru = {
        name: {
            gen: "Перчатки",
            dat: "Перчатке", 
            acc: "Перчатку", 
            ins: "Перчаткой", 
            pre: "Перчатке"
        },
        gender: 1
    }

    /* - Dullzika - */

    env.COMBAT_ACTORS.dull_keeper.name = "Сероезика" // Dullzika
    env.COMBAT_ACTORS.dull_keeper.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.dull_keeper.cor_ru = {
        name: {
            gen: "Сероезики",
            dat: "Сероезике", 
            acc: "Сероезику", 
            ins: "Сероезике", 
            pre: "Сероезикой"
        },
        gender: 1
    }

    /* - Warped Container - */

    env.COMBAT_ACTORS.dull_container.name = "" // Warped Container
    env.COMBAT_ACTORS.dull_container.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.dull_container.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Translation Core - */

    env.COMBAT_ACTORS.translation_golem.name = "" // Translation Core
    env.COMBAT_ACTORS.translation_golem.reactions = {
        catchall: ['████ ███', '██ ██████', '█████ ████', '███', '███ ███ ███', '███ █ ████', '██████ ██', '█ ████', '████ █ █ █'],
        dead: ['███ █ █ █ ███']
    }
    env.COMBAT_ACTORS.translation_golem.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - »õGQàº3¾õ”cR% - */

    env.COMBAT_ACTORS.hallucination.name = "»õГЪàº3¾õ”cР%" // »õGQàº3¾õ”cR%
    env.COMBAT_ACTORS.hallucination.cor_ru = {
        name: {
            gen: "»õГЪàº3¾õ”cР%",
            dat: "»õГЪàº3¾õ”cР%", 
            acc: "»õГЪàº3¾õ”cР%", 
            ins: "»õГЪàº3¾õ”cР%", 
            pre: "»õГЪàº3¾õ”cР%"
        },
        gender: 2
    }

    /* - foundation golem - */

    env.COMBAT_ACTORS.boss_golem.name = "" // foundation golem
    env.COMBAT_ACTORS.boss_golem.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.boss_golem.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Geli - */

    env.COMBAT_ACTORS.geli.name = "Джели" // Geli
    env.COMBAT_ACTORS.geli.reactions = {
        evade: ['ого!', 'аахАХаха!!'],
        crit: ['ахаха! i GOT THEM!!'], // --- помогите
        miss: ['о НЕТ!!', 'ПУЛЯ ВПУСТУЮ', 'WILL GET NEXT 1!'], // --- помогите
        dead: ['я НЕ МОГУ ДВИГАТЬСЯ'],
        receive_hit: ['АЙ'],
        receive_crit: ['ПОЧЕМУ ТАК БОЛЬНО', '>:('],
        receive_puncture: ['ПОЧЕМУ ТАК БОЛЬНО'],
        receive_buff: ['}:^)'],
        receive_destabilized: ['СНОВА ПРОСЫПАЮСЬ', 'СУПЕРПУЛЯ!!'],
        receive_rez: ['ПАСИБКИ'],
        puncture: [':('],
        regen: ['шикарДОСИК', 'ахахаАхаха!!'],
        destabilized: ['СМАРИ'],
        stun: ['уу382*((У*#*( У('],
        receive_fear: [':O', 'O_O']
    }
    env.COMBAT_ACTORS.geli.cor_ru = {
        name: {
            gen: "Джели",
            dat: "Джели", 
            acc: "Джели", 
            ins: "Джели", 
            pre: "Джели"
        },
        gender: 1
    }

    /* - BSTRD - */

    env.COMBAT_ACTORS.bstrd.name = "СВЛЧЬ" // BSTRD
    env.COMBAT_ACTORS.bstrd.reactions = {
        evade: ['8)', '0Ч ПРОСТО'],
        crit: ['Б4Х!!', 'ПаУ!!', '>%^)'],
        miss: ['БЛ', 'almost GOT U'], // --- помогите
        dead: ['аэаэу БОльНА!!'],
        receive_crit: ['АААЙЯЙЯЙЙ!!'],
        receive_puncture: ['кроьв...', 'М3НЯ БРОТКНУЛИ'],
        receive_buff: ['TIME 2 GET EM ;}'], // --- помогите
        puncture: ['ООУУЭУ'],
        regen: [':)', 'SO BACK'], // --- помогите
        stun: ['НЕ МОГУ ЦЕЛИЦА ЧЗНХ помогте'],
        receive_fear: ['ВТФ O_O'],
        receive_destabilized: ['УОаоОАУ'],
        receive_rez: ['AHAHA :^) WE BACK'], // --- помогите
        destabilized: ['ДВОЙНЫЕ ПУЛИ !!']
    }
    env.COMBAT_ACTORS.bstrd.cor_ru = {
        name: {
            gen: "СВЛЧ",
            dat: "СВЛЧ", 
            acc: "СВЛЧЬ", 
            ins: "СВЛЧЬ", 
            pre: "СВЛЧ"
        },
        gender: 0
    }

    /* - EFGY - */

    env.COMBAT_ACTORS.efgy.name = "ЭФГЯ" // EFGY
    env.COMBAT_ACTORS.efgy.reactions = {
        evade: ['O)', 'COOL BREEZE!! YAY!!'], // --- помогите?? прохладный ветерок?
        crit: ['ИЗАБЕЛЬ СМОТРИ!!', 'БАХХ~!', 'ДАДАДАДА'],
        miss: ['чаво!! джели как их бить', 'ок можно ещё раз?', 'можно я повторю свой ход'],
        dead: ['вааа!! нееет!'],
        receive_crit: ['мио ЛЕПЕСТОЧКИ!!'],
        receive_puncture: ['мне не нравится эта часть', 'мроукол'],
        receive_buff: ['OK I SHOOT BIG NEXT??'], // --- помогите
        puncture: ['ООУУЭУ'],
        regen: ['эхехиииааахахаха', 'окк!!! ура'],
        stun: ['грёза сломалась!! помогите!'],
        receive_fear: ['O'],
        receive_destabilized: ['УОаоОАУ'],
        receive_rez: ['ъæъ'],
        destabilized: ['ДВОЙНЫЕ ПУЛЬКИ !!']
    }
    env.COMBAT_ACTORS.efgy.cor_ru = {
        name: {
            gen: "ЭФГИ",
            dat: "ЭФГИ", 
            acc: "ЭФГЮ", 
            ins: "ЭФГЕЙ", 
            pre: "ЭФГИ"
        },
        gender: 1
    }

    /* - interloper - */

    env.COMBAT_ACTORS.you.name = "Лазутчик" // interloper
    env.COMBAT_ACTORS.you.cor_ru = {
        name: {
            gen: "Лазутчика",
            dat: "Лазутчику", 
            acc: "Лазутчика", 
            ins: "Лазутчиком", 
            pre: "Лазутчике"
        },
        gender: 5 // --- fuck you lopers dont get a gender
    }

    /* - WRK - */

    env.COMBAT_ACTORS.critta_pawn.name = "" // WRK
    env.COMBAT_ACTORS.critta_pawn.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - CLW - */

    env.COMBAT_ACTORS.critta_knight.name = "" // CLW
    env.COMBAT_ACTORS.critta_knight.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - NET - */

    env.COMBAT_ACTORS.critta_bishop.name = "" // NET
    env.COMBAT_ACTORS.critta_bishop.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - ENFC - */

    env.COMBAT_ACTORS.critta_rook.name = "" // ENFC
    env.COMBAT_ACTORS.critta_rook.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - SEER - */

    env.COMBAT_ACTORS.critta_queen.name = "" // SEER
    env.COMBAT_ACTORS.critta_queen.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - ARCHN - */

    env.COMBAT_ACTORS.critta_king.name = "" // ARCHN
    env.COMBAT_ACTORS.critta_king.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - DCT - */

    env.COMBAT_ACTORS.critta_jester.name = "" // DCT
    env.COMBAT_ACTORS.critta_jester.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - SPWN - */

    env.COMBAT_ACTORS.critta_spawner.name = "" // SPWN
    env.COMBAT_ACTORS.critta_spawner.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - IDEA - */

    env.COMBAT_ACTORS.critta_spawner_bee.name = "" // IDEA
    env.COMBAT_ACTORS.critta_spawner_bee.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - IMP - */

    env.COMBAT_ACTORS.critta_impetus.name = "" // IMP
    env.COMBAT_ACTORS.critta_impetus.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Firmament - */

    env.COMBAT_ACTORS.critta_boss.name = "" // Firmament
    env.COMBAT_ACTORS.critta_boss.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Firmament - */

    env.COMBAT_ACTORS.critta_boss_boat.name = "" // Firmament --- небосвод/купол?
    env.COMBAT_ACTORS.critta_boss_boat.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - WRK - --- мы переводим вообще этих челов?*/ 

    env.COMBAT_ACTORS.critta_pawn_boat.name = "" // WRK
    env.COMBAT_ACTORS.critta_pawn_boat.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - CLW - */

    env.COMBAT_ACTORS.critta_knight_boat.name = "" // CLW
    env.COMBAT_ACTORS.critta_knight_boat.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - NET - */

    env.COMBAT_ACTORS.critta_bishop_boat.name = "" // NET
    env.COMBAT_ACTORS.critta_bishop_boat.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - ARCHN - */

    env.COMBAT_ACTORS.critta_king_boat.name = "" // ARCHN
    env.COMBAT_ACTORS.critta_king_boat.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - SEER - */

    env.COMBAT_ACTORS.critta_queen_boat.name = "" // SEER
    env.COMBAT_ACTORS.critta_queen_boat.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - DCT - */

    env.COMBAT_ACTORS.critta_jester_boat.name = "" // DCT
    env.COMBAT_ACTORS.critta_jester_boat.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Antishell - */

    env.COMBAT_ACTORS.falsecritta.name = "Противоболочка" // Antishell
    env.COMBAT_ACTORS.falsecritta.cor_ru = {
        name: {
            gen: "Противоболочки",
            dat: "Противоболочке", 
            acc: "Противоболочку", 
            ins: "Противоболочкой", 
            pre: "Противоболочке"
        },
        gender: 1
    }

    /* - ??? - */

    env.COMBAT_ACTORS.intrusive.name = "???" // ???
    env.COMBAT_ACTORS.intrusive.reactions = {
        evade: ['LD C'], // это как
        crit: ['D ML'],
        crit_buff: ['BL'],
        miss: ['CL'],
        dead: ['P N'],
        receive_hit: ['IL D'],
        receive_crit: ['I LB P'],
        receive_puncture: ['I A D'],
        receive_buff: ['P BD'],
        receive_destabilized: ['S', 'T', 'Q'],
        receive_rez: ['U P'],
        puncture: ['DL'],
        regen: ['DC'],
        destabilized: ['S', 'T', 'Q'],
        stun: ['NDN'],
        receive_carapace: ['E'],
        receive_fear: ['I P'],
        receive_redirection: ['PDP']
    }
    env.COMBAT_ACTORS.intrusive.cor_ru = {
        name: {
            gen: "???",
            dat: "???", 
            acc: "???", 
            ins: "???", 
            pre: "???"
        },
        gender: 2
    }

    /* - ??? - */

    env.COMBAT_ACTORS.intrusive_blocker.name = "???" // ???
    env.COMBAT_ACTORS.intrusive_blocker.reactions = {
        evade: ['LD C'],
        crit: ['D ML'],
        crit_buff: ['BL'],
        miss: ['CL'],
        dead: ['P N'],
        receive_hit: ['IL D'],
        receive_crit: ['I LB P'],
        receive_puncture: ['I A D'],
        receive_buff: ['P BD'],
        receive_destabilized: ['S', 'T', 'Q'],
        receive_rez: ['U P'],
        puncture: ['DL'],
        regen: ['DC'],
        destabilized: ['S', 'T', 'Q'],
        stun: ['NDN'],
        receive_carapace: ['E'],
        receive_fear: ['I P'],
        receive_redirection: ['PDP']
    }
    env.COMBAT_ACTORS.intrusive_blocker.cor_ru = {
        name: {
            gen: "???",
            dat: "???", 
            acc: "???", 
            ins: "???", 
            pre: "???"
        },
        gender: 2
    }

    /* - ??? - */

    env.COMBAT_ACTORS.intrusive_archival.name = "???" // ???
    env.COMBAT_ACTORS.intrusive_archival.reactions = {
        evade: ['LD C'],
        crit: ['D ML'],
        crit_buff: ['BL'],
        miss: ['CL'],
        dead: ['P N'],
        receive_hit: ['IL D'],
        receive_crit: ['I LB P'],
        receive_puncture: ['I A D'],
        receive_buff: ['P BD'],
        receive_destabilized: ['S', 'T', 'Q'],
        receive_rez: ['U P'],
        puncture: ['DL'],
        regen: ['DC'],
        destabilized: ['S', 'T', 'Q'],
        stun: ['NDN'],
        receive_carapace: ['E'],
        receive_fear: ['I P'],
        receive_redirection: ['PDP']
    }
    env.COMBAT_ACTORS.intrusive_archival.cor_ru = {
        name: {
            gen: "???",
            dat: "???", 
            acc: "???", 
            ins: "???", 
            pre: "???"
        },
        gender: 2
    }

    /* - ??? - */

    env.COMBAT_ACTORS.intrusive_bishopfreak.name = "???" // ???
    env.COMBAT_ACTORS.intrusive_bishopfreak.reactions = {
        evade: ['LD C'],
        crit: ['D ML'],
        crit_buff: ['BL'],
        miss: ['CL'],
        dead: ['P N'],
        receive_hit: ['IL D'],
        receive_crit: ['I LB P'],
        receive_puncture: ['I A D'],
        receive_buff: ['P BD'],
        receive_destabilized: ['S', 'T', 'Q'],
        receive_rez: ['U P'],
        puncture: ['DL'],
        regen: ['DC'],
        destabilized: ['S', 'T', 'Q'],
        stun: ['NDN'],
        receive_carapace: ['E'],
        receive_fear: ['I P'],
        receive_redirection: ['PDP']
    }
    env.COMBAT_ACTORS.intrusive_bishopfreak.cor_ru = {
        name: {
            gen: "???",
            dat: "???", 
            acc: "???", 
            ins: "???", 
            pre: "???"
        },
        gender: 2
    }

    /* - ??? - */

    env.COMBAT_ACTORS.intrusive_statusoid.name = "???" // ???
    env.COMBAT_ACTORS.intrusive_statusoid.reactions = {
        evade: ['LD C'],
        crit: ['D ML'],
        crit_buff: ['BL'],
        miss: ['CL'],
        dead: ['P N'],
        receive_hit: ['IL D'],
        receive_crit: ['I LB P'],
        receive_puncture: ['I A D'],
        receive_buff: ['P BD'],
        receive_destabilized: ['S', 'T', 'Q'],
        receive_rez: ['U P'],
        puncture: ['DL'],
        regen: ['DC'],
        destabilized: ['S', 'T', 'Q'],
        stun: ['NDN'],
        receive_carapace: ['E'],
        receive_fear: ['I P'],
        receive_redirection: ['PDP']
    }
    env.COMBAT_ACTORS.intrusive_statusoid.cor_ru = {
        name: {
            gen: "???",
            dat: "???", 
            acc: "???", 
            ins: "???", 
            pre: "???"
        },
        gender: 2
    }

    /* - ??? - */

    env.COMBAT_ACTORS.intrusive_bomblet.name = "???" // ???
    env.COMBAT_ACTORS.intrusive_bomblet.reactions = {
        evade: ['LD C'],
        crit: ['D ML'],
        crit_buff: ['BL'],
        miss: ['CL'],
        dead: ['P N'],
        receive_hit: ['IL D'],
        receive_crit: ['I LB P'],
        receive_puncture: ['I A D'],
        receive_buff: ['P BD'],
        receive_destabilized: ['S', 'T', 'Q'],
        receive_rez: ['U P'],
        puncture: ['DL'],
        regen: ['DC'],
        destabilized: ['S', 'T', 'Q'],
        stun: ['NDN'],
        receive_carapace: ['E'],
        receive_fear: ['I P'],
        receive_redirection: ['PDP']
    }
    env.COMBAT_ACTORS.intrusive_bomblet.cor_ru = {
        name: {
            gen: "???",
            dat: "???", 
            acc: "???", 
            ins: "???", 
            pre: "???"
        },
        gender: 2
    }

    /* - sandbox - */

    env.COMBAT_ACTORS.sandboxer.name = "песочница" // sandbox
    env.COMBAT_ACTORS.sandboxer.cor_ru = {
        name: {
            gen: "песочницы",
            dat: "песочнице", 
            acc: "песочницу", 
            ins: "песочницей", 
            pre: "песочнице"
        },
        gender: 1
    }

    /* - idiot - */

    env.COMBAT_ACTORS.cutscenedriver.name = "идиот" // idiot
    env.COMBAT_ACTORS.cutscenedriver.cor_ru = {
        name: {
            gen: "идиота",
            dat: "идиоту", 
            acc: "идиота", 
            ins: "идиотом", 
            pre: "идиоте"
        },
        gender: 0
    }

    /* - idiot - */

    env.COMBAT_ACTORS.arch_dummy.name = "идиот" // idiot
    env.COMBAT_ACTORS.arch_dummy.cor_ru = {
        name: {
            gen: "идиота",
            dat: "идиоту", 
            acc: "идиота", 
            ins: "идиотом", 
            pre: "идиоте"
        },
        gender: 0
    }

    /* - Mass - */

    env.COMBAT_ACTORS.arch_formless.name = "" // Mass
    env.COMBAT_ACTORS.arch_formless.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Enraged - */

    env.COMBAT_ACTORS.arch_formless_enraged.name = "" // Enraged
    env.COMBAT_ACTORS.arch_formless_enraged.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Figure - */

    env.COMBAT_ACTORS.arch_puncher.name = "" // Figure
    env.COMBAT_ACTORS.arch_puncher.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Attendant - */

    env.COMBAT_ACTORS.arch_harasser.name = "" // Attendant
    env.COMBAT_ACTORS.arch_harasser.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Shape - */

    env.COMBAT_ACTORS.arch_bomber.name = "" // Shape
    env.COMBAT_ACTORS.arch_bomber.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Glazika - */

    env.COMBAT_ACTORS.arch_channeler.name = "" // Glazika
    env.COMBAT_ACTORS.arch_channeler.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Horror - */

    env.COMBAT_ACTORS.arch_charger.name = "" // Horror
    env.COMBAT_ACTORS.arch_charger.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Golem - */

    env.COMBAT_ACTORS.arch_puller.name = "" // Golem
    env.COMBAT_ACTORS.arch_puller.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Jutskin - */

    env.COMBAT_ACTORS.arch_support.name = "Жаткожец" // Jutskin
    env.COMBAT_ACTORS.arch_support.cor_ru = {
        name: {
            gen: "Жаткожца",
            dat: "Жаткожцу", 
            acc: "Жаткожца", 
            ins: "Жаткожцем", 
            pre: "Жаткожце"
        },
        gender: 0
    }

    /* - Display - */

    env.COMBAT_ACTORS.destructible_table.name = "" // Display
    env.COMBAT_ACTORS.destructible_table.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Altar - */

    env.COMBAT_ACTORS.destructible_adull.name = "" // Altar
    env.COMBAT_ACTORS.destructible_adull.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Pillar - */

    env.COMBAT_ACTORS.destructible_minishelf.name = "" // Pillar
    env.COMBAT_ACTORS.destructible_minishelf.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Container - */

    env.COMBAT_ACTORS.destructible_box.name = "" // Container
    env.COMBAT_ACTORS.destructible_box.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Material Rift - */

    env.COMBAT_ACTORS.rift_item.name = "" // Material Rift
    env.COMBAT_ACTORS.rift_item.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - ??? - */

    env.COMBAT_ACTORS.vekoa_boss.name = "???" // ???
    env.COMBAT_ACTORS.vekoa_boss.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.vekoa_boss.cor_ru = {
        name: {
            gen: "???",
            dat: "???", 
            acc: "???", 
            ins: "???", 
            pre: "???"
        },
        gender: 1
    }

    /* - Archivist - */

    env.COMBAT_ACTORS.spine_archivist.name = "" // Archivist
    env.COMBAT_ACTORS.spine_archivist.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Keeper - */

    env.COMBAT_ACTORS.spine_keeper.name = "" // Keeper
    env.COMBAT_ACTORS.spine_keeper.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Tendril - */

    env.COMBAT_ACTORS.destructible_heart_wall.name = "" // Tendril
    env.COMBAT_ACTORS.destructible_heart_wall.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Interfering Tendril - */

    env.COMBAT_ACTORS.destructible_split_tendril_1.name = "" // Interfering Tendril
    env.COMBAT_ACTORS.destructible_split_tendril_1.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Interfering Tendril - */

    env.COMBAT_ACTORS.destructible_split_tendril_2.name = "" // Interfering Tendril
    env.COMBAT_ACTORS.destructible_split_tendril_2.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Eye - */

    env.COMBAT_ACTORS.split_eye.name = "" // Eye
    env.COMBAT_ACTORS.split_eye.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Miltza? - */

    env.COMBAT_ACTORS.split_miltza.name = "Милтза?" // Miltza?
    env.COMBAT_ACTORS.split_miltza.cor_ru = {
        name: {
            gen: "Милтзы?",
            dat: "Милтзе?", 
            acc: "Милтзу?", 
            ins: "Милтзой?", 
            pre: "Милтзе?"
        },
        gender: 1
    }

    /* - Spinal Root - */

    env.COMBAT_ACTORS.destructible_spineroot.name = "" // Spinal Root
    env.COMBAT_ACTORS.destructible_spineroot.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Golem - */

    env.COMBAT_ACTORS.lesser_itzil.name = "" // Golem
    env.COMBAT_ACTORS.lesser_itzil.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Kiv - */

    env.COMBAT_ACTORS.lesser_kivii.name = "" // Kiv
    env.COMBAT_ACTORS.lesser_kivii.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - ??? - */

    env.COMBAT_ACTORS.lesser_itzka.name = "" // ???
    env.COMBAT_ACTORS.lesser_itzka.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Pod - */

    env.COMBAT_ACTORS.destructible_lesserpod.name = "" // Pod
    env.COMBAT_ACTORS.destructible_lesserpod.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Vekoa - */

    env.COMBAT_ACTORS.vekoa_1v1.name = "" // Vekoa
    env.COMBAT_ACTORS.vekoa_1v1.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - ceremony - */

    env.COMBAT_ACTORS.vekoa_eye.name = "" // ceremony
    env.COMBAT_ACTORS.vekoa_eye.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Interfering Tendril - */

    env.COMBAT_ACTORS.destructible_split_tendril_3.name = "" // Interfering Tendril
    env.COMBAT_ACTORS.destructible_split_tendril_3.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Interfering Tendril - */

    env.COMBAT_ACTORS.destructible_split_tendril_4.name = "" // Interfering Tendril
    env.COMBAT_ACTORS.destructible_split_tendril_4.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - epicenter - */

    env.COMBAT_ACTORS.vekoa_epicenter_projectile.name = "" // epicenter
    env.COMBAT_ACTORS.vekoa_epicenter_projectile.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Veins - */

    env.COMBAT_ACTORS.destructible_epicenter_vein.name = "" // Veins
    env.COMBAT_ACTORS.destructible_epicenter_vein.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Golem - */

    env.COMBAT_ACTORS.vekoa_golem.name = "" // Golem
    env.COMBAT_ACTORS.vekoa_golem.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Wall - */

    env.COMBAT_ACTORS.vekoa_wall.name = "" // Wall
    env.COMBAT_ACTORS.vekoa_wall.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - Tendril - */

    env.COMBAT_ACTORS.vekoa_wall_tendril.name = "" // Tendril
    env.COMBAT_ACTORS.vekoa_wall_tendril.cor_ru = {
        name: {
            gen: "",
            dat: "", 
            acc: "", 
            ins: "", 
            pre: ""
        },
        gender: 0
    }

    /* - vekoa? - */

    env.COMBAT_ACTORS.vekoa_final.name = "Векоа?" // vekoa?
    env.COMBAT_ACTORS.vekoa_final.reactions = {
        catchall: ['1Ӱ́иë2Ъ‡', '‡eԔKßгää', '/…¿?÷ ôЛãØ', 'C©Ë', '0E™Њó¨юҌÒ', '€ЛӚé{ðҎ', 'ÇæýЭ‡ß†C', '£~Уþфâ', '…Tӱ́**'],
        dead: ['¿', '???']
    }
    env.COMBAT_ACTORS.vekoa_final.cor_ru = {
        name: {
            gen: "Векоа?",
            dat: "Векоа?", 
            acc: "Векоа?", 
            ins: "Векоа?", 
            pre: "Векоа?"
        },
        gender: 1
    }
}
/* === FORMATIONS === */
cor_ru.combat['redefineFormations'] = function() {
    /* - ?????? - */

    env.COMBAT_FORMATIONS.intrusive.name = "??????" // ??????
    env.COMBAT_FORMATIONS.intrusive.help = "" // 'unprocessable entity';'no context'

    /* - Cluster - */

    env.COMBAT_FORMATIONS.c_cluster.name = "" // Cluster
    env.COMBAT_FORMATIONS.c_cluster.help = "" // 'no single primary target';'high density of hostile thoughtforms'

    /* - Pain Shelf - */

    env.COMBAT_FORMATIONS.c_collapse_shelf.name = "" // Pain Shelf
    env.COMBAT_FORMATIONS.c_collapse_shelf.help = "" // 'primary attacks offer responsive choice';'deadly single target strikes'

    /* - Gun Golem - */

    env.COMBAT_FORMATIONS.c_collapse_gungol.name = "" // Gun Golem
    env.COMBAT_FORMATIONS.c_collapse_gungol.help = "" // 'golem utilizing assault rifle';'strikes quickly, randomly and inaccurately'

    /* - Dullzika - */

    env.COMBAT_FORMATIONS.c_golem_dullzika.name = "" // Dullzika
    env.COMBAT_FORMATIONS.c_golem_dullzika.help = "" // 'conjures puncture-inflicting foes';'destabilizes'

    /* - Greater Husk - */

    env.COMBAT_FORMATIONS.c_golem_kivii.name = "" // Greater Husk
    env.COMBAT_FORMATIONS.c_golem_kivii.help = "" // 'high density of conjoined thoughtforms';'utilizes windup attacks and fear'

    /* - DCT - */

    env.COMBAT_FORMATIONS.c_daemon_dct.name = "" // DCT
    env.COMBAT_FORMATIONS.c_daemon_dct.help = "" // 'conjures foes from nearby memories';'damaged through rapid defeat of summons';
    'prepare for many targets'

    /* - SPWN - */

    env.COMBAT_FORMATIONS.c_daemon_spwn.name = "" // SPWN
    env.COMBAT_FORMATIONS.c_daemon_spwn.help = "" // 'conjures fear and rot-inflicting foes';'wide area attacks'

    /* - IMP - */

    env.COMBAT_FORMATIONS.c_daemon_imp.name = "" // IMP
    env.COMBAT_FORMATIONS.c_daemon_imp.help = "" // 'trio';'mimics shell actions used';'unable to mimic items'
}
/* === AUGMENTS === */
cor_ru.combat['redefineAugments'] = function() {
    /* -- ALL -- */
    /* - Symbiotic Rifle - */

    env.ACTOR_AUGMENTS.all.bstrd.name = "" // Symbiotic Rifle
    env.ACTOR_AUGMENTS.all.bstrd.description = "" // 'adapted bright weaponry';'connects to internal ammunition generator';'use at cost of HP'


    /* -- FRAME -- */
    /* - Parasitic Siphon - */

    env.ACTOR_AUGMENTS.generic.parasite.name = "" // Parasitic Siphon
    env.ACTOR_AUGMENTS.generic.parasite.description = "" // 'connect corruskivi with additional sfer retrieval drone';'attach to foes for ally restoration on contact'

    /* - Ukuzu Restorative - */

    env.ACTOR_AUGMENTS.generic.optimize.name = "" // Ukuzu Restorative
    env.ACTOR_AUGMENTS.generic.optimize.description = "" // 'encourage ally to act twice at cost of lesser mending ability';'named after seasonal spore fog known to increase energy'

    /* - Final Offering - */

    env.ACTOR_AUGMENTS.generic.final_sacrifice.name = "" // Final Offering
    env.ACTOR_AUGMENTS.generic.final_sacrifice.description = "" // 'extend self beyond limits';'consume HP for extreme damage'

    /* - Distraction - */

    env.ACTOR_AUGMENTS.generic.distraction.name = "" // Distraction
    env.ACTOR_AUGMENTS.generic.distraction.description = "" // 'take a more defensive role';'attack with a clever feint and grant allies safety'

    /* - Find Flaw - */

    env.ACTOR_AUGMENTS.generic.ultra_spy.name = "" // Find Flaw
    env.ACTOR_AUGMENTS.generic.ultra_spy.description = "" // 'enhance sight';'mark enemy vulnerable to extreme critical damage'

    /* - Planned Attack - */

    env.ACTOR_AUGMENTS.generic.enact.name = "" // Planned Attack
    env.ACTOR_AUGMENTS.generic.enact.description = "" // 'recede to plot a chain of attacks';'consume evasion for extra primary usage'

    /* - Bazruka - */

    env.ACTOR_AUGMENTS.generic.bazruka.name = "" // Bazruka
    env.ACTOR_AUGMENTS.generic.bazruka.description = "" // 'upgrade explosive';'likely to cause shrapnel puncture wounds'

    /* - Frenzy - */

    env.ACTOR_AUGMENTS.generic.frenzy.name = "" // Frenzy
    env.ACTOR_AUGMENTS.generic.frenzy.description = "" // 'equip additional stabbing weaponry';'may inspire cascade of attacks'

    /* - Wild Surge - */

    env.ACTOR_AUGMENTS.generic.wild_surge.name = "" // Wild Surge
    env.ACTOR_AUGMENTS.generic.wild_surge.description = "" // 'overexert self for extreme effectiveness';'next targeted action is used across entire team'

    /* - Wound - */

    env.ACTOR_AUGMENTS.generic.wound.name = "" // Wound
    env.ACTOR_AUGMENTS.generic.wound.description = "" // 'aggressive alteration';'inflict damage increasing wound instead of weakness'

    /* - Mending Applicators - */

    env.ACTOR_AUGMENTS.generic.restorative_barrier.name = "" // Mending Applicators
    env.ACTOR_AUGMENTS.generic.restorative_barrier.description = "" // 'utilize advanced satik applicators on team';'barrier mends wounds while active'

    /* - Martyr - */

    env.ACTOR_AUGMENTS.generic.martyr.name = "" // Martyr
    env.ACTOR_AUGMENTS.generic.martyr.description = "" // 'stand before team';'redirect all incoming attacks';'retaliate'

    /* - Revise - */

    env.ACTOR_AUGMENTS.generic.revise.name = "" // Revise
    env.ACTOR_AUGMENTS.generic.revise.description = "" // 'grasp at false structures';'turn beneficial statuses against foes'

    /* - Groundsmindry Relays - */

    env.ACTOR_AUGMENTS.generic.mass_destabilize.name = "" // Groundsmindry Relays
    env.ACTOR_AUGMENTS.generic.mass_destabilize.description = "" // 'broadcast destabilizing signal';'includes allies';'fatal if misused'

    /* - Invoke Madness - */

    env.ACTOR_AUGMENTS.generic.invoke_madness.name = "" // Invoke Madness
    env.ACTOR_AUGMENTS.generic.invoke_madness.description = "" // 'utilize horrific discoveries';'terrify and confuse foes'


    /* -- BOZKO -- */
    /* - Interceptor Cores - */

    env.ACTOR_AUGMENTS.bozko.frontline.name = "" // Interceptor Cores
    env.ACTOR_AUGMENTS.bozko.frontline.description = "" // 'insert highly coordinated guiding minds into floating gauntlets';'wrest all enemy attention'

    /* - Dull Projectors - */

    env.ACTOR_AUGMENTS.bozko.cripple.name = "" // Dull Projectors
    env.ACTOR_AUGMENTS.bozko.cripple.description = "" // 'upgrade standard dull nodes to larger ones';'hit with greater concussive force'


    /* -- CAVIK -- */
    /* - Explosive Vat - */

    env.ACTOR_AUGMENTS.cavik.bazruka.name = "" // Explosive Vat
    env.ACTOR_AUGMENTS.cavik.bazruka.description = "" // 'form explosive devices rapidly from random materials with external cyst';'likely to cause shrapnel wounds'

    /* - Mending Applicators - */

    env.ACTOR_AUGMENTS.cavik.restorative_barrier.name = "" // Mending Applicators
    env.ACTOR_AUGMENTS.cavik.restorative_barrier.description = "" // 'utilize more advanced satik applicators';'upgraded barrier mends wounds while active'


    /* -- MILTZA -- */
    /* - Attack Drone - */

    env.ACTOR_AUGMENTS.miltza.drone.name = "" // Attack Drone
    env.ACTOR_AUGMENTS.miltza.drone.description = "" // 'connect to remote coordinator drone';'automatically attack vulnerable targets'


    /* -- AKIZET -- */
    /* - Surface Runner Claws - */

    env.ACTOR_AUGMENTS.akizet.runner_claws.name = "" // Surface Runner Claws
    env.ACTOR_AUGMENTS.akizet.runner_claws.description = "" // 'pair of many-pronged claw augments intended for climbing';'overhauls abilities with more visceral options'


    /* -- GAKVU -- */
    /* - Signal Inverter - */

    env.ACTOR_AUGMENTS.gakvu.countercall.name = "" // Signal Inverter
    env.ACTOR_AUGMENTS.gakvu.countercall.description = "" // 'project dangerously incoherent data from translation core';'cause violent collapse in destabilized targets'

    /* - Groundsmindry Relays - */

    env.ACTOR_AUGMENTS.gakvu.mass_destabilize.name = "" // Groundsmindry Relays
    env.ACTOR_AUGMENTS.gakvu.mass_destabilize.description = "" // 'cysts connected remotely';'broadcast destabilizing groundsmindry signal';'includes allies';'fatal if misused'


    /* -- TOZIK -- */
    /* - Parasitic Siphon - */

    env.ACTOR_AUGMENTS.tozik.parasite.name = "" // Parasitic Siphon
    env.ACTOR_AUGMENTS.tozik.parasite.description = "" // 'connect corruskivi with additional sfer retrieval drone';'attach to foes for ally restoration on contact'

    /* - Ukuzu Restorative - */

    env.ACTOR_AUGMENTS.tozik.optimize.name = "" // Ukuzu Restorative
    env.ACTOR_AUGMENTS.tozik.optimize.description = "" // 'encourage ally to act twice at cost of lesser mending ability';'named after seasonal spore fog known to increase waking energy'
}

cor_ru.combat['redefineAll'] = function() {
    cor_ru.combat.redefineActions()
    cor_ru.combat.redefineEffects()
    cor_ru.combat.redefineItems()
    cor_ru.combat.redefineHumors()
    cor_ru.combat.redefineModifiers()
    cor_ru.combat.redefineStats()
    cor_ru.combat.redefineActors()
    cor_ru.combat.redefineFormations()
    cor_ru.combat.redefineAugments()
}

/* === MISC === */
env.localization.page[page.dialoguePrefix].strings['THE TENDRILS CURL AWAY'] = "";
env.localization.page[page.dialoguePrefix].strings['THE HALLUCINATIONS FADE'] = "";
env.localization.page[page.dialoguePrefix].strings['ETHEREAL FOES FADE'] = "";

env.localization.page[page.dialoguePrefix].strings['the shell refuses, having lost their taste for this fish.'] = "";
env.localization.page[page.dialoguePrefix].strings['the shell refuses, having no taste for this fish.'] = "";

env.localization.page[page.dialoguePrefix].strings['USE ITEM'] = "ИСПОЛЬЗОВАТЬ ПРЕДМЕТ";


env.localization.page[page.dialoguePrefix].strings['? whom?'] = ""; // --- leave blank!!!!!!!!!!!!! intentional!!
env.localization.page[page.dialoguePrefix].strings['whom?'] = "КОГО?";

env.localization.page[page.dialoguePrefix].strings['DOWN'] = "ОБМОРОК";

env.localization.page[page.dialoguePrefix].strings["'remaining REGEN consumed for "] = "оставшаяся РЕГЕНЕРАЦИЯ поглощена на "
env.localization.page[page.dialoguePrefix].strings["HP"] = "ХП"
env.localization.page[page.dialoguePrefix].strings["BP"] = "БП"

env.localization.page[page.dialoguePrefix].strings["MAX::"] = "МАКС::"
env.localization.page[page.dialoguePrefix].strings["STAT::barrier:LIMITED TO 1/2 MAX HP"] = "ПАРАМЕТР::барьер:ОГРАНИЧЕН ДО 1/2 МАКС ХП"


/* === PARTY MENU === */
env.localization.page[page.dialoguePrefix].strings['ACTIVE MEMBERS'] = 'АКТИВНЫЕ УЧАСТНИКИ'
env.localization.page[page.dialoguePrefix].strings['INACTIVE MEMBERS'] = 'НЕАКТИВНЫЕ УЧАСТНИКИ'


env.localization.page[page.dialoguePrefix].strings['Surface Veteran'] = 'Ветеран Поверхности'
env.localization.page[page.dialoguePrefix].strings['Conspicuous Insider'] = 'нечисть блядская'
env.localization.page[page.dialoguePrefix].strings['Inquisitive Technician'] = 'Пытливый Техник'
env.localization.page[page.dialoguePrefix].strings['Cynical Artist'] = 'Циничная Художница'
env.localization.page[page.dialoguePrefix].strings['Hopeful Engineer'] = 'Надеющийся Инженер'
env.localization.page[page.dialoguePrefix].strings['Burdened Guardian'] = 'Обременённый Страж'
env.localization.page[page.dialoguePrefix].strings['Destructive Golem'] = 'Разрушительный Голем'


env.localization.page[page.dialoguePrefix].strings['ACTIONS'] = 'ДЕЙСТВИЯ'

env.localization.page[page.dialoguePrefix].strings['inventory'] = 'инвентарь'
env.localization.page[page.dialoguePrefix].strings['::FUNCTION::'] = '::ФУНКЦИЯ::'
env.localization.page[page.dialoguePrefix].strings['usable now or in combat::click to use'] = 'используемо сейчас или в бою::кликните для использования'
env.localization.page[page.dialoguePrefix].strings['usable in combat'] = 'используемо в бою'

/* === ACTIONDEF === */
env.localization.page[page.dialoguePrefix].strings['EFFECT'] = 'ЭФФЕКТ'

env.localization.page[page.dialoguePrefix].strings['SELF'] = 'СЕБЯ'
env.localization.page[page.dialoguePrefix].strings['OTHER'] = 'ДРУГИЕ'
env.localization.page[page.dialoguePrefix].strings['SPECIAL'] = 'ОСОБАЯ'
env.localization.page[page.dialoguePrefix].strings['LOCATION'] = 'ЛОКАЦИЯ'
env.localization.page[page.dialoguePrefix].strings['ANY'] = 'ЛЮБАЯ'

env.localization.page[page.dialoguePrefix].strings['AUTO'] = 'АВТО'

env.localization.page[page.dialoguePrefix].strings['USER'] = 'ПОЛЬЗОВАТЕЛЬ'

env.localization.page[page.dialoguePrefix].strings['T:'] = 'Х:'

env.localization.page[page.dialoguePrefix].strings["ERROR::'unknown effect'"] = "ОШИБКА::'неизвестный эффект'"
env.localization.page[page.dialoguePrefix].strings["ERROR::'missing context'"] = "ОШИБКА::'отсутствует контекст'"

env.localization.page[page.dialoguePrefix].strings["ORIGIN::"] = "ИСТОЧНИК::"
env.localization.page[page.dialoguePrefix].strings["unknown"] = "неизвестно"


/* === CSS === */
cor_ru.combat['css'] = `
.party-title::after {
    content: "ОБЕСКИ, ОСНАЩЁННЫЕ ВРЕМЯДЕРЖЦАМИ";
    display: block;
    font-family: spacemono;
    font-size: 0.75rem;
    margin: 0.5em 0 0;
}

.party-title.party-inactive::after {
    content: "OBESK ON THE SIDELINES\A CLICK & DRAG OVER ACTIVE MEMBER TO SWAP";
    white-space: pre;
}

.e4menu .party-title::after {
    content: "ОБЕСКИ, ОСНАЩЁННЫЕ ВРЕМЯДЕРЖЦАМИ\A CLICK & DRAG OVER ACTIVE MEMBER TO SWAP PREFERRED ORDER"
}

.partymember-hp::after {
    content: "ХП";
}

.item-ic::before {
    content: '::В БОЮ::' !important;
}

.item-ooc::before {
    content: "::В ПОКОЕ::" !important;
}


.actiondef-stats span[info="hit"]::before {
    content: "УДАР::" !important;
    color: var(--neutral-color);
    text-transform: uppercase;
}

.actiondef-stats span[info="target"]::before {
    content: "ЦЕЛЬ::" !important;
    color: var(--neutral-color);
    text-transform: uppercase;
}

.actiondef-stats span[info="crt"]::before {
    content: "КРИТ::" !important;
    color: var(--neutral-color);
    text-transform: uppercase;
}

.actiondef-onhit::before, 
.actiondef-oncrit::before,
.actiondef-onuse::before {
    content: "УДАР::" !important;
    color: var(--neutral-color);
}
.actiondef-oncrit::before { content: "КРИТ::" !important }
.actiondef-onuse::before { content: "ПРИМЕНЕНИЕ::" !important }

.actiondef-status.passive::after {
    content: "ПАССИВНОЕ" !important;
}
.actiondef-status.impulse::after {
    content: "ИМПУЛЬС" !important;
}

.actor:not(.dead):not(.last-stand) .hp:after, .actor:not(.dead):not(.last-stand) .hp::after {
    content: "ХП" !important;
}
.statuses .status-count::after { content: "Х)" }

`

/* === OBSERVER STUFF === */
cor_ru.combat['observer'] = {
    party: {
        func: (consolething)=>{
            if (typeof page.party != "undefined") {
                for (let i = 0; i < page.party.length; i++) {
                    if (page.party[i].combatActor != "generic") page.party[i].name = processStringTranslation(page.party[i].name)
                    page.party[i].class = processStringTranslation(page.party[i].class)
                }
            }
            processTranslation(document.querySelector(`#party-menu`))

            if (consolething != undefined) console.log(consolething[0], consolething[1]);
        },
        observe: ()=>{
            cor_ru.combat.observer.party.itself.observe(document.querySelector("#party-menu"), { childList: true, subtree: true });

            console.log("%cparty observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
        }
    },
    actiondef: {
        func: (consolething)=>{
            processTranslation(document.querySelector(`.actiondef`))

            if (consolething != undefined) console.log(consolething[0], consolething[1]);
        },
        observe: ()=>{
            cor_ru.combat.observer.actiondef.itself.observe(document.querySelector("#definition-box"), { childList: true });

            console.log("%cactiondef observer is set up! - @cor-RU", cor_ru.fancy.setobserver)
        }
    },
}

cor_ru.combat.observer.party.itself = new MutationObserver(()=>{cor_ru.combat.observer.party.func(["%cparty observed! - @cor-RU", cor_ru.fancy.observed])})
cor_ru.combat.observer.actiondef.itself = new MutationObserver(()=>{cor_ru.combat.observer.actiondef.func(["%cactiondef observed! - @cor-RU", cor_ru.fancy.observed])})


/* === LOAD === */
document.head.appendChild(document.createElement('style').appendChild(document.createTextNode(cor_ru.combat.css)).parentElement);
cor_ru.combat.redefineAll()
cor_ru.combat.eatingEffectMessage()
getLocalizationForPage(true)
cor_ru.combat.observer.party.func()
cor_ru.combat.observer.party.observe()