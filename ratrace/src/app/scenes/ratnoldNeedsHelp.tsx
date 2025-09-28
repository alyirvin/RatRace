"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import Ratnold from '../components/ratnold';
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

const RatnoldNeedsHelp = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Hey there! You're our intern right? I could use your help with this task. I need to put together a report but I need some info from this declarations report. Do you mind reading it off to me?");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "excited",
                text: "Sure, I'd be happy to help!",
                response: "Great! I've got the report right here. Just read off the information and I'll jot it down.",
                nextStage: "end"
            },
            {
                id: "nervous", 
                text: "I'm not sure, I don't want to mess anything up...",
                response: "Don't worry, it's pretty straightforward. Just read the info as it is, no need to interpret anything.",
                nextStage: "end"
            },
            {
                id: "ew",
                text: "Read it yourself, I'm not your assistant.",
                response: "Oh... okay. I guess I'll figure it out myself then.",
                nextStage: "end"
            },
        ],
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
                            karmaPoints = 1;
                            salesPoints = 1;
                        }
                        if (option.id === 'ew') {
                            salesPoints = -1;
                            socialPoints = -1;
                            karmaPoints = -1;
                        }
                        if (option.id === 'nervous') {
                            socialPoints = 0; 
                        }

                        
                        onDialogueData({
                            type: 'completed',
                            stage: 'RatnoldNeedsHelp',
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
            <div className="absolute top-[30%] right-[58%]">
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
                    <Ratnold />
                </div>
                <Image src={Office} alt="Office Background" className="absolute -z-1 bottom-40 right-64 scale-[1.5]"/>
            </div>
        </div>
    );
};

export default RatnoldNeedsHelp;