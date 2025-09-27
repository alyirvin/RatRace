import React from 'react';
import RatKingImage from "../images/RatKing.png";
import Image from 'next/image';

const RatKing = () => {

    return (
        <div className="w-auto h-auto">
            <Image src={RatKingImage} alt="RatKing" layout="fill" objectFit="cover" />
        </div>
    );
};

export default RatKing;