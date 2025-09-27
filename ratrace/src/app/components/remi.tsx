import React from 'react';
import RemiImage from "../images/remi.png";
import Image from 'next/image';

const Remi = () => {

    return (
        <div className="w-auto h-auto">
            <Image src={RemiImage} alt="Remi" layout="fill" objectFit="cover" />
        </div>
    );
};

export default Remi;