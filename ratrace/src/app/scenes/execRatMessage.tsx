"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import ExecRat from '../components/execRat';
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

const ExecRatMessage = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Hey! There you are! I'm the chairman of the Cheeese Board here at Snout Farm. Do you have a moment to talk in the office?");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "helpful",
                text: "Yes, of course. What did you want to talk about?",
                response: "Perfect, it's time to talk about your future here at Snout Farm.",
                nextStage: "privateConversation"
            },
            {
                id: "nervous", 
                text: "Uh, sure. What is it?",
                response: "Alright, let's get down to business then. We need to discuss your future here at Snout Farm.",
                nextStage: "privateConversation"
            },
            {
                id: "ew",
                text: "Nope, I'm busy and then I'm clocking out.",
                response: "Well, that's unfortunate. I guess we can discuss your future here at Snout Farm right now.",
                nextStage: "fired"
            },
        ],
        privateConversation: [
            {
                id: "business",
                text: "So you wanted to discuss my future?",
                response: "Yes, I think you have a lot of potential here. King Rat is retiring soon, and I think you could be a great fit for his position.",
                nextStage: "confirm"
            },
            {
                id: "worried",
                text: "Is everything okay?",
                response: "Everything is more than okay. I think you have a lot of potential here. King Rat is retiring soon, and I think you could be a great fit for his position.",
                nextStage: "confirm"
            }
        ],
        confirm: [
            {
                id: "excitedYes",
                text: "Really?! I would love that!",
                response: "Fantastic! I'll have HR draw up the paperwork.",
                nextStage: "end"
            }
        ],
        fired: [
            {
                id: "fired",
                text: "My future? What about it?",
                response: "Well, since you seem so eager to leave, I think it's best if we part ways now. You're fired.",
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
                        
                        onDialogueData({
                            type: 'completed',
                            stage: 'RemiMessageDeliver',
                            karma: karmaPoints,
                            social: socialPoints,
                            sales: salesPoints,
                            fired: option.id === 'fired' ? true : false
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
                    <ExecRat />
                </div>
                <Image src={Office} alt="Office Background" className="absolute -z-1 bottom-40 right-64 scale-[1.5]"/>
            </div>
        </div>
    );
};

export default ExecRatMessage;