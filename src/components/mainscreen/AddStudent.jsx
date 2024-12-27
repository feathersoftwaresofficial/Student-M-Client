import React, { useEffect, useState } from "react";
import Label from "../../CustomComponents/Lable";
import Select from "../../CustomComponents/Select";
import Input from "../../CustomComponents/Input";
import { addStudent, getStudentCounts, updataCount, updataStudent } from "../../slices/studentsSlice";
import Button from "../../CustomComponents/Button";
import MultiSelector from "../../CustomComponents/MultiSelector";
import { getTodayDate } from "../../utils/data";
import icons from "../../data/icons";


const AddStudent = ({

  selector,
  dispatch,
  triggerPopUp,
  setAddPopup,
  setEditId,
  studentSelector,
  editId,
  programSelector,
  onClose,

}) => {

  const { addStudentLoading, mentorList, updateStudentLoading } = selector;
  const { programType, program } = programSelector;
  const [addStudentFormData, setAddStudentFormData] = useState({
    studentName: "",
    program: "",
    collegeName: "",
    email: "",
    gender: "",
    mobileNumber: "",
    mentor: [],
    courseDuration: 0,
    joiningDate: getTodayDate(),
    programType: "",
    studentStatus: "active",

    errors: {
      studentName: "",
      program: "",
      collegeName: "",
      email: "",
      gender: "",
      mobileNumber: "",
      mentor: "",
      courseDuration: "",
      joiningDate: "",
      programType: "",
      studentStatus: "",
    },
  });


  const fields = [
    {
      id: "studentName",
      label: "Student Name",
      type: "text",
      placeholder: "Enter Student Name",
      errorKey: "studentName",
    },
    {
      id: "programType",
      label: "Program Type",
      type: "select",
      options: programType.map((pro) => pro.programType) ?? [],
      errorKey: "programType",
    },
    {
      id: "program",
      label: "Program",
      type: "select",
      options: program.map((pro) => pro.program) ?? [],
      errorKey: "program",
    },
    {
      id: "collegeName",
      label: "College Name",
      type: "text",
      placeholder: "Enter College Name",
      errorKey: "collegeName",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter Email",
      errorKey: "email",
    },
    {
      id: "gender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female"],
      errorKey: "gender",
      other: true,
      ohterPlaceholder: "Gender",
    },
    {
      id: "mobileNumber",
      label: "Mobile Number",
      type: "number",
      placeholder: "Enter Mobile Number",
      errorKey: "mobileNumber",
    },
    {
      id: "mentor",
      label: "Mentor",
      type: "select",
      options: mentorList ?? [],
      errorKey: "mentor",
    },
    {
      id: "courseDuration",
      label: "Course Duration",
      type: "number",
      options: ["60", "80", "100", "120", "140", "160"],
      errorKey: "courseDuration",
      placeholder: "Enter Course Duration",
    },
    {
      id: "joiningDate",
      label: "Joining Date",
      type: "date",
      errorKey: "joiningDate",
    },
    {
      id: "studentStatus",
      label: "status",
      type: "select",
      options: ["active", "completed", "discontinue"],
      errorKey: "studentStatus",
    },
  ];



  const resetForm = () => {
    setAddStudentFormData({
      studentName: "",
      program: "",
      collegeName: "",
      email: "",
      gender: "",
      mobileNumber: "",
      mentor: [],
      courseDuration: 0,
      joiningDate: getTodayDate(),
      programType: "",
      studentStatus:"",
      errors: {
        studentName: "",
        program: "",
        collegeName: "",
        email: "",
        gender: "",
        mobileNumber: "",
        mentor: "",
        courseDuration: "",
        joiningDate: "",
        programType: "",
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddStudentFormData((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: "" },
    }));
  };

  const handleMentorSelect = (selectedList) => {
    setAddStudentFormData((prev) => ({
      ...prev,
      mentor: selectedList,
      errors: { ...prev.errors, mentor: "" },
    }));
    console.log(addStudentFormData.mentor, selectedList);
  };

  const handleMentorRemove = (removedList) => {
    setAddStudentFormData((prev) => ({
      ...prev,
      mentor: removedList,
    }));

    console.log(addStudentFormData.mentor, removedList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const errors = {};


    fields.forEach((field) => {
      const value = addStudentFormData[field.id];


      if (field.id === "mentor") {
        if (!Array.isArray(value) || value.length === 0) {
          errors[
            field.errorKey
          ] = `${field.label} is required at least one mentor `;
          isValid = false;
        }
      } else {

        if (!value) {
          errors[field.errorKey] = `${field.label} is required`;
          isValid = false;
        }
      }


    });


    const mobileNumber = addStudentFormData.mobileNumber;
    if (mobileNumber && (mobileNumber.length !== 10 || isNaN(mobileNumber))) {
      errors.mobileNumber = "Mobile Number must be 10 digits";
      isValid = false;
    }


    const joiningDate = addStudentFormData.joiningDate;
    if (joiningDate && new Date(joiningDate) > new Date()) {
      errors.joiningDate = "Joining Date cannot be in the future";
      isValid = false;
    }

    if (!isValid) {
      setAddStudentFormData((prev) => ({ ...prev, errors }));
      return;
    }

    if (editId) {
      const result = await dispatch(updataStudent(addStudentFormData));

      if (result.meta.requestStatus === "fulfilled") {
         dispatch(getStudentCounts());
        triggerPopUp(true, "Student Updated Successfully");
        dispatch(updataCount());
        setAddPopup(false);
        setEditId(null);
      } else {
        triggerPopUp(false, "Student Update Failed");
      }
    } else {


      const result = await dispatch(addStudent(addStudentFormData));

      if (result.meta.requestStatus === "fulfilled") {
        dispatch(getStudentCounts());
        dispatch(updataCount());
        triggerPopUp(true, "Add Student Successfully");
        setAddPopup(false);
        resetForm()
      } else {
        triggerPopUp(false, "Add Student Failed");
        resetForm();
      }
    }


  };

  useEffect(() => {
    if (editId) {
      const student = studentSelector.studentsDataList.find(
        (stu) => stu.id === editId
      );
      if (student) {
        setAddStudentFormData({
          id: student.id,
          studentName: student.studentName || "",
          program: student.program || "",
          collegeName: student.collegeName || "",
          email: student.email || "",
          gender: student.gender || "",
          mobileNumber: student.mobileNumber || "",
          mentor: student.mentor || [],
          courseDuration: student.courseDuration || 0,
          joiningDate: student.joiningDate || "",
          programType: student.programType || "",
          studentStatus:student.studentStatus || "",
          errors: {
            studentName: "",
            program: "",
            collegeName: "",
            email: "",
            gender: "",
            mobileNumber: "",
            mentor: "",
            courseDuration: "",
            joiningDate: "",
            programType: "",
          },
        });
      }
    }
  }, [editId]);

  return (
    <div className="  w-full  relative h-[90%] flex flex-col justify-center flex-growp-0 overflow-hidden ">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="add-student-form flex rounded-[8px]  flex-col gap-4 w-full bg-white relative  md:grid grid-cols-2 p-6  overflow-y-auto"
      >
        <div
          className="btn absolute top-1 right-1 rounded-[8px] cursor-pointer text-white   bg-red-600 text-[16px]"
          onClick={() => {
            onClose();
            resetForm();
            setEditId(null);
          }}
        >
          {icons.closeIcon}
        </div>

        {fields.map((field) => (
          <div className="flex flex-col gap-1" key={field.id}>
            <Label
              text={field.label}
              error={addStudentFormData.errors[field.errorKey]}
            />
            {field.type === "select" ? (
              field.id !== "mentor" ? (
                <Select
                  id={field.id}
                  name={field.id}
                  value={addStudentFormData[field.id] || ""}
                  options={field.options}
                  onChange={handleChange}
                  label={field.label}
                  other={field.other ?? false}
                  ohterPlaceholder={field.ohterPlaceholder ?? ""}
                  styleClass={"bg-[#EEEEEE] "}
                />
              ) : (
                <MultiSelector
                  options={mentorList}
                  selectedMentors={addStudentFormData.mentor}
                  onRemove={handleMentorRemove}
                  onSelect={handleMentorSelect}
                  
                />
              )
            ) : (
              <Input
                type={field.type}
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                value={addStudentFormData[field.id] || ""}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        <div className="flex justify-center mt-auto">
          <Button
            type="submit"
            value={editId ? "Update" : "Submit"}
            className={"w-[50%] h-[45px] text-white rounded-[8px] bg-[#17acc3]"}
            loading={addStudentLoading || updateStudentLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
