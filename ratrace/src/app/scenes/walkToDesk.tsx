"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import Remi from '../components/remi';
import ComputerView from '../images/computerView.png';
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

const WalkToDesk = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState(`Here's your desk with your computer. Since you're an intern right now, you'll be given tasks ` +
        `to help the other employees. The more you complete tasks and talk to your coworkers, the better your relationship with them will be! ` +
        `You can keep track of your coworker points here!`);
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "helpful",
                text: "Awesome! I love talking to new people!",
                response: "That's great! You'll fit in perfectly then!",
                nextStage: "end"
            },
            {
                id: "nervous", 
                text: "That's cool I guess.",
                response: "Yeah we're a really friendly bunch so feel free to start talking to anyone!",
                nextStage: "end"
            },
            {
                id: "ew",
                text: "Why should I do any of that? You sound terrible.",
                response: "Well because we're all pretty nice people who want to help you, but also because it's your job...",
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
                        // Calculate points based on player choice
                        let karmaPoints = 0;
                        let socialPoints = 0;
                        let salesPoints = 0;
                        
                        if (option.id === 'helpful') {
                            karmaPoints = 1;
                            socialPoints = 1;
                            salesPoints = 1;
                        }
                        if (option.id === 'nervous') {
                            socialPoints = 1;
                        }
                        if (option.id === 'ew') {
                            socialPoints = -1;
                            karmaPoints = -1;
                        }
                        
                        onDialogueData({
                            type: 'completed',
                            finalStage: option.nextStage,
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

            <div className="z-0 w-[100vw] h-[100vh] flex justify-center items-center absolute bottom-30 right-0 ">
                <Image src={ComputerView} alt="Computer View" className="" />
            </div>
        </div>
    );
};

export default WalkToDesk;