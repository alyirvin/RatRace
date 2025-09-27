"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import Remi from '../components/remi';
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

const WalkToDesk = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState(`Here's your desk with your computer. Since you're an intern right now, you'll be given tasks ` +
        `to help the other employees. The more you complete tasks and talk to your coworkers, the better your relationship with them will be! ` +
        `You can keep track of your coworker points here!`);
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    const [karma, setKarma] = useState(0);
    const [social, setSocial] = useState(0);
    const [sales, setSales] = useState(0);
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "helpful",
                text: "Awesome! I love talkiing to new people!",
                response: "That's great! You'll fit in perfectly then!",
                nextStage: "afterHelpful"
            },
            {
                id: "nervous", 
                text: "That's cool I guess.",
                response: "Yeah we're a really friendly bunch so feel free to start talking to anyone!",
                nextStage: "afterNervous"
            },
            {
                id: "ew",
                text: "Why should I do any of that? You sound terrible.",
                response: "Well because we're all pretty nice people who want to help you, but also because it's your job...",
                nextStage: "afterQuestion"
            },
        ]
    };

    const getCurrentOptions = () => {
        return allDialogueOptions[dialogueStage] || [];
    };

    const handleOptionClick = (option: DialogueOption) => {
        setCurrentDialogue(option.response);
        setShowOptions(false);
  
        if (onDialogueData) {
            if (option.id === 'helpful')
                { 
                    setKarma(karma + 1);
                    setSocial(social + 1);
                    setSales(sales + 1);
                }
            if (option.id === 'nervous') setSocial(social + 1);
            if (option.id === `ew`) 
            {
                setSocial(social - 1);
                setKarma(karma - 1);
            }
        }
        
        setTimeout(() => {
            if (option.nextStage) {
                setDialogueStage(option.nextStage);
                if (option.nextStage === "end") {
                    if (onDialogueData) {
                        onDialogueData({
                            type: 'completed',
                            finalStage: option.nextStage,
                            karma: karma,
                            social: social,
                            sales: sales
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

            <div className="z-0 w-[100vw] h-[100vh] flex justify-center items-center absolute bottom-0 right-0 ">
                <Image src={ComputerView} alt="Computer View" className="w-full h-full object-cover" />
            </div>
        </div>
    );
};

export default WalkToDesk;