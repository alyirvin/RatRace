"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import RatcitaImage from '../components/ratcita';
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

const Ratcita = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Hi there! You must be our new intern. I'm Racita, one of the insurance agents here. How's your first day going so far?");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "excited",
                text: "Great! I'm eager to learn and contribute!",
                response: "That's great to hear! Why don't you come by my desk in a bit and shadow me on some work?",
                nextStage: "afterOffer"
            },
            {
                id: "nervous", 
                text: "Alright, I guess. There's a lot to take in.",
                response: "Ah I remember my first day too. Why don't you come by my desk in a bit and shadow me on some work?",
                nextStage: "afterOffer"
            },
            {
                id: "ew",
                text: "None of your business.",
                response: "Oh! Well okay then...",
                nextStage: "end"
            },
        ],
        afterOffer: [
            {
                id: "accept",
                text: "Sure! I'd love to learn from you.",
                response: "Awesome! I'll see you at my desk in a bit.",
                nextStage: "end"
            },
            {
                id: "decline",
                text: "Maybe later, I want to explore a bit more first.",
                response: "No worries! Just let me know when you're ready.",
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
                            salesPoints = -1;
                            socialPoints = -1;
                            karmaPoints = -1;
                        }
                        if (option.id === 'nervous') {
                            socialPoints = 0; 
                        }
                        if (option.id === 'accept') {
                            socialPoints = 1;
                            salesPoints = 1;
                        }
                        if (option.id === 'decline') {
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
                    <RatcitaImage />
                </div>
                <Image src={Office} alt="Office Background" className="absolute -z-1 bottom-40 right-64 scale-[1.5]"/>
            </div>
        </div>
    );
};

export default Ratcita;