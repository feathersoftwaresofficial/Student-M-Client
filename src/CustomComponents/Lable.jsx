import React from 'react';

const Label = ({
  text,
  htmlFor,
  error = "",
  className = "",
  labelClassName,
  errorClassName,
}) => {
  return (
    <div className={`label-wrapper flex  justify-between items-center gap-1 ${className}`}>
      
      <label
        htmlFor={htmlFor}
        className={`block text-sm font-medium  mb-1 capitalize ${labelClassName}`}
      >
        {text}
      </label>

      {error && (
        <p className={`text-red-500 text-xs  ${errorClassName}`}>{error}</p>
      )}

    </div>
  );
};

export default Label;
