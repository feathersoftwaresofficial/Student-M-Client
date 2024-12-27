import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const MutatingDotsLoder = ({color}) => {
    return (
        <ThreeDots
            visible={true}
            height="10"
            width="35"
            color={color ?? "#fff"}
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
};

export default MutatingDotsLoder;
