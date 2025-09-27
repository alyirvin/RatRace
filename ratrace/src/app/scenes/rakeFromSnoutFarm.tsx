"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import Rake from '../components/rake';
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

const RakeFromSnoutFarm = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Woah woah woah, before you go back to your desk I want to go over a few things with you!");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "who",
                text: "Who are you?",
                response: "Obviously I'm Rake from Snout Farm! I'm kinda famous around here, and my job today is to help you out!",
                nextStage: "secondQ"
            }
        ],
        secondQ: [
            {
                id: "question",
                text: "Ok, what do you want to tell me?",
                response: "About how the point system works! We have three different types of points here: Social, Sales, and Karma. And how you choose to respond to others determines how many points you get.",
                nextStage: "nextQ"
            }
        ],
        nextQ: [
            {
                id: "accept",
                text: "How do I know what points I get?",
                response: "You can check how many points you have in the point book. You get social points by being kind to your coworkers, sales points by being a good insurance sales rat, and karma points based on how good of a person you are.",
                nextStage: "anotherQ"
            }
        ],
        anotherQ: [
            {
                id: "excited",
                text: "Sounds simple enough!",
                response: "I knew you would get it. For that response you gained +1 social points. And remember, your points could change your destiny, for better or for worse.",
                nextStage: "ending"
            },
            {
                id: "ew",
                text: "Sounds dumb, I don't want to worry about all that",
                response: "See for that you get -1 social points. Remember, your points could change your destiny for better or for worse.",
                nextStage: "ending"
            }
        ],
        ending: [
            {
                id: "good",
                text: "Thanks Rake from Snout Farm!",
                response: "No problem!",
                nextStage: "end"
            },
            {
                id: "bad",
                text: "Fine",
                response: "Guess I'll see you around then...",
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
                            socialPoints = -1;
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
                <div className="absolute z-1 top-[-175] left-[50%] translate-x-[-50%] scale-[0.5]">
                    <Rake />
                </div>
                <Image src={Office} alt="Office Background" className="absolute -z-1 bottom-40 right-64 scale-[1.5]"/>
            </div>
        </div>
    );
};

export default RakeFromSnoutFarm;