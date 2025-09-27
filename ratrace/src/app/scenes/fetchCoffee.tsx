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

const FetchCoffee = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState(`Now that I've shown you your desk, it's now time for your first task! ` +
        `Go grab a coffee from the break room and bring it to King Rat. He's in his office right now, and be careful, he's very... critical`);
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "helpful",
                text: "Thanks Remi! I think I'll be able to win over the boss in no time!",
                response: "I'm sure you will! I'll be rooting for you!",
                nextStage: "end"
            },
            {
                id: "nervous", 
                text: "Is there anything more productive to do?",
                response: "Well there's lots of benefits for getting your boss's coffee. I don't know if fulfilment is one but let's ont worry about that right now.",
                nextStage: "end"
            },
            {
                id: "ew",
                text: "I don't believe in higher ups.",
                response: "That's interesting... he is still your boss though so maybe just go bring him the coffee anyway...",
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
                            salesPoints = 1;
                            socialPoints = -1;
                        }
                        if (option.id === 'ew') {
                            socialPoints = -1;
                            salesPoints = -1;
                        }
                        
                        onDialogueData({
                            type: 'completed',
                            stage: 'FetchCoffee',
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

            <div className="z-0 w-[100vw] h-[100vh] flex justify-center items-center absolute bottom-28 right-0 ">
                <Image src={ComputerView} alt="Computer View" className="" />
            </div>
        </div>
    );
};

export default FetchCoffee;