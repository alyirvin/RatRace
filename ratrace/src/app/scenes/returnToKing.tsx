"use client";

import React, { useState } from 'react';
import NarrationBubble from '../components/narrationBubble';
import SpeechBubble from '../components/speechBubble';
import RatKing from '../components/ratKing';
import RatKingOffice from '../images/ratKingRoom.png';
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

const ReturnToKing = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Hello, thank you for coming in. I wanted to speak to you on certain things.");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "helpful",
                text: "Good morning, sir! Yes, what did you want to speak to me about?",
                response: "Hmm, yes I did. Very polite. You’ve really been knocking it out of the park lately. Everyone’s noticed the effort and results you’ve brought in. After reviewing your performance, we’re pleased to offer you a promotion. You’ve shown leadership, teamwork, and the ability to consistently deliver. ",
                nextStage: "next"
            },
            {
                id: "nervous", 
                text: "I had more important things to do, but you wanted to see me or whatever?",
                response: "Well. You can forget any future promotions, you are fired.",
                nextStage: "end"
            },
            {
                id: "ew",
                text: "*Throw the coffee at king rat*",
                response: "RAAAAAAAAHHHHHHHHHHHHH",
                nextStage: "end"
            },
        ],
        next: [
            {
                id: "offer",
                text: "Thank you so much! I'm so grateful sir!",
                response: "You are welcome.",
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
            
            
            <div className="z-0 w-[100vw] h-[100vh] flex justify-center items-center absolute bottom-30 right-0 ">
                <Image src={RatKingOffice} alt="Rat King Office" className="" />
            </div>
        </div>
    );
};

export default ReturnToKing;