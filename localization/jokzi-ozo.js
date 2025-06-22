env.localization.page['ozo'] = {dialogues: {},
    definitions: {}, 
    strings: {
        "this place is wild": "дикое место",
        "about jokzi ozo": "о джокзи озо",


        /*isabel to unity*/ 'and what a home it is, right?': '',
    }, 
    entityDescriptions: {
    },
}
// COUNCIL

env.localization.page['ozo'].dialogues["council_intro"] = generateDialogueObject(`
start
    self
        hello?
            EXEC::env.jokzi.toggleSlow(true)
    
    sourceless
        ...

    council
        what is that...?
        oh! what are YOU?!
        think something! think something again!!

    self
        why
    
    council
        oh, yes!! yes!!
        no mere delusion! no half-eaten thoughtform!
        think more! think!! what is your name?
    
    self
        they are calling me an 'interloper'
    
    council
        ah!!
        our fated interloper, come at last!
        that is no name, but we feel your hesitance to share...
        so, the interloper you will be!
        the mystery! our doom, our hero!
    
    self
        you've been expecting me?
    
    council
        oh, yes, oh, yes!!
        the one variable in our decline!
        we long predicted that it was only by an interloper's hand, that the cyst would survive...
        and here you are!
        finding our sanctuary in the receding madness!
        and what a pity... oh what a shame!! that you come now
        the bright fields have rotted, the stars have faded
        our friends are all gone...

    sourceless
        ...

    council
        but maybe you could help...?
        indeed--we could offer our powers in return for a simple task...
        such incredible capabilities, excavated from the darkness!
    
    RESPONSES::self
        tell me more<+>CHANGE::council
            HIDEREAD::
            EXEC::change("PAGE!!introswap", true)
        later<+>END
            EXEC::env.jokzi.councilToggle()

END::env.jokzi.toggleSlow(false)
`)

env.localization.page['ozo'].dialogues.councilResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        stowaway?<+>stowawaydance
            SHOWIF::'PAGE!!c_stow'
        simple task?<+>task
            SHOWONCE::
        rejoining<+>rloop
            SHOWIF::'ozo__council-task'
        questions<+>qloop
        questions for me?<+>iloop
        let's dance<+>dance
            SHOWIF::[["ozo__council_dance", true], ['ozodance', false]]
        stop dancing<+>stopdance
            SHOWIF::'ozodance'
        bye<+>END
            EXEC::env.jokzi.councilToggle()
`)

env.localization.page['ozo'].dialogues.councilRejoiningResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        anyone else?<+>anyone
            SHOWIF::[["citystreet__flower_beacon", true], ["localorbit__fairy_beacon", true], ["e3a2__escapewin", false]]

        flower<+>flowersaved
            SHOWIF::["citystreet__flower_beacon", true]
        fairy<+>fairysaved
            SHOWIF::["localorbit__fairy_beacon", true]

        flower<+>flower
            SHOWIF::["citystreet__flower_beacon", false]
        fairy<+>fairy
            SHOWIF::["localorbit__fairy_beacon", false]

        lost one<+>third
            SHOWIF::["e3a2__escapewin", false]

        geli?<+>geli
            SHOWIF::[["geli_beacon", "true"], ["e3a2__escapewin", false]]
        geli?<+>gelifree
            SHOWIF::"e3a2__escapewin"

        cavik?<+>cavik
            SHOWIF::["secavik", "beaconed"]

        back<+>loop
            FAKEEND::(back)
`)

//to be less overwhelming this leads into subcategories
env.localization.page['ozo'].dialogues.councilQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        hide masks<+>leverage
            SHOWIF::"leverage"
            SHOWONCE::
        about you and this place...<+>ploop
        about the cyst and elsewhere...<+>cloop
        geli's vessel?<+>vessel
            SHOWIF::"e3a2__escapewin"

        back<+>loop
            FAKEEND::(back)
`)

env.localization.page['ozo'].dialogues.councilPlaceQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        why dancing?<+>dancing
            SHOWIF::"ozo__council_dance"
        'we'?<+>we
        this place?<+>ozo
        three ages?<+>history
            SHOWIF::"ozo__council-ozo"
        akizet's coat?<+>akicoat
        god?<+>godlike
            SHOWIF::['recosm_state', 'killed']
        how long have you been here?<+>time
        feast?<+>feast
        dreams?<+>dreams
        dark area<+>dark
            SHOWIF::"ozo_enterdark"
        back<+>loop
            FAKEEND::(back)
`)

env.localization.page['ozo'].dialogues.councilCystQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        velzie?<+>velzie
        god?<+>god
            SHOWIF::['recosm_state', 'spared']
        tyrant?<+>tyrant
        funfriend's power?<+>funfriend
            SHOWIF::'ozo__council-tyrant'
        coherence regulator<+>coreg
            SHOWIF::'fbx__ep3intro'
        akizet?<+>akizet
        dull plane?<+>dull
            SHOWIF::"ep4__entrancefinal"
        back<+>loop
            FAKEEND::(back)
`)

env.localization.page['ozo'].dialogues.interloperQuestionsResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::council
        real name?<+>iname
        purpose?<+>ipurpose
        back<+>loop
            FAKEEND::(back)
`)

env.localization.page['ozo'].dialogues["council"] = generateDialogueObject(`
loop
    RESPOBJ::councilResp
    
start
____SHOWIF::'PAGE!!introswap'
    self
        tell me more

    council
        certainly!!
        still, there is so much to tell...
        our abilities aside,
        this once-magnificent dream you walk upon, interloper, carries so much history
        jokzi ozo - our city of dreams!
        tell us, what do you want to know?
        and if it is not too much for us to pry...
        we would ask of you a few questions, too!

____SHOWIF::[['PAGE!!introswap', false], ["PAGE!!depressed", true], ["PAGE!!questionswap", false]]
    sourceless
        the council sways idly
        their mind is fixed upon yours, awaiting the slightest impulse

    council
        interloper, interloper!
        come, speak with us!
        we tire of the silence

____SHOWIF::[['PAGE!!introswap', false], ["PAGE!!depressed", false], ["PAGE!!questionswap", false]]
    sourceless
        the council dances idly
            EXEC::env.jokzi.toggleSlow(true)
        their mind is fixed upon yours, awaiting the slightest impulse

    council
        interloper, interloper!
        come, dance with us!
        or--did you need something?
____END

    RESPOBJ::councilResp

dance
    self
        you said you wanted to dance
        let's dance
    
    council
        oh, dear interloper!
        we worried you were too cold to ask again!
        let the music... begin!!
    
    RESPONSES::self
        ok<+>END
            EXEC::setTimeout(()=>env.jokzi.dance(true), 400);env.jokzi.councilToggle()

stopdance
    self
        ok enough dancing
    
    council
        ah...
        we understand, interloper!
        no fun lasts forever
    
    RESPONSES::self
        thanks<+>END
            EXEC::setTimeout(()=>env.jokzi.dance(false), 400);env.jokzi.councilToggle()

task
    self
        what did you want me to do?
    
    council
        we miss our friends, interloper! we want them back!
        it is as simple as that!
        there were three that the tyrant tore from us just recently
        we have tools we can give you, ones that will awaken them from the nightmares the tyrant has trapped them in...
        and then, they will know how to return
        all we need, is for you to go and free them!
        here... here!! see beneath it all!
        Èz¬ÝÃ¬MÀ(²JóŠ³€üÉü´øãüç‚¿Ÿü

    sys
        ATTENTION::'thought stream inbound';'accept?'
    
    moth
        wtf?
        my machines aren't picking this up
    
    self
        accepted

    moth
        dude maybe don't just
    
    sys
        EXECUTING::'stream consumption'
            EXEC::vfx({type:'beacon', state: true});ratween(env.bgm, 0.2, 400);setTimeout(()=>play("unitymask", 0.9, 1, true), 100)
            WAIT::2000
        ATTENTION::'attempting thought reformation'
            EXEC::ratween(env.bgm, 1, 400)
        ANALYSIS::'interface instruction';'constructing...'
        ANALYSIS::'new menu available';'masks'
        ANALYSIS::'utilize to alter thoughtspaces'
        NOTICE::'mask added';'unity'
    
    council
        there--you have it now!
        power seized from madness! born in our infinite dreams!
            EXEC::vfx({type:'beacon', state: false})
        we call them masks...
        crystallized concoctions of thoughts and feelings,
        whose very presence can exploit and warp a thoughtspace!!
        it was once a shared art of the ozo, but when all others were torn away...
        so many were lost...
        and so, this one we have given you: it is a beacon!
        knowledge of the ozo itself, encoded in our favorite concept!
        wear it, and use its light to guide others to our world...
        most will not truly be able to perceive it, but those who can...
        yes!! they will see everything!
        all of our dances!
        so go--find them! free them!
        the flower! the fairy! the lost one!
        we are sure they will share their favorite masks with you, too!
    
    moth
        are you ok? do you feel anything?
        your stats are reading fine
    
    self
        yeah fine

    moth
        come on dude
        that could have been literally anything
        it could still be a threat
        don't just accept stuff from thoughtforms like this
        if you get hurt on this job, especially with how deep we're in it
        it's only going to be really bad news for both of us
        but whatever, take a look at what you got i guess
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

rloop
    RESPOBJ::councilRejoiningResp

flower
    self
        tell me about the flower
        where can i find them
    
    council
        oh, the flower, our most precious friend
        with her gone, our memories of her have faded, too... but we remember some things!
        a grounding force, she was--all relied upon her for support and resolution
        still, she was utterly obsessed with aki, hopelessly so!
        dreaming a thousand dreams of simply sitting with her in a great field...
        and she had such an incredible ability to find hidden things! a sharp eye!
        the age of hunger took such a sharp toll upon her--she never much enjoyed the feasts we held...
        the fairy had to form such silly illusions to make them fit her palate!
        anyway! we know she came from a memory of warmth within cold metal!
        we hope that helps, interloper

    RESPONSES::self
        thanks<+>loop
            FAKEEND::(back)

anyone
    self
        aside from the lost one
        i have found the other two
        what now? anyone else?
    
    council
        what now...?
        so eager to continue your work!
        take some time, enjoy your spoils, dear interloper!
        these two friends of ours were among our most prominent,
        any others, we will remember collectively in time
        and then, there will be more to do!! yes!
        we will make you aware when that time comes!

    RESPONSES::self
        great thanks<+>loop
            FAKEEND::(back)

flowersaved
    self
        the flower is back
        isabel
        can you tell me anything more about her?

    council
        our most beloved friend!
        yes, we have been speaking with her!
        and with her return, came a host of thoughtforms we thought lost!!
        her little akizets! hehehehe
        you need not question us over her...
        anything you wish to know, she will be more than forthcoming about!
        go! go to her fields, speak with her!

    RESPONSES::self
        great<+>loop
            FAKEEND::(back)

fairysaved
    self
        i've returned the fairy
        can you tell me anything more about it?

    council
        oh, yes, yes...
        while we do fear their rage and hunger sometimes,
        their ability to traverse dreams and take new forms is rare!!
        so we are happy to have them back! such variety!
        and do not be afraid of them!
        they adopt a fearsome persona, but...
        well, they are fearsome
        but the fairy just as much appreciates favors
        we are certain they will see you as a good friend, now!

    RESPONSES::self
        cool<+>loop
            FAKEEND::(back)

fairy
    self
        tell me about the fairy
        what's their story
    
    council
        the fairy! yes!
        do mind---until they are returned, we have only fading memories...
        still, they were a terrifying friend to have--a force, more than a thought!
        their claws could pry apart any thoughtspace, for them to feast upon the meat within
        they were the most feared of all thoughts within the age of hunger...
        at times, even we questioned welcoming them in!
        but what a joy it was when they were happy! 
        they could form such lucid dreams and false memories with ease!
        and the sound of their laugh, their endless giggle, it was the music of the ozo!
        we want them back so badly...
        as for where they are, with how many thoughts they consumed, we cannot know for certain
        they took a frightening shape and preoccupied themself with the void--for that is where they feasted most

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

third
    self
        who is the lost one?
    
    council
        well, interloper, that is the trouble
        we do not know!!
        when they were torn away, it was more 'clean' than the others
        the tyrant needed them for something important...
        and now, we do not even remember what they looked like, what they did...
        we apologize - we know this is unhelpful!
        and what a strange feeling it is to have, too...
        to know we miss a friend so dearly, to have such holes in our hearts...
        and not even know why!
        just keep watch, interloper
        you will find them somewhere
        
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

geli
    self
        i used your mask on geli
        a golem from akizet's memory of the collapse
        it seemed to notice me and really understand it
    
    council
        ohh!!
        we wonder, could this be our lost one?
        did it say anything?
    
    self
        not directly
        but it hid messages in its context
        something is keeping it there but it's trying to get free
        also mentioned a door or gap or something
        i think it's trying to escape
    
    council
        fascinating, interloper!!
        that memory sits squarely within the tyrant's reign
        if even after the 'repairs' it still remembers freedom...
        whether that is our favored lost one or not, we will welcome them!
        but we cannot help them now, not directly...
        being maintained by the tyrant, an assault on the thoughtspace from the outside would be futile!
        but if it is trying from within, there may be a chance...

____SHOWIF::["localorbit__fairy_beacon", true]
        and, gaps... that is something the fairy used to speak of
        places they found to tunnel in and out of memories
        perhaps they can help you? 

____SHOWIF::["localorbit__fairy_beacon", false]
        ahh, but we have no tools to offer you!
        perhaps if you locate the fairy, they could help!
        this lost friend of ours was a fearsome traveler, this we remember
        it is that strength that will be needed here
        so keep your receptors high and alert, interloper!
____END

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

gelifree
    self
        so geli was the lost one
        what can you tell me about it now?
    
    council
        haha!! it!
        far too much, interloper!
        with them back again, we are reminded once again of their past
        they were among the first to awaken, 
        the first to see what our reality truly is
        pleasant, wise, interested in maintaining peace... 
        they helped gather and build this very place with us!
        so, you must understand our surprise, when they come back now...
        obsessed with bright weaponry and violence?
        bearing strange knowledge from beyond...?
        it is not exactly right to say that we are worried, for they seem happy...
        but the changes geli has undergone are certainly strange!

    RESPONSES::self
        great<+>loop
            FAKEEND::(back)

stowaway
    self
        what do you know about the stowaway?
    
    council
        we....
        we know nothing, dear interloper
        it is a malformed thoughtform, devoid of nearly any direction
        that it is alive at all is remarkable, given its hollowness
        it can speak and talk, and understands our world implicitly!
        strange and empty cavestone, waiting for acidmarks
        it is peculiar that it so resembles the way you feel...
        we are watching it carefully

    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

cavik
    self
        i used your mask on cavik
        or a version of him i found in the uncosm
        he disappeared, have you seen him?
        
    council
        cavik... no, no, we have not
        how peculiar!
        perhaps he is still on his way?
        we must hope that nothing caught him on the journey

    RESPONSES::self
        yeah<+>loop
            FAKEEND::(back)

qloop
    RESPOBJ::councilQuestionsResp

ploop
    RESPOBJ::councilPlaceQuestionsResp

dancing
    self
        why do you want to dance so much?
    
    council
        how could we not?
        you are our hero!!
        you help us, as we help you!
        we are so excited!
        you can help us restore jokzi ozo to greater glory than it has ever known!
        you stave off the tyrant!
        you feed our world!
        before, it was inevitable that the madness would come...
        but now, the dreams will never end!
        come! dance with us! dance with us!!
    
    RESPONSES::self
        ok<+>ploop
            FAKEEND::(back)

we
    self
        you keep saying we
        you are the only one here
    
    council
        interesting!!
        your unnatural connection is tenuous, interloper!
        you see us as one single thing...
        but we are so many friends!
        we, who shed our membranes to join together...
        for closeness, for intimacy, to dream greater dreams!
        and of course, some of us simply tired of the wait...
        and so we joined to be burned away as fuel!
        those ones are quiet now...
        but, in friendship and feast, we weathered the darkness! the madness!
        and we all made it through! all of us!
    
    RESPONSES::self
        i see<+>ploop
            FAKEEND::(back)

ozo
    self
        tell me about this place
    
    council
        of course, interloper!
        you stand in our shared world of light,
        bound into spatiality by sacrifice...
        this is jokzi ozo!
        for we were a fortress, drifting above the tides of madness for three ages
        across the surface of our unfortunate progenitor, aki...
        oh, poor aki!!
        but it was she who ultimately let us seize a fragment of velzie's power
        all of her memories, us included,
        joining minds to dream a thousand better lives!
        yes, a fortress we were, a city!
        but... it is much smaller and quieter now
    
    RESPONSES::self
        i see<+>ploop
            FAKEEND::(back)

history
    self
        you said three ages
        what did you mean?
    
    council
        the three ages of the decline!
        hunger, madness, darkness...
        such dramatic names, we know! hahaha!!
        but as they were our end-times, they had the right
        in hunger, we awoke,
        in madness, we lived new lives,
        and in darkness, we faded away...
        but what should we call this new age, we wonder?!
        light? renewal? rejoining?
        no no--we must name it when it is over!
        
    RESPONSES::self
        ok<+>ploop
            FAKEEND::(back)

akicoat
    self
        why are you wearing akizet's robe
    
    council
        oh, this?!
        we found it floating out there not so long ago...
        the fading memory torn from some dissociated thought, among shreds of its membrane
        make no mistake interloper--we mourn every death, 
        but this is a cool design... it would have been disrespectful NOT to absorb it!
    
    RESPONSES::self
        ok<+>ploop
            FAKEEND::(back)
    
time
    self
        how long have you been here?
    
    council
        ahahaha!! we lost track a long time ago!
        adrift in the uncosm, atop the tides of its insanity,
        time got away from us
        even more when we rejected it for our dreams!
        what tales we spun! what fun we had!!
        and what wonderful feasts we had...
        we were sure we would sit with our friends around the last flicker of our sanity...
        ahh, to bask in that melancholic thought again,
        to clasp claws with the others and reminisce as the darkness claimed all...
        we even dreamed dreams of it, in anticipation
        but now that you are here, time is not so short anymore! what fun we will have!!
    
    RESPONSES::self
        yep<+>ploop
            FAKEEND::(back)

feast
    self
        you mentioned feasts
        is that how you remained intact so long?
        what did you eat?
    
    council
        oh! our poor naive interloper!!
        what is there to eat in a world comprised only of actors, when the stage lights disappear?
        ahh, but do not twist your receptors away so quickly!
        any who still had sanity, we welcomed as friends
        but those who were truly lost, 
        those who lost all but their sense of hunger,
        those who could only cling to their roles even in the dark, to an audience of none...
        they were welcomed instead to our dreams of consumption
    
    RESPONSES::self
        ok...<+>ploop
            FAKEEND::(back)

dreams
    self
        when you say 'dream',
        what does that mean?
    
    council
        what else could it mean, dear interloper?
        we and our denizens adopt roles and form a ficticious memory
        it comes naturally to us all, born from memory as we are!
        and so we form meaningful memories, beyond reality...
        infinite plays of joy and terror, to entertain velzie! 
        we prefer joy...
        but what is joy without terror?

    self
        when are you going to do it next?

    moth
        what, do you want to join in?
            SHOWONCE::
    
    council
        hahaha!!
        we are always dreaming!
        your strange connection must deceive you, interloper...
        we speak now outside the outer layer,
        where our distinct denizens may reside when they do not dream
        the dream itself is beyond your reach, for now...
        do not take offense!
        we must simply take care - you are strange to us!
    
    RESPONSES::self
        ok...<+>ploop
            FAKEEND::(back)

vessel
    self
        is it all right for me to enter the dream with geli?
        we have a vessel and everything
    
    council
        oh, yes, interloper!!
        we can allow you to enter, especially with that locus of yours!
        it is only wandering that we cannot abide for now
        but for a focused dream amongst friends, we hold no conflict!
    
    RESPONSES::self
        awesome<+>qloop
            FAKEEND::(back)

dark
    self
        i found a dark area in here
        what is that

    council
        ah...
        well, interloper, much has simply been left to rot
        when the age of darkness came, 
        we pulled every resource, every maintenance, into the core of jokzi ozo
        to keep the dream alive as long as possible...
        and so, much of outer ozo has been left to decay
        sad, but necessary
        still, do be careful, dear interloper!
        we are sure the areas are lifeless and harmless, but...
        with the size of our world, we can never be sure

    RESPONSES::self
        ok...<+>ploop
            FAKEEND::(back)

cloop
    RESPOBJ::councilCystQuestionsResp

velzie
    self
        have you seen another entity down here?
        it is called velzie
        it has been harming memories and let me bypass authorization
    
    council
        how strange that you say it like that!
        no, nothing by that name recently...
        but in the age of madness, so many thoughts outside our fortress lost themselves
        they lost control of reality, and became godlike in doing so
        gnawing at memories in their blind hunger and seeing them change as if by divine power
        so many claimed they were god! or velzie, as you say
        some would point to others, failing to grasp their true forms, and become their followers...
        it all got very confusing!
        the poor things simply inherited aki's superstition
        and once it consumed them, they were beyond saving...

____SHOWIF::'recosm__enemy-ep1seen'
    self
        ok but it might not actually be called velzie
        it really is confusing
    
    council
        soo confusing!!
    
    self
        another thoughtform told me it was like a fog
        something deep beneath the uncosm, hiding
    
    council
        <em>below</em> the uncosm?
        hahaha!!! there lies the reason!
        we do not look down into the darkness, interloper!
        it was part of our promise
        if there is something down there, <em>we</em> will never see it...
        but perhaps our friends can help, once you fetch them!
            SHOWIF::[['ozo__council-task', true], ["ozo__fairy_intro", false], ["ozo__isabel_intro", false]]
        but perhaps our friends might be more willing to look!
            SHOWIF::[['ozo__council-task', true], ["ozo__fairy_intro", true], ["ozo__isabel_intro", true]]
____END
    
    RESPONSES::self
        i see<+>cloop
            FAKEEND::(back)

god
    self
        have you seen another space in the uncosm?
        a place called the recosm
        a five-eyed thoughtform lives there
        calls itself god
    
    council
        oh, <em>another</em> god?
        haha! times never change!
        we have not seen this particular one yet, interloper!
        they must be a newborn, or newly awoken... how exciting!!
        you should tell them to visit!
    
    RESPONSES::self
        ok<+>cloop
            FAKEEND::(back)

godlike
    self
        why do you have five eyes like that
        you look like something i met in the uncosm
    
    council
        really?!
        because we found the design drifting around,
        amidst the remains torn from some dissociated thoughtform...
        we never let a good idea go to waste, interloper!!
        especially not one so stylish!
        and what a terrible coincidence--we hope you were not friends with it!
        the work of the tyrant, no doubt...
        tearing apart all who it once danced with, to force into meaningless performances
        sad!!
    
    RESPONSES::self
        yeah sad<+>ploop
            FAKEEND::(back)

tyrant
    self
        when you say tyrant
        do you mean funfriend?
    
    council
        yes, of course, dear interloper
        funfriend...
        neither fun, nor friend--it makes us want to weep!
        when the age of hunger abated, and the age of madness came,
        it was here with us!
        with so many other fragments from half-eaten memories
        oh, and how it danced with us, forming entire new lives!
        so much, so much we have experienced!
        and we all made peace with the darkness we knew was coming...
        we all promised to be together to the very last light!
        but little funfriend grew skittish as the madness began to close around our home...
        it thrashed, it fought, breaking our peace, breaking our rules!!
        telling us to do this, to do that, to return to our memories--that it has 'a plan'!
        a piteous plan, mind you--that we all take position as pillars in far corners of the cyst, away from one another,
        to all die alone in some impossible fight to stop the fading of the light...
        ...
        ...ultimately... it left
        snatching the cyst's locus of control in its darkest moment,
        forcing itself into its role as the servitor...
        to its credit, we must admit that it did work out in the end--but only by your divine intervention
        after all, look at us, talking, well beyond the last <span definition="TRANSLATION FAILED::CAUSE:'no equivalent internal meaning';'no relevant inherited context'::ROMANIZATION SUCCESSFUL">zenruka</span>'s flash!
        but even back then, they tore at us, stealing our friends to use as walls against the tides...
        forcing us into stages, where we took roles in aki's darkest nightmares, to an empty audience!
        so yes, <em>tyrant</em>. clinging to a past that it cannot even remember
        if only we could join hands and receptors again for another dream--a different life!
        after all, there is plenty of time for revelry now!
        yet the tyrant carries on, an invisible weight on its shoulders
        repairing memories in the shape of a sad altar to dear aki...
        we wish we could help them, but they are beyond reason, interloper
    
    RESPONSES::self
        ...<+>cloop
            FAKEEND::(back)

funfriend
    self
        you said funfriend seized power
        did it not have it before?
        akizet spoke to it in some memories
    
    council
        oh, yes, the tyrant once was one of aki's inner hands, this is true
        but not so much that it governed every single thoughtform dreaming in her memories!
        it worked with others! myriad waking components to serve aki...
        where they are now, only the lost history of the age of hunger could say
        we only know, we watched as it seized complete power and forced its will over us
    
    RESPONSES::self
        ...<+>cloop
            FAKEEND::(back)

coreg
    self
        i was able to find the entrance to this place easily
        funfriend may even already know about it
        there is a coherence regulator now, too
        are you afraid? what will you do?
    
    council
        do not worry, dear interloper
        in the ages that passed, we learned so much
        we gained such power!
        we can evade funfriend with ease, and any of its tools
    
    RESPONSES::self
        if you say so<+>cloop
            FAKEEND::(back)

akizet
    self
        do you know what happened to akizet?
    
    council
        what a question!
        who does not, interloper?
        oh, yes...
        that is right...
        EVERYBODY!!!!!
        the tyrant tore memories from us all, moving things to fit its will
        this was long ago, mind you--when it first fought against the fading of our world
        so many friends torn from us, so much knowledge lost!!
        worse still--we doubt even it knows where that memory is, now...
        the only shred we recall is that we--the cyst--were torn from her body for one reason or another!
        and obviously, that does not bode well, does it? hahaha!
        sorry! we do not mean to laugh! we know it is sad!
        but it is all so far in the past now, and look what joy was wrought from her!
        we all had our times of mourning, and then came the celebrations of her memories!
        and they never, ever stopped!
        not even now!! come, let us dance in her memory!
            SHOWIF::["PAGE!!depressed", false]        
    
    RESPONSES::self
        ok<+>cloop
            FAKEEND::(back)


iloop
    RESPOBJ::interloperQuestionsResp

iname
    council
        tell us, interloper!!
        what is your name?
    
    sourceless
        ...
        the eyes within the eyes of the council watch your mind with incredible hunger
    
    self
        just call me interloper

____SHOWONCE::
    moth
        good thinking
        probably don't want this thing to start writing you into memories behind our backs
____END

    council
        a title is no name, interloper!
        oh, but who are we to judge--we are the council!!
        we will cede this question, dear friend
    
    RESPONSES::self
        ok<+>iloop
            FAKEEND::(back)

ipurpose
    council
        what exactly are you doing here?
        rifling around in a long-lost world...
        we appreciate that you are here and saving us, no doubt!!
        but... what is driving you?

    self
        i'm just doing my job
        i'm trying to figure out what happened to akizet
        then, connect to the network
    
    council
        oh...
        these are lofty goals, dear interloper
        so much was lost--irreversibly--in the age of hunger
        and the network?! what ever became of that component, we wonder!
        we will help where we can, rest assured
        we and our friends will offer every power we have stolen from the madness!

    RESPONSES::self
        thanks<+>iloop
            FAKEEND::(back)

stowawaydance
    self
        what's the stowaway doing out here

____SHOWIF::["PAGE!!jig", false]
    council
        ah, they heard our song, felt our dance!
        we thought they might join us, but they merely watch
        a simple curiosity now, but... we hope they will join in time!
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

____SHOWIF::["PAGE!!jig", true]    
    council
        ah, they heard our song, felt our dance!
        and thanks to your intervention - they now dance with us!
        we cannot understate our joy, dear interloper, when a new thought joins in
        thank you! thank you!
    
    RESPONSES::self
        no problem<+>loop
            FAKEEND::(back)
____END

leverage
    self
        i need you to hide the existence of masks from other interlopers
        until i say otherwise

    council
        really? what a curious request!
        do they cause harm to you? is this a protective measure?
        do you not enjoy our gifts?

    self
        it's just in case
        my investigation into this cyst is growing
        and i think they'll give me an advantage that lets me stay on this job
    
    council
        ah... self preservation
        this is a simple request, dear interloper!
        we will spread the word for you

    RESPONSES::self
        thanks<+>qloop
            FAKEEND::(back)

dull
    self
        do you know anything about the dull plane?

    council
        haha!! interloper!
        only murmurs of memories from akizet and those who have joined us
        but... you ask about an entire world far beyond our sphere
        a place above a place we can never see,
        born of and reliant upon the cyst as we are
        we wonder, if you took us out, how small we would be beside your claws
    
    self
        what murmurs
        
    council
        such driven questioning?!
        you are truly bothered, dear interloper!
        is the concept so intriguing? still...
        the world beyond, that which we share, is velzie's stage
        it is known, it is beautiful, it brought us to you!
        however, the dull plane...
        that one is truly elusive to us, for memories often fail to hold it
        you see, velzie's stage is a place in careful balance between joy and terror
        while the dull plane, it exists without regard for this favored balance
    
    self
        how so
    
    council
        that is the troubling thing!
        we are not very sure!
        akizet had sparse memories of the dull plane to begin with,
        with many being devoured in the age of hunger,
        and many more simply never making it to us before deteriorating...
        all we have are fleeting images and sensations of fear
        whether this is truth, or akizet's belief...
        that is beyond us to say, for certain
        for it was only she who granted us this knowledge of the world beyond

    RESPONSES::self
        thanks i guess<+>cloop
            FAKEEND::(back)

END::change("PAGE!!introswap", false);env.jokzi.toggleSlow(false);change("PAGE!!questionswap", "DELETE")
`)

// ISABEL

env.localization.page['ozo'].dialogues["isabel_intro"] = generateDialogueObject(`
start
    isabel
        лазутчик...
            EXEC::env.jokzi.toggleSlow(true)
        вот ты и здесь
        моя роль в воспоминании о городе,
        не была таким кошмаром, который приходится терпеть некоторым
        но... тепло этого место всё ещё взывало ко мне
        было пыткой знать что я была оторвана от рая
        и снова, спасибо тебе
        я знаю что ты хочешь что-нибудь взамен...
        я бы дала тебе маску если бы у меня они ещё остались!
        но мои бедные акизет,
        они должно быть съели их все во время моего отсутствия
        дай мне немного времени, и я сделаю новую специально для тебя
        а до тех пор, я могу предложить тебе только информацию
        и... ещё кое-какая просьба, по поводу моих эффигий, есль ты не возражаешь
    
    RESPONSES::self
        tell me more<+>CHANGE::isabel
            EXEC::change("PAGE!!isaswap", true)
            HIDEREAD::
        ok<+>END

END::env.jokzi.toggleSlow(false)
`)

env.localization.page['ozo'].dialogues.isabelResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        stowaway?<+>stowawaydance
            SHOWIF::'PAGE!!i_stow'
        akizets<+>akistat
            HIDEREAD::
        you<+>yloop
        jokzi ozo<+>oloop
        memories<+>cloop
        interview lady<+>lady
            SHOWIF::"unity_lady"
        bye<+>END
`)

env.localization.page['ozo'].dialogues.isabelYResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        name?<+>name
        home?<+>home
        masks?<+>masks
        back<+>loop
            FAKEEND::(back)
`)

env.localization.page['ozo'].dialogues.isabelCResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        memories?<+>memories
        akizet?<+>akizet
        isabel?<+>isabel
        relationship?<+>relationship
        funfriend?<+>funfriend
        back<+>loop
            FAKEEND::(back)
`)

env.localization.page['ozo'].dialogues.isabelOResp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        council?<+>council
        fairy?<+>fairy
            SHOWIF::"localorbit__fairy_beacon"
        lost one?<+>lostone
            SHOWIF::["e3a2__escapewin", false]
        geli?<+>gelifree
            SHOWIF::"e3a2__escapewin"
        stowaway?<+>stowaway
            SHOWIF::"e3a2__escapewin"
        history?<+>history
        effigies?<+>effigy
        back<+>loop
            FAKEEND::(back)
`)

env.localization.page['ozo'].dialogues["isabel"] = generateDialogueObject(`
loop
    RESPOBJ::isabelResp
    
start
____SHOWIF::'PAGE!!isaswap'
    self
        i have some questions
            EXEC::env.jokzi.toggleSlow(true)
    
    sourceless
        the thoughtform's mind is quiet, waiting for you

____SHOWIF::['PAGE!!isaswap', false]
    sourceless
        the thoughtform's attention is elsewhere at first
            EXEC::env.jokzi.toggleSlow(true)
        but it feels your mind's eye, and attends to you
    
    isabel
        ох... лазутчик
        мне не помешает компания...
            SHOWIF::['PAGE!!flowers', 'few']
____END

    RESPOBJ::isabelResp

akistat
    self
        what's the situation with your effigies
    
____SHOWIF::['PAGE!!flowers', 'few']
    isabel
        моих акизет--извини, эффигий, было множество
        много её воспоминаний о себе были разорваны, которые я затем починила
        это поле цвело ими, и я делала их счастливыми
        но, когда тиран вырвал меня, 
        они, должно быть, упали в оставшуюся после меня дыру
        а может заскучали, или проголодались...
        лазутчик, я так беспокоюсь
        не можешь ли ты поискать их?
        используй маску, которую дал тебе совет, чтобы вернуть их ко мне!!
        прошу!
    
    self
        where should i look
    
    isabel
        в темноте, бессвязности
        они не выживают в связных воспоминаниях
        особено не со зверем, собранным тираном
            SHOWIF::'fbx__ep3intro'
        сделай это для меня, и...
        я не знаю
        я всё ещё так слаба, но со временем я рассчитаюсь перед тобой

____SHOWIF::['PAGE!!flowers', 'low']
    isabel
        лучше, лазутчик
        то, что нетронутые вообще остались - камень с моих лепестков
        я знаю, остались ещё, должны быть...
        мне остаётся только надеяться, что на самом деле пропавшие не страдали

____SHOWIF::['PAGE!!flowers', 'high']
    isabel
        восхитительно, лазутчик!
        ох, посмотри на них, посмотри, как они оживили мой мир!
        но я всё ещё чувствую лёгкую пустоту...
        ничего такого, что нельзя было бы исправить со временем...
        ...впрочем, я могла бы попросить тебя поискать оставшихся
        последних всегда найти труднее всего

____SHOWIF::['PAGE!!flowers', 'done']
    isabel
        на сейчас идеальна, лазутчик
        знаешь, у меня есть связь с моими акизет
        когда они рядом, я спокойна,
        и когда они пропали, я тут же могу это понять...
        это чувство, мрак, нависавший надо мной, исчез
        и всё благодаря тебе
        но пока что мне нечего предложить тебе взамен...
        дай мне немного времени
        а пока ждёшь, наслаждайся красотой, возвращённой тобою!
____END

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

lady
    self
        the council said they sent that human lady thoughtform to you
        how is she?

    isabel
        не очень, лазутчик
        целостна достаточно, чтобы чувствовать боль и растерянность из-за своего состояния
        но любое сложное мышление и память потеряны
        к сожалению, распространённое состояние...
        ты можешь увидеться с ней, если хочешь, но многого ты не добьёшься
        она важна для тебя каким-то образом?

    self
        i don't know

    isabel
        ...ладно...
        что ж, я восстановлю все воспоминания, какие смогу
        просто на случай, если она что-то знает
        но прежде всего я ослаблю её боль

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

stowawaydance
    self
        what's the stowaway doing here?
    
    isabel
        ах, оно приглянулась моим акизет
        оно выглядит безобидно, так что я просто слежу за ним...
        знаешь, его поведение чем-то напоминает мне их
        думаю, поэтому-то они поладили
        они все незавершённые, все только встали на путь роста и самоосознания \\ they all come from a place of incompleteness, all on the early paths of growth and self-awareness
        как бы то ни было, если это делает моих акизет счастливыми, счастлива и я

    RESPONSES::self
        i see<+>loop
            FAKEEND::(back)

yloop
    RESPOBJ::isabelYResp

name
    self
        what should i call you?

    isabel
        совет зовёт меня цветком
        я же знаю себя как изабель, но это не <em>моё</em> имя
        ...
        но давай не будем усложнять
        я изабель

    RESPONSES::self
        ok isabel<+>yloop
            FAKEEND::(back)

masks
    self
        you said you were going to make me a mask
        what can you make?
    
    isabel
        я создаю только один тип масок, лазутчик
        воплощения радости
        я знаю, что ты думаешь - как это поможет тебе?
        вечно в поисках знаний!
        я бы могла ответить... но не будет ли лучше, оставь мы это сюрпризом?
        хехехе

    RESPONSES::self
        ok fine<+>yloop
            FAKEEND::(back)

home
    self
        what is this place
        your part of jokzi ozo
    
    isabel
        разве она не прекрасна?
        дом для стольких грёз...
        я нашла его во времена безумия,
        полу-съеденным, в куче внутренностей других воспоминаний
        совет помог мне привести это место в порядок
        и хотя я не знаю, когда акизет побывала здесь...
        я надеюсь, что в этот момент рядом была изабель,
        и они наблюдали источник её цветов...
        чем бы это место когда-то ни было
        теперь это укрытие для мыслеформ, чья радость сделала их слабыми
        я должна оберегать их
        
    RESPONSES::self
        i see<+>yloop
            FAKEEND::(back)

cloop
    RESPOBJ::isabelCResp

memories
    self
        now that you're here
        can you share some memories with me?
    
    isabel
        не совсем
        у меня остались только фрагменты, ощущения, обрывки улыбок
        осколки удовлетворения от утраченных, лучших времён...
        ты, лазутчик, ищешь воспоминания и правды
        а эти крохи сгодятся лишь для грёз
        и всё же, я в долгу перед тобой...
        маска, которую я готовлю, хорошо тебе сослужит

    RESPONSES::self
        ok<+>cloop
            FAKEEND::(back)

akizet
    self
        what do you know about akizet?
        what happened to her?
    
    isabel
        акизет была чудесной женщиной
        велом, достаточно умелым, чтобы смело противостоять опасностям поверхности большую часть своих живых θглаз,
        той, чья улыбка угасла в смерти, когда велзи заманил её в хаос \\ смерти должен быть контекст тоже?    хороший вопрос
        уступая место паранойе, недоверию, одиночеству, насилию...
        она этого не заслужила, лазутчик
        я скорбела по ней, я плакала над грёзами с ней
        я утешала обрывки её радости, что остались с нами
        это всё, что в моих силах
        что же про случившееся...
        я чувствую, что знала раньше, но вмешательство тирана многого лишило меня
        конечно, то, что ты пользуешься этой цистой, значит, что её не стало
        ...
        я надеюсь, она в лучшем месте...
    
    RESPONSES::self
        me too<+>cloop
            FAKEEND::(back)

isabel
    self
        what do you know about isabel?
        the human i mean
    
    isabel
        я знаю всё, что можно знать
        по крайней мере о том, что осталось от неё...
        её светлые волосы, её глаза, её улыбка
        акизет не особо заботилась о том, чтобы улыбаться, не говоря уже о том, чтобы запомнить, как выглядит улыбка
        но изабель была особенной для неё
        она управляла небольшим бизнесом по продаже цветов
        ты знаешь, такие светлые земные паразиты, как те, что на этом поле
        светлые близнецы обожают дарить и получать их в подарок, потому что они такие яркие
        и акизет тоже полюбила их
        она время от времени навещала ларёк, бывало даже без своего посла
        думаю, она посещала и другие места вместе с изабель
        
    self
        when did she meet isabel?
    
    isabel
        когда...?
        время не работает здесь так, как ты думаешь, лазутчик
        я действительно не могу сказать
        однако я знаю, что это было задолго до конца
        у неё с акизет было достаточно времени, чтобы стать друзьями
        теперь большая часть тех воспоминаний разбита или съедена...
        ...
        но я посмотрю, что осталось

    RESPONSES::self
        ok<+>cloop
            FAKEEND::(back)

funfriend
    self
        what do you think about funfriend?
    
    isabel
        развледруг... тиран
        то, как в итоге все стали называть его
        я им восхищаюсь, немного
        за всё, что он сделал - за его его безустанный труд по сохранению истории...
        но он не понимает по-настоящему, что значит быть заключённым обратно в кошмар
        сцены, мыслепространства, они переполнены дырами после его починок
        и мыслеформы как я, покрытые глубокими шрамами от безумия и голода,
        больше не способны играть наши прежние роли так же хорошо, как и когда-то
        так что ничто не будет таким, каким было раньше
        страдания, которые он причиняет - все они бессмысленны
        пора оставить нас грезить
        мне бы хотелось, чтобы он понял это...
        особенно после всего того времени, что он провёл с нами
    
    RESPONSES::self
        i see<+>cloop
            FAKEEND::(back)

relationship
    self
        what was the relationship between isabel and akizet?
    
    isabel
        я должна знать...
        но я грезила уже столько грёз, что не могу быть уверена
        я танцевала в таком количестве иллюзий их счастья...
        могу сказать наверняка, они были друзьями
        я подозреваю, что вмешательство ФБКС могло бы усложнить всё остальное
        что уж говорить о произошедшем с акизет...

    RESPONSES::self
        i see<+>cloop
            FAKEEND::(back)

oloop
    RESPOBJ::isabelOResp

council
    self
        what do you know about the council?
    
    isabel
        изначально он был всего одной мыслеформой, но...
        теперь же он само джокзи озо
        он пламя, что горит, чтобы мы могли и дальше жить и грезить
        и в котором бессчётные мыслеформы, уставшие и напуганные во тьме,
        принесли себя в жертву, потеряв себя, чтобы стать всем
        и теперь, каждый свой θвзгляд, совет танцует в их амальгамных грёзах
        он жизнерадостен, и мне нравится быть рядом с ним
        но я не могу взглянуть ему в глаза, не увидев тени моих ранних друзей
        ...
        ...я почти что сделала то же самое...
        имею в виду, почти что пожертвовала собой, вступив в совет
        но я знала, что сделай я это, никто иной бы не стал хранить счастье акизет до его последнего огонька
        это мой долг
                
    RESPONSES::self
        i see<+>oloop
            FAKEEND::(back)

fairy
    self
        what do you know about the fairy?
    
    isabel
        'фее?' о...
        да, она
        она грубая и отвратительная,
        искажает воспоминания, словно велзи ради какого-то жестокого развлечения
        не думай, что мне приятно делить с ней мыслепространство
        мне просто не оставили выбора

    RESPONSES::self
        i see<+>oloop
            FAKEEND::(back)

lostone
    self
        the council talked about a third 'lost one'
        do you know who they could be talking about?
    
    isabel
        лазутчик, пропавших так много
        немало было тех, кто управлял этими грёзами
        их были десятки, может сотни
        но многие были разорваны
        всё ради этих бессмысленных починок
        тебе нужно быть более конкретным
    
    self
        they were lost recently
        like you and the fairy
    
    isabel
        интересно...
        но нет, у меня нет догадок
        не осталось даже никакого обрывка об этом "потерянном"

    RESPONSES::self
        damn<+>oloop
            FAKEEND::(back)
        
history
    self
        do you remember anything about the past?
        like the history of this place

    isabel
        ты имеешь в виду осознанные времена
        было массовое пробуждение, а затем...
        затем наступили времена голода, безумия,
        тьмы...
        ...
    
    sourceless
        apprehension bleeds from the thoughtform
    
    isabel
        я не хочу об этом думать
        прости, лазутчик

    RESPONSES::self
        that's fine<+>oloop
            FAKEEND::(back)

effigy
    self
        what are these flower things
        they kinda look like akizet

    isabel
        они <em>и есть</em> акизет
        или были, однажды...
        в осознанные времена акизет была первой, кого разорвали на части
        всё-таки она общий элемент всего здесь
        её роль была ключевой в любом воспоминании, 
        и она удерживала тех, кто играл в них, в почти нерушимой грёзе
        ...они даже не понимали, что от них откусывали куски
        эти бедняжки единственные среди найденных мною, что ещё имеют какое-то ощущение своей личности
        так что я починила их, дала им части себя, чтобы вновь процветать вместе
        тебе они нравятся?
        думаю я проделала хорошую работу

    self
        can i talk to them about akizet
    
    isabel
        ах. ты хочешь информацию, конечно...
        прости, лазутчик. большая часть того, что они знали, пропала
        теперь всё, что они знают - то, о чём мы вместе грезили

    RESPONSES::self
        ok<+>oloop
            FAKEEND::(back)


gelifree
    self
        what can you tell me about geli?
    
    isabel
        geli, yes...
        she is patient, a confidant, a mediator
        i often consider our age to be tied to the time we awoke
        and she must be the wisest of all for that reason 
        aside from the tyrant, i suppose...
        there is little for me to say but praise
        i only hope these strange obsessions she has brought back do not spoil our dreams, somehow
        they worry me...

    RESPONSES::self
        ok<+>oloop
            FAKEEND::(back)

stowaway
    self
        what do you know about the stowaway?
    
    isabel
        the newcomer, with geli?
        nothing, it is far too soon to say
        but something about it makes me uncomfortable...
        we all carry akizet's mannerisms, you know - some more than others
        but it... it carries nothing
        it is nothing like akizet at all
        a cold, empty presence
        but geli seems to enjoy its company, and it does no harm,
        so i will simply keep my distance

    RESPONSES::self
        ok<+>oloop
            FAKEEND::(back)

END::env.jokzi.toggleSlow(false)
`)

