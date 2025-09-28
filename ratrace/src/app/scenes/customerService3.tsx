"use client";

import React, { useState } from 'react';
import NarrationBubble from '../components/narrationBubble';
import SpeechBubble from '../components/speechBubble';
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

const CustomerService3 = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Hello!");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
     const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "helpful",
                text: "Hello! Thank you for calling Snout Farm Insurance, may I have your full name and policy number please?",
                response: "Hi, my name is Riora, my policy number is 987654. I was recently in a minor accident and I need help filing a claim.",
                nextStage: "next"
            },
            {
                id: "nervous", 
                text: "Yo, who’s this?",
                response: "Uhm, hi my name is Riora, I was recently in a minor accident and I need help filing a claim.",
                nextStage: "next"
            },
            {
                id: "ew",
                text: "Hello, what do you want?",
                response: "Hi...uhm, my name is Riora. I was recently in a minor accident and I need help filing a claim.",
                nextStage: "next"
            },
        ],
        next: [
            {
                id: "helpful",
                text: "I’m sorry to hear that, Liora. I’ll guide you step by step through filing your claim today.",
                response: "Thank you, I really appreciate your help.",
                nextStage: "info"
            },
            {
                id: "nervous",
                text: "Damn, that sucks LOL.",
                response: "???",
                nextStage: "info"
            },
            {
                id: "ew",
                text: "Oof...sucks",
                response: "Uhm...ok...can you help me though?",
                nextStage: "info"
            },
        ],
        info: [
            {
                id: "helpful",
                text: "First, I’ll need the details of the accident: date, location, and a short description. Once I have that, we’ll submit your claim together",
                response: "It was yesterday, the 4th of October at Rat Dr. I was rear ended by a 2-door sports ball.",
                nextStage: "afterFilling"
            },
            {
                id: "nervous",
                text: "Send me the info later, I don’t have time right now. Bye",
                response: "??? OK then",
                nextStage: "end"
            },
            {
                id: "ew",
                text: "Just tell me when and where, that’s all I need.",
                response: "Uhm...ok, it was Rat Dr, 1 day ago.",
                nextStage: "afterFilling"
            },
        ],
        afterFilling: [
            {
                id: "helpful",
                text: "Your claim has been submitted successfully! Is there anything else I can assist you with today?",
                response: "That is all I need, thank you so much!",
                nextStage: "proceed"
            },
            {
                id: "ew",
                text: "Your claim has been submitted. Bye now.",
                response: "Uh...ok thanks I guess.",
                nextStage: "end"
            }
        ],
        proceed: [
            {
                id: "helpful",
                text: "Okay, perfect. Thank you and have a good one.",
                response: "Thank you, bye!",
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
            
            
            <div className="z-0 w-[100vw] h-[100vh] flex justify-center items-center absolute bottom-30 right-0 ">
                <Image src={ComputerView} alt="Computer View" className="" />
            </div>
        </div>
    );
};

export default CustomerService3;