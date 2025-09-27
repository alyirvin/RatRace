"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import RatKing from '../components/ratKing';

interface DialogueOption {
    id: string;
    text: string;
    response: string;
    nextStage?: string;
}

interface RemiIntroProps {
    onDialogueData?: (data: any) => void;
}

const FirstRatKingMeeting = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Inside, you see a massive leather chair turned away from you. Smoke curls into the air. You can feel him judging you already.");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    const [karma, setKarma] = useState(0);
    const [social, setSocial] = useState(0);
    const [sales, setSales] = useState(0);
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "helpful",
                text: "Good morning, sir! Brought your coffee just the way you like it.",
                response: "Hmm. Polite. Efficient. Acceptable.",
                nextStage: "end"
            },
            {
                id: "nervous", 
                text: "Here’s your coffee. I had more important things to do, but whatever.",
                response: "Well. Remind me never to rely on you for anything mission-critical.",
                nextStage: "end"
            },
            {
                id: "ew",
                text: "*Throw the coffee at king rat*",
                response: "RAAAAAAAAHHHHHHHHHHHHH",
                nextStage: "end"
            },
        ]
    };

    const getCurrentOptions = () => {
        return allDialogueOptions[dialogueStage] || [];
    };

    const handleOptionClick = (option: DialogueOption) => {
        setCurrentDialogue(option.response);
        setShowOptions(false);
  
        if (onDialogueData) {
            if (option.id === 'helpful')
            {
                setSocial(social + 1);
                setSales(sales + 1);
            }
            if (option.id == 'nervous')
            {
                setSocial(social - 1);
            }
            if (option.id === `ew`) 
            {
                setSales(sales - 2);
                setSocial(social -1);
            }
        }
        
        setTimeout(() => {
            if (option.nextStage) {
                setDialogueStage(option.nextStage);
                if (option.nextStage === "end") {
                    if (onDialogueData) {
                        onDialogueData({
                            type: 'completed',
                            finalStage: option.nextStage,
                            karma: karma,
                            social: social,
                            sales: sales
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
            <div className="absolute top-[25%] left-[7%]">
                <SpeechBubble orientation="right" message={currentDialogue}/>
            </div>
            
            {showOptions && (
                <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-[60%] max-w-[500px] flex flex-col gap-3 z-10">
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
            
            <div className="z-1 w-[100vw] h-[100vw] flex justify-center items-center absolute bottom-[-25vh] right-[-15vw] scale-[0.75]">
                <RatKing />
            </div>
        </div>
    );
};

export default FirstRatKingMeeting;