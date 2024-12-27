import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../CustomComponents/Button";
import {
  addActivity,
  addDeleteActivityId,
  deleteActivity,
  editActivity,
} from "../../slices/activitySlice";
import { getStudentHours } from "../../slices/studentsSlice";
import icons from "../../data/icons";
import MutatingDotsLoder from "../../CustomComponents/MutatingDotsLoder";
import ActivityPopup from "./ActivityPopup";
import Activity from "./Activity";
import { getTodayDate } from "../../utils/data";
import ConfirmationPopup from "../../CustomComponents/ConfirmationPopup";
import Select from "../../CustomComponents/Select";
import FilterWithSlideDown from "../../CustomComponents/FilterWithSlideDown";
import { filterActivities } from "../../utils/filter";
import Table from "../../CustomComponents/Table";
import { studentColumns } from "../../data/table";

const Student = ({ selector, dispatch, studentSelector, triggerPopUp }) => {
  const { id } = useParams();
  const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [mentorFilter, setMentorFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    getStudentActivityLoading,
    studentAllActivity,
    addActivityLoading,
    editActivityLoading,
    deleteUpdateLoading,
    deleteActivityId,
  } = selector;

  const {
    isLoading,
    studentsDataList,
    mentorList,
    getStudentHoursLoading,
    studentsHours,
  } = studentSelector;

  const [formState, setFormState] = useState({
    activity: "",
    date: getTodayDate(),
    hour: "",
    mentor: "",
    errors: {
      activity: "",
      date: "",
      hour: "",
      mentor: "",
    },
  });

  const validateForm = (formState) => {
    const errors = {
      activity: !formState.activity
        ? "Activity is required."
        : formState.activity.length < 3
          ? "Activity must be at least 3 characters."
          : "",
      date: !formState.date
        ? "Date is required."
        : new Date(formState.date) > new Date()
          ? "Date cannot be in the future."
          : "",
      hour: !formState.hour
        ? "Hour is required."
        : isNaN(formState.hour) || formState.hour <= 0
          ? "Hour must be a positive number."
          : "",
      mentor: !formState.mentor ? "Mentor is required." : "",
    };

    const hasErrors = Object.values(errors).some((error) => error !== "");
    return hasErrors ? errors : null;
  };

  const students = studentsDataList || [];
  const student = students.find((student) => student.id === parseInt(id));
  console.log(student)

  const studentActivity = studentAllActivity.filter(
    (activity) => activity.user === parseInt(id)
  );


  const filteredActivities = filterActivities(studentActivity, startDate, endDate, mentorFilter);

  const studentActivityHours = studentsHours.find(
    (hou) => hou.user === Number(id)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: "", username: "", otherError: "" },
    }));
  };

  const handleAddOrUpdateActivity = async () => {
    console.log(formState);
    // return
    const errors = validateForm(formState);
    if (errors) {
      setFormState((prev) => ({
        ...prev,
        errors,
      }));
      return;
    }

    const activityData = {
      ...formState,
      user: parseInt(id),
    };

    try {
      if (editingIndex !== null) {
        const result = await dispatch(editActivity(activityData));
        if (result.meta.requestStatus === "fulfilled") {
          triggerPopUp(true, "Activity updated successfully!");
          dispatch(getStudentHours());
        } else {
          triggerPopUp(false, "Failed to update activity.");
        }
      } else {
        const result = await dispatch(addActivity(activityData));
        if (result.meta.requestStatus === "fulfilled") {
          triggerPopUp(true, "Activity added successfully!");
          dispatch(getStudentHours());
        } else {
          triggerPopUp(false, "Failed to add activity.");
        }
      }
    } catch (error) {
      console.error("Error while adding/updating activity:", error);
    } finally {
      setIsPopupVisible(false);
      resetForm();
    }
  };

  const handleDelete = async (id) => {
    setDeleteConfirmPopup(false);
    const activityToDelete = studentActivity[currentDeleteId];
    if (!activityToDelete) return;

    try {
      await dispatch(addDeleteActivityId(activityToDelete.id));
      const result = await dispatch(deleteActivity(activityToDelete.id));
      if (result.meta.requestStatus === "fulfilled") {
        triggerPopUp(true, "Activity deleted successfully!");
        dispatch(getStudentHours());
      } else {
        triggerPopUp(false, "Failed to delete activity.");
      }
    } catch (error) {
      console.error("Error while deleting activity:", error);
    }
  };

  const handleDeleteActivity = async (index) => {
    setDeleteConfirmPopup(true);
    setCurrentDeleteId(index);
  };

  const resetForm = () => {
    setFormState({
      activity: "",
      date: getTodayDate(),
      hour: "",
      mentor: "",
      errors: {
        activity: "",
        date: "",
        hour: "",
        mentor: "",
      },
    });
    setEditingIndex(null);
    setIsPopupVisible(false);
  };

  const handleEditActivity = (index) => {
    const activityToEdit = studentActivity[index];
    if (activityToEdit) {
      setFormState((prev) => ({
        ...activityToEdit,
        errors: prev.errors,
      }));
      setEditingIndex(index);
      setIsPopupVisible(true);
    }
  };

  const handleDateChange = (name, value) => {
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  if (!student) {
    return isLoading ? (
      <div className="w-full flex justify-center p-6">
        <MutatingDotsLoder color={"black"} />
      </div>
    ) : (
      <div className="text-center text-red-500">Student not found</div>
    );
  }


  const studentsWithHours = [student].map((student) => {
    const remainingHours = getStudentHoursLoading ? (
      <MutatingDotsLoder color="black" />
    ) : studentActivityHours ? (
      studentActivityHours.RemainingHours
    ) : (
      student.courseDuration
    )
    const extraHours = getStudentHoursLoading ? (
      <MutatingDotsLoder color="black" />
    ) : studentActivityHours ? (
      studentActivityHours.extrahours
    ) : (
      0
    )

    return {
      ...student,
      remainingHours,
      extraHours
    };
  });

  console.log(studentsWithHours)
  console.log(students)


  const viewStudentsColumns = [
    { key: "studentName", label: "Name" },
    { key: "program", label: "Program" },
    { key: "collegeName", label: "College Name" },
    { key: "email", label: "Email" },
    { key: "gender", label: "Gender" },
    { key: "mobileNumber", label: "Mobile Number" },
    { key: "mentor", label: "Mentor" },
    { key: "courseDuration", label: "Course Duration" },
    { key: "remainingHours", label: "Remaining Hours" },
    { key: "extraHours", label: "Extra Hours" },
    { key: "joiningDate", label: "Joining Date" },
    { key: "endDate", label: "End Date" },
    { key: "studentStatus", label: "Status" },
  ];

  // Sample Data
  const studentDetails = {
    studentName: "Ravikumar",
    program: "Python Full Stack",
    collegeName: "Cap",
    email: "Ravikumar@Gmail.Com",
    gender: "Male",
    mobileNumber: "1234567890",
    mentor: "Harilal",
    courseDuration: "120.00",
    remainingHours: "114.00",
    extraHours: "0",
    joiningDate: "2024-12-09",
    endDate: "2024-12-18",
    studentStatus: "Completed",
  };
  console.log(student);

  return (
    <div className="flex flex-col min-h-screen gap-3 md:gap-6  shadow-md overflow-y-auto p-3 md:p-6">
      <ConfirmationPopup
        visible={deleteConfirmPopup}
        message={`Are you sure you want to delete this student activity?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmPopup(false)}
      />

      <div className="w-full bg-[#D3F8FA] p-3 rounded-[8px] overflow-x-auto whitespace-nowrap">
        <table className="w-full text-sm text-left text-[#454545]">
          <tbody className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {studentColumns.map((column) => {
              const value =
                column.key === "mentor"
                  ? studentsWithHours[0][column.key] &&
                    studentsWithHours[0][column.key].length > 0
                    ? studentsWithHours[0][column.key]
                        .map((mentor) => mentor.field || "-") // Use `field` to get mentor's name
                        .join(", ")
                    : "-" // Fallback if no mentors are available
                  : studentsWithHours[0][column.key] || "-"; // General fallback for other keys

              return (
                <tr
                  key={column.key}
                  className="flex justify-between items-start"
                >
                  <td className="py-2 px-4 font-medium w-full">
                    {column.label}
                  </td>
                  <td className="py-2 px-4">:</td>
                  <td
                    className={`py-2 px-4 font-medium w-full ${
                      column.key === "email" ? "lowercase" : "capitalize"
                    }`}
                  >
                    {value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className=" flex flex-col gap-3 md:gap-6">
        <div className="flex  justify-between items-center flex-col  p-3 rounded-[8px] sm:flex-row gap-6 bg-[#D3F8FA] w-fit">
          <h2 className="text-xl font-medium whitespace-nowrap">
            Daily Activities
          </h2>

          <div className="flex   gap-3 justify-end items-center ">
            <FilterWithSlideDown
              startDate={startDate}
              endDate={endDate}
              onDateChange={handleDateChange}
              styleClass={"bg-white  w-[200px]"}
              inputStyle={"bg-[#D3F8FA]"}
            />
            <Select
              label="Mentor"
              name="mentor"
              value={mentorFilter}
              options={mentorList.map((mentor) => mentor.field) ?? []}
              onChange={(e) => setMentorFilter(e.target.value)}
              styleClass=" bg-white w-[200px]"
            />

            {studentsWithHours[0].studentStatus === "active" && (
              <Button
                value={"Add"}
                onClick={() => setIsPopupVisible(true)}
                loading={addActivityLoading}
                type={"submit"}
                className={"text-[#5C5C5C] h-[45px]  px]  bg-[#fff]"}
              />
            )}
          </div>
        </div>

        <Activity
          deleteActivityId={deleteActivityId}
          studentActivity={filteredActivities}
          handleEditActivity={handleEditActivity}
          handleDeleteActivity={handleDeleteActivity}
          deleteUpdateLoading={deleteUpdateLoading}
          getStudentActivityLoading={getStudentActivityLoading}
        />
      </div>

      <ActivityPopup
        isVisible={isPopupVisible}
        onClose={resetForm}
        onSubmit={() => handleAddOrUpdateActivity()}
        formState={formState}
        handleInputChange={handleInputChange}
        mentorList={mentorList}
        editingIndex={editingIndex}
        isLoading={editActivityLoading || addActivityLoading}
      />
    </div>
  );
};

export default Student;

