import React, { useState } from "react";
import DateRangeFilter from "./DateRangeFilter";
import icons from "../data/icons";


const FilterWithSlideDown = ({
  startDate,
  endDate,
  onDateChange,
  styleClass,
  inputStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative ${styleClass} rounded-[8px] font-normal text-[#6D6D6D] z-10   `}
    >
      <div
        className="  px-1 flex justify-between items-center   cursor-pointer h-[45px]"
        onClick={toggleDropdown}
      >
        <span className="ps-1 capitalize">data</span>
        <span
          className={`transition-transform duration-300 text-[15px]  ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {icons.downArrow}
        </span>
      </div>

      {isOpen && (
        <div
          className="absolute w-full top-[45px] left-0 right-0 overflow-hidden  rounded-sm "
          onClick={(e) => e.stopPropagation()}
        >
          <DateRangeFilter
            inputStyle={inputStyle}
            styleClass={styleClass}
            startDate={startDate}
            endDate={endDate}
            onDateChange={onDateChange}
          />
        </div>
      )}
    </div>
  );
};

export default FilterWithSlideDown;
