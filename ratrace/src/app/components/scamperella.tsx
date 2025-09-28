import React from 'react';
import ScamperellaImage from "../images/Scamperella.png";
import Image from 'next/image';

const Scamperella = () => {

    return (
        <div className="w-[60vw] h-[170vh] z-1 relative">
            <Image src={ScamperellaImage} alt="Scamperella" layout="fill" objectFit="cover" />
        </div>
    );
};

export default Scamperella;