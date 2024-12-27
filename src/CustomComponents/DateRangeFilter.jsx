

import React from "react";
import { getTodayDate } from "../utils/data";

const DateRangeFilter = ({
  startDate,
  endDate,
  onDateChange,
  styleClass,
  inputStyle,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onDateChange(name, value);
  };

  return (
    <div
      className={`flex flex-col gap-3 bg-whit  w-full   ${styleClass} border border-blac mt-1  shadow-md px-3 py-2  rounded-[8px] bg-[#EEEEEE]   `}
    >
      {/* Start Date Field */}
      <div className="flex flex-col gap-1">
        <label htmlFor="startDate" className=" text-sm">
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleChange}
          max={endDate || getTodayDate()}
          className={`w-full   rounded-[8px]  ${inputStyle} p-2 text-sm focus:outline-none `}
        />
      </div>

      {/* End Date Field */}
      <div className="flex flex-col gap-1">
        <label htmlFor="endDate" className=" text-sm">
          End Date
        </label>
        <input
          id="endDate"
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleChange}
          min={startDate}
          max={getTodayDate()}
          className={`w-full  focus:outline-none ${inputStyle}  rounded-[8px] p-2 text-sm `}
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
