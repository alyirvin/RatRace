"use client";

import React, { useState } from 'react';
import goodgoodEnding from '../images/RatTopiaGif.gif'
import Image from 'next/image';

const GoodGoodEnding = () => {

    return (
        <div className="w-full h-full relative">
            <Image src={goodgoodEnding} alt="Good Ending" className="absolute z-1 bottom-10 right-64 scale-[1.5]"/>
        </div>
    );
};

export default GoodGoodEnding;