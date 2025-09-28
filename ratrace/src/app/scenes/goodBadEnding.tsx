"use client";

import React, { useState } from 'react';
import goodbadEnding from '../images/Evil Ending.gif'
import Image from 'next/image';

const GoodBadEnding = () => {

    return (
        <div className="w-full h-full relative">
            <Image src={goodbadEnding} alt="Good Bad Ending" className="absolute z-1 bottom-10 right-64 scale-[1.5]"/>
        </div>
    );
};

export default GoodBadEnding;