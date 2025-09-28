"use client";

import React, { useState } from 'react';
import firedEnding from '../images/Rat Trap ending.png'
import Image from 'next/image';

const FiredEnding = () => {

    return (
        <div className="w-full h-full relative">
            <Image src={firedEnding} alt="FiredEnding" className="absolute z-1 -bottom-20 right-33 scale-[1.3]"/>
        </div>
    );
};

export default FiredEnding;