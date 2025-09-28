"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import ComputerView from '../images/computer_on.png';
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

const ClaimRatTwo = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("*On the phone* Help me!! Please someone help meeeee");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "helpful",
                text: "What is the problem?",
                response: "I've been traumatized! This cat almost killed me!! Thankfully they barely left a scratch, but I need therapy now. Will you cover it?",
                nextStage: "solutions"
            },
        ],
        solutions: [
            {
                id: "kind",
                text: "Oh that's just terrible! Since this is all mental and emotional based, I'm not 100% sure if your insurance will cover it. Let us check your policy details together.",
                response: "Thank you thank you thank you!!",
                nextStage: "end"
            },
            {
                id: "bad",
                text: "No why would that be covered under your plan? We're here to fix bigger problems.",
                response: "Fine! Maybe I'll just go find a better insurance company then.",
                nextStage: "end"
            },
            {
                id: "neutral",
                text: "Are you sure you need therapy? Maybe you're just still feeling the initial shock and need to lie down.",
                response: "Do not tell me to lie down! I know what I experienced and I need compensation for it now!",
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
                        
                        if (option.id === 'helpful') {
                            socialPoints = 1;
                            salesPoints = 1;
                        }
                        if (option.id == 'kind') {
                            karmaPoints = 1;
                            salesPoints = 1;
                        }
                        if (option.id == 'neutral') {
                            karmaPoints = -1;
                            socialPoints = -1;
                        }
                        if (option.id == "bad") {
                            karmaPoints = -1;
                        }
                        
                        onDialogueData({
                            type: 'completed',
                            stage: 'ClaimRatTwo',
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
            <div className="z-2 absolute top-[25%] left-[3%]">
                <SpeechBubble orientation="left" message={currentDialogue}/>
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
                <Image src={ComputerView} alt="Computer View" className="" />
            </div>
        </div>
    );
};

export default ClaimRatTwo;