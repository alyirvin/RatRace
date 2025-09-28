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

const RakeWelcomesAgain = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Hey!! I heard you got a promotion as an insurance agent! That's fantastic, congrats!");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "excited",
                text: "I did! I'm so happy this is all I've ever dreamed of!",
                response: "You should be proud! Not everyone gets to be one of the top rats in the wall. I'm curious, why do you want this position so bad?",
                nextStage: "jobReason"
            },
            {
                id: "neutral",
                text: "Yay more responsibilities...",
                response: "Aren't you happy? Why do you stay here if you don't seem to enjoy it?",
                nextStage: "jobReason"
            },
        ],
        jobReason: [
            {
                id: "money",
                text: "Money",
                response: "I see, that's kinda understandable, we all have to eat somehow.",
                nextStage: "end"
            },
            {
                id: "goodness",
                text: "To help others",
                response: "Exactly! Seeing the change we make everyday makes it all worth it!",
                nextStage: "end"
            },
            {
                id: "power",
                text: "Power",
                response: "Well that's interesting **and not at all concerning**",
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
                        
                        if (option.id === 'money') {
                            karmaPoints = -1;
                        }
                        if (option.id === 'goodness') {
                            karmaPoints = 1;
                        }
                        if (option.id == 'power') {
                            karmaPoints = -2;
                        }
                        if (option.id == 'excited') {
                            salesPoints = 1;
                            socialPoints = 1;
                        }
                        if (option.id == 'neutral') {
                            salesPoints = -1;
                        }
                        
                        onDialogueData({
                            type: 'completed',
                            stage: 'rakeWelcomesAgain',
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

export default RakeWelcomesAgain;