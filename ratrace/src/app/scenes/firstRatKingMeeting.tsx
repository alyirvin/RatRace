"use client";

import React, { useState } from 'react';
import NarrationBubble from '../components/narrationBubble';
import SpeechBubble from '../components/speechBubble';
import RatKing from '../components/ratKing';
import RatKingOffice from '../images/Less tall Rat King room.png';
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

const FirstRatKingMeeting = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("What are you doing in MY office intern? Don't you know I'm busy!");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
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
                        if (option.id === 'nervous') {
                            socialPoints = -1;
                        }
                        if (option.id === 'ew') {
                            salesPoints = -2;
                            socialPoints = -1;
                        }
                        
                        onDialogueData({
                            type: 'completed',
                            stage: 'FirstRatKingMeeting',
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
            <div className="absolute top-[25%] left-[7%] z-10">
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
            
            
            <div className="z-0 w-[100vw] h-[100vh] flex justify-center items-center absolute bottom-20 right-0 ">
                <Image src={RatKingOffice} alt="Rat King Office" className="" />
            </div>
        </div>
    );
};

export default FirstRatKingMeeting;