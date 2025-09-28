"use client";

import React, { useState, useEffect } from 'react';
import cutScene from '../images/Cutscene.gif'
import Image from 'next/image';

interface IntroCutSceneProps {
    onDialogueData?: (data: any) => void;
}

const IntroCutScene = ({ onDialogueData }: IntroCutSceneProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onDialogueData) {
                onDialogueData({
                    type: 'completed',
                    stage: 'IntroCutScene',
                    karma: 0,
                    social: 0,
                    sales: 0
                });
            }
        }, 10000); 

        return () => clearTimeout(timer); 
    }, [onDialogueData]);

    return (
        <div className="w-full h-full relative bg-[#B2F2EE]">
            <Image src={cutScene} alt="Intro Cut Scene" className="absolute z-1 bottom-60 right-114 scale-[3]"/>
        </div>
    );
};

export default IntroCutScene;