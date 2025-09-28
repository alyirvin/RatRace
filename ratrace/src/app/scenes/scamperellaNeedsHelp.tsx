"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import Scamperella from '../components/scamperella';
import Office from '../images/office.png';
import Image from 'next/image';

interface DialogueOption {
    id: string;
    text: string;
    response: string;
    nextStage?: string;
}

interface RemiIntroProps {
    onDialogueData?: (data: any) => void;
}

const ScamperellaNeedsHelp = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Hey, can we talk in private for a minute? I… I’ve gotten myself into something, and I need your help making it go away.");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "helpful",
                text: "Sure, what’s going on? You look stressed.",
                response: "I knew I could trust you. I’ve been moving some company funds around, but I can make it right—if you help me cover it up",
                nextStage: "nextHelpful"
            },
            {
                id: "unhelpful", 
                text: "If this is about work, I might not be that helpful.",
                response: "No! You don’t understand, if anyone else finds out, I’m finished. I need you.",
                nextStage: "nextUnhelpful"
            },
            {
                id: "ew",
                text: "I don’t think I want to hear this, Scamperella.",
                response: "Please, don’t turn away from me now. I’m begging you.",
                nextStage: "nextEw"
            },
        ],
        nextHelpful: [
            {
                id: "honest", 
                text: "That’s serious. We should come clean before it gets worse.",
                response: "No, no, no! We can’t! If they find out, I’ll go to jail. You can’t tell anyone.",
                nextStage: "nextHonest"
            },
            {
                id: "flabbergasted", 
                text: "Why would you think I’d risk my job for this?",
                response: "Because you’re the only one I trust! I thought you cared.",
                nextStage: "nextFlabbergasted"
            },
            {
                id: "ally", 
                text: "Okay, but only if you explain exactly what you’ve done.",
                response: "Fine. I shifted money between accounts, made it look like minor discrepancies. It’s bad, but it’s fixable if you help",
                nextStage: "nextAlly"
            },
        ],
        nextUnhelpful: [
            {
                id: "immediatelyNo", 
                text: "I can’t be dragged into this, Scamperella.",
                response: "So you’d just let me drown after all we’ve been through?",
                nextStage: "nextImmediatelyNo"
            },
            {
                id: "questioning", 
                text: "What exactly are you asking me to do?",
                response: "Just… make sure no one notices the gaps. Look the other way if questions come up.",
                nextStage: "nextQuestioning"
            },
            {
                id: "stiff", 
                text: "Okay, but only if you explain exactly what you’ve done.",
                response: "Okay, I’ll tell you the whole thing. I diverted payments into a phantom account and created fake invoices to cover it. I’m so sorry, but you deserve the truth.",
                nextStage: "nextStiff"
            },
        ],
        nextEw: [
            {
                id: "fullStory", 
                text: "Then tell me everything, start to finish.",
                response: "Alright… I’ve been skimming funds. Not much at first, but it added up. I can’t hide it anymore.",
                nextStage: "nextFullStory"
            },
            {
                id: "absolutelyNot", 
                text: "I already said I don’t want to be involved.",
                response: "So that’s it? You’d just walk away?",
                nextStage: "nextAbsolutelyNot"
            },
            {
                id: "whyMe", 
                text: "Why are you asking me instead of anyone else?",
                response: "Because you’re the only one who hasn’t judged me yet.",
                nextStage: "nextWhyMe"
            },
        ],
        nextHonest: [
            {
                id: "notInvolved", 
                text: "I can’t be part of this. You’re on your own.",
                response: "So you'd just let me drown after everything we've been through? I thought you'd be different.",
                nextStage: "nextNotInvolved"
            },
            {
                id: "secretKept", 
                text: "I’ll keep your secret—for now.",
                response: "Thank you. Please—don't tell anyone. I can't lose my job, not after this.",
                nextStage: "nextSecretKept"
            },
            {
                id: "reporting", 
                text: "I’m reporting this. It’s the right thing to do.",
                response: "No! If you do that, it’s over for me! I’ll lose everything!",
                nextStage: "nextReporting"
            },
        ],
        nextFlabbergasted: [
            {
                id: "iDontCare", 
                text: "Caring doesn’t mean breaking the law for you.",
                response: "So that’s it? You can’t care enough to stand by me when I need you most?",
                nextStage: "nextIDontCare"
            },
            {
                id: "trustBroken", 
                text: "Then prove I can trust you back and fix this yourself",
                response: "Fix this myself? It’s already too big for me to handle alone… that’s why I came to you.",
                nextStage: "nextTrustBroken"
            },
            {
                id: "helping", 
                text: "Alright… but this is the last time.",
                response: "That’s all I’m asking. One last time, after this, it’s over. I promise.",
                nextStage: "nextHelping"
            },
        ],
        nextAlly: [
            {
                id: "noThankYou", 
                text: "That sounds way worse than you think. I’m out.",
                response: "No! Please! If you walk away now, I’m finished. They’ll find out, and I’ll lose everything.",
                nextStage: "nextNoThankYou"
            },
            {
                id: "noLies", 
                text: "Maybe there’s another way to fix this without lying.",
                response: "Another way? The truth will destroy me… I need you to help me keep this quiet.",
                nextStage: "nextNoLies"
            },
            {
                id: "delayDecision", 
                text: "Show me the numbers—I’ll decide after.",
                response: "Okay, look. I diverted vendor payments into a temporary account and flagged some invoices as paid. It was supposed to be temporary, but it snowballed. Please, read them and then tell me what you think.",
                nextStage: "nextDelayDecision"
            },
        ],
        nextImmediatelyNo: [
            {
                id: "finalNo", 
                text: "I can't compromise my integrity for this.",
                response: "Fine. I thought you were different, but I guess I was wrong.",
                nextStage: "end"
            },
            {
                id: "reluctantHelp", 
                text: "This is against my better judgment, but... what do you need?",
                response: "Thank you! I just need you to stay quiet and maybe help me fix a few records.",
                nextStage: "end"
            },
        ],
        nextQuestioning: [
            {
                id: "absoluteRefusal", 
                text: "I won't look the other way on financial crimes.",
                response: "Crimes? It's not... okay, maybe it is. But I'm desperate.",
                nextStage: "end"
            },
            {
                id: "conditionalHelp", 
                text: "Only if you promise to come clean eventually.",
                response: "I... I can't promise that. But thank you for considering it.",
                nextStage: "end"
            },
        ],
        nextStiff: [
            {
                id: "walkAway", 
                text: "That's worse than I thought. I can't be part of this.",
                response: "Please! I told you everything because I trusted you!",
                nextStage: "end"
            },
            {
                id: "reluctantAlly", 
                text: "This is serious, but... I'll help you fix it properly.",
                response: "Thank you. I promise, after this, I'll never ask for anything like this again.",
                nextStage: "end"
            },
        ],
        nextFullStory: [
            {
                id: "reportIt", 
                text: "You need to report this yourself before someone else finds out.",
                response: "Report it? That would end my career! I thought you'd understand.",
                nextStage: "end"
            },
            {
                id: "keepSecret", 
                text: "I won't tell anyone, but you need to stop immediately.",
                response: "I will, I promise. Thank you for not abandoning me.",
                nextStage: "end"
            },
        ],
        nextAbsolutelyNot: [
            {
                id: "firmNo", 
                text: "Yes, I'm walking away. This isn't my problem.",
                response: "I see who you really are now. Thanks for nothing.",
                nextStage: "end"
            },
            {
                id: "lastChance", 
                text: "Tell me one good reason why I should risk everything for you.",
                response: "Because... because I'd do the same for you. Please.",
                nextStage: "end"
            },
        ],
        nextWhyMe: [
            {
                id: "notSpecial", 
                text: "I'm not different from anyone else here. Find another way.",
                response: "But you are different! You actually listen, you care.",
                nextStage: "end"
            },
            {
                id: "helpBecauseTrust", 
                text: "If you trust me that much... I'll help, but this has to stop.",
                response: "It will stop, I swear. After this, I'm done with all of it.",
                nextStage: "end"
            },
        ],
        nextNotInvolved: [
            {
                id: "finalWalkAway", 
                text: "I'm sorry, but I can't destroy my career for this.",
                response: "I understand. I just... I thought we were friends.",
                nextStage: "end"
            },
            {
                id: "oneCondition", 
                text: "I'll help, but only if you agree to come clean within a month.",
                response: "A month? That's... that's not much time, but okay. Thank you.",
                nextStage: "end"
            },
        ],
        nextSecretKept: [
            {
                id: "enabler", 
                text: "Don't make me regret keeping this secret.",
                response: "You won't. I'm going to fix this, quietly, and no one will ever know.",
                nextStage: "end"
            },
            {
                id: "watchingYou", 
                text: "I'm keeping quiet, but I'll be watching to make sure you stop.",
                response: "That's fair. I deserve to be watched after this.",
                nextStage: "end"
            },
        ],
        nextReporting: [
            {
                id: "mustReport", 
                text: "I have to do what's right, even if it hurts you.",
                response: "Right? What about loyalty? What about friendship?",
                nextStage: "end"
            },
            {
                id: "giveChance", 
                text: "You have 24 hours to report it yourself, or I will.",
                response: "24 hours? That's... that's not enough time, but... okay.",
                nextStage: "end"
            },
        ],
        nextIDontCare: [
            {
                id: "cantHelp", 
                text: "I care, but not enough to break the law.",
                response: "I see where I stand then. Thanks for being honest, I guess.",
                nextStage: "end"
            },
            {
                id: "careEnoughToHelp", 
                text: "Fine. I care enough to help you, but this is it.",
                response: "That's all I need. Thank you for caring.",
                nextStage: "end"
            },
        ],
        nextTrustBroken: [
            {
                id: "noMoreHelp", 
                text: "If it's too big for you, it's definitely too big for me.",
                response: "I understand. I shouldn't have put this on you.",
                nextStage: "end"
            },
            {
                id: "helpDespiteAll", 
                text: "Against my better judgment... what do you need me to do?",
                response: "Just help me cover the gaps until I can fix it. That's all.",
                nextStage: "end"
            },
        ],
        nextHelping: [
            {
                id: "specificHelp", 
                text: "What exactly do you need me to do?",
                response: "Just help me adjust a few reports, make the numbers match. It's temporary.",
                nextStage: "end"
            },
            {
                id: "limitedHelp", 
                text: "I'll help, but I won't do anything illegal myself.",
                response: "That's fair. Just... don't ask questions if things seem off, okay?",
                nextStage: "end"
            },
        ],
        nextNoThankYou: [
            {
                id: "definitelyOut", 
                text: "I'm sorry, but this is way beyond what I can handle.",
                response: "I understand. I'm just... I'm scared of what's going to happen now.",
                nextStage: "end"
            },
            {
                id: "reconsider", 
                text: "Maybe... maybe there's a way to minimize the damage?",
                response: "Yes! That's all I'm asking for, just help minimize the damage.",
                nextStage: "end"
            },
        ],
        nextNoLies: [
            {
                id: "truthBetter", 
                text: "The truth might be scary, but lies make it worse.",
                response: "Easy for you to say. You're not the one who'll lose everything.",
                nextStage: "end"
            },
            {
                id: "helpWithTruth", 
                text: "I'll help you figure out how to tell the truth safely.",
                response: "You'd do that? Help me confess? That's... actually brave of you.",
                nextStage: "end"
            },
        ],
        nextDelayDecision: [
            {
                id: "tooComplicated", 
                text: "This is way more complicated than you made it sound. I'm out.",
                response: "Please don't leave me hanging after seeing everything!",
                nextStage: "end"
            },
            {
                id: "helpWithNumbers", 
                text: "Okay, I see the problem. I can help you fix this properly.",
                response: "Really? You'll help me make this right? Thank you so much!",
                nextStage: "end"
            },
            {
                id: "reportRequired", 
                text: "After seeing this, I have to report it. This is too serious.",
                response: "I trusted you with everything and this is how you repay me?",
                nextStage: "end"
            },
        ],
    };

    const getCurrentOptions = () => {
        return allDialogueOptions[dialogueStage] || [];
    };

    const handleOptionClick = (option: DialogueOption) => {
        setCurrentDialogue(option.response);
        setShowOptions(false);
        
        setTimeout(() => {
            if (option.nextStage) {
                setDialogueStage(option.nextStage);
                if (option.nextStage === "end") {
                    if (onDialogueData) {
                        let karmaPoints = 0;
                        let socialPoints = 0;
                        let salesPoints = 0;
                        
                        // Ethical/Reporting choices - High Karma
                        if (['finalNo', 'absoluteRefusal', 'walkAway', 'reportIt', 'firmNo', 'notSpecial', 'finalWalkAway', 'mustReport', 'cantHelp', 'noMoreHelp', 'definitelyOut', 'truthBetter', 'tooComplicated', 'reportRequired'].includes(option.id)) {
                            karmaPoints = 2;
                            salesPoints = 1;
                            socialPoints = -1; // Scamperella won't like you
                        }
                        
                        // Conditional help/Compromise - Medium Karma
                        if (['conditionalHelp', 'oneCondition', 'giveChance', 'helpWithTruth', 'lastChance'].includes(option.id)) {
                            karmaPoints = 1;
                            socialPoints = 1;
                            salesPoints = 0;
                        }
                        
                        // Reluctant compliance - Low Karma, High Social
                        if (['reluctantHelp', 'reluctantAlly', 'keepSecret', 'helpBecauseTrust', 'careEnoughToHelp', 'helpDespiteAll', 'reconsider', 'helpWithNumbers'].includes(option.id)) {
                            karmaPoints = -1;
                            socialPoints = 2;
                            salesPoints = -1; // Risky for career
                        }
                        
                        // Full compliance/Enabling - Very Low Karma, High Social
                        if (['enabler', 'specificHelp', 'limitedHelp'].includes(option.id)) {
                            karmaPoints = -2;
                            socialPoints = 2;
                            salesPoints = -2; // Very risky
                        }
                        
                        // Watching/Monitoring - Neutral Karma, Medium Social
                        if (['watchingYou'].includes(option.id)) {
                            karmaPoints = 0;
                            socialPoints = 1;
                            salesPoints = 0;
                        }
                        
                        onDialogueData({
                            type: 'completed',
                            stage: 'ScamperellaNeedsHelp',
                            karma: karmaPoints,
                            social: socialPoints,
                            sales: salesPoints
                        });
                    }
                } else {
                    setShowOptions(true);
                }
            } else {
                setShowOptions(true);
            }
        }, 3000); 
    };

    return (
        <div className="w-full h-full relative">
            <div className="absolute top-[25%] right-[62%]">
                <SpeechBubble orientation="right" message={currentDialogue}/>
            </div>
            
            {showOptions && (
                <div className="z-2 absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-[60%] max-w-[500px] flex flex-col gap-3 z-10">
                    {getCurrentOptions().map((option: DialogueOption) => (
                        <button
                            key={option.id}
                            onClick={() => handleOptionClick(option)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 text-center w-full"
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            )}
            
            <div className="w-[100vw] h-[100vw]">
                <div className="absolute z-1 top-[-150] left-[50%] translate-x-[-50%] scale-[0.5]">
                    <Scamperella />
                </div>
                <Image src={Office} alt="Office Background" className="absolute -z-1 bottom-40 right-64 scale-[1.5]"/>
            </div>
        </div>
    );
};

export default ScamperellaNeedsHelp;