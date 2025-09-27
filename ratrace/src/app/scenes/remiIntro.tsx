"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import Remi from '../components/remi';

interface DialogueOption {
    id: string;
    text: string;
    response: string;
    nextStage?: string;
}

interface RemiIntroProps {
    onDialogueData?: (data: any) => void;
}

const RemiIntro = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Hey there! Welcome to Snout Farm, I'm Remi! I'm here to help you around on your first day. Are you ready?");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    const [karma, setKarma] = useState(0);
    const [social, setSocial] = useState(0);
    const [sales, setSales] = useState(0);
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "helpful",
                text: "Definitely! Let's do it!",
                response: "Great! I love the attitude! Here, follow me.",
                nextStage: "end"
            },
            {
                id: "nervous", 
                text: "I guess, I'm a little nervous.",
                response: "That's ok, you'll get the hang of it soon enough.",
                nextStage: "end"
            },
            {
                id: "ew",
                text: "Ugh not really.",
                response: "Oh ok... Well I still need to show you around, so follow me.",
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
            if (option.id === 'helpful') setKarma(social + 1);
            if (option.id === `ew`) 
            {
                setSales(sales - 1);
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
                <Remi />
            </div>
        </div>
    );
};

export default RemiIntro;