import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

const MultiSelector = ({
  options = [
    { field: "Mentor 1", id: 1 },
    { field: "Mentor 2", id: 2 },
  ],
  selectedMentors,
  onSelect,
  onRemove,
}) => {
  return (
    <Multiselect
      options={options}
      selectedValues={selectedMentors}
      onSelect={onSelect}
      onRemove={onRemove}
      displayValue="field"
      placeholder={!selectedMentors.length && "Select mentors"}
      showCheckbox={true}
      style={{
        multiselectContainer: { color: "black" },
        // searchBox: { border: "1px solid #ccc", borderRadius: "2px" },
        optionContainer: {
          maxHeight: "150px",
          overflowY: "auto",
          textTransform: "capitalize",
        },
        searchBox: {
          border: "1px solid #fff",
          borderRadius: "8px",
          height: "45px", // Set height here
          lineHeight: "45px", // Align text vertically
          display: "flex",
          alignItems: "center",
          padding: "0 15px",
          gap: "5px",
          backgroundColor: "#EEEEEE",
        },
        chips: {
          background: "#17acc3",
          borderRadius: "8px",
          height: "80%", // Set chip height
          display: "flex",
          alignItems: "center", // Center text vertically
          fontSize: "16px",
          margin: "0px",
          textTransform: "capitalize",
        },
        option: {
          padding: "8px 12px",
          color: "#000",
          backgroundColor: "#fff",
          hover: {
            backgroundColor: "#509CDB", // Hover color
            color: "#fff",
          },
          selected: {
            backgroundColor: "#509CDB", // Selected color
            color: "#fff",
          },
        },
      }}
    />
  );
};

export default MultiSelector;
