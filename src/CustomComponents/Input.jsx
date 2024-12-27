import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getTodayDate } from "../utils/data";

const Input = ({
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  disabled = false,
  className = "",
  labelClassName = "",
  errorClassName = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordInput = type === "password";

   

  return (
    <div className="w-full h-full ">
      <div className="relative">
        <input
          type={isPasswordInput && showPassword ? "text" : type}
          id={name}
          name={name}
          value={type === "date" && !value ? getTodayDate() : value}
          max={type === "date" && getTodayDate()}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full  h-[45px] px-4 rounded-[8px]  focus:outline-none bg-[#EEEEEE]  transition${className}`}
        />
        {isPasswordInput && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;

