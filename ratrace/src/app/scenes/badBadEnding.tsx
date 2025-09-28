"use client";

import React, { useState } from 'react';
import badbadEnding from '../images/Bad bad gif ending.gif'
import Image from 'next/image';

const BadBadEnding = () => {

    return (
        <div className="w-full h-full relative bg-[#B2F2EE]">
            <Image src={badbadEnding} alt="Bad Ending" className="absolute z-1 bottom-0 right-64 scale-[1.1]"/>
        </div>
    );
};

export default BadBadEnding;