import React from "react";

const DateFilter = ({ value, onChange }) => {
  const handleDateChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex items-center gap-2">

      <input
        type="date"
        id="filter-date"
        value={value || ""}
        onChange={handleDateChange}
        className="border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default DateFilter;
