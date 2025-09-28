import React from 'react';
import RakeImage from "../images/Rake from Snout Farm.png";
import Image from 'next/image';

const Rake = () => {

    return (
        <div className="w-[60vw] h-[170vh] z-1 relative">
            <Image src={RakeImage} alt="Rake" layout="fill" objectFit="cover" />
        </div>
    );
};

export default Rake;