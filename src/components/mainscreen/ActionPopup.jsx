


import React from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const ActionPopup = ({
  onView,        
  onEdit,        
  onDelete,    
  showView = true, 
  loading = false,   
  deleteLoadingIds = [] ,
  styleClass

}) => {
  return (
    <div
      className={`absolute z-40 text-[#6D6D6D]  ${styleClass} bg-white border border-gray-200 shadow-lg rounded-md w-fit`}
    >
      {showView && (
        <button
          onClick={onView}
          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
        >
          <FaEye className="" />
          <span className="text-sm ">View</span>
        </button>
      )}
      <button
        onClick={onEdit}
        className={`w-full flex items-center gap-2 px-4 py-2 ${
          showView ? "border-y border-opacity-30" : "border-none"
        } border-gray-400  hover:bg-gray-100 transition`}
      >
        <FaEdit className="" />
        <span className="text-sm ">Edit</span>
      </button>
      <button
        onClick={onDelete}
        disabled={loading}
        className={`w-full flex items-center gap-2 px-4 py-2 transition
             ${
               loading
                 ? "cursor-not-allowed text-red-300"
                 : "hover:bg-[#EEEEEE] "
             }
        `}
      >
        <AiFillDelete
        // className={`${loading ? "text-red-300" : "text-red-600"}`}
        />
        <span className="text-sm  ">Delete</span>
      </button>
    </div>
  );
};

export default ActionPopup;


