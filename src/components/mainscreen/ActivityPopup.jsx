import React from "react";
import Input from "../../CustomComponents/Input";
import Textarea from "../../CustomComponents/Textarea";
import Select from "../../CustomComponents/Select";
import Button from "../../CustomComponents/Button";
import Label from "../../CustomComponents/Lable";
import { getTodayDate } from "../../utils/data";

const ActivityPopup = ({

  isVisible,
  onClose,
  onSubmit,
  formState,
  handleInputChange,
  mentorList,
  editingIndex,
  isLoading,

}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-700 bg-opacity-50 flex justify-center items-center p-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="bg-white p-6 rounded-[8px] w-full max-w-sm"
      >
        <h4 className="text-lg text-center font-semibold mb-2">
          {editingIndex !== null ? "Edit Activity" : "Add Activity"}
        </h4>
        <div className="flex flex-col gap-2">
          <div>
            <Label
              text="Activity"
              error={formState.errors.activity}
              className="text-[#6D6D6D"
            />
            <Textarea
              name="activity"
              placeholder="Activity"
              value={formState.activity}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <Label
              text="Date"
              error={formState.errors.date}
              className="text-[#6D6D6D"
            />
            <Input
              type="date"
              name="date"
              value={formState.date || getTodayDate()}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <Label
              text="Hour"
              error={formState.errors.hour}
              className="text-[#6D6D6D"
            />
            <Input
              type="number"
              placeholder="Hour"
              name="hour"
              value={formState.hour}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <Label
              text="Mentor"
              className="text-[#6D6D6D"
              error={formState.errors.mentor}
            />
            <Select
              label="Mentor"
              name="mentor"
              value={formState.mentor}
              options={mentorList.map((mentor) => mentor.field) ?? []}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              styleClass={"bg-[#EEEEEE]"}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            type={"button"}
            onClick={onClose}
            value="Cancel"
            className="text-white bg-[#6B7280] px-4 py-2 "
          />
          <Button
            type={"submit"}
            value={editingIndex !== null ? "Update" : "Add"}
            loading={isLoading}
            className="text-white  px-4 py-2 "
            style={{
              background: "linear-gradient(90deg, #17ACC3, #168BA4)",
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default ActivityPopup;
