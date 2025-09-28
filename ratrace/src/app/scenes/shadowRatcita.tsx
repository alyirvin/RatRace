"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import Ratcita from '../components/ratcita';
import Office from '../images/office.png';
import Desk from '../images/computer_on.png'
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

const ShadowRacita = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Perfect you're here! You're going to listen while I take this call. Just take some notes on how I handle the situation");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "excited",
                text: "*Take detailed notes and ask questions about insurance afterward.*",
                response: "That’s the kind of curiosity that gets you promoted! Insurance is a financial arrangement that provides protection against loss or risk. In exchange for a premium, the insurer promises to compensate the insured for covered losses.",
                nextStage: "end"
            },
            {
                id: "nervous", 
                text: "*Half listen while scrolling on your phone*",
                response: "Did you catch how I handled that deductible question?",
                nextStage: "deductibleQuestion"
            },
            {
                id: "ew",
                text: "*Interrupt the call to correct Racita on what a deductible is.*",
                response: "I totally knew that a deductible is the amount you must pay out-of-pocket before your insurance starts covering the costs. Don’t embarrass me like that!.",
                nextStage: "end"
            },
        ],
        deductibleQuestion: [
            {
                id: "dontKnow",
                text: "…What’s a deductible again?",
                response: "*sigh*, a deductible is the amount you must pay out-of-pocket before your insurance starts covering the costs.",
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
                            salesPoints = 1;
                        }
                        if (option.id === 'ew') {
                            salesPoints = 1;
                            socialPoints = -1;
                        }
                        if (option.id === 'nervous') {
                            socialPoints = -1;
                            salesPoints = -1;
                        }
                        if (option.id === 'dontKnow') {
                            socialPoints = -1;
                            salesPoints = -1;
                        }

                        
                        onDialogueData({
                            type: 'completed',
                            stage: 'Ratcita',
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
            <div className="absolute top-[25%] right-[68%]">
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
                <Image src={Desk} alt="Office Background" className="absolute -z-1 scale-[1]"/>
            </div>
        </div>
    );
};

export default ShadowRacita;