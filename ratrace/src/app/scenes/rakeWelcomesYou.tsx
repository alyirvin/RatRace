"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import Rake from '../components/rake';
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

const RakeWelcomesYou = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Hey welcome back!! Aren't you excited for your first day as a full time employee? And in the customer service department, isn't that great?");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "excited",
                text: "Yeah I can't wait!",
                response: "You're ready for that Snout Farm life! Like we always say, 'Like a good rat, we're in your walls'",
                nextStage: "what"
            },
            {
                id: "neutral",
                text: "A job's a job, so I guess it's okay.",
                response: "Oh come on, embrace the Snout Farm life, like we always say 'Like a good rat, we're in your walls'",
                nextStage: "what"
            },
            {
                id: "ew",
                text: "Ugh no! I'm only here for the money.",
                response: "That's not a good way to look at things, try to be more positive! Think like a Snout Farm rat, 'Like a good rat, we're in your walls'",
                nextStage: "what"
            }
        ],
        what: [
            {
                id: "agree",
                text: "Yeah! I'm ready for the Snout Farm life!",
                response: "That's the spirit! Come on, let's go get our days started.",
                nextStage: "end"
            },
            {
                id: "disagree",
                text: "That's really our slogan?",
                response: "Yeah, what's wrong with it? Doesn't matter, it's time to get to work.",
                nextStage: "end"
            }
        ]
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
                        
                        if (option.id === 'excited') {
                            socialPoints = 1;
                        }
                        if (option.id === 'ew') {
                            socialPoints = -1;
                        }
                        if (option.id == 'agree') {
                            socialPoints = 1;
                            karmaPoints = 1;
                        }
                        
                        onDialogueData({
                            type: 'completed',
                            stage: 'rakeWelcomesYou',
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
                <div className="absolute z-1 top-[-175] left-[50%] translate-x-[-50%] scale-[0.5]">
                    <Rake />
                </div>
                <Image src={Office} alt="Office Background" className="absolute -z-1 bottom-40 right-64 scale-[1.5]"/>
            </div>
        </div>
    );
};

export default RakeWelcomesYou;