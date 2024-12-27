import React from "react";
import Input from "../../CustomComponents/Input";
import Button from "../../CustomComponents/Button";
import Lable from "../../CustomComponents/Lable";

const ProgramPopup = ({
  isEditMode,
  modalType,
  inputValue,
  onChangeInput,
  onClickCancel,
  onClickOk,
  loading,
  inputValueError,
  setInputValueError,
}) => {
  const onChanges = (e) => {
    onChangeInput(e);
    setInputValueError("");
  };
  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center p-3 md:p-6 ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onClickOk();
        }}
        className="bg-white p-6 rounded-[8px] w-full max-w-[400px] "
      >
        <h3 className="text-xl font-semibold mb-2">
          {isEditMode ? `Edit ${modalType}` : `Add ${modalType}`}
        </h3>
        <div className="flex flex-col gap-2">
          <Input
            value={inputValue}
            onChange={onChanges}
            className={`w-full p-2 border border-gray-300 rounded mb-3   ${
              inputValueError !== "" && "border-red-600"
            } `}
            placeholder={`Enter ${modalType} name`}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={() => onClickCancel()}
            className="bg-[#6B7280]  text-white  px-4 py-2 rounded"
            value="Cancel"
            disable={loading}
          />
          <Button
            type="submit"
            loading={loading}
            // onClick={onClickOk}
            className=" text-white bg-[#509CDB] px-4 py-2 rounded"
            value={isEditMode ? "Save Changes" : "Add"}
          />
        </div>
      </form>
    </div>
  );
};

export default ProgramPopup;
