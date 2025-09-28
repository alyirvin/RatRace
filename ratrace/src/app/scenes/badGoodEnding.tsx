"use client";

import React, { useState, useEffect } from 'react';
import badGoodEnding from '../images/Newspaper.png'
import Image from 'next/image';

const BadGoodEnding = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="w-full h-full relative bg-[#F5F1E6]">
            <Image 
                src={badGoodEnding} 
                alt="Bad Ending" 
                className={`absolute z-1 -bottom-60 right-0 scale-[0.5] transition-transform duration-1000 ${
                    isLoaded ? 'animate-spin' : ''
                }`}
                style={{
                    animationDuration: '2s',
                    animationIterationCount: '1',
                    animationTimingFunction: 'ease-out'
                }}
            />
        </div>
    );
};

export default BadGoodEnding;