import React from 'react';
import RatcitaImage from "../images/Ratcita clear.png";
import Image from 'next/image';

const Ratcita = () => {

    return (
        <div className="w-[60vw] h-[170vh] z-1 relative">
            <Image src={RatcitaImage} alt="Ratcita" layout="fill" objectFit="cover" />
        </div>
    );
};

export default Ratcita;