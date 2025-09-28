"use client";

import React, { useState } from 'react';
import SpeechBubble from '../components/speechBubble';
import ComputerView from '../images/computer_on.png';
import Image from 'next/image';
// import leftEar fro

interface DialogueOption {
    id: string;
    text: string;
    response: string;
    nextStage?: string;
}

interface RemiIntroProps {
    onDialogueData?: (data: any) => void;
}

const HelpRatnold = ({ onDialogueData }: RemiIntroProps) => {
    const [currentDialogue, setCurrentDialogue] = useState(`Alright let's get into it! Whose name is on the statement again?`);
    const [showOptions, setShowOptions] = useState(true);
    const [dialogueStage, setDialogueStage] = useState("initial");
    
    const allDialogueOptions: Record<string, DialogueOption[]> = {
        initial: [
            {
                id: "halfRightNames",
                text: "It says Rat Damon at the top.",
                response: "Ok perfect, does he have any excluded drivers listed?",
                nextStage: "question2"
            },
            {
                id: "correctNames", 
                text: "There's actually two listed, Rat Damon and Count Squeakula.",
                response: "Great catch! Do they have any excluded drivers listed?",
                nextStage: "question2"
            },
            {
                id: "incorrectNames",
                text: "It says this is for United Rat",
                response: "Hmm, that doesn't sound right. Are there any excluded drivers listed?",
                nextStage: "question2"
            },
        ],
        question2: [
            {
                id: "correctNoExcluded",
                text: "Yes, there's a note that says Ratrick Swayze is excluded.",
                response: "Perfect, and then lastly all I need is the premium for the BMW.",
                nextStage: "question3"
            },
            {
                id: "incorrectNoExcluded", 
                text: "No, it just has the drivers listed.",
                response: "Hmm, are you sure? There should have been something about an excluded driver.",
                nextStage: "question3"
            },
            {
                id: "justBad",
                text: "How would I know what drivers he didn't list?",
                response: "If you can't talk to me about the report, I guess I'll just have to figure it out myself.",
                nextStage: "end"
            }
        ],
        question3: [
            {
                id: "incorrectPremium",
                text: "The premium says it's $736.76.",
                response: "Hmm, that doesn't seem right. It should be much lower than that... Thanks for your help though.",
                nextStage: "end"
            },
            {
                id: "correctPremium",
                text: "It says the premium is $565.",
                response: "Great, thanks for confirming that! Thanks for your help!",
                nextStage: "end"
            },
            {
                id: "justBad2",
                text: "There's too many numbers, I can't tell.",
                response: "Maybe this isn't the right fit for you. I'll figure it out myself then.",
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
                        
                        if (option.id === 'halfRightNames') {
                            socialPoints = socialPoints + 1;
                        }
                        if (option.id === 'correctNames') {
                            salesPoints = salesPoints + 1;
                            socialPoints = socialPoints + 1;
                        }
                        if (option.id === 'incorrectNames') {
                            socialPoints = socialPoints - 1;
                            salesPoints = salesPoints - 1;
                        }
                        if (option.id === 'correctNoExcluded') {
                            salesPoints = salesPoints + 1;
                            socialPoints = socialPoints + 1;
                        }
                        if (option.id === 'incorrectNoExcluded') {
                            socialPoints = socialPoints - 1;
                            salesPoints = salesPoints - 1;
                        }
                        if (option.id === 'justBad' || option.id === 'justBad2') {
                            socialPoints = socialPoints - 1;
                            salesPoints = salesPoints - 1;
                            karmaPoints = karmaPoints - 1;
                        }
                        if (option.id === 'correctPremium') {
                            salesPoints = salesPoints + 1;
                            socialPoints = socialPoints + 1;
                        }
                        if (option.id === 'incorrectPremium') {
                            socialPoints = socialPoints - 1;
                            salesPoints = salesPoints - 1;
                        }
                        
                        onDialogueData({
                            type: 'completed',
                            stage: 'HelpedRatnold',
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

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;

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

            <div className="z-0 w-[100vw] h-[100vh] flex justify-center items-center absolute -bottom-40 right-0 ">
                <div className="z-1">
                    <div className="w-full h-full absolute bottom-54 left-10">
                        <Image
                            src={`/ratopia_declarations-${currentPage}.png`}
                            alt={`Insurance Declaration Form - Page ${currentPage}`}
                            fill
                            className="object-contain scale-[0.7] pb-40 w-full h-full"
                        />
                    </div>
                        
                    <div className="absolute -bottom-1 left-2 text-black px-2 py-1 rounded text-xs">
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 bg-gray-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed mr-2"
                                >
                                {/* <Image */}
                            </button>
                            <span className="text-sm self-center">
                                {currentPage}/{totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="ml-2 px-3 py-1 bg-gray-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                            Next →
                            </button>
                        </div>
                    </div>
                </div>
                <Image src={ComputerView} alt="Computer View" className="scale-[1.1] z-0" />
            </div>
        </div>
    );
};

export default HelpRatnold;