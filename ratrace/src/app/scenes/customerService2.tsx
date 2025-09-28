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

const customerService2 = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Hello!");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "helpful",
                text: "Hello! May I have your name?",
                response: "Hi! My name is Aratzia, I wanted to learn more about insurance…I am currently a college student and am lost in the world of insurances.",
                nextStage: "next"
            },
            {
                id: "nervous", 
                text: "Hi",
                response: "Uhm, hi my name is Aratzia, I wanted to learn more about insurance…I am currently a college student and am lost in the world of insurances.",
                nextStage: "next"
            },
            {
                id: "ew",
                text: "Hello, what do you need?",
                response: "Uhm, hi my name is Aratzia, I wanted to learn more about insurance…I am currently a college student and am lost in the world of insurances.",
                nextStage: "next"
            },
        ],
        next: [
            {
                id: "helpful",
                text: "Ok, Well, it’s important for students to make informed financial decisions, but navigating insurance for the first time can be confusing. Snout Farm makes a practical and economical option for new drivers or those seeking higher education. Would you like to hear more?",
                response: "It has been confusing. Yes please, what more information can you give me?",
                nextStage: "info"
            },
            {
                id: "nervous",
                text: "Ok, It’s important for students to make informed financial decisions...so uhm what else do you need?",
                response: "Yes, it has been confusing. But can you give me more information??",
                nextStage: "info"
            },
            {
                id: "ew",
                text: "Ok, so I am busy. I'll transfer you to someone else.",
                response: "Ok, thanks...",
                nextStage: "end"
            },
        ],
        info: [
            {
                id: "helpful",
                text: "We offer a good student discount, which will be beneficial for you! Additionally, we have another discount for students residing at the university campus. We have a smartphone app, just for you tech-savy students! This makes it easier to handle all your bills, details, and benefits.",
                response: "Oh wow, thank you! Are those all the discounts available for members?",
                nextStage: "afterFilling"
            },
             {
                id: "helpful",
                text: "So we have some discounts, apps, and other stuff thats cool.",
                response: "Uhm...anything specific that can be for me?",
                nextStage: "afterFilling"
            }
        ],
        afterFilling: [
            {
                id: "helpful",
                text: "We also have a Drive Safe & Save™ Program! This service uses an app to track driving behavior and offers discounts for safe driving practices.",
                response: "Wow! Sign me up right now!",
                nextStage: "proceed"
            },
            {
                id: "helpful",
                text: "We have an app for daily use, student discounts, and uh that's I think it?",
                response: "Uhm...I would like to speak to someone else.",
                nextStage: "end"
            }
        ],
        proceed: [
            {
                id: "helpful",
                text: "Okay, perfect! I got you all signed up!",
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

export default customerService2;