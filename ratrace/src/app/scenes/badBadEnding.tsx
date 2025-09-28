"use client";

import React, { useState } from 'react';
import badbadEnding from '../images/Evil Ending.gif'
import Image from 'next/image';

const BadBadEnding = () => {

    return (
        <div className="w-full h-full relative">
            <Image src={badbadEnding} alt="Bad Ending" className="absolute -z-1 bottom-10 right-64 scale-[1.5]"/>
        </div>
    );
};

export default BadBadEnding;