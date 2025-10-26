/*
    cor-RU - a russian localization mod for corru.observer;
    see https://github.com/cor-RU/cor-RU for more info

    > load.js
    just a thingy to patch up stuff after the rest of da mod is loaded!
    also a small quality of life addition: you can now walk with ya keyboard even if its toggled to a language with cyrillic alphabet
*/



cor_ru.observer.page.func()
cor_ru.processReadout()
cor_ru.observer.page.observe()

document.addEventListener('corru_resources_added', ()=>{cor_ru.updateResources()})


function stepKey(key) {
    //we don't let any steps happen under certain circumstances
    if(
        env.stage.freemove ||
        env.stage.justStepped || 
        body.classList.contains('stage-transition') || 
        body.classList.contains('cull-stage') || 
        body.classList.contains('in-dialogue') || 
        body.classList.contains('in-combat') ||
        body.classList.contains('in-melee') ||
        document.documentElement.classList.contains('cutscene') || 
        document.activeElement.tagName == 'INPUT' ||
        document.activeElement.tagName == 'TEXTAREA'
    ) {
        return
    } else {
        env.stage.justStepped = true
        setTimeout(() => {env.stage.justStepped = false}, 100)
    }

    let homeBox = stageCoordinatesFromId('creature')
    let homePlate = elementAtStageCoordinates(homeBox.x, homeBox.y)
    var targetSquare
    var moving = false
    let closeMenu = true // suggestion per @ripplesplash from corrucord - previously closed menu immediately unless it was Z

    // --- walk cyrillic style!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (key.toLowerCase() == 'ц') key = 'w'
    else if (key.toLowerCase() == 'ф') key = 'a'
    else if (key.toLowerCase() == 'ы') key = 's'
    else if (key.toLowerCase() == 'в') key = 'd'
    else if (key.toLowerCase() == 'й') key = 'q'
    else if (key.toLowerCase() == 'у') key = 'e'
    else if (key.toLowerCase() == 'я') key = 'z'

    switch(key.toLowerCase()) {
        //movement
        case "arrowup":
        case "w": //move in direction you're looking
            moving = "forward"
        break;

        case "arrowleft":
        case "a": // turn left
            if(env.pressedKeys.shift) moving = "strafeleft"
            else playerTurn({clockwise: false})
        break;

        case "arrowdown":
        case "s": //away from where you're looking
            moving = "back"
        break;

        case "arrowright":
        case "d": //turn right
            if(env.pressedKeys.shift) moving = "straferight"
            else playerTurn()
        break;	

        case "e":
            //we only want this happening on stages where it's expected
            if(document.querySelector('#stage-navigator .swap') || check("TEMP!!allowswap")) toggleSwapCam()
        break

        case "q":
            switch(body.getAttribute('quality')) {
                case "regular":
                    setQualityPreference('low')
                break

                case "low":
                    setQualityPreference('regular')
                break
            }
        break;

        case "z":
            if(page.partyMenuEnabled) togglePartyMenu()
            closeMenu = false;
        break;

        default:
            closeMenu = false;
        break;
    }

    //close any open menus
    if(body.classList.contains('in-menu') && closeMenu) exitMenu(false)

    if(moving) {
        var modifier = 1;
        if(moving == "back") modifier = -1;

        switch(env.stage.lastMoved) {
            case "up":
                if (moving === "strafeleft") targetSquare = elementAtStageCoordinates(homeBox.x + 1, homeBox.y)
                else if (moving === "straferight") targetSquare = elementAtStageCoordinates(homeBox.x - 1, homeBox.y)
                else targetSquare = elementAtStageCoordinates(homeBox.x, homeBox.y + modifier);
            break

            case "right":
                if (moving === "strafeleft") targetSquare = elementAtStageCoordinates(homeBox.x, homeBox.y - 1);
                else if (moving === "straferight") targetSquare = elementAtStageCoordinates(homeBox.x, homeBox.y + 1);
                else targetSquare = elementAtStageCoordinates(homeBox.x + modifier, homeBox.y);
            break

            case "down":
                if (moving === "strafeleft") targetSquare = elementAtStageCoordinates(homeBox.x - 1, homeBox.y);
                else if (moving === "straferight") targetSquare = elementAtStageCoordinates(homeBox.x + 1, homeBox.y);
                else targetSquare = elementAtStageCoordinates(homeBox.x, homeBox.y - modifier);
            break

            case "left":
                if (moving === "strafeleft") targetSquare = elementAtStageCoordinates(homeBox.x, homeBox.y + 1);
                else if (moving === "straferight") targetSquare = elementAtStageCoordinates(homeBox.x, homeBox.y - 1);
                else targetSquare = elementAtStageCoordinates(homeBox.x - modifier, homeBox.y);
            break
        }
    }
    
    if(targetSquare != undefined) {
        gridMoveTo(homePlate, targetSquare);
        step()
        if(!env.stage.enemyPause) enemyStep()
    }
}

page.formedDefinitionStrings = undefined // evil!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!