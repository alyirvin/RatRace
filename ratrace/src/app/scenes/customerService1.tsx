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

const CustomerService1 = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Hello.");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "helpful",
                text: "Hi! How are you, may I have your full name?",
                response: "Hi, my name is Rizzia.",
                nextStage: "next"
            },
            {
                id: "nervous", 
                text: "Hi, what do you want..oh wait give me your name?",
                response: "Rizzia.",
                nextStage: "next"
            },
            {
                id: "ew",
                text: "Sup, whats your id and name and insurance number?",
                response: "Uhm. Hi, my name is Rizzia.",
                nextStage: "next"
            },
        ],
        next: [
            {
                id: "helpful",
                text: "Ok, perfect! With what may I help you with today?",
                response: "I need help selecting the best insurance plan for my budget.",
                nextStage: "nextQuestion"
            },
            {
                id: "nervous", 
                text: "Kay, well now tell me what you want?",
                response: "Alright...well I need help selecting the best insurance plan for my budget.",
                nextStage: "nextQuestion"
            },
            {
                id: "ew",
                text: "Ok bet, what do you need today?",
                response: "Uhm, well I need help selecting the best insurance plan for my budget.",
                nextStage: "nextQuestion"
            },

        ], //4 door sports ball
    //Hamster ball
        nextQuestion: [
            {
                id: "helpful",
                text: "Ok, sounds good! What type of vehicle do you have?",
                response: "I have a 4 door sports ball.",
                nextStage: "afterFilling"
            },
             {
                id: "helpful",
                text: "Ok, whatever. What is your vehicle?",
                response: "I have a 4 door sports ball.",
                nextStage: "afterFilling"
            }
        ],
        afterFilling: [
            {
                id: "helpful",
                text: "What is your current mileage?",
                response: "It is 45,786 miles.",
                nextStage: "proceed"
            },
            {
                id: "helpful",
                text: "Ugh, mileage?",
                response: "It is 45,786 miles.",
                nextStage: "proceed"
            }
        ],
        proceed: [
            {
                id: "helpful",
                text: "Have you ever had a ticket or been in any accidents?",
                response: "I have gotten only one ticket before.",
                nextStage: "afterTickets"
            },
            {
                id: "helpful",
                text: "Tickets or accidents? I'm sure you have one.",
                response: "I have gotten only one ticket before.",
                nextStage: "proceed"
            }
        ],
        afterTickets: [
            {
                id: "helpful",
                text: "Have you ever had your license suspended?",
                response: "No, and hopefully never!",
                nextStage: "afterLicense"
            },
            {
                id: "helpful",
                text: "Lol, have you had your license suspended?",
                response: "No, and hopefully never.",
                nextStage: "proceed"
            }
        ],
        afterLicense: [
            {
                id: "helpful",
                text: "What state do you currently reside in?",
                response: "I live in RatTopia.",
                nextStage: "result"
            },
            {
                id: "helpful",
                text: "Where do you live?",
                response: "Uhm RatTopia",
                nextStage: "proceed"
            }
        ],
        result: [
            {
                id: "helpful",
                text: "Okay, based on responses, the system has given me that your full monthly coverage would be between $175-210",
                response: "That sounds good! Can you sign me up and get me registered?",
                nextStage: "closing"
            },
            {
                id: "nervous", 
                text: "Ok, so your range is $175-210",
                response: "Okay, thanks. But, I am not interested, goodbye.",
                nextStage: "end"
            },
            {
                id: "ew",
                text: "Ok, based on what you said, so your range is $175-210",
                response: "Oh okay, thank you. But, I am not interested, goodbye.",
                nextStage: "end"
            },
        ],
        closing: [
            {
                id: "helpful",
                text: "Okay, perfect! I got you all signed up!",
                response: "Thank you, have a good day!",
                nextStage: "end"
            },
            {
                id: "helpful",
                text: "Done, good bye.",
                response: "...",
                nextStage: "end"
            }
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

export default CustomerService1;