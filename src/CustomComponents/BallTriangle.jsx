import React from 'react'
import { BallTriangle } from 'react-loader-spinner';
const BallTrianglee = () => {
  return (
    <>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#01BCD6"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </>
  );
}

export default BallTrianglee
