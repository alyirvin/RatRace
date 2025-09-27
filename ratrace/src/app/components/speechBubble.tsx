"use client";

import React, { useRef, useEffect, useState } from 'react';

interface SpeechBubbleProps {
    orientation: string;
    message: string;
}

const SpeechBubble = ({ orientation, message }: SpeechBubbleProps) => {
    const bubbleRef = useRef<HTMLDivElement>(null);
    const [triangleSize, setTriangleSize] = useState(20);

    useEffect(() => {
        if (bubbleRef.current) {
            const height = bubbleRef.current.offsetHeight;
            const size = Math.min(Math.max(height * 0.3, 0.5), 25);
            setTriangleSize(size);
        }
    }, [message]);

    return (
        <div className={`flex flex-row justify-center items-center text-lg ${orientation === 'left' ? '' : 'scale-x-[-1]'}`}>
            <div className={`w-0 h-0 translate-x-1`} style={{
                borderTop: `${triangleSize}px solid transparent`,
                borderRight: `${triangleSize}px solid #9ca3af`,
                borderBottom: `${triangleSize}px solid transparent`
            }}></div>
            <div 
                ref={bubbleRef}
                className={`relative min-w-[100px] min-h-[60px] max-w-[400px] bg-gray-400 rounded-2xl p-4`}
            >
                <p className={`text-white text-center break-words ${orientation === 'left' ? '' : 'scale-x-[-1]'}`}>{message}</p>
            </div>
        </div>
    );
};

export default SpeechBubble;