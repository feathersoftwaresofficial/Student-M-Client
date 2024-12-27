import React from "react";
import PropTypes from "prop-types";

const ConfirmationPopup = ({ 
  visible = false, 
  message = "Are you sure?", 
  onConfirm, 
  onCancel 
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50 p-3 md:p-6">
      <div className="bg-white rounded-[8px]  p-6 w-full md:w-1/3">
        <p className="text-gray-700 mb-3 font-semibold">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="border w-[25%] border-[#17acc3]  capitalize  py-2 px-4 rounded-[8px]  text-[#17acc3] "
          >
            no
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#17acc3] w-[25%]  text-white capitalize rounded-[8px] py-2 px-4 "
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmationPopup.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationPopup;

