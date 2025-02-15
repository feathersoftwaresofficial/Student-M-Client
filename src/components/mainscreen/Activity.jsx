import React, { useState } from "react";
import icons from "../../data/icons";
import MutatingDotsLoder from "../../CustomComponents/MutatingDotsLoder";
import ActionPopup from "./ActionPopup";
import ColorRingLoder from "../../CustomComponents/ColorRingLoder";

const Activity = ({
  studentActivity,
  handleEditActivity,
  handleDeleteActivity,
  deleteUpdateLoading,
  deleteActivityId,
  getStudentActivityLoading,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(null);

  // Function to toggle the visibility of the action popup
  const togglePopup = (index) => {
    if (selectedActivityIndex === index) {
      setIsPopupVisible(!isPopupVisible); // Toggle the popup if same activity is clicked
    } else {
      setSelectedActivityIndex(index); // Set a new activity index
      setIsPopupVisible(true); // Show the popup
    }
  };

  if (getStudentActivityLoading) {
    return (
      <div className="w-full">
        <MutatingDotsLoder color={"black"} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 text-[#454545] lg:grid-cols-5 gap-4">
      {studentActivity.length > 0 ? (
        studentActivity.map((activity, index) => (
          <div
            key={index}
            className="border flex flex-col relative font-normal p-2 gap-2 capitalize bg-[#D3F8FA] rounded-[8px] w-full flex-grow overflow-hidden"
          >
            {deleteActivityId.includes(activity.id) && deleteUpdateLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                {/* <MutatingDotsLoder color={"red"} /> */}
                <ColorRingLoder />
              </div>
            )}

            <div className="flex justify-between items-center gap-3 w-full">
              <div className="w-full font-medium">Date</div>
              <div className="">:</div>
              <div className="w-full">{activity.date}</div>
            </div>
            <div className="flex justify-between items-center gap-3 w-full">
              <div className="w-full font-medium">Hour</div>
              <div className="">:</div>
              <div className="w-full">{activity.hour}</div>
            </div>
            <div className="flex justify-between items-center gap-3 w-full">
              <div className="w-full font-medium">Mentor</div>
              <div className="">:</div>
              <div className="w-full">{activity.mentor}</div>
            </div>
            <div className="flex gap-1 flex-col">
              <div className="w-16 font-medium">Activity</div>
              <div className="w-full min-h-[100px] px-3 py-2 rounded-[8px] text-sm bg-white">
                {activity.activity}
              </div>
            </div>

            <div
              className="dot absolute right-1 top-[10px] cursor-pointer"
              onClick={() => togglePopup(index)} // Show popup on click
            >
              {icons.verticalDot}
            </div>

            {isPopupVisible && selectedActivityIndex === index && (
              <ActionPopup
                styleClass={"top-6 right-6"}
                onView={() => console.log("View clicked", activity)}
                onEdit={() => handleEditActivity(index)}
                onDelete={() => {
                  handleDeleteActivity(index);
                  togglePopup("");
                }}
                showView={false}
                loading={
                  deleteActivityId.includes(activity.id) && deleteUpdateLoading
                }
                deleteLoadingIds={deleteActivityId}
                setSelectedActivityIndex={setSelectedActivityIndex}
              />
            )}
          </div>
        ))
      ) : (
        <p>No activities.</p>
      )}
    </div>
  );
};

export default Activity;
