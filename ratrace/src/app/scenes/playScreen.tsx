"use client";

import React, { useState, useEffect } from 'react';
import title from '../images/PlayScreen.gif'
import Image from 'next/image';

interface IntroCutSceneProps {
    onDialogueData?: (data: any) => void;
}

const PlayScreen = ({ onDialogueData }: IntroCutSceneProps) => {
    const handleStartGame = () => {
        if (onDialogueData) {
            onDialogueData({
                type: 'completed',
                stage: 'PlayScreen',
                karma: 0,
                social: 0,
                sales: 0
            });
        }
    };

    return (
        <div className="w-full h-full relative bg-[#B2F2EE]">
            <button onClick={handleStartGame} className="absolute z-10 top-90 left-90 transform -translate-x-1/2 -translate-y-1/2 px-8 py-4 font-bold text-[#272E2F] rounded-lg transition-all duration-200 hover:scale-125 -rotate-7 text-4xl">
                Start Game
            </button>
            <Image src={title} alt="Play Screen" className="absolute z-1 bottom-0 right-0 w-full h-full"/>
        </div>
    );
};

export default PlayScreen;