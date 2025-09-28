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
    playerData?: { karma: number; social: number; sales: number }; 
}

const ExecRatMessage = ({ onDialogueData, playerData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("I appreciate you taking the time to meet with me, I'm sure you've got a lot on your plate.");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const getCurrentOptions = () => {
        const karma = playerData?.karma || 0;
        const social = playerData?.social || 0;
        const sales = playerData?.sales || 0;
        
        const isExceptional = karma >= 7 && social >= 7 && sales >= 7; 
        const isGood = karma >= 5 && social >= 5 && sales >= 5; 
        const isPoor = karma < 2 || social < 2 || sales < 2; 

        const allStageOptions: Record<string, DialogueOption[]> = {
            initial: [
                {
                    id: "confident",
                    text: isExceptional ? "Thank you sir, I've been working hard and I think it shows." : isGood ? "Thank you, I try to make time for important conversations." : "No problem at all, what did you want to discuss?",
                    response: isExceptional ? "Indeed it does. Your performance has been exceptional across all areas." : isGood ? "Your balanced approach has been noticed. Very professional." : "I wanted to discuss your future here.",
                    nextStage: "performance"
                },
                {
                    id: "humble", 
                    text: isGood ? "I always have time for you, sir. What can I help you with?" : "Of course, how can I assist you?",
                    response: isGood ? "That kind of attitude is exactly why I wanted to speak with you." : "I appreciate your availability.",
                    nextStage: "performance"
                },
                {
                    id: "angry",
                    text: "Get to the point, I have more important things to do than chat.",
                    response: "I see. I don't think you've been fully committed to your role here, or mesh well with the team.",
                    nextStage: "fired"
                },
            ],
            performance: [
                {
                    id: "promotion_offer",
                    text: isExceptional ? "I'm ready for whatever challenge you have in mind." : isGood ? "I'm interested to hear your thoughts." : "What did you have in mind?",
                    response: isExceptional ? "Perfect. King Rat is retiring, and I want you to take his position. You've earned it." : isGood ? "King Rat is retiring soon. I think you could be a good fit for his position." : "Your performance has been lacking, it's time for you to seek opportunities elsewhere.",
                    nextStage: "decision"
                },
            ],
            decision: [
                {
                    id: "excitedYes",
                    text: isExceptional ? "I'm honored and ready to take on this responsibility!" : isGood ? "I would love the opportunity, thank you!" : "Wait no! I'll work harder, please don't fire me!",
                    response: isExceptional ? "Excellent! Your confidence is well-placed. I'll have HR prepare everything immediately." : isGood ? "Great! I believe you'll grow into the role well." : "Unfortunately, the decision is final.",
                    nextStage: "end"
                },
                {
                    id: "hesitant",
                    text: isGood || isExceptional ? "This is a big step... are you sure I'm ready for it?" : "I didn't think my performance was that bad...",
                    response: isGood || isExceptional ? "Some hesitation is natural. Your track record speaks for itself though, and the Cheese Board and I have full confidence in you." : "It was terrible, frankly. Pack your things.",
                    nextStage: isGood || isExceptional ? "oneLastTry" : "end"
                },
                {
                    id: "decline",
                    text: isGood || isExceptional ? "I appreciate the offer, but I think I want to explore other opportunities." : "There are definitely multiple people worse than me at the office.",
                    response: isGood || isExceptional ? "That's disappointing, but I respect your decision. Unfortunately, we'll need to part ways." : "I'm sure they'll be let go soon enough, right after you.",
                    nextStage: "end"
                }
            ],
            oneLastTry: [
                {
                    id: "accept_finally",
                    text: "You know what? You're right. I can do this!",
                    response: "That's the spirit! I'll have HR draw up the paperwork.",
                    nextStage: "end"
                },
                {
                    id: "stillDecline",
                    text: "I appreciate the confidence, but I think it's best if I move on.",
                    response: "I see. In that case, we'll have to let you go. Best of luck elsewhere.",
                    nextStage: "end"
                }
            ],
            fired: [
                {
                    id: "fired",
                    text: "And what about it?",
                    response: "Unfortunately, your performance hasn't met our standards. We're going to have to let you go.",
                    nextStage: "end"
                }
            ]
        };


        return allStageOptions[dialogueStage] || [];
    };

    const handleOptionClick = (option: DialogueOption) => {
        setCurrentDialogue(option.response);
        setShowOptions(false);
        
        setTimeout(() => {
            if (option.nextStage) {
                setDialogueStage(option.nextStage);
                if (option.nextStage === "end") {
                    if (onDialogueData) {
                        let karma = playerData?.karma || 0;
                        let social = playerData?.social || 0;
                        let sales = playerData?.sales || 0;

                        const isFired = (option.id === 'fired' || option.id === 'stillDecline' || option.id === 'decline'|| (option.id === 'excitedYes' && (karma < 2 || social < 2 || sales < 2)) || (option.id === 'hesitant' && (karma < 2 || social < 2 || sales < 2)));
                        
                        onDialogueData({
                            type: 'completed',
                            stage: 'FinalPromotion',
                            karma: karma,
                            social: social,
                            sales: sales,
                            fired: isFired ? true : false,
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