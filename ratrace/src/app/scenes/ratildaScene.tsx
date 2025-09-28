"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import RatildaImage from '../components/ratilda';
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

const Ratilda = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("psst... pssssstt... over here");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "response",
                text: "Yes?",
                response: "Oh good you heard me. Hey, the name's Ratilda, Ratilda Wormwood. I need you to do me a HUGE favor, alright?",
                nextStage: "helpOffer"
            },
            {
                id: "ignore",
                text: "*Ignore the Voice*",
                response: "I know you can hear me over there, stop ignoring me! I need help!",
                nextStage: "helpOffer"
            }
        ],
        helpOffer: [
            {
                id: "helpOut",
                text: "What do you need me to do?",
                response: "Great you're on board! You see, I was given sooo much work this week and I just don't have any time to finish it. Do you think maybe you could help a girl out and take some of it?",
                nextStage: "answer"
            }
        ],
        answer: [
            {
                id: "yes",
                text: "I mean, I guess I don't have too much work of my own to do, I might be able to take a small amount off of you.",
                response: "Perfect! I just have three presentations that need to be finished by Friday as well as a written report that's due tomorrow. That's not too bad for you.",
                nextStage: "finalMessage"
            },
            {
                id: "no",
                text: "I'm not going to do that, you should've been able to manage your time better.",
                response: "But... but... ugh fine! I don't need your help!",
                nextStage: "end"
            }
        ],
        finalMessage: [
            {
                id:"confused",
                text: "Wait what?",
                response: "Byee thank you so much work bestie!",
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
                        
                        if (option.id === 'yes') {
                            socialPoints = 1;
                            karmaPoints = -1;
                        }
                        if (option.id === 'no') {
                            socialPoints = -1;
                            karmaPoints = 1;
                        }
                        if (option.id === 'response') {
                            socialPoints = 1; 
                        }
                        if (option.id === 'ignore') {
                            socialPoints = - 1;
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
                    <RatildaImage />
                </div>
                <Image src={Office} alt="Office Background" className="absolute -z-1 bottom-40 right-64 scale-[1.5]"/>
            </div>
        </div>
    );
};

export default Ratilda;