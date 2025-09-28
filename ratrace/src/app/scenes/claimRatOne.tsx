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

const ClaimRatOne = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("*On the phone* Hello? Hello can you hear me?");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "helpful",
                text: "Yes hello I can hear you, how may I help you?",
                response: "My stored cheese broke a pipe and now my basement is flooded. Is this covered?",
                nextStage: "solutions"
            },
            {
                id: "ew",
                text: "Obviously I can hear you",
                response: "Well aren't you rude. I don't have time for this, my stored cheese broke a pipe and now my basement is flooded. Is this covered?",
                nextStage: "solutions"
            },
        ],
        solutions: [
            {
                id: "kind",
                text: "I am sorry to hear that! Accidental water damage may be covered, but damages caused by cheese usually are not. Let us check your policy details together.",
                response: "Oh thank you, that's so kind of you to be so thourough",
                nextStage: "end"
            },
            {
                id: "neutral",
                text: "That’s hilarious! No way we’re paying for your cheese pool party.",
                response: "I don't need this right now. If you're not going to help then I'm leaving",
                nextStage: "end"
            },
            {
                id: "bad",
                text: "Basements flood all the time, get over it",
                response: "OMG Rude!! Do you not realize how expensive my stuff in there was and it's all ruined!",
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
                        if (option.id === 'ew') {
                            socialPoints = -1;
                            salesPoints = -1;
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
                            stage: 'ClaimRatOne',
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

export default ClaimRatOne;