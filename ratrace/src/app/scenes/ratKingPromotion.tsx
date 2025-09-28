"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import RatKing from '../components/ratKing';
import RatKingOffice from '../images/Less tall Rat King room.png';
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

const RatKingPromotion = ({ onDialogueData, playerData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState("Ah you're finally here. I've been waiting. I've heard a lot about your performance lately.");
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    // const allDialogueOptions: Record<string, DialogueOption[]> = {
    //     initial: [
    //         {
    //             id: "helpful",
    //             text: "Hopefull",
    //             response: "Hmm. Polite. Efficient. Acceptable.",
    //             nextStage: "end"
    //         },
    //         {
    //             id: "nervous", 
    //             text: "Here’s your coffee. I had more important things to do, but whatever.",
    //             response: "Well. Remind me never to rely on you for anything mission-critical.",
    //             nextStage: "end"
    //         },
    //         {
    //             id: "ew",
    //             text: "*Throw the coffee at king rat*",
    //             response: "RAAAAAAAAHHHHHHHHHHHHH",
    //             nextStage: "end"
    //         },
    //     ]
    // };

    const getCurrentOptions = () => {
        const karma = playerData?.karma || 0;
        const social = playerData?.social || 0;
        const sales = playerData?.sales || 0;

        const allStageOptions: Record<string, DialogueOption[]> = {
            initial: [
                {
                    id: "confident",
                    text: "Hopefully I continue to impress you, sir.",
                    response: (social >= 3 && sales >= 3) ? "Indeed, your skills have been noted. Impressive." : (social >=2 && sales >=2) ? "Hmm. Your performance has been... adequate." : "Unikely. Your performance has been sorely lacking.",
                    nextStage: "followup1"
                },
                {
                    id: "moderate", 
                    text: "I hope you've been satisfied with my work.",
                    response: (social >= 3 && sales >= 3)    ? "Excellent. Results-driven attitude. That's exactly what we need." : (social >= 2 && sales >= 2) ? "More results would be appreciated." : "Your performance has been sorely lacking.",
                    nextStage: "followup2"
                },
                {
                    id: "angry",
                    text: "To be honest, I don't care about this job. I'm just here for the paycheck.",
                    response: "Don't waste my time if you don't care about this job. You're fired.",
                    nextStage: "end"
                },
            ],
            followup1: [
                {
                    id: "promotion_ready",
                    text: (social >= 3 || sales >= 3 ) ? "I'm ready for more responsibility, sir." : (social >= 2 || sales >= 2) ? "I promise I'll do better." : "Please don't fire me, I need this job.",
                    response: (social >= 3 || sales >= 3 ) ? "That's exactly what I wanted to hear. You're getting a promotion." : (social >=2 || sales >=2) ? "I'm going to give you the opportunity to prove yourself. You'll be starting in a new role soon." : "You're not cut out for this.",
                    nextStage: "end"
                },
            ],
            followup2: [
                {
                    id: "thankful",
                    text: (social >= 3 || sales >= 3 ) ? "Thank you for the kind words, sir." : (social >= 2 || sales >= 2) ? "I appreciate the feedback." : "I'm sorry sir, I'll do better!",
                    response: (social >= 3 || sales >= 3 ) ? "I don't give them lightly. Speaking of other things I don't give lightly, you'll be receiving a promotion." : (social >=2 || sales >=2) ? "You'll be starting in a new role soon, so I suggest you think deeply about this feedback." : "I have little desire to see that.",
                    nextStage: "end"
                },
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
                        let karmaPoints = 0;
                        let socialPoints = 0;
                        let salesPoints = 0;

                        if (!playerData)
                        {
                            playerData = { karma: 0, social: 0, sales: 0 };
                        }
                        
                        if (option.id === 'confident' && (playerData?.social || 0) >= 3) {
                            socialPoints = 2;
                            salesPoints = 1;
                        } else if (option.id === 'confident') {
                            socialPoints = 0;
                        }
                        
                        if (option.id === 'business' && (playerData?.sales || 0) >= 3) {
                            salesPoints = 2;
                            socialPoints = 1;
                        } else if (option.id === 'business') {
                            salesPoints = 0;
                        }
                        
                        if (option.id === 'humble' && (playerData?.karma || 0) >= 2) {
                            karmaPoints = 2;
                            socialPoints = 1;
                        } else if (option.id === 'humble') {
                            karmaPoints = -1;
                        }

                        // Follow-up stage rewards
                        if (option.id === 'promotion_ready' && ((playerData?.social || 0) >= 3 || (playerData?.sales || 0) >= 3 || (playerData?.karma || 0) >= 2)) {
                            socialPoints += 1;
                            salesPoints += 2;
                            karmaPoints += 1;
                        } else if (option.id === 'promotion_ready') {
                            socialPoints += 0;
                        }

                        if (option.id === 'grateful') {
                            socialPoints += 1;
                            karmaPoints += 1;
                        }

                        if (option.id === 'ambitious' && (playerData?.sales || 0) >= 2) {
                            salesPoints += 2;
                            socialPoints += 1;
                        } else if (option.id === 'ambitious') {
                            salesPoints += 0;
                        }
                        
                        onDialogueData({
                            type: 'completed',
                            stage: 'FirstRatKingMeeting',
                            karma: karmaPoints,
                            social: socialPoints,
                            sales: salesPoints,
                            fired: (playerData?.social < 2 && playerData?.sales < 2) ? true : false
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
            
            
            <div className="z-0 w-[100vw] h-[100vh] flex justify-center items-center absolute bottom-20 right-0 ">
                <Image src={RatKingOffice} alt="Rat King Office" className="" />
            </div>
        </div>
    );
};

export default RatKingPromotion;