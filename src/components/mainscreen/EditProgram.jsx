import React, { useState } from "react";
import Program from "../../CustomComponents/Program";
import {
  addProgram,
  updateProgram,
  deleteProgram,
  addProgramType,
  updateProgramType,
  deleteProgramType,
} 
from "../../slices/programsSlice";
import ConfirmationPopup from "../../CustomComponents/ConfirmationPopup.jsx";
import ProgramPopup from "./ProgramPopup.jsx";
import { getStudentCounts, getStudentHours } from "../../slices/studentsSlice.js";

const EditProgram = ({ selector, dispatch, triggerPopUp }) => {
  const {
    program,
    programType,
    getProgramLoading,
    postProgramLoading,
    updataProgramLoading,
    deleteProgramLoading,
    getProgramTypeLoading,
    postProgramTypeLoading,
    updataProgramTypeLoading,
    deleteProgramTypeLoading,
  } = selector;

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputValueError, setInputValueError] = useState("");
  const [deleteId, setDeleteId] = useState([]);
  const [programTypeDeleteId, setProgramTypeDeleteId] = useState([]);
  const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState("");

  const handleAdd = (type) => {
    setModalType(type);
    setIsEditMode(false);
    setInputValue("");
    setShowModal(true);
  };

  const handleEdit = (type, item) => {
    setModalType(type);
    setIsEditMode(true);
    setSelectedItem(item);
    setInputValue(item.program || item.programType);
    setShowModal(true);
  };

  const handleSave = async () => {

    if (modalType === "program") {
      if (!inputValue) {
        setInputValueError("required");
        return;
      }
      if (isEditMode) {
        const result = await dispatch(
          updateProgram({ id: selectedItem.id, program: inputValue })
        );
        if (result.meta.requestStatus === "fulfilled") {
          dispatch(getStudentCounts());
          triggerPopUp(true, "Edit Program Successfully");
        } else {
          triggerPopUp(false, "Edit Program Failed");
        }
      } else {
        const result = await dispatch(addProgram(inputValue));
        if (result.meta.requestStatus === "fulfilled") {
          dispatch(getStudentCounts());
          triggerPopUp(true, "Add Program Successfully");
        } else {
          triggerPopUp(false, "Add Program Failed");
        }
      }
    } else if (modalType === "programType") {
      if (!inputValue) {
        setInputValueError("required");
        return;
      }
      if (isEditMode) {
        const result = await dispatch(
          updateProgramType({ id: selectedItem.id, programType: inputValue })
        );
        if (result.meta.requestStatus === "fulfilled") {
          dispatch(getStudentCounts());
          triggerPopUp(true, "Edit ProgramType Successfully");
        } else {
          triggerPopUp(false, "Edit ProgramType Failed");
        }
      } else {
        const result = await dispatch(addProgramType(inputValue));
        if (result.meta.requestStatus === "fulfilled") {
          dispatch(getStudentCounts());
          triggerPopUp(true, "Add ProgramType Successfully");
        } else {
          triggerPopUp(false, "Add ProgramType Failed");
        }
      }
    }
    setShowModal(false);
  };

  const handleDelete = async (type, item) => {
    setDeleteConfirmPopup(true);
    setCurrentDeleteId({ type, item });
  };

  const deleteConfirm = async (type, item) => {
    setDeleteConfirmPopup(false);
    if (currentDeleteId.type === "program") {
      setDeleteId((pre) => [...pre, currentDeleteId.item.id]);
      const result = await dispatch(deleteProgram(currentDeleteId.item.id));
      if (result.meta.requestStatus === "fulfilled") {
                dispatch(getStudentCounts());
        triggerPopUp(true, "Delete Program Successfully");
      } else {
        triggerPopUp(false, "Delete Program Failed");
      }
    } else if (currentDeleteId.type === "programType") {
      setProgramTypeDeleteId((pre) => [...pre, currentDeleteId.item.id]);
      const result = await dispatch(deleteProgramType(currentDeleteId.item));
      if (result.meta.requestStatus === "fulfilled") {
                dispatch(getStudentCounts());
        triggerPopUp(true, "Delete ProgramType Successfully");
      } else {
        triggerPopUp(false, "Delete ProgramType Failed");
      }
    }
  };

  return (
    <div className="w-full min-h-screen  relative grid  md:grid-cols-2   gap-3 overflow-y-auto ">
      <ConfirmationPopup
        visible={deleteConfirmPopup}
        message={`Are you sure you want to delete this ${modalType}?`}
        onConfirm={deleteConfirm}
        onCancel={() => setDeleteConfirmPopup(false)}
      />

      <Program
        heading="Programs"
        btnName={"Add +"}
        addBtn={() => handleAdd("program")}
        editBtn={(item) => handleEdit("program", item)}
        deleteBtn={(item) => handleDelete("program", item)}
        programType={program}
        deleteProgramLoading={deleteProgramLoading}
        deleteId={deleteId}
        getProgramLoading={getProgramLoading}
        inputValueError={inputValueError}
      />

      <Program
        heading="Program Types"
        btnName={"Add +"}
        addBtn={() => handleAdd("programType")}
        editBtn={(item) => handleEdit("programType", item)}
        deleteBtn={(item) => handleDelete("programType", item)}
        programType={programType}
        deleteProgramLoading={deleteProgramTypeLoading}
        deleteId={programTypeDeleteId}
        getProgramLoading={getProgramTypeLoading}
      />

      {showModal && (
        <ProgramPopup
          isEditMode={isEditMode}
          modalType={modalType}
          inputValue={inputValue}
          onChangeInput={(e) => setInputValue(e.target.value)}
          onClickCancel={() => {
            setShowModal(false);
            setInputValueError("");
          }}
          onClickOk={() => handleSave()}
          inputValueError={inputValueError}
          setInputValueError={setInputValueError}
          loading={
            postProgramLoading ||
            updataProgramLoading ||
            updataProgramTypeLoading ||
            postProgramTypeLoading
          }
        />
      )}
    </div>
  );
};

export default EditProgram;
