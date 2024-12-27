import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Pagination from "../../CustomComponents/Pagination";
import Table from "../../CustomComponents/Table";
import AddStudent from "./AddStudent";
import { addDeleteId, deleteStudent } from "../../slices/studentsSlice";
import Input from "../../CustomComponents/Input";
import FilterWithSlideDown from "../../CustomComponents/FilterWithSlideDown"; 
import { getFilteredStudents } from "../../utils/filter";
import { typeOfStudentColumns } from "../../data/table";
import ConfirmationPopup from "../../CustomComponents/ConfirmationPopup";



const TypeOfStudent = ({ selector, dispatch, triggerPopUp, programSelector }) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { studentsDataList, mentorList, deleteStudentIds, isLoading } = selector;
  const { programType, program } = programSelector;
    const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
    const [currentDeleteId, setCurrentDeleteId] = useState("");
const filteredByProgram = studentsDataList.filter(
  (student) =>
    student.programType.toLowerCase() === name.toLowerCase() ||
    student.studentStatus.toLowerCase() === name.toLowerCase()
);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filters, setFilters] = useState({
    search: "",
  });
  const [addPopup, setAddPopup] = useState(false);
  const [editId, setEditId] = useState(null);


  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };


  const handleDateChange = (name, value) => {
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };



  const filteredStudents = getFilteredStudents({
    students: filteredByProgram,
    searchTerm: filters.search,
    startDate,
    endDate,
  });


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handleView = (id) => {
    navigate(`/student/${id}`);
  };

  
  const handleDelete = (id) => {
    setDeleteConfirmPopup(true);
    setCurrentDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    setDeleteConfirmPopup(false);
    dispatch(addDeleteId(currentDeleteId));
    const result = await dispatch(deleteStudent(currentDeleteId));
    if (result.meta.requestStatus === "fulfilled") {
      triggerPopUp(true, "Student Deleted Successfully!");
    } else {
      triggerPopUp(false, "Failed to Delete Student.");
    }
  };





  return (
    <div className="min-h-screen flex flex-col p-3 md:p-6 relative gap-3 md:gap-6">
      <ConfirmationPopup
        visible={deleteConfirmPopup}
        message="Are you sure you want to delete this student?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmPopup(false)}
      />

      <div className="flex flex-col md:flex-row justify-between gap-2 md:items-center">
        <h1 className="text-2xl font-medium capitalize">
          {name.charAt(0).toUpperCase() + name.slice(1)} Students
        </h1>

        <div className="flex md:flex-row gap-2 md:gap-4 items-center md:w-1/2">
          <Input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by Name or Email"
          />

          <FilterWithSlideDown
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
            styleClass={"w-full max-w-[200px] bg-[#EEEEEE] "}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto">
        <Table
          setEditId={setEditId}
          setAddPopup={setAddPopup}
          columns={typeOfStudentColumns}
          data={currentItems.map((item, index) => ({
            ...item,
            index: indexOfFirstItem + index + 1,
          }))}
          handleView={handleView}
          deleteStudentLoading={deleteStudentIds}
          handleDelete={handleDelete}
          loading={isLoading}
          actionPopupStyle={"top-10  right-16"}
        />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          goToPreviousPage={() =>
            setCurrentPage((prev) => Math.max(prev - 1, 1))
          }
          goToNextPage={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          itemsPerPage={itemsPerPage}
          dataLength={currentItems}
        />
      </div>

      {addPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 p-8">
          <AddStudent
            onClose={() => setAddPopup(false)}
            selector={selector}
            dispatch={dispatch}
            triggerPopUp={triggerPopUp}
            setAddPopup={setAddPopup}
            setEditId={setEditId}
            studentSelector={selector}
            editId={editId}
            programSelector={programSelector}
          />
        </div>
      )}
    </div>
  );
  
};

export default TypeOfStudent;
