import React from 'react';
import ExecRatImage from "../images/The big cheese.png";
import Image from 'next/image';

const ExecRat = () => {

    return (
        <div className="w-auto h-auto">
            <Image src={ExecRatImage} alt="ExecRat" layout="fill" objectFit="cover" />
        </div>
    );
};

export default ExecRat;