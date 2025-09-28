import React from 'react';
import RatildaImage from "../images/Ratilda Wormwood.png";
import Image from 'next/image';

const Ratilda = () => {

    return (
        <div className="w-[60vw] h-[170vh] z-1 relative">
            <Image src={RatildaImage} alt="Ratilda" layout="fill" objectFit="cover" />
        </div>
    );
};

export default Ratilda;