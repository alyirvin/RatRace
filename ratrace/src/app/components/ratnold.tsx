import React from 'react';
import RatnoldImage from "../images/Ratnold Clear.png"
import Image from 'next/image';

const Ratnold = () => {

    return (
        <div className="w-[60vw] h-[170vh] z-1 relative">
            <Image src={RatnoldImage} alt="Ratnold" layout="fill" objectFit="cover" />
        </div>
    );
};

export default Ratnold;