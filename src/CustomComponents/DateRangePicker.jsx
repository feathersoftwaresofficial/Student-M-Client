// import React from "react";

// const DateRangePicker = ({ value, onChange }) => {
//   const handleStartDateChange = (e) => {
//     onChange({ ...value, start: e.target.value });
//   };

//   const handleEndDateChange = (e) => {
//     onChange({ ...value, end: e.target.value });
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <div className="flex flex-col">

//         <input
//           type="date"
//           id="start-date"
//           value={value.start || ""}
//           onChange={handleStartDateChange}
//           className="border border-gray-300 p-2 rounded- focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <p>to</p>
//       <div className="flex flex-col">

//         <input
//           type="date"
//           id="end-date"
//           value={value.end || ""}
//           onChange={handleEndDateChange}
//           className="border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//     </div>
//   );
// };

// export default DateRangePicker;
