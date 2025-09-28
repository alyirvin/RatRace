"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import Remi from '../components/remi';
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

const RemiPartTwo = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Hey there! How's it going? Working hard?");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "helpful",
                text: "Of Course! Getting lots done",
                response: "I'm sure you are! Also, boss wants to see you, I think it might be good news",
                nextStage: "end"
            },
            {
                id: "nervous", 
                text: "Ehh it's been slow, not feeling that motivated right now.",
                response: "Yeah we all have days like that. I don't know if this will improve it or not, but boss wants to see you.",
                nextStage: "end"
            },
            {
                id: "ew",
                text: "No! This is sooo boring.",
                response: "No need to be negative about it. By the way, boss wants to see you, and uhh, maybe don't say that in front of him.",
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
        
        setTimeout(() => {
            if (option.nextStage) {
                setDialogueStage(option.nextStage);
                if (option.nextStage === "end") {
                    if (onDialogueData) {
                        let karmaPoints = 0;
                        let socialPoints = 0;
                        let salesPoints = 0;
                        
                        if (option.id === 'helpful') {
                            socialPoints = 1;
                            salesPoints = 1;
                        }
                        if (option.id === 'ew') {
                            salesPoints = -1;
                            socialPoints = -1;
                        }
                        if (option.id === 'nervous') {
                            socialPoints = 1; 
                        }
                        
                        onDialogueData({
                            type: 'completed',
                            stage: 'RemiPartTwo',
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
                    <Remi />
                </div>
                <Image src={Office} alt="Office Background" className="absolute -z-1 bottom-40 right-64 scale-[1.5]"/>
            </div>
        </div>
    );
};

export default RemiPartTwo;