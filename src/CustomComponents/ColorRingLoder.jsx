import React from 'react'
import { TailSpin } from "react-loader-spinner";
const ColorRingLoder = () => {
  return (
    <div>
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#D3F8FA"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default ColorRingLoder