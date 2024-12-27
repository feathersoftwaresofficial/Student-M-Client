import React from 'react';
import MutatingDotsLoder from './MutatingDotsLoder';



const Button = ({ value, onClick, bg,loading,type,className,animationColor,disable }) => {
    return (
      <button
      
      type={type}
        disabled={loading || disable }
        onClick={onClick}
        style={{ backgroundColor: bg }}
        className={`px-4   flex items-center justify-center   min-w-[70px] min-h-[30px]  gap-4 rounded-[8px] bg-[#509CDB]       ${className} capitalize`}
      >
        {loading ? <MutatingDotsLoder color={animationColor}/>:value}
      </button>
    );
};

export default Button;

