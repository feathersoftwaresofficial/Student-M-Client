import React, { useState } from "react";
import Input from "./Input";

const  Select = ({ label, value, options, onChange, id, name, other = false, ohterPlaceholder,selectorClass ,styleClass}) => {

  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  const handleChange = (e) => {
    
    const selectedValue = e.target.value;

    if (selectedValue === "Other") {
      setIsOtherSelected(true);
      setOtherValue(""); 
    } else {
      setIsOtherSelected(false); 
      onChange(e); 
    }
  }

  const handleOtherChange = (e) => {
    const newValue = e.target.value;
    setOtherValue(newValue);
    onChange({ target: { name, value: newValue } }); 

  
    if (newValue.trim() === "") {
      setIsOtherSelected(false);
    }
  };

 

  return (
  <div className={`flex flex-col  h-[45px] ${selectorClass} font-normal ` }>
      {!isOtherSelected ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          className={`p-2 bg-[#EEEEEE text-[#6D6D6D] rounded-[8px]  focus:outline-none h-full  w-full capitalize  ${styleClass}  `}
        >
          {label && <option value="">{label}</option>}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
          {other && <option value="Other">Other</option>}
        </select>
      ) : (
        <Input
          id={id}
          name={name}
          value={otherValue}
          onChange={handleOtherChange}
          placeholder={`Enter Your ${ohterPlaceholder}`}
        />
      )}
    </div>
  );
};

export default Select;