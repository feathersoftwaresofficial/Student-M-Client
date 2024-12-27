import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../CustomComponents/Pagination";
import Input from "../../CustomComponents/Input";
import Select from "../../CustomComponents/Select";
import Table from "../../CustomComponents/Table";
import { addDeleteId, deleteStudent, updataCount } from "../../slices/studentsSlice";
import Button from "../../CustomComponents/Button";
import AddStudent from "./AddStudent";
import icons from "../../data/icons";
import ConfirmationPopup from "../../CustomComponents/ConfirmationPopup";
import FilterWithSlideDown from "../../CustomComponents/FilterWithSlideDown";
import { viewStudentscolumns } from "../../data/table";
import  {filterStudents} from '../../utils/filter'
import { refreshDashScroll } from "../../slices/otherSlice";

const ViewStudents = ({ selector, dispatch, triggerPopUp, programSelector }) => {
  const { studentsDataList, mentorList, deleteStudentIds, isLoading, } = selector;
  const { program, programType } = programSelector;
  const students = studentsDataList;

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [mentorFilter, setMentorFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [addPopup, setAddPopup] = useState(false);
  const [editId, setEditId] = useState("");
  const [addEditPopup, setAddEditPopup] = useState(false);
  const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState("");
  const itemsPerPage = 10;



  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "mentorFilter":
        setMentorFilter(value);
        break;
      case "programFilter":
        setProgramFilter(value);
        break;
      case "typeFilter":
        setTypeFilter(value);
        break;
      case "search":
        setSearch(value);
        break;
      default:
        break;
    }
  };



  const handleDateChange = (name, value) => {
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  const handleView = (id) => navigate(`/student/${id}`);

  const handleDelete = (id) => {
    setDeleteConfirmPopup(true);
    setCurrentDeleteId(id);
  };

  const deleteConfirm = async () => {
    setDeleteConfirmPopup(false);
    dispatch(addDeleteId(currentDeleteId));
    const result = await dispatch(deleteStudent(currentDeleteId));

    if (result.meta.requestStatus === "fulfilled") {
      triggerPopUp(true, "Student Deleted successfully!");
      dispatch(updataCount());
    } else {
      triggerPopUp(false, "Failed to Delete Student.");
    }
  };



  const filteredStudents = filterStudents({
    students,
    search,
    mentorFilter,
    programFilter,
    typeFilter,
    startDate,
    endDate,
  });
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));


  const dropdowns = [
    {
      label: "Program Type",
      value: "typeFilter",
      options: programType.map((pro) => pro.programType),
    },
    {
      label: "Mentor",
      value: "mentorFilter",
      options: mentorList.map((men) => men.field),
    },
    {
      label: "Program",
      value: "programFilter",
      options: program.map((pro) => pro.program),
    },
  ];


  const toggleAddPopup = () => {
    setAddPopup(!addPopup);
    setAddEditPopup(!addEditPopup);
  };







  useEffect(()=>{
    dispatch(refreshDashScroll())

  },[])



  return (
    <div className=" flex  flex-col flex-grow p-3 md:p-6 overflow-y-auto gap-3 ">
      <ConfirmationPopup
        visible={deleteConfirmPopup}
        message="Are you sure you want to delete this student?"
        onConfirm={deleteConfirm}
        onCancel={() => setDeleteConfirmPopup(false)}
      />

      <div className="all-inputs w-full flex flex-col md:flex-row gap-2 ">
        <div className="flex gap-2 justify-between w-full md:max-w-[300px] ">
          <Input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleChange}
            name="search"
            className=" w-full md:min-w-[300px] h-[45px]"
          />

          <Button
            value={"add"}
            className="bg-[#EEEEEE]  h-full min-h-[45px] md:hidden rounded-[8px] w-fit text-[#6D6D6D] "
            onClick={toggleAddPopup}
          />
        </div>

        <div className="grid grid-cols-2 sm:flex md:flex-row gap-2 w-full">
          <FilterWithSlideDown
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
            styleClass={"w-full bg-[#EEEEEE] "}
          />

          {dropdowns.map((dropdown, index) => (
            <Select
              key={index}
              label={dropdown.label}
              value={eval(dropdown.value)}
              options={dropdown.options}
              onChange={handleChange}
              name={dropdown.value}
              selectorClass="w-full "
              styleClass={"bg-[#EEEEEE] w-full"}
            />
          ))}
        </div>

        <Button
          value={"add"}
          className="bg-[#EEEEEE]  h-full min-h-[45px] hidden md:flex rounded-[8px] text-[#6D6D6D] "
          onClick={toggleAddPopup}
        />
      </div>

      <Table
        loading={isLoading}
        columns={viewStudentscolumns}
        data={currentItems.map((item, index) => ({
          ...item,
          index: indexOfFirstItem + index + 1,
        }))}
        handleView={handleView}
        handleDelete={handleDelete}
        setAddPopup={setAddEditPopup}
        deleteStudentLoading={deleteStudentIds}
        setEditId={setEditId}
        actionPopupStyle={"top-10  right-16"}
      />

      {!isLoading && (
        <Pagination
          dataLength={currentItems}
          totalPages={totalPages}
          currentPage={currentPage}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
        />
      )}

      {addEditPopup && (
        <div className="fixed  inset-0 flex items-center  justify-center z-50 bg-black bg-opacity-70  p-3 md:p-6  overflow-hidden ">
          <AddStudent
            onClose={() => setAddEditPopup(false)}
            selector={selector}
            dispatch={dispatch}
            navigate={navigate}
            triggerPopUp={triggerPopUp}
            studentSelector={selector}
            setAddPopup={setAddEditPopup}
            setEditId={setEditId}
            editId={editId}
            programSelector={programSelector}
          />
        </div>
      )}
    </div>
  );

};

export default ViewStudents;
